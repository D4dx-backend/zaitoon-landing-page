import { useEffect, useRef, useState } from 'react';
import { MdInsights, MdMenuBook, MdOutlineExtension, MdVerifiedUser } from 'react-icons/md';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  gradient: string;
}

const FeatureCard = ({ icon, title, description, delay, gradient }: FeatureCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'var(--ease-expo-out)',
      }}
    >
      <div
        className="relative h-full p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-purple-900/45 to-purple-800/20 border border-purple-500/25 backdrop-blur-md transition-all duration-300 overflow-hidden group-hover:-translate-y-1.5 group-hover:border-purple-400/40 group-hover:shadow-[0_22px_40px_rgba(124,58,237,0.24)]"
      >
        <div
          className="absolute inset-x-0 top-0 h-24 opacity-60"
          style={{
            background: `radial-gradient(60% 100% at 50% 0%, rgba(255,255,255,0.2), transparent 70%), linear-gradient(135deg, ${gradient})`,
          }}
        />

        <div
          className="relative z-10 w-14 h-14 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-sm flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-105"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 20px rgba(0,0,0,0.18)' }}
        >
          {icon}
        </div>

        <h3
          className="relative z-10 text-2xl font-bold text-white mb-3"
          style={{ fontFamily: 'Exo, sans-serif' }}
        >
          {title}
        </h3>

        <p className="relative z-10 text-gray-300/90 leading-relaxed mb-5">{description}</p>

        <div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(140deg, rgba(255,255,255,0.08), transparent 45%, transparent 100%)`,
          }}
        />

        <div className="absolute -bottom-10 -right-10 w-28 h-28 rounded-full bg-purple-500/20 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
      </div>
    </div>
  );
};

const Features = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <MdOutlineExtension className="w-8 h-8 text-white" />,
      title: 'Interactive Learning',
      description:
        'Children learn through quizzes, puzzles, and activity-driven lessons designed for better retention.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: <MdVerifiedUser className="w-8 h-8 text-white" />,
      title: 'Safe Kid-Friendly Content',
      description:
        'Age-appropriate stories and shows curated to help families build a healthy viewing routine.',
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      icon: <MdInsights className="w-8 h-8 text-white" />,
      title: 'Progress Tracking',
      description:
        'Parents and admins can monitor participation, attempts, and growth through structured activity data.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: <MdMenuBook className="w-8 h-8 text-white" />,
      title: 'Multiformat Library',
      description:
        'Watch, read, and play in one place with videos, stories, bright box modules, and quizzes.',
      gradient: 'from-orange-500 to-yellow-500',
    },
  ];

  return (
    <section id="features" className="relative py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-pink-600/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/25 text-purple-300 text-xs font-semibold tracking-wide uppercase mb-4">
            Why Zaitoon
          </span>
          <h2
            className="text-3xl sm:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'Exo, sans-serif' }}
          >
            Powerful Features for{' '}
            <span className="gradient-text">Growing Minds</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Built to engage children, support parents, and simplify educational management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={400 + index * 150}
              gradient={feature.gradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
