import React, { useState, useEffect, useRef } from 'react';
import { Coffee, CupSoda, Croissant, Utensils, Sparkles } from 'lucide-react';

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const buttonsRef = useRef({});
  const containerRef = useRef(null);

  const categories = [
    { 
      id: 'all', 
      label: 'All Items', 
      icon: Utensils,
      count: 24,
      color: 'from-gray-400 to-gray-600',
      description: 'Everything we offer'
    },
    { 
      id: 'coffee', 
      label: 'Coffee', 
      icon: Coffee,
      count: 12,
      color: 'from-[#d4af37] to-[#8b6914]',
      description: 'Hot brews & espresso'
    },
    { 
      id: 'cold', 
      label: 'Cold Drinks', 
      icon: CupSoda,
      count: 8,
      color: 'from-cyan-400 to-blue-500',
      description: 'Iced & refreshing'
    },
    { 
      id: 'food', 
      label: 'Pastries', 
      icon: Croissant,
      count: 4,
      color: 'from-orange-400 to-amber-500',
      description: 'Fresh baked goods'
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Update indicator position when active category changes
  useEffect(() => {
    const activeButton = buttonsRef.current[activeCategory];
    if (activeButton && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();
      
      setIndicatorStyle({
        left: buttonRect.left - containerRect.left + containerRef.current.scrollLeft,
        width: buttonRect.width,
        height: buttonRect.height,
      });
    }
  }, [activeCategory]);

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);
    // Add ripple effect or other feedback here
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
    >
      {/* Animated background indicator */}
      <div 
        className="absolute rounded-full bg-[#d4af37] transition-all duration-500 ease-out -z-10 hidden sm:block"
        style={{
          ...indicatorStyle,
          opacity: 0.1,
          transform: 'scale(1.1)',
        }}
      />

      {categories.map((cat, idx) => {
        const isActive = activeCategory === cat.id;
        const isHovered = hoveredCategory === cat.id;
        const Icon = cat.icon;

        return (
          <button
            key={cat.id}
            ref={(el) => { buttonsRef.current[cat.id] = el; }}
            onClick={() => handleCategoryClick(cat.id)}
            onMouseEnter={() => setHoveredCategory(cat.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            className={`group relative flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full 
                       font-medium text-sm sm:text-base transition-all duration-300 overflow-hidden
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                       ${isActive 
                         ? 'bg-[#d4af37] text-[#1a1a2e] shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-105' 
                         : 'bg-[#16213e] text-gray-400 hover:text-[#f5f5dc] border border-gray-800 hover:border-gray-700'
                       }`}
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            {/* Background gradient on hover (inactive only) */}
            {!isActive && (
              <div className={`absolute inset-0 bg-gradient-to-r ${cat.color} opacity-0 
                             group-hover:opacity-10 transition-opacity duration-300`} />
            )}

            {/* Icon container */}
            <div className={`relative p-1.5 rounded-full transition-all duration-300
                           ${isActive ? 'bg-[#1a1a2e]/20' : 'bg-gray-800 group-hover:bg-gray-700'}`}>
              <Icon 
                size={18} 
                className={`transition-all duration-300 ${isActive ? 'scale-110' : ''}
                           ${isHovered && !isActive ? 'text-[#d4af37]' : ''}`}
              />
              
              {/* Sparkle effect on active */}
              {isActive && (
                <Sparkles 
                  size={10} 
                  className="absolute -top-1 -right-1 text-[#1a1a2e] animate-pulse" 
                />
              )}
            </div>

            {/* Label */}
            <span className="relative z-10 whitespace-nowrap">{cat.label}</span>

            {/* Count badge */}
            <span className={`text-xs px-2 py-0.5 rounded-full transition-all duration-300
                            ${isActive 
                              ? 'bg-[#1a1a2e]/20 text-[#1a1a2e]' 
                              : 'bg-gray-800 text-gray-500 group-hover:bg-gray-700'
                            }`}>
              {cat.count}
            </span>

            {/* Tooltip on hover (desktop only) */}
            <div className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 
                           bg-[#1a1a2e] text-[#f5f5dc] text-xs px-3 py-1.5 rounded-lg 
                           border border-gray-800 whitespace-nowrap
                           transition-all duration-300 pointer-events-none hidden sm:block
                           ${isHovered && !isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
              {cat.description}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 
                            w-2 h-2 bg-[#1a1a2e] border-t border-l border-gray-800 rotate-45" />
            </div>

            {/* Active indicator line (mobile) */}
            {isActive && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 
                            w-8 h-0.5 bg-[#1a1a2e] rounded-full sm:hidden" />
            )}
          </button>
        );
      })}

      {/* Mobile scroll hint */}
      <div className="w-full flex justify-center sm:hidden mt-2">
        <div className="flex gap-1">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300
                        ${activeCategory === cat.id ? 'bg-[#d4af37]' : 'bg-gray-700'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;