import google.generativeai as genai
import json
import sys
import time
import re
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from threading import Semaphore

# ── Config ────────────────────────────────────────────────────────────────────
API_KEY    = "AIzaSyBi1epWwJkjco9IAMTNqbroMMorI98_kT4"
MODEL_NAME = "gemini-2.5-flash-lite"
RPM_LIMIT  = 10          # free tier: 10 requests per minute
WORKERS    = 4           # keep below RPM_LIMIT to avoid bursting

SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"}

PROMPT = """Analyze this product packaging image and extract the following information.

Return ONLY a valid JSON object with exactly these two fields:
{
  "name": "<full product name as shown on the package>",
  "price": "<price as shown on the package, including currency symbol if visible>"
}

Do not include any explanation, markdown, or extra text — only the raw JSON object."""

# ── Rate limiter (token bucket — max RPM_LIMIT calls per 60 s) ───────────────
_semaphore = Semaphore(RPM_LIMIT)
_slot_times: list[float] = []

def rate_limited_call(fn, *args, **kwargs):
    """Ensure we never exceed RPM_LIMIT requests per 60-second window."""
    import threading
    _lock = getattr(rate_limited_call, "_lock", None)
    if _lock is None:
        rate_limited_call._lock = threading.Lock()
        _lock = rate_limited_call._lock

    with _lock:
        now = time.monotonic()
        # drop slots older than 60 s
        while _slot_times and now - _slot_times[0] > 60:
            _slot_times.pop(0)
        if len(_slot_times) >= RPM_LIMIT:
            sleep_for = 60 - (now - _slot_times[0]) + 0.2
            if sleep_for > 0:
                print(f"   ⏳ Rate limit window full — waiting {sleep_for:.1f}s ...")
                time.sleep(sleep_for)
        _slot_times.append(time.monotonic())

    return fn(*args, **kwargs)


# ── Core extraction ───────────────────────────────────────────────────────────
def extract_from_image(image_path: Path, model) -> dict:
    def _call():
        uploaded = genai.upload_file(str(image_path))
        return model.generate_content([uploaded, PROMPT])

    response = rate_limited_call(_call)
    raw = response.text.strip()

    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.strip()

    return json.loads(raw)


def process_single(image_path: Path, model, max_retries: int = 3) -> dict:
    for attempt in range(1, max_retries + 1):
        try:
            info = extract_from_image(image_path, model)
            info["file"] = image_path.name
            return info
        except json.JSONDecodeError:
            return {"file": image_path.name, "name": None, "price": None, "error": "JSON parse error"}
        except Exception as e:
            err = str(e)
            # Parse retry-after from 429 message if present
            if "429" in err:
                match = re.search(r"retry_delay\s*\{\s*seconds:\s*(\d+)", err)
                wait = int(match.group(1)) + 2 if match else 60
                print(f"   ⚠️  {image_path.name} — rate limited (attempt {attempt}/{max_retries}), waiting {wait}s ...")
                time.sleep(wait)
            else:
                # Non-rate-limit error — don't retry
                return {"file": image_path.name, "name": None, "price": None, "error": err}

    return {"file": image_path.name, "name": None, "price": None, "error": "Max retries exceeded"}


# ── Resume logic ──────────────────────────────────────────────────────────────
def load_existing_results(json_path: Path) -> dict:
    """Load previous results; return a dict keyed by filename."""
    if not json_path.exists():
        return {}
    with open(json_path, encoding="utf-8") as f:
        data = json.load(f)
    # Keep only entries that actually succeeded (have name and no error)
    return {
        entry["file"]: entry
        for entry in data
        if entry.get("name") and not entry.get("error")
    }


# ── Main ──────────────────────────────────────────────────────────────────────
def process_folder(folder_path: str, workers: int = WORKERS):
    folder = Path(folder_path)
    if not folder.is_dir():
        print(f"❌ Not a valid folder: {folder_path}")
        sys.exit(1)

    images = [f for f in sorted(folder.iterdir()) if f.suffix.lower() in SUPPORTED_EXTENSIONS]
    if not images:
        print(f"⚠️  No images found in: {folder_path}")
        sys.exit(0)

    output_file = folder / "extracted_products.json"
    already_done = load_existing_results(output_file)

    todo = [img for img in images if img.name not in already_done]
    skipped = len(images) - len(todo)

    print(f"📁 Folder   : {folder.resolve()}")
    print(f"🖼️  Total    : {len(images)} images")
    print(f"✅ Skipping  : {skipped} already extracted")
    print(f"🔄 Remaining : {len(todo)} to process")
    print(f"🤖 Model    : {MODEL_NAME}")
    print(f"⚡ Workers  : {min(workers, max(len(todo), 1))}")
    print("=" * 52)

    if not todo:
        print("Nothing left to do — all images already extracted!")
        return

    genai.configure(api_key=API_KEY)
    model = genai.GenerativeModel(MODEL_NAME)

    results_map = dict(already_done)  # seed with existing good results
    success = skipped
    failed  = 0
    total   = len(images)

    with ThreadPoolExecutor(max_workers=min(workers, len(todo))) as executor:
        future_to_image = {executor.submit(process_single, img, model): img for img in todo}

        for future in as_completed(future_to_image):
            image_path = future_to_image[future]
            result = future.result()
            results_map[image_path.name] = result

            done = len(results_map)
            if result.get("error"):
                print(f"[{done}/{total}] ❌ {image_path.name} — {result['error'][:80]}")
                failed += 1
            else:
                print(f"[{done}/{total}] ✅ {image_path.name} — {result.get('name')} | {result.get('price')}")
                success += 1

    # Restore sorted order and save
    all_results = [results_map[img.name] for img in images if img.name in results_map]
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(all_results, f, ensure_ascii=False, indent=2)

    print("=" * 52)
    print(f"✅ Success : {success} / {total}")
    if failed:
        print(f"❌ Failed  : {failed} / {total}  (re-run to retry)")
    print(f"💾 Saved   : {output_file}")


def main():
    # Usage: python resume_extract.py [folder] [workers]
    folder  = sys.argv[1] if len(sys.argv) > 1 else "."
    workers = int(sys.argv[2]) if len(sys.argv) > 2 else WORKERS
    process_folder(folder, workers)


if __name__ == "__main__":
    main()