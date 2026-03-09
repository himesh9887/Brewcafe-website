import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import logo from '../../assets/images/favicon.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartItems, count, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, logout } = useAuth();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/menu', label: 'Menu' },
    { path: '/booking', label: 'Book Table' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsOpen(false);
      setIsCartOpen(false);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      isScrolled
        ? 'border-accent/20 bg-primary/90 shadow-2xl shadow-black/20 backdrop-blur-xl'
        : 'border-gray-800 bg-primary/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="rounded-2xl border border-accent/20 bg-white/5 p-1.5 transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
              <img src={logo} alt="BrewCafe Logo" className="h-10 w-10 rounded-xl object-cover md:h-11 md:w-11" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-secondary transition-colors duration-300 group-hover:text-white">
              Brew<span className="text-accent">Cafe</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-sm font-medium transition-colors duration-300 hover:text-accent
                  ${isActive(link.path) ? 'text-accent' : 'text-gray-300'}`}
              >
                {link.label}
                <span className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-accent transition-all duration-300 ${
                  isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full border border-gray-700/80 bg-white/5 p-2.5 text-secondary transition-all duration-300 hover:border-accent/40 hover:text-accent"
            >
              <ShoppingCart size={24} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary">
                  {count}
                </span>
              )}
            </button>
            
            {user ? (
              <div className="flex items-center gap-3 rounded-full border border-gray-800 bg-white/5 px-3 py-2">
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

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative rounded-full border border-gray-700/80 bg-white/5 p-2 text-secondary transition-colors hover:text-accent"
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full border border-gray-700/80 bg-white/5 p-2 text-secondary transition-colors hover:text-accent"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="glass-panel md:hidden border-t border-gray-800 animate-fade-in">
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
              <button
                type="button"
                onClick={() => { setIsOpen(false); setIsCartOpen(true); }}
                className="flex w-full items-center gap-3 py-3 px-4 text-left text-gray-300 hover:text-accent"
              >
                <ShoppingCart size={20} />
                Cart ({count})
              </button>
              
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
    {isCartOpen && (
      <div className="fixed inset-0 z-[60]">
        <button
          type="button"
          aria-label="Close cart"
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <aside className="absolute right-0 top-0 h-full w-full max-w-md border-l border-gray-800 bg-[#111425] p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-accent/80">Your Cart</p>
              <h2 className="text-2xl font-bold text-secondary">{count} item{count === 1 ? '' : 's'}</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="rounded-full border border-gray-700 p-2 text-gray-300 transition-colors hover:text-accent"
            >
              <X size={20} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="card flex h-[calc(100%-7rem)] flex-col items-center justify-center gap-3 p-8 text-center">
              <ShoppingCart size={40} className="text-accent/70" />
              <p className="text-lg font-semibold text-secondary">Cart is empty</p>
              <p className="text-sm text-gray-400">Add drinks and food from the menu to start your order.</p>
              <Link to="/menu">
                <Button onClick={() => setIsCartOpen(false)}>Browse Menu</Button>
              </Link>
            </div>
          ) : (
            <div className="flex h-[calc(100%-7rem)] flex-col">
              <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="card p-4">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-secondary">{item.name}</h3>
                        <p className="text-sm text-gray-400">${item.price.toFixed(2)} each</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-full p-2 text-gray-500 transition-colors hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-gray-700 px-2 py-1">
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-300 hover:text-accent">
                          <Minus size={16} />
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold text-secondary">{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-300 hover:text-accent">
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="font-semibold text-accent">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-3xl border border-accent/20 bg-accent/10 p-5">
                <div className="mb-4 flex items-center justify-between text-sm text-gray-300">
                  <span>Estimated Total</span>
                  <span className="text-2xl font-bold text-secondary">${total.toFixed(2)}</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" className="flex-1 border border-gray-700" onClick={clearCart}>
                    Clear
                  </Button>
                  <Link to="/booking" className="flex-1" onClick={() => setIsCartOpen(false)}>
                    <Button className="w-full">Checkout</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    )}
    </>
  );
};

export default Navbar;
