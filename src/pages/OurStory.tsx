import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
  { number: '01', label: '100% Natural Products' },
  { number: '02', label: 'No Added Preservatives' },
  { number: '03', label: 'Nutrient Dense & Flavorful' },
];

export default function OurStory() {
  const heroRef = useRef(null);
  const productRef = useRef(null);
  const visionRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isProductInView = useInView(productRef, { once: true, margin: '-100px' });
  const isVisionInView = useInView(visionRef, { once: true, margin: '-100px' });

  return (
    <div className="min-h-screen bg-sobaka-bg pt-20">
      {/* Hero */}
      <section ref={heroRef} className="py-20 text-center">
        <div className="container-max section-padding">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-white">Rooted In</span>
            <br />
            <span className="text-sobaka-green">Sri Lanka</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            From the lush tropical gardens to your hands, our journey is one of passion, purity, and preservation.
          </motion.p>
        </div>
      </section>

      {/* The Product */}
      <section ref={productRef} className="py-20">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isProductInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-white">The</span>{' '}
                <span className="text-sobaka-orange">Product</span>
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Sobaka is a sustainable brand specializing in high quality Sri Lankan products including premium teas, natural spices, and traditional food blends. We carefully select fresh, locally sourced ingredients from Sri Lanka and use traditional processing techniques to preserve natural flavor, color, and nutritional value without artificial preservatives or additives.
                </p>
                <p>
                  Our process extends shelf life while maintaining the goodness of farm fresh ingredients, making our products convenient, healthy, and perfect for modern lifestyles. From everyday cooking to healthy living, Sobaka delivers natural solutions you can trust.
                </p>
                <p>
                  Driven by eco friendly practices, we support local farmers and promote responsible processing that reduces waste and protects the environment. At Sobaka, we turn fresh harvests into long lasting, nutritious products naturally.
                </p>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-4 mt-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.number}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isProductInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 bg-sobaka-card rounded-full px-4 py-2 border border-white/5"
                  >
                    <span className="w-8 h-8 rounded-full bg-sobaka-green/20 text-sobaka-green flex items-center justify-center text-sm font-bold">
                      {feature.number}
                    </span>
                    <span className="text-white text-sm font-medium">{feature.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isProductInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-full overflow-hidden border-4 border-sobaka-green/20 flex items-center justify-center bg-sobaka-card">
                <img
                  src="/images/favicon.png"
                  alt="Sobaka Logo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section ref={visionRef} className="py-20">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="bg-sobaka-card rounded-xl p-8 border border-white/5 border-l-4 border-l-sobaka-green"
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-white">Our</span>{' '}
                <span className="text-sobaka-green">Vision</span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                To become Sri Lanka's most trusted brand for natural, chemical free products and a leader in sustainable value added agriculture.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-sobaka-card rounded-xl p-8 border border-white/5 border-l-4 border-l-sobaka-orange"
            >
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-white">Our</span>{' '}
                <span className="text-sobaka-orange">Mission</span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                To produce premium quality, healthy, preservative free products using locally sourced raw materials, while supporting rural farmers and promoting healthier eating habits.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Join Our Journey CTA */}
      <section className="py-20 text-center">
        <div className="container-max section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/contact" className="btn-primary inline-block">
              Join Our Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
