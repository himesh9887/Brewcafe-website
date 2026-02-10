import React, { useEffect, useRef, useState } from 'react';
import { Coffee, ChevronDown, Sparkles, Star, ArrowRight } from 'lucide-react';

const MenuHero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const scrollToMenu = () => {
    const menuSection = document.getElementById('menu-grid');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { value: '50+', label: 'Menu Items' },
    { value: '4.9', label: 'Avg Rating' },
    { value: '100%', label: 'Fresh Daily' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#16213e]"
    >
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
            rgba(212,175,55,0.3) 0%, 
            rgba(212,175,55,0.1) 30%, 
            transparent 70%)`,
        }}
      />

      {/* Floating coffee beans decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-[#d4af37]/10 animate-float-slow"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `rotate(${i * 45}deg)`,
            }}
          >
            <Coffee size={40 + i * 10} />
          </div>
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div 
          className={`inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/30 
                     rounded-full px-4 py-2 mb-6 sm:mb-8 transition-all duration-1000
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
        >
          <Sparkles className="text-[#d4af37]" size={16} />
          <span className="text-[#d4af37] text-sm font-medium">Artisanal & Handcrafted</span>
        </div>

        {/* Main Icon with animation */}
        <div 
          className={`relative inline-block mb-6 sm:mb-8 transition-all duration-1000 delay-200
                     ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        >
          <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-3xl opacity-20 animate-pulse-slow" />
          <div className="relative p-4 sm:p-6 bg-[#1a1a2e] rounded-2xl border border-[#d4af37]/20 
                        shadow-[0_0_40px_rgba(212,175,55,0.15)]">
            <Coffee 
              className="text-[#d4af37] animate-float-gentle" 
              size={48} 
              strokeWidth={1.5}
            />
          </div>
          {/* Orbiting stars */}
          <Star 
            className="absolute -top-2 -right-2 text-[#d4af37] fill-current animate-pulse" 
            size={16} 
          />
          <Star 
            className="absolute -bottom-1 -left-3 text-[#fde047] fill-current animate-pulse delay-300" 
            size={12} 
          />
        </div>

        {/* Heading */}
        <h1 
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight
                     transition-all duration-1000 delay-300
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="bg-gradient-to-r from-[#d4af37] via-[#fde047] to-[#d4af37] bg-clip-text text-transparent
                         animate-gradient-x bg-[length:200%_auto]">
            Our Menu
          </span>
        </h1>

        {/* Description */}
        <p 
          className={`text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed
                     transition-all duration-1000 delay-400
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Carefully curated selection of premium coffees, teas, and pastries. 
          Every item is crafted with passion and precision by our expert baristas.
        </p>

        {/* Stats */}
        <div 
          className={`flex justify-center gap-6 sm:gap-10 mb-10 sm:mb-12
                     transition-all duration-1000 delay-500
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group cursor-default">
              <div className="text-2xl sm:text-3xl font-bold text-[#d4af37] group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div 
          className={`transition-all duration-1000 delay-600
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <button 
            onClick={scrollToMenu}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#d4af37] text-[#1a1a2e] 
                     rounded-full font-semibold hover:bg-[#fde047] hover:scale-105 
                     hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300"
          >
            Explore Menu
            <ArrowRight 
              size={20} 
              className="transition-transform duration-300 group-hover:translate-x-1" 
            />
          </button>
        </div>

        {/* Scroll indicator */}
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2
                     transition-all duration-1000 delay-700
                     ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <button 
            onClick={scrollToMenu}
            className="flex flex-col items-center gap-2 text-gray-500 hover:text-[#d4af37] transition-colors"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown className="animate-bounce" size={24} />
          </button>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="#0f0f1e"
          />
        </svg>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-gentle {
          animation: float-gentle 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default MenuHero;