'use client'; // (only needed if you are using Next.js 13+ App Router)

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

import Header from '@/components/Header';
import HeroSection from '@/components/Hero';
import WhyChooseUs from '@/components/whychooseUs';
import InfluencerMarketplace from '@/components/InfluencerMarketplace';
import Footer from '@/components/Footer';
import HowItWorksPage from '@/components/how-work';
import GrowthInNumbers from '@/components/Growth';
import OurServices from '@/components/services';
import Media from '@/components/media';

export default function Home() {


  return (
    <>
      <Header/>
      <HeroSection/>
      <GrowthInNumbers/>
      <Media/>
      <InfluencerMarketplace/>
      
      {/* <WhyChooseUs/> */}
      <OurServices/>
      <HowItWorksPage/>
      <Footer/>
    </>
  );
}
