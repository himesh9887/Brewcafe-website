import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Armchair, Zap, ArrowRight, Coffee, Clock, Users, Sparkles } from 'lucide-react';
import Button from '../common/Button';

const MenuCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
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

  const handleMouseMove = (e) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  };

  const features = [
    {
      icon: Wifi,
      title: 'Free WiFi',
      description: 'High-speed 100 Mbps',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      icon: Armchair,
      title: 'Comfort Zone',
      description: 'Ergonomic seating',
      color: 'from-purple-400 to-pink-400',
    },
    {
      icon: Zap,
      title: 'Power Ready',
      description: 'Outlets at every seat',
      color: 'from-yellow-400 to-orange-400',
    },
  ];

  const stats = [
    { value: '100+', label: 'Workspaces' },
    { value: '4.9★', label: 'Rating' },
    { value: '24/7', label: 'Open' },
  ];

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-16 sm:py-20 md:py-24 bg-[#0f0f1e] overflow-hidden"
    >
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(212,175,55,0.15) 0%, transparent 50%)`,
        }}
      />

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 animate-float-slow opacity-20">
        <Coffee size={48} className="text-[#d4af37]" />
      </div>
      <div className="absolute bottom-10 right-10 animate-float-medium opacity-20">
        <Clock size={40} className="text-[#d4af37]" />
      </div>
      <div className="absolute top-1/2 right-20 animate-float-fast opacity-10 hidden lg:block">
        <Users size={60} className="text-[#d4af37]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stats bar */}
        <div className={`flex justify-center gap-8 sm:gap-12 mb-10 sm:mb-12 transition-all duration-1000
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group cursor-default">
              <div className="text-2xl sm:text-3xl font-bold text-[#d4af37] group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main content card */}
        <div className={`relative bg-[#16213e]/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-gray-800
                       hover:border-[#d4af37]/30 transition-all duration-700 shadow-2xl
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
             style={{ transitionDelay: '200ms' }}>
          
          {/* Corner accent */}
          <div className="absolute -top-px -left-px w-20 h-20 overflow-hidden rounded-tl-3xl">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#d4af37] to-transparent opacity-20" />
          </div>

          {/* Badge */}
          <div className={`flex justify-center mb-6 transition-all duration-1000 delay-300
                         ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/30 
                          rounded-full px-4 py-2 hover:bg-[#d4af37]/20 transition-colors cursor-default">
              <Sparkles size={16} className="text-[#d4af37] animate-pulse" />
              <span className="text-[#d4af37] text-sm font-medium">Perfect for Remote Work</span>
            </div>
          </div>

          {/* Heading */}
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-center
                         transition-all duration-1000 delay-400
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-[#f5f5dc]">Looking for a </span>
            <span className="bg-gradient-to-r from-[#d4af37] to-[#fde047] bg-clip-text text-transparent">
              Place to Work?
            </span>
          </h2>

          {/* Description */}
          <p className={`text-gray-400 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto text-center leading-relaxed
                        transition-all duration-1000 delay-500
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Our cafe offers free high-speed WiFi, comfortable seating, and plenty of power outlets. 
            Book a table and enjoy the perfect work environment with artisanal coffee at your fingertips.
          </p>

          {/* Features */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10
                         transition-all duration-1000 delay-600
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="group relative bg-[#1a1a2e] rounded-xl p-4 sm:p-6 border border-gray-800 
                         hover:border-transparent transition-all duration-300 cursor-default"
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Gradient border on hover */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-0 
                               group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm`} 
                     style={{ transform: 'scale(1.02)' }} />
                
                {/* Background glow */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-0 
                               group-hover:opacity-5 transition-opacity duration-300`} />

                <div className="relative z-10 text-center">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-3 rounded-xl flex items-center justify-center
                                 bg-gray-800 group-hover:scale-110 transition-all duration-300
                                 ${hoveredFeature === idx ? 'shadow-lg' : ''}`}>
                    <feature.icon 
                      size={24} 
                      className={`transition-colors duration-300
                                ${hoveredFeature === idx ? 'text-[#d4af37]' : 'text-gray-400'}`}
                    />
                  </div>
                  <h3 className="text-[#f5f5dc] font-semibold mb-1 text-sm sm:text-base group-hover:text-[#d4af37] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className={`flex justify-center transition-all duration-1000 delay-700
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link to="/booking" className="group">
              <Button 
                variant="secondary"
                className="px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg border-2 border-[#d4af37] text-[#d4af37]
                         hover:bg-[#d4af37] hover:text-[#1a1a2e] hover:scale-105
                         hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]
                         transition-all duration-300 flex items-center gap-2"
              >
                Reserve Your Spot
                <ArrowRight 
                  size={20} 
                  className="transition-transform duration-300 group-hover:translate-x-1" 
                />
              </Button>
            </Link>
          </div>

          {/* Trust note */}
          <p className={`text-center text-gray-500 text-xs sm:text-sm mt-6
                       transition-all duration-1000 delay-800
                       ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            No reservation fee • Free cancellation • Instant confirmation
          </p>
        </div>
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
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
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
      `}</style>
    </section>
  );
};

export default MenuCTA;