import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Coffee className="text-accent" size={28} />
              <span className="text-xl font-bold text-secondary">
                Brew<span className="text-accent">Cafe</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the finest coffee in town. Crafted with passion, served with love. 
              Your perfect coffee moment awaits.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <a 
                  key={idx}
                  href="#"
                  className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-gray-400 hover:bg-accent hover:text-primary transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-secondary font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Menu', 'Book Table', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-secondary font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <span>123 Coffee Street, Brew District<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <span>hello@brewcafe.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-secondary font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Clock size={18} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-secondary font-medium">Monday - Friday</p>
                  <p>7:00 AM - 9:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Clock size={18} className="text-accent flex-shrink-0 mt-0.5 invisible" />
                <div>
                  <p className="text-secondary font-medium">Saturday - Sunday</p>
                  <p>8:00 AM - 10:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} BrewCafe. All rights reserved. Crafted with ☕ and ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;