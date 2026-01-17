import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact independent AI architecture consultancy for research inquiries, technical advisory services, or engagement discussions. Principal-led consultancy practice.',
  openGraph: {
    title: 'Contact | Wize Idea',
    description: 'Get in touch for technical advisory services, research collaboration, or engagement inquiries.',
    url: 'https://wizeidea.com/contact/',
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

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto font-serif-body text-base">
      <h1 className="font-serif-primary text-burntOchre text-xl font-semibold mt-3 mb-4 pb-2 border-b border-burntOchre">
        Contact Us
      </h1>
      <p className="mb-6 leading-relaxed text-striationCharcoal">
        Have a question about our research, services, or need administrative assistance? We'd love to hear from you.
      </p>

      <ContactForm />
    </section>
  );
}
