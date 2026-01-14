import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - Wize Ideation',
  description: 'Get in touch with Wize Ideation for research, services, or administrative inquiries',
};

export default function ContactPage() {
  return (
    <section className="max-w-4xl mx-auto font-serif-body text-base">
      {/* Hidden form for Netlify detection - must be in server component */}
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-recaptcha="true"
        hidden
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="text" name="name" />
        <input type="email" name="email" />
        <select name="enquiry-type">
          <option value="research">Research</option>
          <option value="services">Services</option>
          <option value="administration">Administration</option>
        </select>
        <textarea name="message"></textarea>
        <div data-netlify-recaptcha="true"></div>
      </form>

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
