import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from 'react-icons/fa';
import { media3, media4, media5 } from '../assets/media';

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  isActive: boolean;
}

const TestimonialCard = ({ name, role, content, rating, avatar, isActive }: TestimonialProps) => {
  return (
    <div
      className={`relative p-8 rounded-3xl bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-500/20 backdrop-blur-sm transition-all duration-500 ${
        isActive
          ? 'opacity-100 scale-100 shadow-xl shadow-purple-500/20'
          : 'opacity-50 scale-95'
      }`}
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
        <FaQuoteLeft className="w-6 h-6 text-white" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar
            key={i}
            className={`w-5 h-5 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-300 leading-relaxed mb-8 text-lg">"{content}"</p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-purple-500/30">
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-white font-bold" style={{ fontFamily: 'Exo, sans-serif' }}>
            {name}
          </h4>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: 'Hasna Keyath.',
      role: 'Parent',
      content:
        'superb ❤️... this app is very useful for children.. they have the ability to read well😍.. the stories in this are very interesting, so children like it very so much ☺️♥️.....',
      rating: 5,
      avatar: media3,
    },
    {
      name: 'Abdul Jabbar.',
      role: 'Parent',
      content:
        'This app is very useful to children. The stories are very funny and develop their moral and mental creativity.',
      rating: 5,
      avatar: media4,
    },
    {
      name: 'Haniya_ag.',
      role: 'Reader',
      content:
        'mann!! this is all I need. this triggered my childhood memories of reading malarvaadi. and as a poocha police and pattaalam paili fan... Im done 😭🤯',
      rating: 5,
      avatar: media5,
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
        >
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: 'Exo, sans-serif' }}
          >
            What <span className="gradient-text">Parents Say</span>
          </h2>
          <p className="text-lg text-gray-400">
            Trusted by families around the world
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div
          className={`relative transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
        >
          {/* Desktop View - All Cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`transition-all duration-500 ${
                  headerVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${400 + index * 150}ms`,
                  transitionTimingFunction: 'var(--ease-expo-out)',
                }}
              >
                <TestimonialCard
                  {...testimonial}
                  isActive={index === activeIndex}
                />
              </div>
            ))}
          </div>

          {/* Mobile View - Single Card with Navigation */}
          <div className="md:hidden">
            <TestimonialCard
              {...testimonials[activeIndex]}
              isActive={true}
            />

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-purple-900/50 border border-purple-500/20 flex items-center justify-center text-white transition-all duration-300 hover:bg-purple-800 hover:border-purple-500/40"
              >
                <FaChevronLeft className="w-6 h-6" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'bg-purple-500 w-8'
                        : 'bg-purple-500/30 hover:bg-purple-500/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-purple-900/50 border border-purple-500/20 flex items-center justify-center text-white transition-all duration-300 hover:bg-purple-800 hover:border-purple-500/40"
              >
                <FaChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
