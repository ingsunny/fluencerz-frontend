import Header from '@/components/Header';
import HeroSection from '@/components/Hero';
import WhyChooseUs from '@/components/whychooseUs';
import InfluencerMarketplace from '@/components/InfluencerMarketplace';
import Footer from '@/components/Footer';
import HowItWorksPage from '@/components/how-work';

export default function Home() {

  return (
    <>
    <Header/>
   <HeroSection/>
   <InfluencerMarketplace/>
   <WhyChooseUs/>
   <HowItWorksPage/>
   <Footer/>
    </>
  );
}