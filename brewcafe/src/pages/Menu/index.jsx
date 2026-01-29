import React from 'react';
import Layout from '../../components/layout/Layout';
import MenuHero from '../../components/menu/MenuHero';
import MenuGrid from '../../components/menu/MenuGrid';
import OffersStrip from '../../components/menu/OffersStrip';
import MenuCTA from '../../components/menu/MenuCTA';

const Menu = () => {
  return (
    <Layout>
      <MenuHero />
      <MenuGrid />
      <OffersStrip />
      <MenuCTA />
    </Layout>
  );
};

export default Menu;