import React, { useState } from 'react';
import { Plus, ShoppingBag, Check, Star, Clock, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const MenuItem = ({ item, viewMode = 'grid', index = 0, isVisible = true }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  // Grid View
  if (viewMode === 'grid') {
    return (
      <div 
        className={`group relative bg-[#16213e] rounded-2xl overflow-hidden border border-gray-800
                   hover:border-[#d4af37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]
                   hover:-translate-y-2 transition-all duration-500
                   ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/3]">
          {/* Skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-[#1a1a2e] animate-pulse" />
          )}
          
          <img 
            src={item.image} 
            alt={item.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700
                      ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                      group-hover:scale-110`}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#16213e] via-transparent to-transparent 
                        opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Badge */}
          {item.badge && (
            <div className="absolute top-3 left-3 transform-gpu transition-transform duration-300
                          group-hover:scale-105 group-hover:-rotate-1">
              <span className="inline-flex items-center gap-1 bg-[#d4af37] text-[#1a1a2e] 
                             text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                <Star size={12} className="fill-current" />
                {item.badge}
              </span>
            </div>
          )}

          {/* Like button */}
          <button 
            onClick={handleLike}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300
                      ${isLiked 
                        ? 'bg-red-500 text-white scale-110' 
                        : 'bg-[#1a1a2e]/50 text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white'
                      }`}
          >
            <Heart size={16} className={isLiked ? 'fill-current' : ''} />
          </button>

          {/* Quick add button (hover) */}
          <button 
            onClick={handleAddToCart}
            className={`absolute bottom-3 right-3 p-3 rounded-full shadow-xl
                      transform transition-all duration-500
                      ${isAdded 
                        ? 'bg-green-500 text-white scale-100' 
                        : 'bg-[#f5f5dc] text-[#1a1a2e] translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-[#d4af37]'
                      }`}
          >
            {isAdded ? <Check size={20} /> : <Plus size={20} />}
          </button>

          {/* Rating & prep time */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 opacity-0 
                        group-hover:opacity-100 transition-all duration-300 transform translate-y-2 
                        group-hover:translate-y-0">
            {item.rating && (
              <span className="flex items-center gap-1 bg-[#1a1a2e]/80 backdrop-blur-md text-[#d4af37] 
                              text-xs font-bold px-2 py-1 rounded-lg">
                <Star size={12} className="fill-current" />
                {item.rating}
              </span>
            )}
            {item.prepTime && (
              <span className="flex items-center gap-1 bg-[#1a1a2e]/80 backdrop-blur-md text-gray-300 
                              text-xs px-2 py-1 rounded-lg">
                <Clock size={12} />
                {item.prepTime}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-[#f5f5dc] group-hover:text-[#d4af37] 
                         transition-colors duration-300 line-clamp-1">
              {item.name}
            </h3>
            <span className="text-[#d4af37] font-bold text-lg group-hover:scale-110 
                           transition-transform duration-300">
              ${item.price.toFixed(2)}
            </span>
          </div>
          
          <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-2 group-hover:text-gray-300 
                      transition-colors duration-300">
            {item.description}
          </p>
          
          {/* Action buttons */}
          <div className="flex gap-2 mt-auto">
            <button 
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`flex-1 py-2.5 rounded-lg font-semibold text-sm flex items-center 
                       justify-center gap-2 transition-all duration-300
                       ${isAdded 
                         ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                         : 'bg-[#d4af37] text-[#1a1a2e] hover:bg-[#fde047] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                       }`}
            >
              {isAdded ? (
                <>
                  <Check size={18} />
                  Added!
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add to Cart
                </>
              )}
            </button>
            <button 
              className="px-4 py-2.5 border border-gray-700 rounded-lg text-[#f5f5dc] 
                       hover:border-[#d4af37] hover:text-[#d4af37] hover:bg-[#d4af37]/5
                       transition-all duration-300"
            >
              <ShoppingBag size={18} />
            </button>
          </div>
        </div>

        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 
                      pointer-events-none overflow-hidden">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full 
                        transition-transform duration-1000 bg-gradient-to-r from-transparent 
                        via-white/5 to-transparent" />
        </div>
      </div>
    );
  }

  // List View
  return (
    <div 
      className={`group relative bg-[#16213e] rounded-2xl overflow-hidden border border-gray-800
                 hover:border-[#d4af37]/30 transition-all duration-500
                 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
          {!imageLoaded && <div className="absolute inset-0 bg-[#1a1a2e] animate-pulse" />}
          <img 
            src={item.image} 
            alt={item.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-500
                      ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                      group-hover:scale-105`}
          />
          {item.badge && (
            <span className="absolute top-3 left-3 bg-[#d4af37] text-[#1a1a2e] text-xs font-bold 
                           px-2 py-1 rounded-full">
              {item.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-grow">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-bold text-lg text-[#f5f5dc] group-hover:text-[#d4af37] transition-colors">
                {item.name}
              </h3>
              <span className="text-[#d4af37] font-bold text-xl">${item.price.toFixed(2)}</span>
            </div>
            
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
            
            {/* Meta info */}
            <div className="flex items-center gap-3 text-xs text-gray-500">
              {item.rating && (
                <span className="flex items-center gap-1 text-[#d4af37]">
                  <Star size={12} className="fill-current" />
                  {item.rating}
                </span>
              )}
              {item.prepTime && (
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {item.prepTime}
                </span>
              )}
              <span className="capitalize">{item.category}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex sm:flex-col gap-2">
            <button 
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-lg font-semibold text-sm 
                       flex items-center justify-center gap-2 transition-all duration-300
                       ${isAdded 
                         ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                         : 'bg-[#d4af37] text-[#1a1a2e] hover:bg-[#fde047]'
                       }`}
            >
              {isAdded ? <Check size={18} /> : <Plus size={18} />}
              <span className="sm:hidden">{isAdded ? 'Added!' : 'Add'}</span>
            </button>
            <button 
              onClick={handleLike}
              className={`p-2.5 rounded-lg border transition-all duration-300
                        ${isLiked 
                          ? 'bg-red-500/20 border-red-500/30 text-red-400' 
                          : 'border-gray-700 text-gray-400 hover:border-[#d4af37] hover:text-[#d4af37]'
                        }`}
            >
              <Heart size={18} className={isLiked ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;