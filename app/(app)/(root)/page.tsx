import Cta from '@/features/home/molecules/Cta';
import Features from '@/features/home/molecules/Features';
import Pricing from '@/features/home/molecules/Pricing';
import Templates from '@/features/home/molecules/Templates';
import Testimonial from '@/features/home/molecules/Testimonial';
import Hero from '@/shared/components/atoms/hero';
import { kAppDescription, kAppName } from '@/shared/lib/constants/app.constant';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: kAppName + ' -- ' + kAppDescription,
  description: kAppDescription,
};

export default function Home() {
  return (
    <>
      <Hero/>
      <Features/>
      <Templates/>
      <Testimonial/>
      <Pricing/>
      <Cta/>
    </>
  );
}
