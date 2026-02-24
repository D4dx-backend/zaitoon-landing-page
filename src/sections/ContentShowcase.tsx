import { useEffect, useRef, useState } from 'react';
import { FaBookOpen } from 'react-icons/fa';
import { media3, media4, media5, media6, media7, media8 } from '../assets/media';

interface ContentCardProps {
  image: string;
  title: string;
  delay: number;
}

const ContentCard = ({ image, title, delay }: ContentCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms`, transitionTimingFunction: 'var(--ease-expo-out)' }}
    >
      <div
        className="relative overflow-hidden rounded-3xl bg-purple-900/20 border border-purple-500/20 transition-all duration-300"
        style={{
          transform: isHovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
          boxShadow: isHovered ? '0 20px 38px rgba(124, 58, 237, 0.24)' : '0 10px 30px rgba(0, 0, 0, 0.2)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-contain"
          />

        </div>
      </div>
    </div>
  );
};

const ContentShowcase = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
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

  const stories = [
    {
      image: media3,
      title: 'The First Fast of Little Yusuf',
    },
    {
      image: media4,
      title: 'The Boy Who Helped a Grandpa',
    },
    {
      image: media5,
      title: 'Freedom Stories',
    },
    {
      image: media6,
      title: 'Mayuram - The Rooster\'s Journey',
    },
    {
      image: media7,
      title: 'Ela - The Elephant\'s Adventure',
    },
    {
      image: media8,
      title: 'Bright Box Stories',
    },
  ];

  return (
    <section id="content" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-pink-600/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
        >
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'Exo, sans-serif' }}
          >
            Popular <span className="gradient-text">Shows & Stories</span>
          </h2>
          <p className="text-lg text-gray-400">
            A curated collection from Zaitoon with clean cards and consistent visuals.
          </p>
        </div>

        <div
          className={`transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <FaBookOpen className="w-4 h-4 text-white" />
            </span>
            All Content
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((item, index) => (
              <ContentCard
                key={item.title}
                image={item.image}
                title={item.title}
                delay={400 + index * 80}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentShowcase;
