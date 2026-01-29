import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const MenuCTA = () => {
  return (
    <section className="section-padding bg-dark text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-secondary">Looking for a Place to Work?</h2>
        <p className="text-gray-400 mb-8">
          Our cafe offers free high-speed WiFi, comfortable seating, and plenty of power outlets. 
          Book a table and enjoy the perfect work environment.
        </p>
        <Link to="/booking">
          <Button variant="secondary">Reserve Your Spot</Button>
        </Link>
      </div>
    </section>
  );
};

export default MenuCTA;