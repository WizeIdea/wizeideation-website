import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Wize Ideation',
  description: 'Get in touch with Wize Ideation for research, services, or administrative inquiries',
};

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto font-serif-body text-base">
      <h1 className="font-serif-primary text-dpmOlive text-3xl font-bold mt-8 mb-6 pb-2 border-b-2 border-burntOchre">
        Contact Us
      </h1>
      <p className="mb-6 leading-relaxed text-striationCharcoal">
        Have a question about our research, services, or need administrative assistance? We'd love to hear from you.
      </p>

      <div className="p-6 border-l-4 border-burntOchre bg-olive50">
        <p className="font-serif-body text-striationCharcoal mb-4">
          Our contact form is currently being updated as part of our infrastructure migration.
        </p>
        <p className="font-serif-body text-striationCharcoal">
          In the meantime, please reach out via our <a href="/about" className="text-burntOchre hover:underline">About page</a> or connect through professional networks.
        </p>
      </div>
    </section>
  );
}
