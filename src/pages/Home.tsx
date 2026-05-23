import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Tag, Clock, Percent, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const products = [
  { id: 1, name: 'BOP Special Tea', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Tea', isLegacy: true, image: '/images/1.png' },
  { id: 2, name: 'Black Tea', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Tea', isLegacy: true, image: '/images/2.png' },
  { id: 3, name: 'Lemon Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', isLegacy: true, image: '/images/3.png' },
  { id: 4, name: 'Heen Bovitiya Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', isLegacy: true, image: '/images/4.png' },
  { id: 5, name: 'BOPF Tea', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Tea', isLegacy: true, image: '/images/5.png' },
  { id: 6, name: 'Blue Butterfly Pea Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', isLegacy: true, image: '/images/6.png' },
  { id: 7, name: 'Cinnamon Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', isLegacy: true, image: '/images/7.png' },
  { id: 8, name: 'Special Blended Tea', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Tea', isLegacy: true, image: '/images/8.png' },
  { id: 9, name: 'Green Tea', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Tea', isLegacy: true, image: '/images/9.png' },
  { id: 10, name: 'Hibiscus Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', isLegacy: true, image: '/images/10.png' },
  { id: 11, name: 'Moringa Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', isLegacy: true, image: '/images/11.png' },
  { id: 12, name: 'Thebu Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', isLegacy: true, image: '/images/12.png' },
  { id: 13, name: 'Turmeric Powder', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Spice', isLegacy: true, image: '/images/13.png' },
  { id: 14, name: 'Pure Cinnamon Sticks', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Spice', isLegacy: true, image: '/images/14.png' },
  { id: 15, name: 'White Pepper Powder', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Spice', isLegacy: true, image: '/images/15.png' },
  { id: 16, name: 'Black Pepper Powder', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Spice', isLegacy: true, image: '/images/16.png' },
  { id: 17, name: 'Black Pepper Seeds', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Spice', isLegacy: true, image: '/images/17.png' },
  { id: 18, name: 'Ginger Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', isLegacy: true, image: '/images/18.png' },
  { id: 19, name: 'Umbalakada Naimiris Baduma', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Baduma', isLegacy: true, image: '/images/19.png' },
  { id: 20, name: 'Naimiris Kaju Baduma', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Baduma', isLegacy: true, image: '/images/20.png' },
  { id: 21, name: 'Kunisso Naimiris Baduma', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Baduma', isLegacy: true, image: '/images/21.png' },
  { id: 22, name: 'Karawala Naimiris Baduma', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Baduma', isLegacy: true, image: '/images/22.png' },
  { id: 23, name: 'Dried Sprats Naimiris Baduma', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Baduma', isLegacy: true, image: '/images/23.png' },
  { id: 24, name: 'Coffee', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Coffee', isLegacy: true, image: '/images/24.png' },
  { id: 25, name: 'Cardamom', weight: '10g', price: null, originalPrice: null, discount: 10, category: 'Spice', isLegacy: true, image: '/images/25.png' },
  { id: 26, name: 'Spicy Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/26.png' },
  { id: 27, name: 'Bitter Gourd Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/27.png' },
  { id: 28, name: 'Vanilla Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/28.png' },
  { id: 29, name: 'Blackberry Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/29.png' },
  { id: 30, name: 'Blue Butterfly Pea Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/30.png' },
  { id: 31, name: 'Chocolate Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/31.png' },
  { id: 32, name: 'Coffee', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Coffee', isLegacy: false, image: '/images/32.png' },
  { id: 33, name: 'Garcinia Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/33.png' },
  { id: 34, name: 'Garlic Powder', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Spice', isLegacy: false, image: '/images/34.png' },
  { id: 35, name: 'Ginger Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/35.png' },
  { id: 36, name: 'Gotukola Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/36.png' },
  { id: 37, name: 'Green Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/37.png' },
  { id: 38, name: 'Thebu Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/38.png' },
  { id: 39, name: 'Heen Bovitiya Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/39.png' },
  { id: 40, name: 'Moringa Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/40.png' },
  { id: 41, name: 'Orange Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/41.png' },
  { id: 42, name: 'Unblended Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/42.png' },
  { id: 43, name: 'Peppermint Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/43.png' },
  { id: 44, name: 'Polpala Powder', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Spice', isLegacy: false, image: '/images/44.png' },
  { id: 45, name: 'Strawberry Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/45.png' },
  { id: 46, name: 'Supreme Pekoe Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/46.png' },
  { id: 47, name: 'Basil Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/47.png' },
  { id: 48, name: 'Dehydrated Mango', weight: '100g', price: null, originalPrice: null, discount: null, category: 'Dehydrated', isLegacy: false, image: '/images/48.png' },
  { id: 49, name: 'Dehydrated Papaya', weight: '100g', price: null, originalPrice: null, discount: null, category: 'Dehydrated', isLegacy: false, image: '/images/49.png' },
  { id: 50, name: 'Dehydrated Pineapple', weight: '100g', price: null, originalPrice: null, discount: null, category: 'Dehydrated', isLegacy: false, image: '/images/50.png' },
];

const ourPicks = [
  { id: 1, name: 'BOP Special Tea', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Tea', isLegacy: true, image: '/images/1.png' },
  { id: 2, name: 'Blue Butterfly Pea Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', isLegacy: true, image: '/images/6.png' },
  { id: 3, name: 'Pure Cinnamon Sticks', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Spice', isLegacy: true, image: '/images/14.png' },
  { id: 4, name: 'Cardamom', weight: '10g', price: null, originalPrice: null, discount: 10, category: 'Spice', isLegacy: true, image: '/images/25.png' },
  { id: 5, name: 'Naimiris Kaju Baduma', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Baduma', isLegacy: true, image: '/images/20.png' },
  { id: 6, name: 'Coffee', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Coffee', isLegacy: true, image: '/images/24.png' },
  { id: 7, name: 'Turmeric Powder', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Spice', isLegacy: true, image: '/images/13.png' },
  { id: 8, name: 'Black Pepper Seeds', weight: '100g', price: null, originalPrice: null, discount: 10, category: 'Spice', isLegacy: true, image: '/images/17.png' },
  { id: 26, name: 'Spicy Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/26.png' },
  { id: 30, name: 'Blue Butterfly Pea Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/30.png' },
  { id: 36, name: 'Gotukola Tea', weight: '20g', price: null, originalPrice: null, discount: null, category: 'Tea', isLegacy: false, image: '/images/36.png' },
  { id: 48, name: 'Dehydrated Mango', weight: '100g', price: null, originalPrice: null, discount: null, category: 'Dehydrated', isLegacy: false, image: '/images/48.png' },
];

const marqueeItems = [
  '100% NATURAL',
  'VEGAN FRIENDLY',
  'MADE IN SRI LANKA',
  'NO ADDED PRESERVATIVES',
  'PREMIUM QUALITY',
];

const categories = ['All', 'Tea', 'Spice', 'Baduma', 'Coffee', 'Dehydrated'];

function ProductCard({ product, variant = 'offer' }: { product: typeof products[0]; variant?: 'offer' | 'pick' }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      weight: product.weight,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="card-dark"
    >
      <div className="relative">
        {/* Discount Badge */}
        {product.discount !== null && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-sobaka-orange font-bold text-2xl">{product.discount}</span>
            <span className="text-sobaka-orange font-bold text-sm">% OFF</span>
          </div>
        )}
        {/* Legacy/New Badge */}
        {product.isLegacy !== undefined && (
          <div className="absolute top-3 right-3 z-10">
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              product.isLegacy 
                ? 'bg-sobaka-orange/20 text-sobaka-orange border border-sobaka-orange/30' 
                : 'bg-sobaka-green/20 text-sobaka-green border border-sobaka-green/30'
            }`}>
              {product.isLegacy ? 'Legacy' : 'New'}
            </span>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-[4/3] object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="p-4">
        <h3 className="text-white font-medium text-sm mb-1">{product.name}</h3>
        <p className="text-gray-400 text-xs mb-3">{product.weight}</p>
        <button
          onClick={handleAdd}
          className={variant === 'offer' ? 'w-full btn-outline text-xs py-2.5' : 'w-full btn-primary text-xs py-2.5'}
        >
          {variant === 'offer' ? 'Grab It' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  );
}

function SectionTitle({ white, colored, subtitle }: { white: string; colored: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="text-white">{white}</span>{' '}
        <span className="text-sobaka-orange">{colored}</span>
      </h2>
      {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef(null);
  const picksRef = useRef(null);
  const isOffersInView = useInView(offersRef, { once: true, margin: '-100px' });
  const isPicksInView = useInView(picksRef, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCollection, setSelectedCollection] = useState<'All' | 'New' | 'Legacy'>('All');
  const [floatingImages, setFloatingImages] = useState([14, 6, 13, 25]);

  // Scroll-based parallax for hero grid
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const gridY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const gridY2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const gridY3 = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const gridY4 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const collectionMatch =
      selectedCollection === 'All' ||
      (selectedCollection === 'New' && !product.isLegacy) ||
      (selectedCollection === 'Legacy' && product.isLegacy);
    return categoryMatch && collectionMatch;
  });

  const newProducts = filteredProducts.filter(p => !p.isLegacy);
  const legacyProducts = filteredProducts.filter(p => p.isLegacy);

  // Hero cycles between showing only New products and only Legacy products
  const [heroMode, setHeroMode] = useState<'new' | 'legacy'>('new');

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setHeroMode(prev => (prev === 'new' ? 'legacy' : 'new'));
    }, 6000);
    return () => clearInterval(cycleInterval);
  }, []);

  useEffect(() => {
    const pool = products.filter(p =>
      heroMode === 'new' ? !p.isLegacy : p.isLegacy
    );
    const pickRandom = () => {
      const ids: number[] = [];
      const available = [...pool];
      for (let i = 0; i < 4 && available.length > 0; i++) {
        const idx = Math.floor(Math.random() * available.length);
        ids.push(available[idx].id);
        available.splice(idx, 1);
      }
      return ids;
    };
    setFloatingImages(pickRandom());
    const interval = setInterval(() => {
      setFloatingImages(pickRandom());
    }, 3000);
    return () => clearInterval(interval);
  }, [heroMode]);

  return (
    <div className="min-h-screen">
      {/* Hero Section — Magazine Split Layout */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-sobaka-bg">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M30 30c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0 0c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }} />

        {/* Glow blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-sobaka-orange/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sobaka-green/10 rounded-full blur-3xl pointer-events-none" />

        {/* Split Grid */}
        <div className="relative z-10 container-max section-padding pt-12 lg:pt-20 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT — Typography & Story */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-mono font-bold leading-[0.85] tracking-tight mb-8"
            >
              <span className="block text-[18vw] lg:text-[12vw] xl:text-[10rem] gradient-text">
                SOBAKA
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="max-w-xl"
            >
              <p className="text-white text-xl md:text-2xl leading-snug mb-4 font-medium">
                Made in Sri Lanka.
              </p>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-10">
                Teas, spices, and naturals. Grown with care, made to last.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center gap-2 bg-sobaka-orange text-sobaka-bg px-7 py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-sobaka-orange/90 transition-all"
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 text-white text-sm uppercase tracking-wider font-semibold border-b-2 border-transparent hover:border-sobaka-green pb-1 transition-all"
                >
                  Explore Collection
                </button>
              </div>
            </motion.div>

            {/* Stats Strip */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 grid grid-cols-3 gap-6 max-w-lg border-t border-white/10 pt-8"
            >
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sobaka-orange">100%</div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Natural</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-sobaka-green">2023</div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Established</div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Asymmetric Product Grid */}
          <div className="lg:col-span-5 relative min-h-[600px] hidden lg:block">
            <motion.div
              style={{ y: gridY1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute top-0 right-0 w-[55%] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img src={`/images/${floatingImages[0]}.png`} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-sobaka-bg/60 to-transparent" />
            </motion.div>

            <motion.div
              style={{ y: gridY2 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="absolute top-16 left-0 w-[42%] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img src={`/images/${floatingImages[1]}.png`} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-sobaka-orange/30 to-transparent mix-blend-overlay" />
            </motion.div>

            <motion.div
              style={{ y: gridY3 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="absolute bottom-0 left-8 w-[48%] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img src={`/images/${floatingImages[2]}.png`} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-sobaka-green/40 to-transparent mix-blend-overlay" />
            </motion.div>

            <motion.div
              style={{ y: gridY4 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="absolute bottom-20 right-4 w-[38%] aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <img src={`/images/${floatingImages[3]}.png`} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tl from-sobaka-bg/70 to-transparent" />
            </motion.div>

            {/* Decorative number */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute -top-4 -left-4 font-mono text-[8rem] font-bold text-white/[0.03] leading-none pointer-events-none select-none"
            >
              01
            </motion.div>

          </div>

          {/* Mobile product preview */}
          <div className="lg:hidden grid grid-cols-2 gap-3">
            {floatingImages.slice(0, 4).map((id, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="aspect-square rounded-xl overflow-hidden border border-white/10"
              >
                <img src={`/images/${id}.png`} alt="" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Horizontal Divider with Tagline */}
        <div className="relative z-10 border-t border-white/10">
          <div className="container-max section-padding py-6 flex items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-semibold whitespace-nowrap">
                Sobaka Products
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-sobaka-orange font-semibold whitespace-nowrap">
              Tea · Spice · Coffee · Baduma · Dehydrated
            </span>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sobaka-bg to-transparent pointer-events-none" />
      </section>

      {/* Marquee Banner */}
      <div className="relative bg-sobaka-orange overflow-hidden border-y border-sobaka-orange">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-sobaka-orange to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-sobaka-orange to-transparent z-10 pointer-events-none" />

        <div className="marquee-container py-4 overflow-hidden">
          <div className="marquee-content flex animate-marquee whitespace-nowrap items-center">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center mx-6">
                <svg className="w-4 h-4 text-sobaka-bg/70 mr-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
                <span className="text-sobaka-bg uppercase text-sm font-black tracking-[0.2em]">
                  {item}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Special Offers */}
      <section id="products" className="py-20 bg-sobaka-bg">
        <div className="container-max section-padding">
          <SectionTitle white="Our" colored="Products" />

          {/* Collection Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10">
              {(['All', 'New', 'Legacy'] as const).map((collection) => (
                <button
                  key={collection}
                  onClick={() => setSelectedCollection(collection)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider transition-all ${
                    selectedCollection === collection
                      ? collection === 'New'
                        ? 'bg-sobaka-green text-sobaka-bg shadow-lg'
                        : collection === 'Legacy'
                        ? 'bg-sobaka-orange text-sobaka-bg shadow-lg'
                        : 'bg-white text-sobaka-bg shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {collection}
                  {collection === 'New' && (
                    <span className="ml-1.5 inline-flex h-2 w-2 rounded-full bg-sobaka-green animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Discount Notice */}
          {(selectedCollection === 'All' || selectedCollection === 'Legacy') && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative overflow-hidden mb-8 rounded-2xl border border-sobaka-orange/30 bg-gradient-to-r from-sobaka-orange/10 via-sobaka-orange/5 to-transparent backdrop-blur-sm"
            >
              {/* Animated shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-sobaka-orange/10 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              <div className="relative flex items-center justify-between gap-4 p-4 md:p-5">
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Animated discount icon */}
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-sobaka-orange/20 border border-sobaka-orange/40"
                  >
                    <Tag className="h-5 w-5 text-sobaka-orange" />
                  </motion.div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold text-sm md:text-base">Legacy Collection Sale</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sobaka-orange text-sobaka-bg text-xs font-bold">
                        <Percent className="h-3 w-3" />
                        10 OFF
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs md:text-sm">
                      All Legacy products discounted for a limited time
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-2 text-sobaka-orange/80">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Limited Time</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm uppercase tracking-wider transition-all ${
                  selectedCategory === category
                    ? 'bg-sobaka-green text-sobaka-bg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div ref={offersRef}>
            {/* New Collection Section */}
            {newProducts.length > 0 && (
              <div className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-3 w-3 rounded-full bg-sobaka-green animate-pulse" />
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      New <span className="text-sobaka-green">Arrivals</span>
                    </h3>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-sobaka-green/40 to-transparent" />
                  <span className="text-xs uppercase tracking-widest text-sobaka-green font-semibold bg-sobaka-green/10 px-3 py-1 rounded-full border border-sobaka-green/30">
                    {newProducts.length} Items
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {newProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isOffersInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} variant="offer" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Legacy Collection Section */}
            {legacyProducts.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-3 w-3 rounded-full bg-sobaka-orange" />
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      Legacy <span className="text-sobaka-orange">Collection</span>
                    </h3>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-sobaka-orange/40 to-transparent" />
                  <span className="text-xs uppercase tracking-widest text-sobaka-orange font-semibold bg-sobaka-orange/10 px-3 py-1 rounded-full border border-sobaka-orange/30">
                    {legacyProducts.length} Items · 10% OFF
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {legacyProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isOffersInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} variant="offer" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {newProducts.length === 0 && legacyProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No products found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Our Picks */}
      <section className="py-20 bg-sobaka-bg">
        <div className="container-max section-padding">
          <SectionTitle white="Our" colored="Picks" subtitle="EST. 2023" />
          <div
            ref={picksRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {ourPicks.map((product, index) => (
              <motion.div
                key={`pick-${product.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isPicksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProductCard product={product} variant="pick" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
