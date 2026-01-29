import React from 'react';
import { Coffee } from 'lucide-react';

const MenuHero = () => {
  return (
    <section className="relative py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <Coffee className="mx-auto text-accent mb-4" size={48} />
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">Our Menu</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Carefully curated selection of premium coffees, teas, and pastries. 
          Every item is crafted with passion and precision.
        </p>
      </div>
    </section>
  );
};

export default MenuHero;