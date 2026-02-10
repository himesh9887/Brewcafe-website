import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Coffee } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import logo from '../../assets/images/favicon.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { count } = useCart();
  const { user, logout } = useAuth();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/menu', label: 'Menu' },
    { path: '/booking', label: 'Book Table' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}

          <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="BrewCafe Logo" className="h-15 w-15" />
            <span className="text-xl md:text-2xl font-bold text-secondary">
              Brew<span className="text-accent">Cafe</span>
            </span>
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-300 hover:text-accent
                  ${isActive(link.path) ? 'text-accent' : 'text-gray-300'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/menu" className="relative p-2 hover:text-accent transition-colors">
              <ShoppingCart size={24} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300">{user.name}</span>
                <Button variant="ghost" onClick={logout} className="text-sm">
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" className="text-sm py-2 px-4">
                  <User size={18} />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-secondary hover:text-accent transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-gray-800 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-3 px-4 rounded-lg font-medium transition-colors
                  ${isActive(link.path) ? 'bg-card text-accent' : 'text-gray-300 hover:bg-card hover:text-accent'}`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-800 space-y-2">
              <Link 
                to="/menu" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 py-3 px-4 text-gray-300 hover:text-accent"
              >
                <ShoppingCart size={20} />
                Cart ({count})
              </Link>
              
              {user ? (
                <button 
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="w-full text-left py-3 px-4 text-gray-300 hover:text-accent"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="block py-3 px-4 text-accent font-medium"
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;