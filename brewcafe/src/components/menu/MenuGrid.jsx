import React, { useState, useEffect, useRef } from 'react';
import CategoryFilter from './CategoryFilter';
import MenuItem from './MenuItem';
import { Search, SlidersHorizontal, Grid3X3, LayoutList, Sparkles } from 'lucide-react';

const MenuGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const sectionRef = useRef(null);

  const menuItems = [
    {
      id: 1,
      name: 'Espresso',
      description: 'Rich, intense coffee shot with golden crema',
      price: 3.50,
      category: 'coffee',
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop',
      badge: 'Classic',
      rating: 4.8,
      prepTime: '2 min',
    },
    {
      id: 2,
      name: 'Cappuccino',
      description: 'Espresso with steamed milk foam and cocoa dust',
      price: 4.50,
      category: 'coffee',
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
      rating: 4.9,
      prepTime: '4 min',
    },
    {
      id: 3,
      name: 'Iced Latte',
      description: 'Espresso poured over ice with cold milk',
      price: 5.00,
      category: 'cold',
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b5dd7359?w=400&h=300&fit=crop',
      badge: 'Popular',
      rating: 4.7,
      prepTime: '3 min',
    },
    {
      id: 4,
      name: 'Croissant',
      description: 'Buttery, flaky French pastry baked fresh daily',
      price: 3.75,
      category: 'food',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
      rating: 4.6,
      prepTime: '1 min',
    },
    {
      id: 5,
      name: 'Cold Brew',
      description: '20-hour steeped coffee, smooth and bold',
      price: 4.95,
      category: 'cold',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
      rating: 4.8,
      prepTime: '1 min',
    },
    {
      id: 6,
      name: 'Mocha',
      description: 'Espresso with chocolate and steamed milk',
      price: 5.50,
      category: 'coffee',
      image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&h=300&fit=crop',
      rating: 4.9,
      prepTime: '5 min',
    },
    {
      id: 7,
      name: 'Avocado Toast',
      description: 'Sourdough with smashed avocado and poached egg',
      price: 12.00,
      category: 'food',
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
      badge: 'Breakfast',
      rating: 4.7,
      prepTime: '8 min',
    },
    {
      id: 8,
      name: 'Matcha Latte',
      description: 'Premium Japanese matcha with steamed milk',
      price: 5.95,
      category: 'cold',
      image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3114?w=400&h=300&fit=crop',
      rating: 4.8,
      prepTime: '4 min',
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

  // Handle category change with animation
  const handleCategoryChange = (category) => {
    setIsFiltering(true);
    setActiveCategory(category);
    setTimeout(() => setIsFiltering(false), 300);
  };

  // Filter and sort items
  let filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  // Apply search
  if (searchQuery) {
    filteredItems = filteredItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Apply sorting
  if (sortBy === 'price-low') {
    filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredItems = [...filteredItems].sort((a, b) => b.rating - a.rating);
  }

  const itemCount = filteredItems.length;

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-[#0f0f1e] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#16213e] to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with search and controls */}
        <div className={`flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8 
                       transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#16213e] border border-gray-800 rounded-full pl-12 pr-4 py-3 
                       text-[#f5f5dc] placeholder-gray-500 focus:outline-none focus:border-[#d4af37]
                       transition-all duration-300"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 
                         hover:text-[#f5f5dc] transition-colors"
              >
                ×
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#16213e] border border-gray-800 rounded-lg pl-4 pr-10 py-2.5 
                         text-[#f5f5dc] text-sm focus:outline-none focus:border-[#d4af37] cursor-pointer"
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <SlidersHorizontal className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>

            {/* View mode toggle */}
            <div className="flex bg-[#16213e] border border-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all duration-300 ${viewMode === 'grid' ? 'bg-[#d4af37] text-[#1a1a2e]' : 'text-gray-500 hover:text-[#f5f5dc]'}`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all duration-300 ${viewMode === 'list' ? 'bg-[#d4af37] text-[#1a1a2e]' : 'text-gray-500 hover:text-[#f5f5dc]'}`}
              >
                <LayoutList size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <CategoryFilter 
            activeCategory={activeCategory} 
            setActiveCategory={handleCategoryChange} 
          />
        </div>

        {/* Results count */}
        <div className={`flex items-center justify-between mb-6 transition-all duration-500
                       ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-400 text-sm">
            Showing <span className="text-[#d4af37] font-semibold">{itemCount}</span> items
            {activeCategory !== 'all' && (
              <span> in <span className="capitalize">{activeCategory}</span></span>
            )}
          </p>
          {searchQuery && (
            <p className="text-gray-500 text-sm">
              Search: "{searchQuery}"
            </p>
          )}
        </div>

        {/* Grid/List View */}
        <div 
          className={`transition-all duration-300 ${isFiltering ? 'opacity-50 scale-98' : 'opacity-100 scale-100'}
                     ${viewMode === 'grid' 
                       ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6' 
                       : 'flex flex-col gap-4'
                     }`}
        >
          {filteredItems.map((item, idx) => (
            <MenuItem 
              key={item.id} 
              item={item} 
              viewMode={viewMode}
              index={idx}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#16213e] rounded-full mb-4">
              <Sparkles className="text-gray-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#f5f5dc] mb-2">No items found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search or category filter</p>
            <button 
              onClick={() => {setActiveCategory('all'); setSearchQuery('');}}
              className="text-[#d4af37] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Load more button */}
        {filteredItems.length > 0 && filteredItems.length < menuItems.length && (
          <div className="text-center mt-12">
            <button 
              className="px-8 py-3 bg-[#16213e] border border-gray-800 rounded-full text-[#f5f5dc]
                       hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuGrid;