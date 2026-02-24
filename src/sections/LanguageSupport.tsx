import { useEffect, useRef, useState } from 'react';
import { Check, Globe } from 'lucide-react';

interface LanguageCardProps {
  code: string;
  name: string;
  nativeName: string;
  isSelected: boolean;
  onClick: () => void;
  delay: number;
}

const LanguageCard = ({ code, name, nativeName, isSelected, onClick, delay }: LanguageCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
      style={{ transitionDelay: `${delay}ms`, transitionTimingFunction: 'var(--ease-expo-out)' }}
    >
      <button
        onClick={onClick}
        className={`relative w-full p-6 rounded-2xl border-2 transition-all duration-300 ${
          isSelected
            ? 'bg-gradient-to-br from-purple-600 to-pink-600 border-transparent shadow-lg shadow-purple-500/30'
            : 'bg-purple-900/20 border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-900/30'
        }`}
      >
        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <Check className="w-4 h-4 text-purple-600" />
          </div>
        )}

        {/* Language Code Badge */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold mb-4 ${
            isSelected
              ? 'bg-white/20 text-white'
              : 'bg-purple-500/20 text-purple-400'
          }`}
        >
          {code}
        </div>

        {/* Language Names */}
        <div className="text-left">
          <h4
            className={`text-lg font-bold mb-1 ${isSelected ? 'text-white' : 'text-white'}`}
            style={{ fontFamily: 'Exo, sans-serif' }}
          >
            {nativeName}
          </h4>
          <p className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
            {name}
          </p>
        </div>
      </button>
    </div>
  );
};

const LanguageSupport = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ml');
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const languages = [
    { code: 'E', name: 'English', nativeName: 'English', id: 'en' },
    { code: 'മ', name: 'Malayalam', nativeName: 'മലയാളം', id: 'ml' },
    { code: 'ह', name: 'Hindi', nativeName: 'हिन्दी', id: 'hi' },
    { code: 'ا', name: 'Urdu', nativeName: 'اردو', id: 'ur' },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
        >
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6 transition-all duration-500 ${
              headerVisible ? 'scale-100' : 'scale-0'
            }`}
            style={{ transitionDelay: '200ms', transitionTimingFunction: 'var(--ease-elastic)' }}
          >
            <Globe className="w-8 h-8 text-white" />
          </div>

          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'Exo, sans-serif' }}
          >
            Choose Your <span className="gradient-text">Reading Language</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Select your language for stories - you can change it anytime later
          </p>
        </div>

        {/* Language Grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {languages.map((language, index) => (
            <LanguageCard
              key={language.id}
              code={language.code}
              name={language.name}
              nativeName={language.nativeName}
              isSelected={selectedLanguage === language.id}
              onClick={() => setSelectedLanguage(language.id)}
              delay={400 + index * 100}
            />
          ))}
        </div>

        {/* Next Button */}
        <div
          className={`text-center transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
        >
          <button className="btn-primary px-12">
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default LanguageSupport;
