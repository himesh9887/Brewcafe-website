import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Sparkles } from 'lucide-react';
import Button from '../common/Button';

const CallToAction = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse move effect for background
  const handleMouseMove = (e) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-[#1a1a2e] overflow-hidden cursor-default"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212,175,55,0.4) 1px, transparent 0)',
            backgroundSize: '40px 40px',
            transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)`,
          }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 sm:top-20 sm:left-20 animate-float-slow opacity-30">
        <Coffee size={40} className="text-[#d4af37]" />
      </div>
      <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 animate-float-medium opacity-30">
        <Sparkles size={32} className="text-[#d4af37]" />
      </div>
      
      {/* Animated gradient orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#d4af37]/10 rounded-full blur-3xl 
                   animate-pulse-slow mix-blend-screen"
        style={{
          transform: `translate(${(mousePosition.x - 0.5) * 50}px, ${(mousePosition.y - 0.5) * 50}px)`,
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-[#d4af37]/5 rounded-full blur-3xl 
                   animate-pulse-slow delay-1000 mix-blend-screen"
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Badge */}
        <div 
          className={`inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/30 
                     rounded-full px-4 py-2 mb-6 sm:mb-8 transition-all duration-700
                     hover:bg-[#d4af37]/20 hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <Sparkles size={16} className="text-[#d4af37] animate-pulse" />
          <span className="text-[#d4af37] text-sm font-medium">Limited Time Offer</span>
        </div>

        {/* Heading with animation */}
        <h2 
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-[#f5f5dc] 
                     leading-tight transition-all duration-1000 delay-100
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Ready to Experience the{' '}
          <span className="bg-gradient-to-r from-[#d4af37] to-[#fde047] bg-clip-text text-transparent 
                         hover:from-[#fde047] hover:to-[#d4af37] transition-all duration-500 inline-block">
            Perfect Brew?
          </span>
        </h2>

        {/* Description */}
        <p 
          className={`text-gray-400 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed
                     transition-all duration-1000 delay-200
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Whether you are looking for a quick caffeine fix or a cozy spot to work, 
          BrewCafe has you covered. Order online or book your table today.
        </p>

        {/* CTA Buttons with enhanced hover */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center
                     transition-all duration-1000 delay-300
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <Link to="/menu" className="w-full sm:w-auto group">
            <Button 
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-[#d4af37] text-[#1a1a2e]
                       hover:bg-[#fde047] hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]
                       transition-all duration-300 group relative overflow-hidden"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                             -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                Order Online
                <ArrowRight 
                  size={20} 
                  className="transition-transform duration-300 group-hover:translate-x-1" 
                />
              </span>
            </Button>
          </Link>

          <Link to="/booking" className="w-full sm:w-auto group">
            <Button 
              variant="secondary" 
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 
                       border-2 border-[#f5f5dc] text-[#f5f5dc]
                       hover:bg-[#f5f5dc] hover:text-[#1a1a2e] hover:scale-105
                       hover:shadow-[0_0_20px_rgba(245,245,220,0.2)]
                       transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative flex items-center gap-2">
                Reserve Table
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1a1a2e] 
                               group-hover:w-full transition-all duration-300" />
              </span>
            </Button>
          </Link>
        </div>

        {/* Trust badges */}
        <div 
          className={`mt-10 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-8
                     transition-all duration-1000 delay-500
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {[
            { label: 'Free Delivery', sub: 'On orders over $25' },
            { label: '24/7 Support', sub: 'Always here to help' },
            { label: 'Secure Payment', sub: '100% secure checkout' },
          ].map((item, idx) => (
            <div 
              key={idx}
              className="text-center px-4 py-2 group cursor-default"
            >
              <div className="text-[#d4af37] font-semibold text-sm sm:text-base group-hover:scale-110 transition-transform">
                {item.label}
              </div>
              <div className="text-gray-500 text-xs sm:text-sm">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="absolute bottom-0 w-full h-full text-[#0f0f1e] fill-current"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.1,118.92,156.86,79.08,321.39,56.44Z" 
            className="animate-wave"
          />
        </svg>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-wave {
          animation: wave 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CallToAction;