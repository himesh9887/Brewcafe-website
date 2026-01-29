import React from 'react';
import { Coffee, CupSoda, Croissant, Utensils } from 'lucide-react';

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: 'all', label: 'All Items', icon: Utensils },
    { id: 'coffee', label: 'Coffee', icon: Coffee },
    { id: 'cold', label: 'Cold Drinks', icon: CupSoda },
    { id: 'food', label: 'Pastries', icon: Croissant },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActiveCategory(cat.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
            ${activeCategory === cat.id 
              ? 'bg-accent text-primary shadow-lg shadow-accent/25' 
              : 'bg-card text-gray-400 hover:text-secondary border border-gray-800'}`}
        >
          <cat.icon size={18} />
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;