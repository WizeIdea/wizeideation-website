/**
 * REFACTORED Example: Services Page (Header Section)
 * 
 * This demonstrates how the services page header can be simplified.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PageContainer, PageHeading } from '@/components/layout/PageLayout';
import { createPageMetadata } from '@/lib/metadata';
import { BODY_TEXT } from '@/lib/styles';
import { Accordion } from '@/components/ui/Accordion';
import { ServiceList } from '@/components/ui/ServiceList';
import { Deliverable } from '@/components/ui/Deliverable';

// Simplified metadata
export const metadata = createPageMetadata({
  title: 'Advisory Services',
  description: 'Independent technical consultancy providing research, architectural analysis, and advisory services for AI systems, authorship integrity, and forensic stylometry.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <PageContainer>
      <PageHeading>Advisory Services & Technical Specifications</PageHeading>
      
      <p className={`${BODY_TEXT} mb-4`}>
        Wize Idea provides independent advisory, technical research, and architectural specifications for organisations navigating the intersection of artificial intelligence, human authorship, and institutional risk.
      </p>
      
      <p className={`${BODY_TEXT} mb-8`}>
        Our services are scoped as discrete, high-impact deliverables. Engagements are structured around fixed-fee or milestone-based terms, with all work specified prior to commencement. The outcomes are framed as analysis, recommendations, and technical guidance—not operational software.
      </p>

      <div className="flex justify-end mb-6">
        <Link href="/contact">
          <Button variant="primary">Discuss Your Requirements</Button>
        </Link>
      </div>

      {/* Service accordions remain the same... */}
      <Accordion
        id="service-1"
        title="1. Applied Technical Research & Forensic Auditing"
        summary="Independent research and forensic analysis to assess system behaviour, attribution reliability, and linguistic patterns in machine-mediated environments."
        imageName="logo_s.png"
      >
        <ServiceList items={[
          <><strong>Forensic Validation Studies:</strong> Empirical audits of cross-model attribution behaviour...</>,
          // ... rest of items
        ]} />
        <Deliverable>
          <strong>Deliverable:</strong> A comprehensive technical research report with findings and analytical commentary.
        </Deliverable>
      </Accordion>
      
      {/* Additional services... */}
    </PageContainer>
  );
}
