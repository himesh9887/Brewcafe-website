import React from 'react';
import Layout from '../../components/layout/Layout';
import Hero from '../../components/home/Hero';
import AboutPreview from '../../components/home/AboutPreview';
import PopularMenu from '../../components/home/PopularMenu';
import WhyChooseUs from '../../components/home/WhyChooseUs';
import OffersBanner from '../../components/home/OffersBanner';
import GalleryPreview from '../../components/home/GalleryPreview';
import Reviews from '../../components/home/Reviews';
import CallToAction from '../../components/home/CallToAction';

const Home = () => {
  return (
    <Layout>
      <Hero />
      <AboutPreview />
      <PopularMenu />
      <WhyChooseUs />
      <OffersBanner />
      <GalleryPreview />
      <Reviews />
      <CallToAction />
    </Layout>
  );
};

export default Home;