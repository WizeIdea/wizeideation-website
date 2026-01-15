import Image from 'next/image';
import { FC } from 'react';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/Button';
import { FeaturedPaperCard } from '@/components/FeaturedPaperCard';
import { getFeaturedPapers } from '@/lib/papers-data';
import Link from 'next/link';

const Home: FC = () => {
  const featuredPapers = getFeaturedPapers(3);

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
          <div className="absolute inset-0 flex flex-col justify-between items-center px-4 py-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif-primary text-burntOchre drop-shadow-lg text-center">
              Strategic AI Architecture
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-serif-primary text-burntOchre drop-shadow-lg text-center md:mb-auto" style={{ transform: 'translateY(-70px)' }}>
              Authorship Provenance and Integrity
            </h2>
          </div>
        </div>
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

      {/* Featured Research */}
      <section className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-2 border-b-2 border-burntOchre">
          <h2 className="font-serif-primary text-burntOchre text-2xl font-bold">
            Featured Research
          </h2>
          <Link href="/papers" className="flex-shrink-0">
            <Button variant="secondary">View All Research</Button>
          </Link>
        </div>
        
        <div className="space-y-4">
          {featuredPapers.length > 0 ? (
            featuredPapers.map((paper) => (
              <FeaturedPaperCard
                key={paper.slug}
                slug={paper.slug}
                title={paper.title}
                excerpt={paper.excerpt}
                DOI={paper.DOI}
              />
            ))
          ) : (
            <p className="font-serif-body text-base text-striationCharcoal leading-relaxed text-center py-8">
              Technical research addressing stylometric alignment, foundational AI ethics, and the forensic preservation of human authorship.
            </p>
          )}
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-olive50 border-y border-dpmOlive py-4 mb-1">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="font-serif-primary text-xl text-burntOchre font-bold">
              20+ Years Experience
            </div>
          </div>
          <div>
            <div className="font-serif-primary text-xl text-burntOchre font-bold">
              Independent
            </div>
          </div>
          <div>
            <div className="font-serif-primary text-xl text-burntOchre font-bold">
              Research-Backed
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;