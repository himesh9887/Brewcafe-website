import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Grid3X3, LayoutList, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import CategoryFilter from './CategoryFilter';
import MenuItem from './MenuItem';

const MENU_ITEMS = [
  {
    id: 1,
    name: 'Espresso',
    description: 'Rich, intense shot with a golden crema and dark chocolate finish.',
    price: 3.5,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop',
    badge: 'Classic',
    rating: 4.8,
    prepTime: '2 min',
  },
  {
    id: 2,
    name: 'Cappuccino',
    description: 'Espresso, silky milk foam, and cocoa dust.',
    price: 4.5,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
    badge: 'House Favorite',
    rating: 4.9,
    prepTime: '4 min',
  },
  {
    id: 3,
    name: 'Iced Latte',
    description: 'Bold espresso poured over ice with chilled milk.',
    price: 5,
    category: 'cold',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b5dd7359?w=400&h=300&fit=crop',
    badge: 'Popular',
    rating: 4.7,
    prepTime: '3 min',
  },
  {
    id: 4,
    name: 'Croissant',
    description: 'Buttery layered pastry baked fresh every morning.',
    price: 3.75,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
    rating: 4.6,
    prepTime: '1 min',
  },
  {
    id: 5,
    name: 'Cold Brew',
    description: '20-hour steeped coffee with a smooth, low-acid profile.',
    price: 4.95,
    category: 'cold',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    rating: 4.8,
    prepTime: '1 min',
  },
  {
    id: 6,
    name: 'Mocha',
    description: 'Espresso blended with deep cocoa and steamed milk.',
    price: 5.5,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&h=300&fit=crop',
    badge: 'Comfort Cup',
    rating: 4.9,
    prepTime: '5 min',
  },
  {
    id: 7,
    name: 'Avocado Toast',
    description: 'Sourdough, smashed avocado, poached egg, and chili flakes.',
    price: 12,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
    badge: 'Breakfast',
    rating: 4.7,
    prepTime: '8 min',
  },
  {
    id: 8,
    name: 'Matcha Latte',
    description: 'Ceremonial matcha whisked with creamy milk.',
    price: 5.95,
    category: 'cold',
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3114?w=400&h=300&fit=crop',
    rating: 4.8,
    prepTime: '4 min',
  },
  {
    id: 9,
    name: 'Flat White',
    description: 'Velvety double ristretto with thin microfoam.',
    price: 4.85,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
    rating: 4.8,
    prepTime: '3 min',
  },
  {
    id: 10,
    name: 'Berry Danish',
    description: 'Flaky pastry with vanilla custard and berry compote.',
    price: 4.25,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
    rating: 4.6,
    prepTime: '1 min',
  },
  {
    id: 11,
    name: 'Sparkling Yuzu',
    description: 'Bright citrus cooler with sparkling tonic and mint.',
    price: 4.75,
    category: 'cold',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&h=300&fit=crop',
    badge: 'New',
    rating: 4.7,
    prepTime: '2 min',
  },
  {
    id: 12,
    name: 'Turkey Melt',
    description: 'Toasted brioche with smoked turkey, cheese, and mustard aioli.',
    price: 11.5,
    category: 'food',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop',
    badge: 'Lunch',
    rating: 4.8,
    prepTime: '7 min',
  },
];

const INITIAL_VISIBLE_ITEMS = 8;
const LOAD_MORE_STEP = 4;

const MenuGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ITEMS);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const counts = useMemo(() => ({
    all: MENU_ITEMS.length,
    coffee: MENU_ITEMS.filter((item) => item.category === 'coffee').length,
    cold: MENU_ITEMS.filter((item) => item.category === 'cold').length,
    food: MENU_ITEMS.filter((item) => item.category === 'food').length,
  }), []);

  const filteredItems = useMemo(() => {
    let items = activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query),
      );
    }

    if (sortBy === 'price-low') items = [...items].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') items = [...items].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') items = [...items].sort((a, b) => b.rating - a.rating);

    return items;
  }, [activeCategory, searchQuery, sortBy]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const canLoadMore = visibleItems.length < filteredItems.length;

  const handleCategoryChange = (category) => {
    setIsFiltering(true);
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE_ITEMS);
    window.setTimeout(() => setIsFiltering(false), 250);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0f0f1e] py-16 sm:py-20 md:py-24">
      <div className="absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-[#16213e] to-transparent opacity-60" />
      <div className="absolute -left-24 top-40 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -right-20 bottom-16 h-72 w-72 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } transition-all duration-1000`}>
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.24em] text-accent/80">Curated menu</p>
            <h2 className="text-3xl font-bold text-secondary sm:text-4xl">Choose your next favorite order</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              Search, sort, switch views, and add items directly into your cart.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
            <div className="relative min-w-0 sm:min-w-[280px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search drinks, food, categories..."
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setVisibleCount(INITIAL_VISIBLE_ITEMS);
                }}
                className="w-full rounded-full border border-gray-800 bg-[#16213e] py-3 pl-12 pr-11 text-secondary transition-all duration-300 placeholder:text-gray-500 focus:border-accent focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setVisibleCount(INITIAL_VISIBLE_ITEMS);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-500 transition-colors hover:text-secondary"
                >
                  x
                </button>
              )}
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value);
                  setVisibleCount(INITIAL_VISIBLE_ITEMS);
                }}
                className="appearance-none rounded-full border border-gray-800 bg-[#16213e] py-3 pl-4 pr-11 text-sm text-secondary focus:border-accent focus:outline-none"
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <SlidersHorizontal className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            </div>

            <div className="flex rounded-full border border-gray-800 bg-[#16213e] p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`rounded-full p-2.5 transition-all ${viewMode === 'grid' ? 'bg-accent text-primary' : 'text-gray-400 hover:text-secondary'}`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`rounded-full p-2.5 transition-all ${viewMode === 'list' ? 'bg-accent text-primary' : 'text-gray-400 hover:text-secondary'}`}
              >
                <LayoutList size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className={`transition-all duration-1000 delay-150 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={handleCategoryChange}
            counts={counts}
          />
        </div>

        <div className="mb-6 flex flex-col gap-2 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Showing <span className="font-semibold text-accent">{visibleItems.length}</span> of{' '}
            <span className="font-semibold text-secondary">{filteredItems.length}</span> results
          </p>
          <p className="capitalize">
            {activeCategory === 'all' ? 'All categories' : activeCategory}
            {searchQuery && <span className="normal-case text-gray-500"> for "{searchQuery}"</span>}
          </p>
        </div>

        {filteredItems.length === 0 ? (
          <div className="card py-16 text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <Sparkles className="text-accent/70" size={32} />
            </div>
            <h3 className="text-xl font-bold text-secondary">No items found</h3>
            <p className="mt-2 text-sm text-gray-400">Try another search term or reset the filters.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSortBy('default');
                setVisibleCount(INITIAL_VISIBLE_ITEMS);
              }}
              className="mt-5 text-sm font-semibold text-accent transition-colors hover:text-yellow-300"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div
              className={`transition-all duration-300 ${
                isFiltering ? 'scale-[0.98] opacity-60' : 'scale-100 opacity-100'
              } ${viewMode === 'grid' ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4' : 'flex flex-col gap-4'}`}
            >
              {visibleItems.map((item, idx) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  viewMode={viewMode}
                  index={idx}
                  isVisible={isVisible}
                />
              ))}
            </div>

            {canLoadMore && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                  className="rounded-full border border-gray-700 bg-[#16213e] px-8 py-3 font-semibold text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default MenuGrid;
