import { useEffect, useRef, useState } from 'react';
import { FaApple, FaCheck, FaCopy, FaGooglePlay, FaRocket } from 'react-icons/fa';
import { media1, media2, media3, media4, media5, upi1, zDonate } from '../assets/media';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const upiId = 'vyapar.176971524101@hdfcbank';

  const copyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-purple-800/20 to-pink-900/30" />
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"
          style={{ animation: 'floating 8s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-pink-600/20 blur-3xl"
          style={{ animation: 'floating 6s ease-in-out infinite', animationDelay: '2s' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-medium">
                <FaRocket className="w-4 h-4" />
                Support Zaitoon Mission
              </span>
            </div>

            {/* Headline */}
            <h2
              className={`text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight transition-all duration-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: '400ms', transitionTimingFunction: 'var(--ease-expo-out)', fontFamily: 'Exo, sans-serif' }}
            >
              Help Us Create More{' '}
              <span className="gradient-text">Stories & Shows</span>
            </h2>

            {/* Description */}
            <p
              className={`text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '600ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
            >
              Your support helps us produce better educational content, maintain the platform,
              and keep quality learning experiences available to every child.
            </p>

            {/* Download Buttons */}
            <div
              className={`flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '800ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
            >
              <a
                href="https://apps.apple.com/in/app/zai-toon-kids/id6737912105"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center gap-3 px-5 sm:px-6 py-4 rounded-2xl bg-white text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20"
              >
                <FaApple className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xs text-gray-600">Download from</div>
                  <div className="text-lg font-bold leading-tight">App Store</div>
                </div>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=co.d4dx.zaitoon&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center gap-3 px-5 sm:px-6 py-4 rounded-2xl bg-white text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20"
              >
                <FaGooglePlay className="w-7 h-7" />
                <div className="text-left">
                  <div className="text-xs text-gray-600">Download from</div>
                  <div className="text-lg font-bold leading-tight">Play Store</div>
                </div>
              </a>
            </div>

            {/* Trust Indicators */}
            <div
              className={`flex flex-wrap items-center gap-4 sm:gap-6 pt-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '1000ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
            >
              <div className="flex -space-x-3">
                {[media2, media3, media4, media5].map((avatar, i) => (
                  <div
                    key={i + 1}
                    className="w-10 h-10 rounded-full border-2 border-[#0f0518] overflow-hidden"
                  >
                    <img
                      src={avatar}
                      alt={`User ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="text-white font-bold">50,000+</div>
                <div className="text-sm text-gray-400">Happy Families</div>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div
            className={`relative hidden lg:block transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
            style={{ transitionDelay: '400ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            <div className="relative flex justify-center">
              {/* Phone */}
              <div
                className="relative w-72 floating"
                style={{ perspective: '1000px' }}
              >
                <div
                  className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-800 bg-gray-900"
                  style={{
                    transform: 'rotateY(-10deg) rotateX(5deg)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src={media1}
                    alt="Zaitoon App"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-8 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-[4rem] blur-3xl -z-10" />
              </div>

              {/* Floating Elements */}
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-3xl border border-purple-500/30 bg-purple-950/40 p-5 sm:p-8">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wide mb-4">
                Support Us
              </span>

              <h3 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4" style={{ fontFamily: 'Exo, sans-serif' }}>
                Support This <span className="gradient-text">Noble Cause</span>
              </h3>

              <p className="text-gray-300 leading-relaxed mb-6">
                Your Support helps us maintain and improve the app, add new languages,
                and reach more Muslims worldwide. Every contribution, no matter how small,
                makes a difference.
              </p>

              <div className="rounded-2xl border border-purple-500/30 bg-purple-900/25 p-4 sm:p-5">
                <p className="text-xs text-purple-300 uppercase tracking-wide font-semibold mb-2">Razorpay Payment</p>
                <h4 className="text-xl font-bold text-white mb-2">Quick support via gateway</h4>
                <p className="text-sm text-gray-300 mb-4">Use Razorpay for fast and secure online payment.</p>
                <a
                  href="https://pages.razorpay.com/zaitoon-kids"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/35"
                >
                  Donate Now
                </a>
                <p className="text-xs text-gray-400 mt-3">Secure payment gateway</p>
              </div>

              <div className="mt-4 rounded-2xl overflow-hidden border border-purple-500/20">
                <img src={zDonate} alt="Donate visual" className="w-full h-auto block" />
              </div>
            </div>

            <div className="rounded-2xl border border-purple-500/30 bg-purple-900/20 p-4 sm:p-5">
              <p className="text-xs text-purple-300 uppercase tracking-wide font-semibold mb-1">Direct UPI & Bank</p>
              <h4 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Exo, sans-serif' }}>
                Scan QR or transfer directly
              </h4>

              <div className="rounded-2xl border border-purple-500/25 bg-black/20 p-4 mb-4">
                <img src={upi1} alt="UPI QR Code – D4DX INNOVATIONS LLP" className="w-full max-w-[220px] mx-auto rounded-xl" />
                <p className="text-sm text-gray-300 text-center mt-3">UPI QR Code – D4DX INNOVATIONS LLP</p>
                <p className="text-xs text-gray-400 text-center mt-1">Open any UPI app, tap Scan QR, and donate</p>
              </div>

              <div className="flex items-center justify-between gap-2 rounded-xl border border-purple-500/25 bg-purple-950/40 px-3 py-2 mb-3">
                <span className="text-sm text-gray-200 break-all">{upiId}</span>
                <button
                  type="button"
                  onClick={copyUpiId}
                  className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-purple-300 hover:text-white"
                >
                  {copied ? <FaCheck className="w-3.5 h-3.5" /> : <FaCopy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="rounded-xl border border-purple-500/20 overflow-hidden">
                <div className="grid grid-cols-2 text-sm">
                  <div className="px-3 py-2 bg-purple-950/30 text-gray-300">Account Name</div>
                  <div className="px-3 py-2 bg-purple-950/15 text-white font-medium">D4DX INNOVATIONS LLP</div>
                  <div className="px-3 py-2 bg-purple-950/30 text-gray-300">TID</div>
                  <div className="px-3 py-2 bg-purple-950/15 text-white font-medium">82182968</div>
                  <div className="px-3 py-2 bg-purple-950/30 text-gray-300">Bank</div>
                  <div className="px-3 py-2 bg-purple-950/15 text-white font-medium">HDFC SmartHub Vyapar</div>
                </div>
              </div>

              <div className="rounded-xl border border-purple-500/20 overflow-hidden mt-3">
                <div className="grid grid-cols-2 text-sm">
                  <div className="px-3 py-2 bg-purple-950/30 text-gray-300">Account Name</div>
                  <div className="px-3 py-2 bg-purple-950/15 text-white font-medium">D4DX INNOVATIONS LLP</div>
                  <div className="px-3 py-2 bg-purple-950/30 text-gray-300">Account number</div>
                  <div className="px-3 py-2 bg-purple-950/15 text-white font-medium">50200102639272</div>
                  <div className="px-3 py-2 bg-purple-950/30 text-gray-300">IFSC code</div>
                  <div className="px-3 py-2 bg-purple-950/15 text-white font-medium">HDFC0002811</div>
                  <div className="px-3 py-2 bg-purple-950/30 text-gray-300">Branch</div>
                  <div className="px-3 py-2 bg-purple-950/15 text-white font-medium">CIVIL STATION</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
