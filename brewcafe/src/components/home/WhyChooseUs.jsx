import React, { useEffect, useRef, useState } from 'react';
import { Coffee, Clock, Truck, Shield, ArrowUpRight } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';

const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  const reasons = [
    {
      icon: Coffee,
      title: 'Premium Beans',
      description: 'We source only the top 1% of Arabica beans from ethical farms around the world.',
      color: 'from-amber-500/20 to-orange-500/5',
      iconBg: 'bg-[#d4af37]/10',
      iconColor: 'text-[#d4af37]',
      stat: 'Top 1%',
    },
    {
      icon: Clock,
      title: 'Fresh Roasted',
      description: 'Our beans are roasted in small batches daily to ensure maximum freshness and flavor.',
      color: 'from-green-500/20 to-emerald-500/5',
      iconBg: 'bg-green-500/10',
      iconColor: 'text-green-400',
      stat: 'Daily',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Hot and fresh delivered to your door within 30 minutes or your money back.',
      color: 'from-blue-500/20 to-cyan-500/5',
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      stat: '30 min',
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'Not satisfied? We will remake your drink or refund your money, no questions asked.',
      color: 'from-purple-500/20 to-pink-500/5',
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
      stat: '100%',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-[#0f0f1e] relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionTitle 
            title="Why Choose Us"
            subtitle="We are committed to providing the best coffee experience possible."
            centered
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reasons.map((reason, idx) => (
            <div 
              key={idx}
              className={`group relative bg-[#16213e] rounded-2xl p-6 sm:p-8 border border-gray-800
                         overflow-hidden transition-all duration-500 cursor-default
                         ${hoveredCard === idx ? 'border-[#d4af37]/30 shadow-[0_0_30px_rgba(212,175,55,0.1)] -translate-y-3' : ''}
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${200 + (idx * 100)}ms` }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 
                             group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 transition-all duration-500
                             ${hoveredCard === idx ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`absolute top-4 right-4 w-8 h-8 rounded-full ${reason.iconBg} 
                               flex items-center justify-center`}>
                  <ArrowUpRight size={16} className={reason.iconColor} />
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon with animation */}
                <div className={`w-16 h-16 mx-auto mb-4 sm:mb-6 rounded-full ${reason.iconBg} 
                               flex items-center justify-center transition-all duration-500
                               group-hover:scale-110 group-hover:rotate-6
                               ${hoveredCard === idx ? 'shadow-lg shadow-current/20' : ''}`}>
                  <reason.icon 
                    className={`${reason.iconColor} transition-transform duration-500
                              ${hoveredCard === idx ? 'scale-110' : ''}`} 
                    size={32} 
                  />
                </div>

                {/* Stat badge */}
                <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full mb-3
                               text-xs font-bold ${reason.iconBg} ${reason.iconColor}
                               transform transition-all duration-500
                               ${hoveredCard === idx ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>
                  {reason.stat}
                </div>

                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300
                              ${hoveredCard === idx ? 'text-[#f5f5dc]' : 'text-[#f5f5dc]'}`}>
                  {reason.title}
                </h3>
                
                <p className={`text-gray-400 text-sm leading-relaxed transition-colors duration-300
                             ${hoveredCard === idx ? 'text-gray-300' : ''}`}>
                  {reason.description}
                </p>

                {/* Animated line */}
                <div className={`mt-6 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent
                               transition-all duration-700
                               ${hoveredCard === idx ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
              </div>

              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>

              {/* Border glow effect */}
              <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none
                             ${hoveredCard === idx ? 'opacity-100' : 'opacity-0'}`}
                   style={{ boxShadow: 'inset 0 0 20px rgba(212,175,55,0.1)' }} />
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className={`mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8
                       transition-all duration-1000 delay-700
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { value: '50K+', label: 'Happy Customers' },
            { value: '15+', label: 'Coffee Varieties' },
            { value: '4.9', label: 'Average Rating' },
            { value: '30min', label: 'Delivery Time' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-4 rounded-xl bg-[#16213e]/50 border border-gray-800
                                    hover:border-[#d4af37]/20 transition-colors duration-300">
              <div className="text-2xl sm:text-3xl font-bold text-[#d4af37] mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;