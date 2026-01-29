import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

const PopularMenu = () => {
  const { addToCart } = useCart();

  const items = [
    {
      id: 1,
      name: 'Caramel Macchiato',
      description: 'Espresso with vanilla-flavored syrup, milk, and caramel drizzle',
      price: 5.95,
      image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop',
      tag: 'Best Seller',
    },
    {
      id: 2,
      name: 'Cold Brew',
      description: 'Slow-steeped for 20 hours for a super smooth flavor',
      price: 4.95,
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b5dd7359?w=400&h=400&fit=crop',
      tag: 'Refreshing',
    },
    {
      id: 3,
      name: 'Nitro Coffee',
      description: 'Cold brew infused with nitrogen for a creamy texture',
      price: 6.50,
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop',
      tag: 'Premium',
    },
    {
      id: 4,
      name: 'Espresso Tonic',
      description: 'Double shot espresso with premium tonic water and lime',
      price: 5.50,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop',
      tag: 'Trending',
    },
  ];

  const handleAddToCart = (item) => {
    addToCart(item);
    // Could add toast notification here
  };

  return (
    <section className="section-padding bg-card">
      <div className="max-w-7xl mx-auto">
        <SectionTitle 
          title="Popular Menu"
          subtitle="Handcrafted beverages loved by our customers. Try our signature drinks."
          centered
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {items.map((item) => (
            <div key={item.id} className="card group">
              <div className="relative overflow-hidden aspect-square">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-3 left-3 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {item.tag}
                </span>
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="absolute bottom-3 right-3 bg-secondary text-primary p-2 rounded-full shadow-lg 
                           transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
                           transition-all duration-300 hover:bg-accent"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-secondary group-hover:text-accent transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-accent font-bold">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                <button 
                  onClick={() => handleAddToCart(item)}
                  className="w-full py-2 border border-gray-700 rounded-lg text-sm font-medium 
                           text-gray-300 hover:border-accent hover:text-accent transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/menu">
            <Button variant="secondary">View Full Menu</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularMenu;