import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ShoppingBag, Check, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

const PopularMenu = () => {
  const { addToCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [addedItems, setAddedItems] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const sectionRef = useRef(null);

  const items = [
    {
      id: 1,
      name: 'Caramel Macchiato',
      description: 'Espresso with vanilla-flavored syrup, milk, and caramel drizzle',
      price: 5.95,
      image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop',
      tag: 'Best Seller',
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Cold Brew',
      description: 'Slow-steeped for 20 hours for a super smooth flavor',
      price: 4.95,
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b5dd7359?w=400&h=400&fit=crop',
      tag: 'Refreshing',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Nitro Coffee',
      description: 'Cold brew infused with nitrogen for a creamy texture',
      price: 6.50,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
      tag: 'Premium',
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Espresso Tonic',
      description: 'Double shot espresso with premium tonic water and lime',
      price: 5.50,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
      tag: 'Trending',
      rating: 4.7,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    
    // Show feedback
    setAddedItems({ ...addedItems, [item.id]: true });
    
    // Reset after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-[#16213e] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SectionTitle 
            title="Popular Menu"
            subtitle="Handcrafted beverages loved by our customers. Try our signature drinks."
            centered
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {items.map((item, idx) => (
            <div 
              key={item.id} 
              className={`group relative bg-[#1a1a2e] rounded-2xl overflow-hidden border border-gray-800
                         hover:border-[#d4af37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]
                         hover:-translate-y-2 transition-all duration-500
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${200 + (idx * 100)}ms` }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden aspect-square">
                {/* Skeleton loader */}
                <div className={`absolute inset-0 bg-[#16213e] transition-opacity duration-500
                               ${hoveredItem === item.id ? 'opacity-0' : 'opacity-40'}`} />
                
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out
                           group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent 
                              opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Tag with animation */}
                <div className="absolute top-3 left-3 transform-gpu transition-all duration-300
                              group-hover:scale-105 group-hover:-rotate-1">
                  <span className="inline-flex items-center gap-1 bg-[#d4af37] text-[#1a1a2e] 
                                 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    <Star size={12} className="fill-current" />
                    {item.tag}
                  </span>
                </div>

                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-[#1a1a2e]/80 backdrop-blur-md text-[#f5f5dc] 
                              text-xs font-bold px-2 py-1 rounded-lg border border-gray-700
                              opacity-0 group-hover:opacity-100 transform translate-y-2 
                              group-hover:translate-y-0 transition-all duration-300">
                  ★ {item.rating}
                </div>

                {/* Floating Add Button */}
                <button 
                  onClick={() => handleAddToCart(item)}
                  disabled={addedItems[item.id]}
                  className={`absolute bottom-3 right-3 p-3 rounded-full shadow-xl
                           transform transition-all duration-500 ease-out
                           ${addedItems[item.id] 
                             ? 'bg-green-500 text-white scale-100' 
                             : 'bg-[#f5f5dc] text-[#1a1a2e] translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#d4af37] hover:scale-110'
                           }`}
                >
                  {addedItems[item.id] ? <Check size={20} /> : <Plus size={20} />}
                </button>

                {/* Quick add hint */}
                <div className="absolute bottom-3 left-3 text-white/80 text-xs font-medium
                              opacity-0 group-hover:opacity-100 transform translate-y-2
                              group-hover:translate-y-0 transition-all duration-300 delay-100">
                  Click to add
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-[#f5f5dc] group-hover:text-[#d4af37] 
                               transition-colors duration-300 line-clamp-1">
                    {item.name}
                  </h3>
                  <span className="text-[#d4af37] font-bold text-lg group-hover:scale-110 
                                 transition-transform duration-300 inline-block">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed 
                            group-hover:text-gray-300 transition-colors duration-300">
                  {item.description}
                </p>

                {/* Add to cart button with animation */}
                <button 
                  onClick={() => handleAddToCart(item)}
                  disabled={addedItems[item.id]}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold flex items-center 
                           justify-center gap-2 transition-all duration-300
                           ${addedItems[item.id]
                             ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                             : 'border border-gray-700 text-gray-300 hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-[#d4af37]/5'
                           }`}
                >
                  {addedItems[item.id] ? (
                    <>
                      <Check size={16} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu Button */}
        <div className={`text-center transition-all duration-1000 delay-700
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link to="/menu" className="inline-block group">
            <Button 
              variant="secondary" 
              className="px-8 py-4 text-base border-2 border-[#f5f5dc] text-[#f5f5dc]
                       hover:bg-[#f5f5dc] hover:text-[#1a1a2e] hover:scale-105
                       hover:shadow-[0_0_30px_rgba(245,245,220,0.2)]
                       transition-all duration-300"
            >
              View Full Menu
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularMenu;