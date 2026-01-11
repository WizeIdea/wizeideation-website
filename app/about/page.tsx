import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Wize Ideation',
  description: 'Mission, team, and background',
};

export default function AboutPage() {
  return (
    <section className="prose lg:prose-xl max-w-none text-striationCharcoal">
      <h1>About Wize Ideation</h1>
      <p>
        Wize Ideation is a high‑end research consultancy specializing in forensic linguistics,
        stylometric alignment, and AI persona architecture. Our work is grounded in rigorous
        academic methodology and delivered with a "tactical intellectual" aesthetic.
      </p>
      <p>
        For more information, contact us at <a href="mailto:info@wizeideation.com">info@wizeideation.com</a>.
      </p>
    </section>
  );
}
