import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { logo } from '../assets/media';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative pt-16 pb-8 overflow-hidden border-t border-purple-500/20">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-[#130a1f] to-[#10071a]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid md:grid-cols-2 gap-10 lg:gap-16 mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
        >
          <div>
            <a href="#" className="inline-flex items-center mb-5">
              <img src={logo} alt="Zaitoon" className="h-12 w-auto object-contain" />
            </a>
            <p className="text-gray-300 text-base max-w-md leading-relaxed mb-6">
              Empowering kids with meaningful stories, engaging shows, and interactive learning through the Zaitoon platform.
            </p>
          </div>

          <div>
            <h4 className="text-white text-2xl font-bold mb-5" style={{ fontFamily: 'Exo, sans-serif' }}>
              Contact
            </h4>
            <div className="space-y-4 text-gray-300">
              <p className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-0.5 text-cyan-300" />
                <span>info@d4dx.co, mail@d4dx.co</span>
              </p>
              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-cyan-300" />
                <span>
                  D4DX Innovations LLP<br />
                  AMH Tower, First Floor, 63/3965 B,<br />
                  Mavoor Rd, Thiruthiyad, Kozhikode 673004
                </span>
              </p>
              <p className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-0.5 text-cyan-300" />
                <span>+91 98958 04006</span>
              </p>
            </div>
          </div>
        </div>

        <div
          className={`pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
        >
          <div className="text-sm text-gray-400 text-center md:text-left">
            <p>© 2025 Zaitoon Kids. All rights reserved.</p>
            <p>Powered By  <a href="https://d4dx.co/" target="_blank" rel="noopener noreferrer">D4DX Innovations LLP</a></p>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-5 text-sm">
            <a
              href="https://merchant.razorpay.com/policy/PV2XAkNJXKVU7X/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="https://merchant.razorpay.com/policy/PV2XAkNJXKVU7X/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="https://d4dx.co/contacts-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
