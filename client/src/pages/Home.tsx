import ExclusiveOffers from '../components/ExclusiveOffers';
import FeaturedDestination from '../components/FeaturedDestination';
import Hero from '../components/Hero';
import NewsLetter from '../components/NewsLetter';
import RecommendedHotels from '../components/RecommendedHotels';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <RecommendedHotels />
      <FeaturedDestination />
      <ExclusiveOffers />
      <Testimonials />
      <NewsLetter />
    </>
  );
};

export default Home;
