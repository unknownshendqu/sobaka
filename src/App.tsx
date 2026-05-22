import { Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/contexts/CartContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import OurStory from '@/pages/OurStory';
import Contact from '@/pages/Contact';

export default function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </CartProvider>
    </CurrencyProvider>
  );
}
