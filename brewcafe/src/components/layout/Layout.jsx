import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideFooter = location.pathname === '/contact';

  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <Navbar />
      <main className="flex-grow pt-16 pb-28 md:pt-20 md:pb-0">
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
