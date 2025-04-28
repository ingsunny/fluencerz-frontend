import Header from '@/components/Header';
import HeroSection from '@/components/Hero';
import WhyChooseUs from '@/components/whychooseUs';
import InfluencerMarketplace from '@/components/InfluencerMarketplace';
import Footer from '@/components/Footer';
import HowItWorksPage from '@/components/how-work';
import GrowthInNumbers from '@/components/Growth';
import OurServices from '@/components/services';

export default function Home() {

  return (
    <>
    <Header/>
   <HeroSection/>
   <InfluencerMarketplace/>
   <GrowthInNumbers/>
   <WhyChooseUs/>
   <OurServices/>
   <HowItWorksPage/>
   <Footer/>
    </>
  );
}