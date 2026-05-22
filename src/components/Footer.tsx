import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-sobaka-bg border-t border-white/5 py-8">
      <div className="container-max section-padding">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Sobaka"
              className="h-10 w-10 object-contain rounded-full"
            />
            <span className="font-mono text-lg font-bold text-white tracking-wider">
              SOBAKA
            </span>
          </Link>

          {/* Copyright & Tagline */}
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Sobaka. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              The Magic Of Ceylon Flavour 🇱🇰
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
