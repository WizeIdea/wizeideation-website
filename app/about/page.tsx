import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Wize Ideation',
  description: 'Mission, team, and background',
};

export default function AboutPage() {
  return (
    <section className="prose lg:prose-xl max-w-none text-striationCharcoal">
      <h1>About Wize Ideation</h1>
      <p>Wize Ideation is a technical consultancy and independent research practice operating at the intersection of artificial intelligence, systems architecture, and human authorship.</p>
      <p>A persistent challenge.** As generative AI becomes embedded in professional workflows, many organisations encounter an attribution problem: efficiency is gained, but voice consistency, accountability, and defensible authorship begin to erode. This is the boundary where we work—where technical capability, institutional risk, and human identity converge.</p>
      <p>Our practice provides advisory services and applied research in linguistic sovereignty, forensic stylometry, and cognitive system design. Engagements are typically focused and technical, involving the design of auditable AI architectures or deterministic workflows for high-stakes communication environments, including legal, medical, and financial contexts.</p>
      <p>Wize Ideation operates independently and does not retain client data or content. Advisory work centres on architectural design and technical analysis, with implementation and operational decisions remaining within the client’s own governance frameworks.</p>
      <p>The consultancy is led by an independent principal with over two decades of experience across technical infrastructure and institutional advisory roles. Current research focuses on attribution integrity and the structural implications of alignment methodologies in large-scale AI systems, with ongoing publications released through the practice’s research notes.r work exists to ensure that as machines become more capable, human authorship remains legible, attributable, and intact.</p>
    </section>
  );
}
