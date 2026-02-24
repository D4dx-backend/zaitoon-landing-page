import { useEffect, useRef, useState } from 'react';
import { FaArrowRightLong, FaHeart } from 'react-icons/fa6';
import { media1, media2 } from '../assets/media';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }

    const particles: Particle[] = [];
    const colors = ['#7c3aed', '#a78bfa', '#ec4899', '#06b6d4'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      frameCount++;
      if (frameCount % 2 !== 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();

        // Draw connections
        if (i % 3 === 0) {
          particles.slice(i + 1, i + 4).forEach((other) => {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = particle.color;
              ctx.globalAlpha = (1 - distance / 100) * 0.2;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          });
        }
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-24 sm:pt-28">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10"
        style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1.5s ease' }}
      />

      {/* Gradient Orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl z-0"
        style={{
          background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
          animation: 'floating 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl z-0"
        style={{
          background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
          animation: 'floating 6s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-20 blur-3xl z-0"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
          animation: 'floating 7s ease-in-out infinite',
          animationDelay: '1s',
        }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Tagline */}
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '600ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                Learn • Watch • Grow
              </span>
            </div>

            {/* Main Title */}
            <h1
              className={`text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: '800ms', transitionTimingFunction: 'var(--ease-expo-out)', fontFamily: 'Exo, sans-serif' }}
            >
              Welcome to{' '}
              <span className="gradient-text">Zaitoon</span>
            </h1>

            {/* Description */}
            <p
              className={`text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed transition-all duration-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '1000ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
            >
              A joyful learning platform where kids discover values, stories, and creativity 
              through shows, games, and interactive experiences.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '1200ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
            >
              <button
                onClick={() => scrollToSection('#content')}
                className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2 group"
              >
                Explore Popular Content
                <FaArrowRightLong className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollToSection('#cta')}
                className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <FaHeart className="w-5 h-5" />
                Support the Mission
              </button>
            </div>

            {/* Quick Stats */}
            <div
              className={`grid grid-cols-3 gap-4 sm:gap-8 pt-2 sm:pt-4 transition-all duration-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '1400ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
            >
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold text-white">1000+</div>
                <div className="text-xs sm:text-sm text-gray-500">Stories</div>
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold text-white">50K+</div>
                <div className="text-xs sm:text-sm text-gray-500">Downloads</div>
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold text-white">4.9</div>
                <div className="text-xs sm:text-sm text-gray-500">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockups */}
          <div
            className={`relative hidden lg:block transition-all duration-1400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
            }`}
            style={{ transitionDelay: '600ms', transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            <div className="relative w-full h-[600px]" style={{ perspective: '1500px' }}>
              {/* Phone 1 */}
              <div
                className="absolute top-0 left-10 w-64 floating"
                style={{
                  transform: 'rotateY(-5deg) rotateX(5deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-800 bg-gray-900">
                  <img
                    src={media1}
                    alt="Zaitoon App Screen 1"
                    className="w-full h-auto"
                  />
                  {/* Screen Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                </div>
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-purple-500/20 rounded-[3rem] blur-2xl -z-10" />
              </div>

              {/* Phone 2 */}
              <div
                className="absolute top-20 right-0 w-64 floating-delayed"
                style={{
                  transform: 'rotateY(5deg) rotateX(-5deg)',
                  transformStyle: 'preserve-3d',
                  animationDelay: '1s',
                }}
              >
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-gray-800 bg-gray-900">
                  <img
                    src={media2}
                    alt="Zaitoon App Screen 2"
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                </div>
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-pink-500/20 rounded-[3rem] blur-2xl -z-10" />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0518] to-transparent z-30" />
    </section>
  );
};

export default Hero;
