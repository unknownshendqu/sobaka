import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, X, Plus, Minus, Trash2, Menu, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, totalItems, isCartOpen, setIsCartOpen, removeItem, updateQuantity } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
  }, [location.pathname, setIsCartOpen]);

  const navLinks = [
    { path: '/', label: 'Store' },
    { path: '/our-story', label: 'Our Story' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-sobaka-bg/90 backdrop-blur-lg border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container-max section-padding">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Sobaka"
                className="h-10 w-10 lg:h-12 lg:w-12 object-contain rounded-full"
              />
              <span className="font-mono text-lg lg:text-xl font-bold text-white tracking-wider">
                SOBAKA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`uppercase text-sm tracking-wider font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-sobaka-green'
                      : 'text-white hover:text-sobaka-green'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Cart & Mobile Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 bg-sobaka-green text-sobaka-bg px-4 py-2 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all hover:brightness-110"
                aria-label="Open cart"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-sobaka-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-sobaka-bg/95 backdrop-blur-lg border-b border-white/5 overflow-hidden"
            >
              <div className="section-padding py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`uppercase text-sm tracking-wider font-medium py-2 transition-colors ${
                      location.pathname === link.path
                        ? 'text-sobaka-green'
                        : 'text-white hover:text-sobaka-green'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[420px] bg-sobaka-card border-l border-white/5 z-50 flex flex-col"
              role="dialog"
              aria-modal="true"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="text-xl font-bold text-white">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close cart"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart size={48} className="mx-auto text-gray-600 mb-4" />
                    <p className="text-gray-400">Your cart is empty.</p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-gray-400 mb-6">
                      Online payments are not available yet, but coming soon!
                    </p>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 bg-sobaka-bg rounded-lg p-3"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium text-sm truncate">
                              {item.name}
                            </h3>
                            <p className="text-gray-400 text-xs">{item.weight}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="text-white text-sm w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-gray-500 hover:text-red-400 transition-colors"
                                  aria-label="Remove item"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Items</span>
                    <span className="text-white">{totalItems}</span>
                  </div>
                  <button 
                    onClick={() => {
                      const message = items.map(item => 
                        `${item.quantity}x ${item.name} (${item.weight})`
                      ).join('\n');
                      const fullMessage = `Hi Sobaka, I'm interested in ordering:\n\n${message}\n\nPlease provide the final price and more details about these products.`;
                      window.open(`https://wa.me/94771443327?text=${encodeURIComponent(fullMessage)}`, '_blank');
                    }}
                    className="w-full bg-sobaka-green text-sobaka-bg font-semibold py-3 rounded-lg uppercase tracking-wider text-sm transition-all hover:brightness-110 flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    Get Quotation via WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
