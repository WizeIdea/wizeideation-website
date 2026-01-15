import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal Notice & Terms | Wize Ideation - Advisory Service Terms',
  description: 'Legal terms, conditions, and governance framework for independent advisory services. Intellectual property, liability limitations, and engagement terms.',
  openGraph: {
    title: 'Legal Notice & Terms of Use | Wize Ideation',
    description: 'Legal framework and terms of use for research publications and technical advisory services.',
    url: 'https://wizeidea.com/legal',
    siteName: 'Wize Ideation',
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

export default function LegalPage() {
  return (
    <section className="max-w-4xl mx-auto font-serif-body text-base">
      <h1 className="font-serif-primary text-dpmOlive text-3xl font-bold mt-8 mb-6 pb-2 border-b-2 border-burntOchre">
        Legal Notice & Terms of Use
      </h1>

      <h2 className="font-serif-primary text-dpmOlive text-2xl font-bold mt-8 mb-4 pb-2 border-b border-dpmOlive">
        1. Independent Advisory Practice
      </h2>
      <p className="mb-4 leading-relaxed text-striationCharcoal">Wize Ideation operates as an independent technical consultancy and research practice based in Australia. Information published on this website describes advisory services, technical research, and architectural analysis provided in a principal consulting capacity.</p>
      <p className="mb-8 leading-relaxed text-striationCharcoal">Nothing on this site constitutes legal, medical, financial, or operational advice, nor does it create an agency, partnership, employment, or joint-venture relationship between Wize Ideation and any third party.</p>

      <h2 className="font-serif-primary text-dpmOlive text-2xl font-bold mt-8 mb-4 pb-2 border-b border-dpmOlive">
        2. Scope of Engagement
      </h2>
      <p className="mb-4 leading-relaxed text-striationCharcoal">Any consulting, research, or advisory services are provided strictly under separate written agreements. Unless expressly stated in such agreements, Wize Ideation does not assume responsibility for the implementation, deployment, governance, compliance assessment, or downstream use of systems, processes, or recommendations by client organisations.</p>
      <p className="mb-8 leading-relaxed text-striationCharcoal">All decisions relating to operational adoption, risk acceptance, regulatory compliance, and production deployment remain the sole responsibility of the client and its internal governance bodies.</p>

      <h2 className="font-serif-primary text-dpmOlive text-2xl font-bold mt-8 mb-4 pb-2 border-b border-dpmOlive">
        3. Data Handling & Non-Retention
      </h2>
      <p className="mb-4 leading-relaxed text-striationCharcoal">Wize Ideation operates under a strict data minimisation posture.</p>
      <p className="mb-4 leading-relaxed text-striationCharcoal">Client data, content, or operational materials are not retained beyond what is transiently required to perform agreed analytical or advisory activities. No client information is stored, reused, sold, or repurposed outside the scope of a specific engagement.</p>
      <p className="mb-8 leading-relaxed text-striationCharcoal">Architectural guidance and technical analysis are typically conducted without ongoing access to client systems, production environments, or datasets.</p>

      <h2 className="font-serif-primary text-dpmOlive text-2xl font-bold mt-8 mb-4 pb-2 border-b border-dpmOlive">
        4. Privacy & Data Handling Statement
      </h2>
      <p className="mb-4 leading-relaxed text-striationCharcoal">Wize Ideation collects only minimal personal information necessary to respond to professional enquiries or administer engagements (such as contact details provided via email or enquiry forms).</p>
      <p className="mb-4 leading-relaxed text-striationCharcoal">No personal information is disclosed to third parties except where required by law or explicitly agreed as part of a contractual engagement. Reasonable technical and organisational measures are applied to protect any information received.</p>
      <p className="mb-8 leading-relaxed text-striationCharcoal">This site does not engage in behavioural tracking, profiling, or data brokerage activities.</p>

      <h2 className="font-serif-primary text-dpmOlive text-2xl font-bold mt-8 mb-4 pb-2 border-b border-dpmOlive">
        5. Professional Standards & Responsibility Allocation
      </h2>
      <p className="mb-4 leading-relaxed text-striationCharcoal">Wize Ideation maintains professional standards consistent with independent technical consultancy and research practice.</p>
      <p className="mb-4 leading-relaxed text-striationCharcoal">All research findings, technical specifications, reference implementations, and advisory materials are provided for evaluation and consideration within the client&rsquo;s own assurance frameworks. Clients are advised to conduct their own internal quality assurance, security reviews, and governance assessments prior to any production deployment or institutional adoption of provided materials.</p>
      <p className="mb-8 leading-relaxed text-striationCharcoal">No warranties are given regarding fitness for purpose, completeness, or suitability for any specific operational environment unless expressly stated in a written engagement agreement.</p>

      <h2 className="font-serif-primary text-dpmOlive text-2xl font-bold mt-8 mb-4 pb-2 border-b border-dpmOlive">
        6. Research & Publications
      </h2>
      <p className="mb-4 leading-relaxed text-striationCharcoal">Any research papers, technical commentary, or published materials represent independent analysis and professional opinion at the time of writing. They are provided for informational and professional reference purposes only.</p>
      <p className="mb-8 leading-relaxed text-striationCharcoal">References to methodologies, frameworks, or conceptual models are descriptive in nature and do not constitute guarantees, endorsements, or claims regarding specific systems, organisations, or implementations.</p>

      <h2 className="font-serif-primary text-dpmOlive text-2xl font-bold mt-8 mb-4 pb-2 border-b border-dpmOlive">
        7. Intellectual Property
      </h2>
      <p className="mb-4 leading-relaxed text-striationCharcoal">Unless otherwise stated, all original materials published on this site are the intellectual property of Wize Ideation. No licence is granted for commercial reuse without prior written consent.</p>
      <p className="mb-8 leading-relaxed text-striationCharcoal">Client-specific work product is governed exclusively by the terms of the relevant engagement agreement.</p>

      <h2 className="font-serif-primary text-dpmOlive text-2xl font-bold mt-8 mb-4 pb-2 border-b border-dpmOlive">
        8. Jurisdiction
      </h2>
      <p className="mb-8 leading-relaxed text-striationCharcoal">This website and any use of its content are governed by the laws of Australia. Any disputes arising in connection with this site are subject to the exclusive jurisdiction of Australian courts.</p>

      <h2 className="font-serif-primary text-dpmOlive text-2xl font-bold mt-8 mb-4 pb-2 border-b border-dpmOlive">
        Contact
      </h2>
      <p className="mb-4 leading-relaxed text-striationCharcoal">
        For professional inquiries: <Link href="/contact" className="text-burntOchre hover:underline">Contact Wize Ideation</Link>
      </p>
    </section>
  );
}
