import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Notice & Terms of Use',
  description: 'Legal terms and conditions for Wize Ideation services',
};

export default function LegalPage() {
  return (
    <section className="prose lg:prose-xl max-w-none text-striationCharcoal">
      <h1>Legal Notice & Terms of Use</h1>

      <h2>1. Independent Advisory Practice</h2>
      <p>Wize Ideation operates as an independent technical consultancy and research practice based in Australia. Information published on this website describes advisory services, technical research, and architectural analysis provided in a principal consulting capacity.</p>
      <p>Nothing on this site constitutes legal, medical, financial, or operational advice, nor does it create an agency, partnership, employment, or joint-venture relationship between Wize Ideation and any third party.</p>

      <h2>2. Scope of Engagement</h2>
      <p>Any consulting, research, or advisory services are provided strictly under separate written agreements. Unless expressly stated in such agreements, Wize Ideation does not assume responsibility for the implementation, deployment, governance, or downstream use of systems, processes, or recommendations by client organisations.</p>

      <h2>3. Data Handling & Non-Retention</h2>
      <p>Wize Ideation does not retain client data, content, or operational materials beyond what is transiently required for agreed analytical or advisory activities. No client information is stored, reused, or repurposed outside the scope of a specific engagement.</p>
      <p>Architectural guidance and technical analysis are provided without ongoing access to client systems or datasets.</p>

      <h2>4. Research & Publications</h2>
      <p>Any research, papers, or commentary published through this site represent independent technical analysis and opinion. They are provided for informational and professional reference purposes only and should not be interpreted as claims regarding specific systems, organisations, or implementations.</p>
      <p>References to methodologies, frameworks, or conceptual models are descriptive in nature and do not imply endorsement, applicability, or performance guarantees.</p>

      <h2>5. Intellectual Property</h2>
      <p>Unless otherwise stated, all original materials published on this site are the intellectual property of Wize Ideation. No licence is granted for commercial reuse without prior written consent.</p>
      <p>Client-specific work product is governed exclusively by the terms of the relevant engagement agreement.</p>

      <h2>6. Jurisdiction</h2>
      <p>This website and any use of its content are governed by the laws of Australia. Any disputes arising in connection with this site are subject to the exclusive jurisdiction of Australian courts.</p>
    </section>
  );
}
