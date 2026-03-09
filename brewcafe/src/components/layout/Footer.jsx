import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUp,
  Clock,
  Coffee,
  Facebook,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from 'lucide-react';
import { CAFE_CONTACT } from '../../config/contact';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Booking', path: '/booking' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', hover: 'hover:bg-blue-600' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', hover: 'hover:bg-pink-600' },
    { icon: Twitter, href: 'https://x.com', label: 'X', hover: 'hover:bg-sky-500' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube', hover: 'hover:bg-red-600' },
  ];

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;

    setSubscribed(true);
    setEmail('');
    window.setTimeout(() => setSubscribed(false), 2500);
  };

  return (
    <footer className="relative border-t border-gray-800 bg-[#111425]">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-accent text-primary shadow-lg shadow-accent/20 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300"
      >
        <ArrowUp size={20} />
      </button>

      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="card flex flex-col gap-6 px-6 py-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.24em] text-accent/80">Newsletter</p>
              <h3 className="text-3xl font-bold text-secondary">Fresh offers. New brews.</h3>
              <p className="mt-2 text-sm text-gray-400">Get launch offers, tasting notes, and seasonal updates.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="input-field pl-11"
                  required
                />
              </div>
              <button
                type="submit"
                className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                  subscribed
                    ? 'bg-green-500 text-white'
                    : 'bg-accent text-primary hover:-translate-y-0.5 hover:bg-yellow-300'
                }`}
              >
                {subscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="rounded-2xl bg-accent/10 p-3">
                <Coffee className="text-accent" size={24} />
              </div>
              <span className="text-2xl font-bold text-secondary">
                Brew<span className="text-accent">Cafe</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-7 text-gray-400">
              Specialty coffee, artisan bakes, and a warm room to work, meet, or slow down.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-white/5 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:text-white ${social.hover}`}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-secondary">Navigate</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="group inline-flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-secondary">Visit</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 text-accent" size={18} />
                <p>{CAFE_CONTACT.addressLine1}<br />{CAFE_CONTACT.addressLine2}</p>
              </div>
              <a href={`tel:${CAFE_CONTACT.phonePrimary}`} className="flex items-center gap-3 transition-colors hover:text-accent">
                <Phone className="text-accent" size={18} />
                {CAFE_CONTACT.phonePrimary}
              </a>
              <a href={`mailto:${CAFE_CONTACT.email}`} className="flex items-center gap-3 transition-colors hover:text-accent">
                <Mail className="text-accent" size={18} />
                {CAFE_CONTACT.email}
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-secondary">Hours</h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <Clock className="mt-1 text-accent" size={18} />
                <div>
                  <p className="font-medium text-secondary">Monday - Friday</p>
                  <p>7:00 AM - 9:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-1 text-accent" size={18} />
                <div>
                  <p className="font-medium text-secondary">Saturday - Sunday</p>
                  <p>8:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                Open now
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col gap-3 px-4 py-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="flex items-center gap-1">
            Copyright {currentYear} BrewCafe. Crafted with <Heart size={14} className="fill-current text-red-500" /> and coffee.
          </p>
          <div className="flex gap-5">
            <a href="#!" className="transition-colors hover:text-accent">Privacy</a>
            <a href="#!" className="transition-colors hover:text-accent">Terms</a>
            <a href="#!" className="transition-colors hover:text-accent">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
