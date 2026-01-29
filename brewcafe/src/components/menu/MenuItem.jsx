import React from 'react';
import { Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="card group flex flex-col">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {item.badge && (
          <span className="absolute top-3 left-3 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
            {item.badge}
          </span>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-secondary group-hover:text-accent transition-colors">
            {item.name}
          </h3>
          <span className="text-accent font-bold text-lg">${item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 flex-grow">{item.description}</p>
        
        <div className="flex gap-2 mt-auto">
          <button 
            onClick={() => addToCart(item)}
            className="flex-1 py-2.5 bg-accent text-primary font-semibold rounded-lg 
                     hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add to Cart
          </button>
          <button 
            className="px-4 py-2.5 border border-gray-700 rounded-lg text-secondary 
                     hover:border-accent hover:text-accent transition-colors"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;