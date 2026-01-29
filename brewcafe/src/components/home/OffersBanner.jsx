import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Button from '../common/Button';

const OffersBanner = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-accent to-yellow-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/20 rounded-full">
              <Sparkles className="text-primary" size={32} />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-1">
                20% Off First Order!
              </h3>
              <p className="text-primary/80 font-medium">
                Use code: BREW20 • Limited time offer for new customers
              </p>
            </div>
          </div>
          
          <Link to="/menu">
            <Button className="bg-primary text-secondary hover:bg-dark whitespace-nowrap">
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OffersBanner;