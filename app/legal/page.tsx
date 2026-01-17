import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal Notice & Terms | Wize Ideation - Advisory Service Terms',
  description: 'Legal terms, conditions, and governance framework for independent advisory services. Intellectual property, liability limitations, and engagement terms.',
  openGraph: {
    title: 'Legal Notice & Terms of Use | Wize Ideation',
    description: 'Legal framework and terms of use for research publications and technical advisory services.',
    url: 'https://wizeidea.com/legal/',
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
      <h1 className="font-serif-primary text-burntOchre text-xl font-semibold mt-3 mb-4 pb-2 border-b border-burntOchre">
        Legal Notice & Terms of Use
      </h1>

      <h3 className="font-serif-primary text-dpmOlive text-base font-semibold mt-4 mb-2">
        1. Independent Advisory Practice
      </h3>
      <p className="mb-4 leading-relaxed text-striationCharcoal font-serif-body text-sm">Wize Ideation operates as an independent technical consultancy and research practice based in Australia. Information published on this website describes advisory services, technical research, and architectural analysis provided in a principal consulting capacity.</p>
      <p className="mb-8 leading-relaxed text-striationCharcoal font-serif-body text-sm">Nothing on this site constitutes legal, medical, financial, or operational advice, nor does it create an agency, partnership, employment, or joint-venture relationship between Wize Ideation and any third party.</p>

      <h3 className="font-serif-primary text-dpmOlive text-base font-semibold mt-4 mb-2">
        2. Scope of Engagement
      </h3>
      <p className="mb-4 leading-relaxed text-striationCharcoal font-serif-body text-sm">Any consulting, research, or advisory services are provided strictly under separate written agreements. Unless expressly stated in such agreements, Wize Ideation does not assume responsibility for the implementation, deployment, governance, compliance assessment, or downstream use of systems, processes, or recommendations by client organisations.</p>
      <p className="mb-8 leading-relaxed text-striationCharcoal font-serif-body text-sm">All decisions relating to operational adoption, risk acceptance, regulatory compliance, and production deployment remain the sole responsibility of the client and its internal governance bodies.</p>

      <h3 className="font-serif-primary text-dpmOlive text-base font-semibold mt-4 mb-2">
        3. Data Handling & Non-Retention
      </h3>
      <p className="mb-4 leading-relaxed text-striationCharcoal font-serif-body text-sm">Wize Ideation operates under a strict data minimisation posture.</p>
      <p className="mb-4 leading-relaxed text-striationCharcoal font-serif-body text-sm">Client data, content, or operational materials are not retained beyond what is transiently required to perform agreed analytical or advisory activities. No client information is stored, reused, sold, or repurposed outside the scope of a specific engagement.</p>
      <p className="mb-8 leading-relaxed text-striationCharcoal font-serif-body text-sm">Architectural guidance and technical analysis are typically conducted without ongoing access to client systems, production environments, or datasets.</p>

      <h3 className="font-serif-primary text-dpmOlive text-base font-semibold mt-4 mb-2">
        4. Privacy & Data Handling Statement
      </h3>
      <p className="mb-4 leading-relaxed text-striationCharcoal font-serif-body text-sm">Wize Ideation collects only minimal personal information necessary to respond to professional enquiries or administer engagements (such as contact details provided via email or enquiry forms).</p>
      <p className="mb-4 leading-relaxed text-striationCharcoal font-serif-body text-sm">No personal information is disclosed to third parties except where required by law or explicitly agreed as part of a contractual engagement. Reasonable technical and organisational measures are applied to protect any information received.</p>
      <p className="mb-8 leading-relaxed text-striationCharcoal font-serif-body text-sm">This site does not engage in behavioural tracking, profiling, or data brokerage activities.</p>

      <h3 className="font-serif-primary text-dpmOlive text-base font-semibold mt-4 mb-2">
        5. Professional Standards & Responsibility Allocation
      </h3>
      <p className="mb-4 leading-relaxed text-striationCharcoal font-serif-body text-sm">Wize Ideation maintains professional standards consistent with independent technical consultancy and research practice.</p>
      <p className="mb-4 leading-relaxed text-striationCharcoal font-serif-body text-sm">All research findings, technical specifications, reference implementations, and advisory materials are provided for evaluation and consideration within the client&rsquo;s own assurance frameworks. Clients are advised to conduct their own internal quality assurance, security reviews, and governance assessments prior to any production deployment or institutional adoption of provided materials.</p>
      <p className="mb-8 leading-relaxed text-striationCharcoal font-serif-body text-sm">No warranties are given regarding fitness for purpose, completeness, or suitability for any specific operational environment unless expressly stated in a written engagement agreement.</p>

      <h3 className="font-serif-primary text-dpmOlive text-base font-semibold mt-4 mb-2">
        6. Research & Publications
      </h3>
      <p className="mb-4 leading-relaxed text-striationCharcoal font-serif-body text-sm">Any research papers, technical commentary, or published materials represent independent analysis and professional opinion at the time of writing. They are provided for informational and professional reference purposes only.</p>
      <p className="mb-8 leading-relaxed text-striationCharcoal font-serif-body text-sm">References to methodologies, frameworks, or conceptual models are descriptive in nature and do not constitute guarantees, endorsements, or claims regarding specific systems, organisations, or implementations.</p>

      <h3 className="font-serif-primary text-dpmOlive text-base font-semibold mt-4 mb-2">
        7. Intellectual Property
      </h3>
      <p className="mb-4 leading-relaxed text-striationCharcoal font-serif-body text-sm">Unless otherwise stated, all original materials published on this site are the intellectual property of Wize Ideation. No licence is granted for commercial reuse without prior written consent.</p>
      <p className="mb-8 leading-relaxed text-striationCharcoal font-serif-body text-sm">Client-specific work product is governed exclusively by the terms of the relevant engagement agreement.</p>

      <h3 className="font-serif-primary text-dpmOlive text-base font-semibold mt-4 mb-2">
        8. Jurisdiction and Status
      </h3>
      <p className="mb-4 leading-relaxed text-striationCharcoal font-serif-body text-sm">This website and any use of its content are governed by the laws of Australia. Any disputes arising in connection with this site are subject to the exclusive jurisdiction of Australian courts.</p>
      <p className="mb-8 leading-relaxed text-striationCharcoal font-serif-body text-sm">Wize Ideation is an independent consulting and research practice operated by Scott Nicholas T/A Wize Ideation (ABN 77 349 504 376). Services and publications are provided in a principal consulting capacity from Australia.</p>

      <h3 className="font-serif-primary text-dpmOlive text-base font-semibold mt-4 mb-2">
        Contact
      </h3>
      <p className="mb-4 leading-relaxed text-striationCharcoal font-serif-body text-sm">
        For professional inquiries: <Link href="/contact" className="text-burntOchre hover:underline">Contact Wize Ideation</Link>
      </p>
    </section>
  );
}
