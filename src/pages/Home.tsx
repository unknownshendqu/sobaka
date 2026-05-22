import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';

const products = [
  { id: 1, name: 'BOP Special Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', image: '/images/1.png' },
  { id: 2, name: 'Black Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', image: '/images/2.png' },
  { id: 3, name: 'Lemon Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', image: '/images/3.png' },
  { id: 4, name: 'Heen Bovitiya Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', image: '/images/4.png' },
  { id: 5, name: 'BOPF Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', image: '/images/5.png' },
  { id: 6, name: 'Blue Butterfly Pea Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', image: '/images/6.png' },
  { id: 7, name: 'Cinnamon Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', image: '/images/7.png' },
  { id: 8, name: 'Special Blended Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', image: '/images/8.png' },
  { id: 9, name: 'Green Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', image: '/images/9.png' },
  { id: 10, name: 'Hibiscus Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', image: '/images/10.png' },
  { id: 11, name: 'Moringa Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', image: '/images/11.png' },
  { id: 12, name: 'Thebu Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', image: '/images/12.png' },
  { id: 13, name: 'Turmeric Powder', weight: '60g', price: null, originalPrice: null, discount: null, category: 'Spice', image: '/images/13.png' },
  { id: 14, name: 'Pure Cinnamon Sticks', weight: '60g', price: null, originalPrice: null, discount: null, category: 'Spice', image: '/images/14.png' },
  { id: 15, name: 'White Pepper Powder', weight: '60g', price: null, originalPrice: null, discount: null, category: 'Spice', image: '/images/15.png' },
  { id: 16, name: 'Black Pepper Powder', weight: '60g', price: null, originalPrice: null, discount: null, category: 'Spice', image: '/images/16.png' },
  { id: 17, name: 'Black Pepper Seeds', weight: '60g', price: null, originalPrice: null, discount: null, category: 'Spice', image: '/images/17.png' },
  { id: 18, name: 'Ginger Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', image: '/images/18.png' },
  { id: 19, name: 'Umbalakada Naimiris Baduma', weight: '100g', price: null, originalPrice: null, discount: null, category: 'Baduma', image: '/images/19.png' },
  { id: 20, name: 'Naimiris Kaju Baduma', weight: '100g', price: null, originalPrice: null, discount: null, category: 'Baduma', image: '/images/20.png' },
  { id: 21, name: 'Kunisso Naimiris Baduma', weight: '100g', price: null, originalPrice: null, discount: null, category: 'Baduma', image: '/images/21.png' },
  { id: 22, name: 'Karawala Naimiris Baduma', weight: '100g', price: null, originalPrice: null, discount: null, category: 'Baduma', image: '/images/22.png' },
  { id: 23, name: 'Dried Sprats Naimiris Baduma', weight: '100g', price: null, originalPrice: null, discount: null, category: 'Baduma', image: '/images/23.png' },
  { id: 24, name: 'Coffee', weight: '100g', price: null, originalPrice: null, discount: null, category: 'Coffee', image: '/images/24.png' },
  { id: 25, name: 'Cardamom', weight: '60g', price: null, originalPrice: null, discount: null, category: 'Spice', image: '/images/25.png' },
];

const ourPicks = [
  { id: 1, name: 'BOP Special Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', image: '/images/1.png' },
  { id: 2, name: 'Blue Butterfly Pea Tea', weight: '50g', price: null, originalPrice: null, discount: 10, category: 'Tea', image: '/images/6.png' },
  { id: 3, name: 'Pure Cinnamon Sticks', weight: '60g', price: null, originalPrice: null, discount: null, category: 'Spice', image: '/images/14.png' },
  { id: 4, name: 'Cardamom', weight: '60g', price: null, originalPrice: null, discount: null, category: 'Spice', image: '/images/25.png' },
  { id: 5, name: 'Naimiris Kaju Baduma', weight: '100g', price: null, originalPrice: null, discount: null, category: 'Baduma', image: '/images/20.png' },
  { id: 6, name: 'Coffee', weight: '100g', price: null, originalPrice: null, discount: null, category: 'Coffee', image: '/images/24.png' },
  { id: 7, name: 'Turmeric Powder', weight: '60g', price: null, originalPrice: null, discount: null, category: 'Spice', image: '/images/13.png' },
  { id: 8, name: 'Black Pepper Seeds', weight: '60g', price: null, originalPrice: null, discount: null, category: 'Spice', image: '/images/17.png' },
];

