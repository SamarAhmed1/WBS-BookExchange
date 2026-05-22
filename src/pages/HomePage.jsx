/**
 * Home Page Component
 * Main landing page with all sections
 */

import { Hero } from '../components/Hero';
import { Marquee } from '../components/Marquee';
import { Steps } from '../components/Steps';
import { Offers } from '../components/Offers';
import { Features } from '../components/Features';
import { Audience } from '../components/Audience';
import { CTA } from '../components/CTA';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Marquee />
      <Steps />
      <Offers />
      <Features />
      <Audience />
      <CTA />
    </>
  );
};
