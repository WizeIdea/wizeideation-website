import { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Wize Ideation',
  description: 'Mission, team, and background',
};

export default function AboutPage() {
  return (
    <section className="max-w-4xl mx-auto font-serif-body text-base">
      <h1 className="font-serif-primary text-dpmOlive text-3xl font-bold mt-8 mb-6 pb-2 border-b-2 border-burntOchre">
        About Wize Ideation
      </h1>
      
      <div className="hidden sm:block float-right ml-6 mb-6 w-64">
        <Image
          src="/logo_r.png"
          alt="Wize Ideation flax plant logo"
          width={250}
          height={250}
          className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity"
        />
      </div>
      
      <p className="mb-4 leading-relaxed text-striationCharcoal">Wize Ideation is a technical consultancy and independent research practice operating at the intersection of artificial intelligence, systems architecture, and human authorship.</p>
      <p className="mb-4 leading-relaxed text-striationCharcoal">A persistent challenge. **As generative AI becomes embedded in professional workflows, many organisations encounter an attribution problem: efficiency is gained, but voice consistency, accountability, and defensible authorship begin to erode. This is the boundary where we work—where technical capability, institutional risk, and human identity converge.</p>
      <p className="mb-4 leading-relaxed text-striationCharcoal">Our practice provides advisory services and applied research in linguistic sovereignty, forensic stylometry, and cognitive system design. Engagements are typically focused and technical, involving the design of auditable AI architectures or deterministic workflows for high-stakes communication environments, including legal, medical, and financial contexts.</p>
      <p className="mb-4 leading-relaxed text-striationCharcoal">Wize Ideation operates independently and does not retain client data or content. Advisory work centres on architectural design and technical analysis, with implementation and operational decisions remaining within the client's own governance frameworks.</p>
      <p className="mb-4 leading-relaxed text-striationCharcoal">The consultancy is led by an independent principal with over two decades of experience across technical infrastructure and institutional advisory roles. Current research focuses on attribution integrity and the structural implications of alignment methodologies in large-scale AI systems, with ongoing publications released through the practice's research notes.</p>
      <p className="mb-4 leading-relaxed text-striationCharcoal">Our work exists to ensure that as machines become more capable, human authorship remains legible, attributable, and intact.</p>

      <div className="flex justify-between items-center mt-8">
        <Link href="/legal">
          <Button variant="secondary">Legal Notice & Terms of Use</Button>
        </Link>
        <Link href="/contact">
          <Button variant="secondary">Contact Us</Button>
        </Link>
      </div>
    </section>
  );
}
