// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Coffee, MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-primary border-t border-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-padding">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//           {/* Brand */}
//           <div className="space-y-4">
//             <Link to="/" className="flex items-center gap-2">
//               <Coffee className="text-accent" size={28} />
//               <span className="text-xl font-bold text-secondary">
//                 Brew<span className="text-accent">Cafe</span>
//               </span>
//             </Link>
//             <p className="text-gray-400 text-sm leading-relaxed">
//               Experience the finest coffee in town. Crafted with passion, served with love. 
//               Your perfect coffee moment awaits.
//             </p>
//             <div className="flex gap-4">
//               {[Facebook, Instagram, Twitter].map((Icon, idx) => (
//                 <a 
//                   key={idx}
//                   href="#"
//                   className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-gray-400 hover:bg-accent hover:text-primary transition-all duration-300"
//                 >
//                   <Icon size={18} />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-secondary font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-3">
//               {['Home', 'About Us', 'Menu', 'Book Table', 'Contact'].map((item) => (
//                 <li key={item}>
//                   <Link 
//                     to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
//                     className="text-gray-400 hover:text-accent transition-colors text-sm"
//                   >
//                     {item}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-secondary font-semibold mb-4">Contact Us</h3>
//             <ul className="space-y-3">
//               <li className="flex items-start gap-3 text-gray-400 text-sm">
//                 <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
//                 <span>123 Coffee Street, Brew District<br />New York, NY 10001</span>
//               </li>
//               <li className="flex items-center gap-3 text-gray-400 text-sm">
//                 <Phone size={18} className="text-accent flex-shrink-0" />
//                 <span>+1 (555) 123-4567</span>
//               </li>
//               <li className="flex items-center gap-3 text-gray-400 text-sm">
//                 <Mail size={18} className="text-accent flex-shrink-0" />
//                 <span>hello@brewcafe.com</span>
//               </li>
//             </ul>
//           </div>

//           {/* Hours */}
//           <div>
//             <h3 className="text-secondary font-semibold mb-4">Opening Hours</h3>
//             <ul className="space-y-3">
//               <li className="flex items-start gap-3 text-gray-400 text-sm">
//                 <Clock size={18} className="text-accent flex-shrink-0 mt-0.5" />
//                 <div>
//                   <p className="text-secondary font-medium">Monday - Friday</p>
//                   <p>7:00 AM - 9:00 PM</p>
//                 </div>
//               </li>
//               <li className="flex items-start gap-3 text-gray-400 text-sm">
//                 <Clock size={18} className="text-accent flex-shrink-0 mt-0.5 invisible" />
//                 <div>
//                   <p className="text-secondary font-medium">Saturday - Sunday</p>
//                   <p>8:00 AM - 10:00 PM</p>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-gray-800 mt-12 pt-8 text-center">
//           <p className="text-gray-500 text-sm">
//             © {currentYear} BrewCafe. All rights reserved. Crafted with ☕ and ❤️
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Coffee, MapPin, Phone, Mail, Clock, 
  Facebook, Instagram, Twitter, Youtube,
  ArrowUp, Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Book Table', path: '/booking' },
    { name: 'Contact', path: '/contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
  ];

  return (
    <footer className="bg-[#1a1a2e] border-t border-gray-800 relative">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-[#d4af37] rounded-full 
                 flex items-center justify-center text-[#1a1a2e] shadow-lg hover:bg-[#fde047] 
                 hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 group"
      >
        <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
      </button>

      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f5dc] mb-2">
                Stay in the Loop
              </h3>
              <p className="text-gray-400">Get exclusive offers and coffee tips delivered to your inbox.</p>
            </div>
            <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex gap-3">
              <div className="relative flex-1 lg:w-80">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#16213e] border border-gray-700 rounded-lg pl-12 pr-4 py-3 
                           text-[#f5f5dc] placeholder-gray-500 focus:outline-none focus:border-[#d4af37]
                           transition-colors duration-300"
                  required
                />
              </div>
              <button
                type="submit"
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300
                          ${subscribed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-[#d4af37] text-[#1a1a2e] hover:bg-[#fde047] hover:scale-105'
                          }`}
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-[#d4af37]/10 rounded-lg group-hover:bg-[#d4af37]/20 transition-colors">
                <Coffee className="text-[#d4af37]" size={28} />
              </div>
              <span className="text-2xl font-bold text-[#f5f5dc]">
                Brew<span className="text-[#d4af37]">Cafe</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the finest coffee in town. Crafted with passion, served with love. 
              Your perfect coffee moment awaits.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-10 h-10 rounded-full bg-[#16213e] flex items-center justify-center 
                           text-gray-400 ${social.color} hover:text-white transition-all duration-300
                           hover:scale-110 hover:shadow-lg`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#f5f5dc] font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#d4af37]" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    onMouseEnter={() => setHoveredLink(idx)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="text-gray-400 hover:text-[#d4af37] transition-colors text-sm 
                             flex items-center gap-2 group"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full bg-[#d4af37] transition-all duration-300
                                   ${hoveredLink === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                    {link.name}
                    <span className={`transition-transform duration-300 ${hoveredLink === idx ? 'translate-x-1' : ''}`}>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#f5f5dc] font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#d4af37]" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm group cursor-pointer">
                <div className="p-2 bg-[#16213e] rounded-lg group-hover:bg-[#d4af37]/10 transition-colors">
                  <MapPin size={16} className="text-[#d4af37]" />
                </div>
                <span className="group-hover:text-[#f5f5dc] transition-colors">
                  123 Coffee Street, Brew District<br />New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm group cursor-pointer">
                <div className="p-2 bg-[#16213e] rounded-lg group-hover:bg-[#d4af37]/10 transition-colors">
                  <Phone size={16} className="text-[#d4af37]" />
                </div>
                <span className="group-hover:text-[#f5f5dc] transition-colors">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm group cursor-pointer">
                <div className="p-2 bg-[#16213e] rounded-lg group-hover:bg-[#d4af37]/10 transition-colors">
                  <Mail size={16} className="text-[#d4af37]" />
                </div>
                <span className="group-hover:text-[#f5f5dc] transition-colors">hello@brewcafe.com</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-[#f5f5dc] font-semibold mb-4 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#d4af37]" />
              Opening Hours
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <div className="p-2 bg-[#16213e] rounded-lg">
                  <Clock size={16} className="text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-[#f5f5dc] font-medium text-sm">Monday - Friday</p>
                  <p className="text-gray-400 text-xs">7:00 AM - 9:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <div className="p-2 bg-[#16213e] rounded-lg">
                  <Clock size={16} className="text-[#d4af37]" />
                </div>
                <div>
                  <p className="text-[#f5f5dc] font-medium text-sm">Saturday - Sunday</p>
                  <p className="text-gray-400 text-xs">8:00 AM - 10:00 PM</p>
                </div>
              </li>
              <li className="mt-4 p-3 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/20">
                <p className="text-[#d4af37] text-xs font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Open Now
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-gray-500 text-sm flex items-center gap-1 flex-wrap justify-center">
              © {currentYear} BrewCafe. All rights reserved. Crafted with 
              <Coffee size={14} className="text-[#d4af37]" /> 
              and 
              <Heart size={14} className="text-red-500 fill-current" />
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-[#d4af37] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#d4af37] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[#d4af37] transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;