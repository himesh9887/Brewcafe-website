import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus, ShoppingBag, Star } from 'lucide-react';
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
      description: 'Espresso with vanilla syrup, velvet milk, and caramel drizzle.',
      price: 5.95,
      image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop',
      tag: 'Best Seller',
      rating: 4.9,
    },
    {
      id: 2,
      name: 'Cold Brew',
      description: 'Slow-steeped for 20 hours for a clean, smooth finish.',
      price: 4.95,
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b5dd7359?w=400&h=400&fit=crop',
      tag: 'Refreshing',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Nitro Coffee',
      description: 'Nitro infused cold brew with a creamy, cascading texture.',
      price: 6.5,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
      tag: 'Premium',
      rating: 4.9,
    },
    {
      id: 4,
      name: 'Espresso Tonic',
      description: 'Double espresso, premium tonic, and a citrus lift.',
      price: 5.5,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
      tag: 'Trending',
      rating: 4.7,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    window.setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#16213e] py-16 sm:py-20 md:py-24">
      <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 -translate-x-1/2 translate-y-1/2 rounded-full bg-secondary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <SectionTitle
            title="Popular Menu"
            subtitle="Handcrafted signatures that regulars order again and again."
            centered
          />
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-[1.75rem] border border-gray-800 bg-[#111425] transition-all duration-500 hover:-translate-y-2 hover:border-accent/30 hover:shadow-[0_28px_60px_rgba(0,0,0,0.35)] ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${200 + idx * 100}ms` }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111425] via-[#111425]/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-50" />

                <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-primary shadow-lg">
                  <Star size={12} className="fill-current" />
                  {item.tag}
                </div>

                <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-semibold text-secondary backdrop-blur-md">
                  ★ {item.rating}
                </div>

                <button
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  disabled={addedItems[item.id]}
                  className={`absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition-all duration-500 ${
                    addedItems[item.id]
                      ? 'bg-green-500 text-white'
                      : 'translate-y-10 bg-secondary text-primary opacity-0 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-accent'
                  }`}
                >
                  {addedItems[item.id] ? <Check size={20} /> : <Plus size={20} />}
                </button>

                <div className={`absolute bottom-4 left-4 text-xs font-medium text-white/80 transition-all duration-300 ${
                  hoveredItem === item.id ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}>
                  Click to add
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-secondary transition-colors duration-300 group-hover:text-accent">
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold text-accent">${item.price.toFixed(2)}</span>
                </div>

                <p className="mb-5 text-sm leading-6 text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                  {item.description}
                </p>

                <button
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  disabled={addedItems[item.id]}
                  className={`flex w-full items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                    addedItems[item.id]
                      ? 'border-green-500/30 bg-green-500/10 text-green-300'
                      : 'border-gray-700 text-gray-300 hover:border-accent/40 hover:bg-accent/10 hover:text-accent'
                  }`}
                >
                  {addedItems[item.id] ? <Check size={16} /> : <ShoppingBag size={16} />}
                  {addedItems[item.id] ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Link to="/menu" className="inline-block group">
            <Button
              variant="secondary"
              className="border-2 border-secondary px-8 py-4 text-base text-secondary hover:bg-secondary hover:text-primary"
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
