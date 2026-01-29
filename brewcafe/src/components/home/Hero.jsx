import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee } from 'lucide-react';
import Button from '../common/Button';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-dark z-10" />
        <img 
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=1920&h=1080&fit=crop"
          alt="Coffee Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Coffee size={16} className="text-accent" />
          <span className="text-accent text-sm font-medium">Premium Coffee Experience</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-slide-up">
          Fresh Coffee,<br />
          <span className="text-gradient">Fresh Mood</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Discover the art of perfect brewing. From single-origin beans to artisanal blends, 
          every cup tells a story of passion and precision.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Link to="/menu">
            <Button className="w-full sm:w-auto text-lg px-8 py-4">
              Order Now
              <ArrowRight size={20} />
            </Button>
          </Link>
          <Link to="/booking">
            <Button variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4">
              Book Table
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {[
            { value: '15+', label: 'Coffee Varieties' },
            { value: '50K+', label: 'Happy Customers' },
            { value: '10+', label: 'Years Experience' },
            { value: '4.9', label: 'Average Rating' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;