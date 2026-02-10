import React, { useEffect, useRef, useState } from 'react';
import { Tag, Clock, Sparkles, Percent, Coffee, ArrowRight, Zap, Sun } from 'lucide-react';

const OffersStrip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredOffer, setHoveredOffer] = useState(null);
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 34 });
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

  // Countdown timer for happy hour
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        }
        return prev;
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const offers = [
    {
      id: 'happy-hour',
      icon: Tag,
      title: 'Happy Hour',
      subtitle: 'Limited Time',
      desc: '2-4 PM • 20% off all cold drinks',
      details: 'Iced coffee, cold brew, frappes & more',
      color: 'from-blue-500 to-cyan-400',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      discount: '20% OFF',
      countdown: true,
      cta: 'Order Now',
    },
    {
      id: 'early-bird',
      icon: Sun,
      title: 'Early Bird Special',
      subtitle: 'Morning Deal',
      desc: '7-9 AM • Free pastry with coffee',
      details: 'Any coffee + croissant or muffin',
      color: 'from-orange-400 to-amber-500',
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-400',
      discount: 'FREE',
      countdown: false,
      cta: 'Grab Deal',
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-12 sm:py-16 bg-[#16213e] border-y border-gray-800 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className={`text-center mb-8 sm:mb-10 transition-all duration-1000
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/30 
                         rounded-full px-4 py-2 mb-4">
            <Sparkles className="text-[#d4af37]" size={16} />
            <span className="text-[#d4af37] text-sm font-medium">Today's Special Offers</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {offers.map((offer, idx) => {
            const Icon = offer.icon;
            const isHovered = hoveredOffer === offer.id;

            return (
              <div 
                key={offer.id}
                className={`group relative flex items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl 
                          bg-[#1a1a2e] border border-gray-800 overflow-hidden cursor-pointer
                          hover:border-transparent transition-all duration-500
                          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${200 + (idx * 100)}ms` }}
                onMouseEnter={() => setHoveredOffer(offer.id)}
                onMouseLeave={() => setHoveredOffer(null)}
              >
                {/* Animated gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${offer.color} opacity-0 
                               group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Gradient border effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${offer.color} opacity-0 
                               group-hover:opacity-20 transition-opacity duration-500 blur-sm`} 
                     style={{ transform: 'scale(1.02)' }} />

                {/* Discount badge */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold
                               bg-gradient-to-r ${offer.color} text-[#1a1a2e]
                               transform transition-all duration-300
                               ${isHovered ? 'scale-110 rotate-3' : 'scale-100 rotate-0'}`}>
                  {offer.discount}
                </div>

                {/* Icon container */}
                <div className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center
                               transition-all duration-500 ${offer.bgColor} group-hover:scale-110
                               ${isHovered ? 'shadow-[0_0_20px_rgba(212,175,55,0.2)]' : ''}`}>
                  <Icon 
                    className={`${offer.iconColor} transition-transform duration-500
                              ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`} 
                    size={28} 
                  />
                  
                  {/* Sparkle effect */}
                  <Sparkles 
                    className={`absolute -top-1 -right-1 text-[#d4af37] transition-all duration-300
                              ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
                    size={14}
                  />
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold uppercase tracking-wider
                                    ${offer.iconColor} bg-opacity-20 px-2 py-0.5 rounded`}>
                      {offer.subtitle}
                    </span>
                    
                    {/* Countdown for happy hour */}
                    {offer.countdown && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} />
                        Ends in {String(countdown.hours).padStart(2, '0')}:{String(countdown.minutes).padStart(2, '0')}
                      </span>
                    )}
                  </div>
                  
                  <h3 className={`font-bold text-lg sm:text-xl mb-1 transition-colors duration-300
                                ${isHovered ? 'text-[#d4af37]' : 'text-[#f5f5dc]'}`}>
                    {offer.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-1">{offer.desc}</p>
                  
                  {/* Additional details on hover */}
                  <p className={`text-xs text-gray-500 transition-all duration-300
                               ${isHovered ? 'opacity-100 max-h-10' : 'opacity-0 max-h-0'} overflow-hidden`}>
                    {offer.details}
                  </p>
                </div>

                {/* CTA Arrow */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                               border border-gray-700 group-hover:border-[#d4af37] group-hover:bg-[#d4af37]
                               transition-all duration-300 transform
                               ${isHovered ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}>
                  <ArrowRight 
                    size={18} 
                    className="text-gray-400 group-hover:text-[#1a1a2e] transition-colors" 
                  />
                </div>

                {/* Bottom progress bar for countdown */}
                {offer.countdown && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                    <div 
                      className={`h-full bg-gradient-to-r ${offer.color} transition-all duration-1000`}
                      style={{ width: `${(countdown.minutes / 60) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className={`text-center text-gray-500 text-sm mt-8 transition-all duration-1000 delay-500
                     ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          * Offers cannot be combined. Valid at participating locations only.
        </p>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.1); }
          50% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.2); }
        }
      `}</style>
    </section>
  );
};

export default OffersStrip;