const marqueeItems = [
  '100% NATURAL',
  'VEGAN FRIENDLY',
  'MADE IN SRI LANKA',
  'NO ADDED PRESERVATIVES',
  'PREMIUM QUALITY',
];

const categories = ['All', 'Tea', 'Spice', 'Baduma', 'Coffee'];

function ProductCard({ product, variant = 'offer' }: { product: typeof products[0]; variant?: 'offer' | 'pick' }) {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

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
        {product.price !== null && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-500 text-sm line-through">{formatPrice(product.originalPrice)}</span>
            <span className="text-white font-bold text-lg">{formatPrice(product.price)}</span>
          </div>
        )}
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
  const offersRef = useRef(null);
  const picksRef = useRef(null);
  const isOffersInView = useInView(offersRef, { once: true, margin: '-100px' });
  const isPicksInView = useInView(picksRef, { once: true, margin: '-100px' });
  const [selectedCategory, setSelectedCategory] = useState('Tea');
  const [floatingImages, setFloatingImages] = useState([14, 6, 13, 25]);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingImages(prev => {
        const allIds = products.map(p => p.id);
        const newImages = prev.map(() => {
          const randomIndex = Math.floor(Math.random() * allIds.length);
          return allIds[randomIndex];
        });
        return newImages;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sobaka-bg">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M30 30c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0 0c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }} />

        {/* Floating Illustrations */}
        <motion.div 
          className="absolute top-20 left-8 lg:top-24 lg:left-16"
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={`/images/${floatingImages[0]}.png`} alt="" className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-full opacity-80 shadow-lg" />
        </motion.div>
        <motion.div 
          className="absolute top-16 right-8 lg:top-20 lg:right-20"
          animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={`/images/${floatingImages[1]}.png`} alt="" className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-full opacity-80 shadow-lg" />
        </motion.div>
        <motion.div 
          className="absolute bottom-32 left-12 lg:bottom-40 lg:left-24"
          animate={{ y: [0, -25, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={`/images/${floatingImages[2]}.png`} alt="" className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-full opacity-80 shadow-lg" />
        </motion.div>
        <motion.div 
          className="absolute bottom-24 right-12 lg:bottom-32 lg:right-24"
          animate={{ y: [0, -18, 0], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src={`/images/${floatingImages[3]}.png`} alt="" className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-full opacity-80 shadow-lg" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block border-2 border-sobaka-green text-sobaka-green px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-medium mb-8">
              Premium Sri Lankan Products
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-mono text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
          >
            <span className="gradient-text block">SOBAKA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-300 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
          >
            Experience the{' '}
            <span className="underline decoration-sobaka-orange decoration-2 underline-offset-4">true quality</span>{' '}
            of Sri Lankan products.
            <br />
            Preserved{' '}
            <span className="underline decoration-sobaka-green decoration-2 underline-offset-4">naturally</span>
            , just for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/#products" className="btn-primary inline-block">
              Shop Now
            </Link>
          </motion.div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sobaka-bg to-transparent" />
      </section>

      {/* Marquee Banner */}
      <div className="marquee-container bg-sobaka-orange py-3 overflow-hidden">
        <div className="marquee-content flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center mx-4">
              <span className="text-white uppercase text-sm font-bold tracking-wider">{item}</span>
              <span className="text-white mx-4">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <section id="products" className="py-20 bg-sobaka-bg">
        <div className="container-max section-padding">
          <SectionTitle white="Special" colored="Offers" />
          
          {/* Discount Notice */}
          <div className="bg-sobaka-orange/10 border border-sobaka-orange/30 rounded-lg p-4 mb-8 text-center">
            <p className="text-sobaka-orange font-semibold text-sm">
              🍵 All teas are <span className="text-white">10% OFF</span> - Limited time offer!
            </p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
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

          <div
            ref={offersRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isOffersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProductCard product={product} variant="offer" />
              </motion.div>
            ))}
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
