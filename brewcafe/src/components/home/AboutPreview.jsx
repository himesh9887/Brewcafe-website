import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Leaf, Heart } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

const AboutPreview = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState([false, false]);
  const sectionRef = useRef(null);

  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      desc: 'Sourced from the finest coffee farms worldwide',
      color: 'from-[#d4af37]/20 to-[#d4af37]/5',
      iconColor: 'text-[#d4af37]',
    },
    {
      icon: Leaf,
      title: 'Sustainable',
      desc: 'Eco-friendly practices from bean to cup',
      color: 'from-green-500/20 to-green-500/5',
      iconColor: 'text-green-400',
    },
    {
      icon: Heart,
      title: 'Made with Love',
      desc: 'Crafted by passionate expert baristas',
      color: 'from-red-500/20 to-red-500/5',
      iconColor: 'text-red-400',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = (index) => {
    setImageLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#0f0f1e] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Grid with hover effects */}
          <div 
            className={`grid grid-cols-2 gap-3 sm:gap-4 transition-all duration-1000
                       ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
          >
            {/* First Image */}
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
              <div className={`absolute inset-0 bg-[#16213e] transition-opacity duration-500
                             ${imageLoaded[0] ? 'opacity-0' : 'opacity-100'}`} />
              <img 
                src="https://images.unsplash.com/photo-1442512595367-42736f3e531b?w=400&h=500&fit=crop" 
                alt="Coffee making" 
                onLoad={() => handleImageLoad(0)}
                className="rounded-2xl w-full h-48 sm:h-64 lg:h-80 object-cover 
                         transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 via-transparent to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Floating badge */}
              <div className="absolute bottom-3 left-3 bg-[#d4af37]/90 backdrop-blur-sm text-[#1a1a2e] 
                            px-3 py-1 rounded-full text-xs font-bold transform translate-y-10 
                            group-hover:translate-y-0 transition-transform duration-300">
                Since 2014
              </div>
            </div>

            {/* Second Image */}
            <div className="relative group overflow-hidden rounded-2xl shadow-2xl mt-8 sm:mt-12">
              <div className={`absolute inset-0 bg-[#16213e] transition-opacity duration-500
                             ${imageLoaded[1] ? 'opacity-0' : 'opacity-100'}`} />
              <img 
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=500&fit=crop" 
                alt="Coffee cup" 
                onLoad={() => handleImageLoad(1)}
                className="rounded-2xl w-full h-48 sm:h-64 lg:h-80 object-cover 
                         transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 via-transparent to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Floating badge */}
              <div className="absolute top-3 right-3 bg-[#f5f5dc]/90 backdrop-blur-sm text-[#1a1a2e] 
                            px-3 py-1 rounded-full text-xs font-bold transform -translate-y-10 
                            group-hover:translate-y-0 transition-transform duration-300 delay-75">
                100% Arabica
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 bg-[#d4af37]/10 
                          rounded-full blur-2xl animate-pulse-slow" />
          </div>

          {/* Content with staggered animations */}
          <div 
            className={`transition-all duration-1000 delay-200
                       ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
          >
            <div className="mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#d4af37] to-[#fde047] bg-clip-text text-transparent">
                Our Story
              </h2>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                Founded in 2014, BrewCafe began with a simple mission: to serve exceptional coffee that brings people together.
              </p>
            </div>

            <p className="text-gray-400 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
              Every bean we roast carries the story of its origin - from the misty highlands of Ethiopia 
              to the volcanic soils of Guatemala. We believe that great coffee is not just about taste, 
              but about the entire journey from farm to your cup.
            </p>

            {/* Feature cards with hover effects */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  className={`group relative overflow-hidden text-center p-4 sm:p-5 rounded-xl 
                            bg-[#16213e] border border-gray-800 hover:border-[#d4af37]/30
                            hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:-translate-y-1
                            transition-all duration-300 cursor-default
                            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${400 + (idx * 100)}ms` }}
                >
                  {/* Background gradient on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 
                                 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mb-2 sm:mb-3 
                                  rounded-full bg-[#1a1a2e] group-hover:scale-110 transition-transform duration-300">
                      <feature.icon 
                        className={`${feature.iconColor} transition-transform duration-300 group-hover:rotate-12`} 
                        size={20} 
                      />
                    </div>
                    <h3 className="font-semibold text-[#f5f5dc] mb-1 text-sm sm:text-base group-hover:text-[#d4af37] 
                                 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button with hover */}
            <div 
              className={`transition-all duration-1000 delay-700
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <Link to="/about" className="inline-block group">
                <Button 
                  variant="outline"
                  className="border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#1a1a2e]
                           hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]
                           transition-all duration-300"
                >
                  Learn More
                  <ArrowRight 
                    size={18} 
                    className="transition-transform duration-300 group-hover:translate-x-1" 
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.1); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutPreview;