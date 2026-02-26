import { useEffect, useRef, useState } from 'react';
import { Download, User, BookOpen, Trophy, Apple, Play } from 'lucide-react';

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  isLeft: boolean;
}

const Step = ({ number, icon, title, description, delay, isLeft }: StepProps) => {
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
        className={`relative flex items-center gap-5 sm:gap-8 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col`}
    >
      {/* Content Card */}
      <div
        className={`flex-1 transition-all duration-700 ${
          isVisible
            ? 'opacity-100 translate-x-0'
            : `opacity-0 ${isLeft ? '-translate-x-20' : 'translate-x-20'}`
        }`}
        style={{ transitionDelay: `${delay}ms`, transitionTimingFunction: 'var(--ease-expo-out)' }}
      >
        <div className="relative p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-500/20 backdrop-blur-sm group hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-2">
          {/* Step Number */}
          <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/30">
            {number}
          </div>

          {/* Icon */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110">
            {icon}
          </div>

          {/* Title */}
          <h3
            className="text-xl font-bold text-white mb-3"
            style={{ fontFamily: 'Exo, sans-serif' }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-400">{description}</p>

          {/* Store Buttons for Step 1 */}
          {number === 1 && (
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a
                href="https://apps.apple.com/in/app/zai-toon-kids/id6737912105"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-300"
              >
                <Apple className="w-5 h-5 text-white" />
                <span className="text-sm text-white">App Store</span>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=co.d4dx.zaitoon&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-300"
              >
                <Play className="w-5 h-5 text-white" />
                <span className="text-sm text-white">Play Store</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Center Dot */}
      <div
        className={`hidden md:flex w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 items-center justify-center z-10 transition-all duration-500 ${
          isVisible ? 'scale-100' : 'scale-0'
        }`}
        style={{ transitionDelay: `${delay + 200}ms`, transitionTimingFunction: 'var(--ease-elastic)' }}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>

      {/* Spacer for alternating layout */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
};

const HowItWorks = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
        const progress = Math.min(
          1,
          Math.max(0, (windowHeight - sectionTop) / (windowHeight + sectionHeight * 0.5))
        );
        setLineProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      icon: <Download className="w-7 h-7 text-purple-400" />,
      title: 'Download the App',
      description: 'Available on App Store and Google Play. Get started in seconds.',
    },
    {
      icon: <User className="w-7 h-7 text-purple-400" />,
      title: 'Create a Profile',
      description: 'Set up your child\'s age and preferences for personalized content.',
    },
    {
      icon: <BookOpen className="w-7 h-7 text-purple-400" />,
      title: 'Choose Content',
      description: 'Browse thousands of stories, videos, and games tailored for your child.',
    },
    {
      icon: <Trophy className="w-7 h-7 text-purple-400" />,
      title: 'Start Learning',
      description: 'Track progress, earn rewards, and watch your child grow.',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
        >
          <h2
            className="text-3xl sm:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'Exo, sans-serif' }}
          >
            How <span className="gradient-text">Zaitoon</span> Works
          </h2>
          <p className="text-lg text-gray-400">
            Get started in four simple steps and unlock a world of learning
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden md:block">
            {/* Background Line */}
            <div className="absolute inset-0 bg-purple-500/20 rounded-full" />
            {/* Progress Line */}
            <div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full transition-all duration-300"
              style={{ height: `${lineProgress * 100}%` }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <Step
                key={step.title}
                number={index + 1}
                icon={step.icon}
                title={step.title}
                description={step.description}
                delay={300 + index * 200}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
