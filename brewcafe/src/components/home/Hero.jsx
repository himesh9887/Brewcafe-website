import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee } from 'lucide-react';
import Button from '../common/Button';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
    
    // Optional: Intersection Observer for scroll-triggered re-animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: '15+', label: 'Coffee Varieties' },
    { value: '50K+', label: 'Happy Customers' },
    { value: '10+', label: 'Years Experience' },
    { value: '4.9', label: 'Average Rating' },
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark"
    >
      {/* Animated Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/95 via-[#1a1a2e]/85 to-[#0f0f1e] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1920&h=1080&fit=crop"
          alt="Coffee Background"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        {/* Floating particles effect */}
        <div className="absolute inset-0 z-20 opacity-30">
          <div className="absolute top-20 left-10 w-2 h-2 bg-accent rounded-full animate-float-slow" />
          <div className="absolute top-40 right-20 w-3 h-3 bg-accent/50 rounded-full animate-float-medium" />
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-secondary/50 rounded-full animate-float-fast" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge with hover */}
        <div 
          className={`inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/30 
                     rounded-full px-4 py-2 mb-8 transition-all duration-700 hover:bg-[#d4af37]/20 
                     hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <Coffee size={16} className="text-[#d4af37] animate-pulse-slow" />
          <span className="text-[#d4af37] text-sm font-medium">Premium Coffee Experience</span>
        </div>

        {/* Main Heading with staggered animation */}
        <h1 
          className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight 
                     transition-all duration-1000 delay-100
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="block text-[#f5f5dc] mb-2">Fresh Coffee,</span>
          <span className="block bg-gradient-to-r from-[#d4af37] to-[#fde047] bg-clip-text text-transparent
                         hover:from-[#fde047] hover:to-[#d4af37] transition-all duration-500">
            Fresh Mood
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className={`text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto 
                     transition-all duration-1000 delay-200 leading-relaxed
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          Discover the art of perfect brewing. From single-origin beans to artisanal blends, 
          every cup tells a story of passion and precision.
        </p>

        {/* CTA Buttons with hover effects */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center 
                     transition-all duration-1000 delay-300
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <Link to="/menu" className="w-full sm:w-auto group">
            <Button 
              className="w-full sm:w-auto text-lg px-8 py-4 bg-[#d4af37] text-[#1a1a2e] 
                       hover:bg-[#fde047] hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]
                       transition-all duration-300 group-hover:gap-3"
            >
              Order Now
              <ArrowRight 
                size={20} 
                className="transition-transform duration-300 group-hover:translate-x-1" 
              />
            </Button>
          </Link>
          
          <Link to="/booking" className="w-full sm:w-auto group">
            <Button 
              variant="secondary" 
              className="w-full sm:w-auto text-lg px-8 py-4 border-2 border-[#f5f5dc] text-[#f5f5dc]
                       hover:bg-[#f5f5dc] hover:text-[#1a1a2e] hover:scale-105
                       transition-all duration-300"
            >
              Book Table
            </Button>
          </Link>
        </div>

        {/* Stats with hover effects */}
        <div 
          className={`mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto 
                     transition-all duration-1000 delay-500
                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="group text-center p-4 rounded-xl bg-[#16213e]/50 backdrop-blur-sm
                       border border-transparent hover:border-[#d4af37]/30 
                       hover:bg-[#16213e] hover:scale-105 hover:-translate-y-1
                       transition-all duration-300 cursor-default"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#d4af37] mb-1 
                            group-hover:text-[#fde047] transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 
                            transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <div className="w-6 h-10 border-2 border-[#f5f5dc]/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-[#d4af37] rounded-full animate-scroll-down" />
        </div>
      </div>

      {/* Add these styles to your index.css or style tag */}
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes scroll-down {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-out forwards;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-scroll-down {
          animation: scroll-down 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;