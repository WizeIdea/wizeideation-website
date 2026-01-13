import Image from 'next/image';
import { FC } from 'react';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const Home: FC = () => {
  return (
    <>
      <Seo
        title="Home"
        description="Tactical Intellectual research archive – stylometric alignment, AI persona architecture, forensic linguistics."
      />
      
      {/* Hero Section - Full bleed landscape banner */}
      <section className="relative w-full overflow-hidden rounded-none -mt-8 -mx-4">
        <div className="relative w-full" style={{ aspectRatio: '840/340' }}>
          <Image
            src="/banner-sunrise.png"
            alt="Sunrise over a cracked salt lake with an olive flax‑bush in the foreground"
            fill
            priority
            className="object-cover"
          />
          {/* Overlay with content positioned near top and bottom */}
          <div className="absolute inset-0 flex flex-col justify-between px-4">
            {/* Text near top */}
            <div className="flex flex-col items-center justify-start pt-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-primary text-burntOchre drop-shadow-lg mb-3">
                Wize Ideation
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-dpmOlive font-serif-body max-w-2xl text-center">
                Strategic AI Architecture for Authorship Provenance and Integrity
              </p>
            </div>
            
            {/* Buttons near bottom */}
            <div className="flex items-end justify-center pb-10">
              <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
                <Link href="/papers">
                  <Button variant="primary">View Research</Button>
                </Link>
                <Link href="/about">
                  <Button variant="primary">Learn More</Button>
                </Link>
                <Link href="/services">
                  <Button variant="primary">Services</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="max-w-4xl mx-auto mt-8 mb-8">
        <p className="text-lg text-center mb-8 text-striationCharcoal font-serif-body leading-relaxed">
          Wize Ideation is an independent consulting and research practice operating at the intersection of artificial intelligence, systems architecture, and human authorship.
        </p>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="border border-dpmOlive bg-olive50 p-6 hover:border-burntOchre transition-colors">
            <h3 className="font-serif-primary text-dpmOlive text-xl font-bold mb-3">Forensic Stylometry</h3>
            <p className="font-serif-body text-sm text-striationCharcoal leading-relaxed">
              Attribution analysis and linguistic fingerprinting for AI-generated and human-authored content.
            </p>
          </div>
          <div className="border border-dpmOlive bg-olive50 p-6 hover:border-burntOchre transition-colors">
            <h3 className="font-serif-primary text-dpmOlive text-xl font-bold mb-3">Attribution Integrity</h3>
            <p className="font-serif-body text-sm text-striationCharcoal leading-relaxed">
              Designing systems that preserve authorship clarity and institutional accountability.
            </p>
          </div>
          <div className="border border-dpmOlive bg-olive50 p-6 hover:border-burntOchre transition-colors">
            <h3 className="font-serif-primary text-dpmOlive text-xl font-bold mb-3">Auditable AI Systems</h3>
            <p className="font-serif-body text-sm text-striationCharcoal leading-relaxed">
              Architectural design for authorship integrity across complex institutional and regulated frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* Research Preview */}
      <section className="max-w-4xl mx-auto mb-8">
        <h2 className="font-serif-primary text-dpmOlive text-2xl font-bold mb-6 pb-2 border-b-2 border-burntOchre">
          Latest Research
        </h2>
        <p className="font-serif-body text-base text-striationCharcoal mb-6 leading-relaxed">
          Technical research addressing stylometric alignment, foundational AI ethics, and the forensic preservation of human authorship.
        </p>
        <Link href="/papers">
          <Button variant="secondary">View All Research</Button>
        </Link>
      </section>

      {/* Trust Bar */}
      <section className="bg-olive50 border-y border-dpmOlive py-4 mb-1">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="font-serif-primary text-3xl text-burntOchre font-bold mb-2">20+</div>
            <div className="font-serif-body text-sm text-striationCharcoal">Years Experience</div>
          </div>
          <div>
            <div className="font-serif-primary text-3xl text-burntOchre font-bold mb-2">Independent</div>
            <div className="font-serif-body text-sm text-striationCharcoal">Principal Practice</div>
          </div>
          <div>
            <div className="font-serif-primary text-3xl text-burntOchre font-bold mb-2">Research-Backed</div>
            <div className="font-serif-body text-sm text-striationCharcoal">Evidence-Based Methods</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;