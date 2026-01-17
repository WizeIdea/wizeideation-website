import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Independent research projects and applied technical work in AI systems architecture, authorship integrity, and forensic stylometry by Wize Idea consultancy.',
  openGraph: {
    title: 'Projects | Wize Idea',
    description: 'Research projects and technical initiatives in AI architecture, authorship provenance, and auditable systems design.',
    url: 'https://wizeidea.com/projects/',
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

export default function ProjectsIndex() {
  return (
    <section className="max-w-4xl mx-auto font-serif-body text-base">
      <h1 className="font-serif-primary text-burntOchre text-xl font-semibold mt-3 mb-4 pb-2 border-b border-burntOchre">Projects</h1>
      
      <p className="mb-4 leading-relaxed text-striationCharcoal">
        We are busy working on external Projects.
      </p>
      <p className="leading-relaxed text-striationCharcoal">
        Details of our projects will be uploaded soon.
      </p>
      
      {/* Dynamic project list - will be restored later */}
      {/* <ul className="ml-6">
        <li className="mb-2"><a href="/projects/sample-project" className="text-burntOchre hover:underline">Sample Project</a></li>
      </ul> */}
    </section>
  );
}
