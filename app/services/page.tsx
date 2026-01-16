import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ServiceList } from '@/components/ui/ServiceList';
import { Deliverable } from '@/components/ui/Deliverable';
import { ServiceDivider } from '@/components/ui/ServiceDivider';
import { Accordion } from '@/components/ui/Accordion';

export const metadata: Metadata = {
  title: 'Advisory Services | Wize Idea - AI Architecture & Research Consultancy',
  description: 'Independent technical consultancy providing research, architectural analysis, and advisory services for AI systems, authorship integrity, and forensic stylometry.',
  openGraph: {
    title: 'Advisory Services | Wize Idea',
    description: 'Specialised research and technical advisory focused on AI system design, authorship analysis, and auditable communication architectures.',
    url: 'https://wizeidea.com/services/',
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

export default function ServicesPage() {
  return (
    <section className="max-w-4xl mx-auto font-serif-body text-base">
      <h1 className="font-serif-primary text-burntOchre text-xl font-semibold mt-3 mb-4 pb-2 border-b border-burntOchre">
        Advisory Services & Technical Specifications
      </h1>
      
      <p className="mb-4 leading-relaxed text-striationCharcoal">
        Wize Idea provides independent advisory, technical research, and architectural specifications for organisations navigating the intersection of artificial intelligence, human authorship, and institutional risk.
      </p>
      
      <p className="mb-8 leading-relaxed text-striationCharcoal">
        Our services are scoped as discrete, high-impact deliverables. Engagements are structured around fixed-fee or milestone-based terms, with all work specified prior to commencement. The outcomes are framed as analysis, recommendations, and technical guidance—not operational software.
      </p>

      {/* Service 1: Applied Technical Research */}
      <Accordion
        id="service-1"
        title="1. Applied Technical Research & Forensic Auditing"
        summary="Independent research and forensic analysis to assess system behaviour, attribution reliability, and linguistic patterns in machine-mediated environments."
        imageName="logo_s.png"
      >
        <ServiceList items={[
          <><strong>Forensic Validation Studies:</strong> Empirical audits of cross-model attribution behaviour. We provide structured technical evidence to support or challenge authorship claims, delivering reports that include methodology, findings, and analytical appendices.</>,
          <><strong>Systems Ethics &amp; Alignment Analysis:</strong> An architecture-level examination of the constraint and reinforcement systems that govern AI behaviour. This is purely analytical work, with findings presented as interpretations grounded in technical evidence.</>,
          <><strong>Linguistic Equity Assessments:</strong> Research into systemic bias in automated systems, particularly regarding their differential impact on diverse writing styles.</>
        ]} />

        <Deliverable>
          <strong>Deliverable:</strong> A comprehensive technical research report with findings and analytical commentary.
        </Deliverable>

        <ServiceDivider imageName="logo_s.png" />
      </Accordion>

      {/* Service 2: Forensic Stylometry */}
      <Accordion
        id="service-2"
        title="2. Forensic Stylometry & Identity Architecture"
        summary="Specialised design of logic frameworks and pattern models to support high-fidelity authorial alignment for voice consistency and auditability."
        imageName="logo_y.png"
      >
        <ServiceList items={[
          <><strong>Stylometric Signature Calibration:</strong> Technical extraction and modelling of an individual&rsquo;s or institution&rsquo;s unique linguistic variance. The output is a set of non-readable representations and alignment documentation, ready for system integration.</>,
          <><strong>Authorial Continuity Frameworks:</strong> The design of detailed specifications to ensure the continuity of a specific linguistic identity across complex workflows. This is particularly relevant for leadership communications or regulated content.</>
        ]} />

        <Deliverable>
          <strong>Deliverable:</strong> A detailed specification document containing models and integration notes.
        </Deliverable>

        <ServiceDivider imageName="logo_y.png" />
      </Accordion>

      {/* Service 3: AI Architecture Advisory */}
      <Accordion
        id="service-3"
        title="3. AI Architecture & Reference Implementations"
        summary="Structured advisory for the design and integration of deterministic, audit-ready AI systems with guidance and reference code."
        imageName="logo_p.png"
      >
        <ServiceList items={[
          <><strong>Logic-to-Code Specification:</strong> Translating high-level language and system logic into governed architectural specifications, with a sharp focus on determinism and auditability.</>,
          <><strong>Reference Implementations:</strong> Prototype code or exemplar modules to demonstrate architectural assumptions and integration patterns. These are delivered as reference assets, not production software.</>,
          <><strong>Infrastructure &amp; Integration Advisory:</strong> Strategic guidance for adapting identity and stylometric logic into existing technical stacks, emphasising data minimisation and governance alignment.</>
        ]} />

        <Deliverable>
          <strong>Deliverable:</strong> Technical advisory briefs, integration guides, or reference assets.
        </Deliverable>

        <ServiceDivider imageName="logo_p.png" />
      </Accordion>

      {/* Service 4: Structured Prompt Architecture */}
      <Accordion
        id="service-4"
        title="4. Structured Prompt Architecture & Design"
        summary="Structured services for prompt engineering ensuring foundational interactions with AI systems are built with precision and intent."
        imageName="logo_o.png"
      >
        <ServiceList items={[
          <><strong>Foundational Prompt Engineering:</strong> The design of single-agent prompts, few-shot specifications, and conditioning logic for discrete tasks. This service is suitable for establishing reliable and repeatable outputs within existing workflows.</>,
          <><strong>Advanced Prompt Architecture:</strong> The design of multi-agent orchestration, deterministic chains, and controlled logic layering. This is for complex workflows where consistency, traceability, and auditable outputs are required.</>
        ]} />

        <Deliverable>
          <strong>Deliverable:</strong> Prompt specification documents, test vectors, or logic diagrams.
        </Deliverable>

        <ServiceDivider imageName="logo_o.png" />
      </Accordion>

      {/* Engagement Governance */}
      <h2 className="font-serif-primary text-dpmOlive text-xl font-semibold mt-12 mb-4 pb-2 border-b border-dpmOlive">
        Engagement Governance
      </h2>

      <Card className="mb-8 p-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-serif-primary text-dpmOlive text-base font-semibold mb-2">
              Independent Consultancy
            </h3>
            <p className="leading-relaxed text-striationCharcoal font-mono text-xs">
              Wize Idea operates as an independent principal practice. Our deliverables are provided as discrete research findings, technical specifications, or advisory briefs. Nothing on this page should be construed as a warranty or guarantee of specific outcomes.
            </p>
          </div>

          <div>
            <h3 className="font-serif-primary text-striationCharcoal text-base font-semibold mb-2">
              Governance Boundary
            </h3>
            <p className="leading-relaxed text-striationCharcoal font-mono text-xs">
              Decisions regarding operational deployment, institutional adoption, and regulatory compliance are the exclusive responsibility of the client organisation. Our role is to inform those decisions, not make them.
            </p>
          </div>

          <div>
            <h3 className="font-serif-primary text-dpmOlive text-base font-semibold mb-2">
              Data Handling
            </h3>
            <p className="leading-relaxed text-striationCharcoal font-mono text-xs">
              We do not retain client data or content beyond what is necessary to fulfil agreed deliverables. All work is conducted under explicit human oversight.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-center mt-8 mb-8">
        <Link href="/contact">
          <Button variant="primary">Discuss Your Requirements</Button>
        </Link>
      </div>
    </section>
  );
}
