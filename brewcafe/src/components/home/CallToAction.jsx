import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const CallToAction = () => {
  return (
    <section className="section-padding bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212,175,55,0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-secondary">
          Ready to Experience the <span className="text-gradient">Perfect Brew?</span>
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Whether you are looking for a quick caffeine fix or a cozy spot to work, 
          BrewCafe has you covered. Order online or book your table today.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/menu">
            <Button className="text-lg px-8 py-4">
              Order Online
              <ArrowRight size={20} />
            </Button>
          </Link>
          <Link to="/booking">
            <Button variant="secondary" className="text-lg px-8 py-4">
              Reserve Table
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;