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
          {/* Overlay with centered content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-primary text-burntOchre drop-shadow-lg" style={{ marginTop: '-70pt' }}>
              Wize Ideation
            </h1>
          </div>
        </div>
      </section>

      {/* Tagline */}
      <section className="max-w-4xl mx-auto mt-4">
        <h2 className="text-xl sm:text-2xl font-serif-primary text-dpmOlive text-center mb-3">
          Strategic AI Architecture for Authorship Provenance and Integrity
        </h2>
      </section>

      {/* Value Proposition */}
      <section className="max-w-4xl mx-auto mb-8">
        <p className="text-lg text-center mb-8 text-striationCharcoal font-serif-body leading-relaxed">
          Wize Ideation is an independent consulting and research practice operating at the intersection of artificial intelligence, systems architecture, and human authorship.
        </p>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/services#service-1" className="block">
            <div className="border border-dpmOlive bg-olive50 p-6 hover:border-burntOchre hover:shadow-md transition-all cursor-pointer">
              <h3 className="font-serif-primary text-burntOchre text-xl font-bold mb-3">Attribution Integrity</h3>
              <p className="font-serif-body text-sm text-striationCharcoal leading-relaxed mb-2">
                Designing systems that preserve authorship clarity and institutional accountability.
              </p>
              <span className="font-serif-body text-xs text-burntOchre">Learn more →</span>
            </div>
          </Link>
          <Link href="/services#service-2" className="block">
            <div className="border border-dpmOlive bg-olive50 p-6 hover:border-burntOchre hover:shadow-md transition-all cursor-pointer">
              <h3 className="font-serif-primary text-burntOchre text-xl font-bold mb-3">Forensic Stylometry</h3>
              <p className="font-serif-body text-sm text-striationCharcoal leading-relaxed mb-2">
                Attribution analysis and linguistic fingerprinting for AI-generated and human-authored content.
              </p>
              <span className="font-serif-body text-xs text-burntOchre">Learn more →</span>
            </div>
          </Link>
          <Link href="/services#service-3" className="block">
            <div className="border border-dpmOlive bg-olive50 p-6 hover:border-burntOchre hover:shadow-md transition-all cursor-pointer">
              <h3 className="font-serif-primary text-burntOchre text-xl font-bold mb-3">Auditable AI Systems</h3>
              <p className="font-serif-body text-sm text-striationCharcoal leading-relaxed mb-2">
                Architectural design for authorship integrity across complex institutional frameworks.
              </p>
              <span className="font-serif-body text-xs text-burntOchre">Learn more →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Research Preview */}
      <section className="max-w-4xl mx-auto mb-8">
        <h2 className="font-serif-primary text-dpmOlive text-2xl font-bold mb-6 pb-2 border-b-2 border-burntOchre">
          Latest Research
        </h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-serif-body text-base text-striationCharcoal leading-relaxed flex-1">
            Technical research addressing stylometric alignment, foundational AI ethics, and the forensic preservation of human authorship.
          </p>
          <Link href="/papers" className="flex-shrink-0">
            <Button variant="secondary">View All Research</Button>
          </Link>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-olive50 border-y border-dpmOlive py-4 mb-1">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="font-serif-primary text-xl text-burntOchre font-bold mb-2">20+</div>
            <div className="font-serif-body text-sm text-striationCharcoal">Years Experience</div>
          </div>
          <div>
            <div className="font-serif-primary text-xl text-burntOchre font-bold mb-2">Independent</div>
            <div className="font-serif-body text-sm text-striationCharcoal">Principal Practice</div>
          </div>
          <div>
            <div className="font-serif-primary text-xl text-burntOchre font-bold mb-2">Research-Backed</div>
            <div className="font-serif-body text-sm text-striationCharcoal">Evidence-Based Methods</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;