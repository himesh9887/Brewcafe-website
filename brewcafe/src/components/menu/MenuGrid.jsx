import React, { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import MenuItem from './MenuItem';

const MenuGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const menuItems = [
    {
      id: 1,
      name: 'Espresso',
      description: 'Rich, intense coffee shot with golden crema',
      price: 3.50,
      category: 'coffee',
      image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop',
      badge: 'Classic',
    },
    {
      id: 2,
      name: 'Cappuccino',
      description: 'Espresso with steamed milk foam and cocoa dust',
      price: 4.50,
      category: 'coffee',
      image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      name: 'Iced Latte',
      description: 'Espresso poured over ice with cold milk',
      price: 5.00,
      category: 'cold',
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b5dd7359?w=400&h=300&fit=crop',
      badge: 'Popular',
    },
    {
      id: 4,
      name: 'Croissant',
      description: 'Buttery, flaky French pastry baked fresh daily',
      price: 3.75,
      category: 'food',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
    },
    {
      id: 5,
      name: 'Cold Brew',
      description: '20-hour steeped coffee, smooth and bold',
      price: 4.95,
      category: 'cold',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    },
    {
      id: 6,
      name: 'Mocha',
      description: 'Espresso with chocolate and steamed milk',
      price: 5.50,
      category: 'coffee',
      image: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&h=300&fit=crop',
    },
    {
      id: 7,
      name: 'Avocado Toast',
      description: 'Sourdough with smashed avocado and poached egg',
      price: 12.00,
      category: 'food',
      image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
      badge: 'Breakfast',
    },
    {
      id: 8,
      name: 'Matcha Latte',
      description: 'Premium Japanese matcha with steamed milk',
      price: 5.95,
      category: 'cold',
      image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3114?w=400&h=300&fit=crop',
    },
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuGrid;