import { getAllPapers } from '@/lib/papers-data';
import { ResearchList } from '@/components/ResearchList';

export const metadata = {
  title: 'Research Papers – Wize Ideation',
  description:
    'A curated repository of forensic stylometric research papers authored by Wize Ideation. Explore authoritative analyses on AI persona architecture and linguistic forensics.',
  openGraph: {
    title: 'Research Papers – Wize Ideation',
    description:
      'Explore our forensic-styled research papers on stylometric alignment, AI persona architecture, and forensic linguistics.',
    type: 'website',
    url: 'https://wizeidea.com/papers',
    images: [{ url: 'https://wizeidea.com/og-image-papers.png' }],
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
