import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-sobaka-bg pt-20">
      <section className="py-12 md:py-20">
        <div className="container-max section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/5 flex items-center justify-center bg-sobaka-card max-w-md mx-auto">
                <img
                  src="/images/logo.png"
                  alt="Sobaka Logo"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Right - Contact Info & Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                CONTACT
              </h1>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Have a question, a comment, a very good idea or a complaint? We'd love to hear from you! Reach out to us via this form.
              </p>

              {/* Email */}
              <div className="space-y-2 mb-8">
                <a
                  href="mailto:sobakaproducts@gmail.com"
                  className="text-sobaka-orange text-xl font-medium hover:underline block"
                >
                  SOBAKAPRODUCTS@GMAIL.COM
                </a>
                <a
                  href="mailto:sobakatea@gmail.com"
                  className="text-sobaka-green text-lg font-medium hover:underline block"
                >
                  SOBAKATEA@GMAIL.COM (Tea Inquiries)
                </a>
              </div>

              {/* Address */}
              <div className="text-white mb-8">
                <p className="font-semibold mb-2">Sobaka</p>
                <p className="text-gray-400 leading-relaxed">
                  Kapurukolamulla<br />
                  Bengamuwa
                </p>
              </div>

              {/* WhatsApp */}
              <div className="space-y-3 mb-8">
                <a
                  href="https://wa.me/94771443327"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sobaka-green text-sobaka-bg font-semibold px-6 py-3 rounded-lg uppercase tracking-wider text-sm transition-all hover:brightness-110"
                >
                  <Phone size={18} />
                  +94 77 144 3327
                </a>
                <a
                  href="https://wa.me/94774103388"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sobaka-green text-sobaka-bg font-semibold px-6 py-3 rounded-lg uppercase tracking-wider text-sm transition-all hover:brightness-110"
                >
                  <Phone size={18} />
                  +94 77 410 3388
                </a>
              </div>


              {/* Form */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-sobaka-green/10 border border-sobaka-green/30 rounded-xl p-6 text-center"
                >
                  <p className="text-sobaka-green font-semibold text-lg">
                    Thank you for reaching out!
                  </p>
                  <p className="text-gray-400 mt-2">
                    We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Name *"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-dark w-full"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Message *"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-dark w-full resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sobaka-orange hover:bg-sobaka-orange-dark text-white font-semibold py-3 rounded-lg uppercase tracking-wider text-sm transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send to Sobaka'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
