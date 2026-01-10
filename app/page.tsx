import Image from 'next/image';
import { FC } from 'react';
import Seo from '@/components/Seo';

const Home: FC = () => {
  return (
    <>
      <Seo
        title="Home"
        description="Tactical Intellectual research archive – stylometric alignment, AI persona architecture, forensic linguistics."
      />
      <section className="relative w-full h-[64vh] overflow-hidden rounded-none">
        <Image
          src="/banner-sunrise.png"
          alt="Sunrise over a cracked salt lake with an olive flax‑bush in the foreground"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay text – minimal, white on dark background */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <h1 className="text-4xl md:text-6xl font-serif-primary text-saltWhite drop-shadow-md">
            Wize Ideation
          </h1>
        </div>
      </section>

      {/* Brief intro */}
      <section className="mt-12 text-center">
        <p className="text-lg max-w-2xl mx-auto text-striationCharcoal">
          A high‑end research archive that aligns the noise of human writing
          into a sovereign signal. Explore papers, services, and case studies
          built on forensic linguistics and AI persona architecture.
        </p>
      </section>
    </>
  );
};

export default Home;