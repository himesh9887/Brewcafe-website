import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, ArrowRight, Percent, Zap } from 'lucide-react';
import Button from '../common/Button';

const OffersBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 42, seconds: 15 });
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  return (
    <section 
      ref={sectionRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative py-8 sm:py-12 overflow-hidden bg-gradient-to-r from-[#d4af37] to-[#fde047]"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute inset-0 transition-transform duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`}
             style={{
               backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(26,26,46,0.5) 1px, transparent 0)',
               backgroundSize: '30px 30px'
             }} />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-4 left-10 animate-float-slow opacity-20">
        <Percent size={40} className="text-[#1a1a2e]" />
      </div>
      <div className="absolute bottom-4 right-10 animate-float-medium opacity-20">
        <Zap size={32} className="text-[#1a1a2e]" />
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent
                       skew-x-12 transition-transform duration-1000 ${isHovered ? 'translate-x-[300%]' : ''}`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`flex flex-col lg:flex-row items-center justify-between gap-6 transition-all duration-700
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Left Content */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
            {/* Animated Icon */}
            <div className="relative">
              <div className={`p-4 bg-[#1a1a2e]/10 rounded-full transition-transform duration-500 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
                <Sparkles 
                  className={`text-[#1a1a2e] transition-all duration-500 ${isHovered ? 'animate-spin-slow' : ''}`} 
                  size={32} 
                />
              </div>
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#1a1a2e]/30 animate-ping-slow" />
            </div>

            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-[#1a1a2e]/10 rounded-full px-3 py-1 mb-2 animate-pulse">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-[#1a1a2e] uppercase tracking-wider">Limited Time</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1a2e] mb-2 leading-tight">
                20% Off First Order!
              </h3>
              
              <p className="text-[#1a1a2e]/80 font-medium text-sm sm:text-base flex flex-wrap items-center justify-center sm:justify-start gap-2">
                Use code: 
                <span className="bg-[#1a1a2e] text-[#d4af37] px-2 py-0.5 rounded font-mono font-bold tracking-wider 
                             hover:bg-[#0f0f1e] transition-colors cursor-pointer select-all">
                  BREW20
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  New customers only
                </span>
              </p>
            </div>
          </div>

          {/* Countdown Timer (Desktop) */}
          <div className={`hidden lg:flex items-center gap-3 transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}>
            <span className="text-xs font-semibold text-[#1a1a2e]/70 uppercase tracking-wider">Ends in:</span>
            {[
              { value: timeLeft.hours, label: 'hrs' },
              { value: timeLeft.minutes, label: 'min' },
              { value: timeLeft.seconds, label: 'sec' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center bg-[#1a1a2e]/10 rounded-lg px-3 py-2 min-w-[60px]">
                <span className="text-xl font-bold text-[#1a1a2e] font-mono">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase text-[#1a1a2e]/60">{item.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link to="/menu" className="w-full sm:w-auto group">
            <Button 
              className="w-full sm:w-auto bg-[#1a1a2e] text-[#f5f5dc] hover:bg-[#0f0f1e] 
                       px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold
                       hover:scale-105 hover:shadow-[0_0_30px_rgba(26,26,46,0.3)]
                       transition-all duration-300 whitespace-nowrap
                       flex items-center justify-center gap-2"
            >
              Order Now
              <ArrowRight 
                size={20} 
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-0 -rotate-45" 
              />
            </Button>
          </Link>
        </div>

        {/* Mobile Countdown */}
        <div className={`flex lg:hidden justify-center mt-4 gap-2 transition-all duration-700 delay-200
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {[
            { value: timeLeft.hours, label: 'hrs' },
            { value: timeLeft.minutes, label: 'min' },
            { value: timeLeft.seconds, label: 'sec' }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center bg-[#1a1a2e]/10 rounded-lg px-3 py-2 min-w-[50px]">
              <span className="text-lg font-bold text-[#1a1a2e] font-mono">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase text-[#1a1a2e]/60">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-5deg); }
        }
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 3s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default OffersBanner;