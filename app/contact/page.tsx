import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

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

      <ContactForm />
    </section>
  );
}
