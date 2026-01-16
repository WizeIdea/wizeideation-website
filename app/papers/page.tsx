import { getAllPapers } from '@/lib/papers-data';
import { ResearchList } from '@/components/ResearchList';

export const metadata = {
  title: 'Research Papers | Wize Idea - AI Architecture & Authorship Analysis',
  description: 'Independent research publications on AI systems, authorship integrity, forensic stylometry, and linguistic pattern analysis. Peer-reviewed technical papers with DOI attribution.',
  openGraph: {
    title: 'Research Papers | Wize Idea',
    description: 'Technical research papers on AI system design, authorship provenance, stylometric alignment, and auditable communication architectures.',
    url: 'https://wizeidea.com/papers/',
    siteName: 'Wize Idea',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default async function PapersIndex() {
  const papers = getAllPapers();

  return (
    <section
      aria-label="List of research papers"
      className="max-w-4xl mx-auto"
    >
      <h1 className="font-serif-primary text-dpmOlive text-3xl font-bold mt-8 mb-8 pb-2 border-b-2 border-burntOchre">
        Research Papers
      </h1>

      {/* Render the dynamic list */}
      <ResearchList items={papers} basePath="/papers" />
    </section>
  );
}
