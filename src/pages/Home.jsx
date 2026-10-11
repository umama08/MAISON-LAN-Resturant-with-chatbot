import React from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import FeaturedDish from '../components/FeaturedDish';
import SpecialOffer from '../components/SpecialOffer';
import ExperienceSection from '../components/ExperienceSection';
import Testimonials from '../components/Testimonials';
import GallerySection from '../components/GallerySection';

const Home = ({ onNavigate, onAddToCart, onAddSpecialOffer, onOpenReservation }) => {
  return (
    <main>
      <Hero
        onExploreMenu={() => onNavigate('menu')}
        onReserveTable={onOpenReservation}
      />
      <AboutSection onReadMore={() => onNavigate('about')} />
      <FeaturedDish
        onAddToCart={onAddToCart}
        onViewFullMenu={() => onNavigate('menu')}
      />
      <SpecialOffer onAddSpecialOffer={onAddSpecialOffer} />
      <ExperienceSection />
      <Testimonials />
      <GallerySection />
    </main>
  );
};

export default Home;
