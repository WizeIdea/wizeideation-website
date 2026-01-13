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

      <form
        name="contact"
        method="POST"
        action="/contact"
        data-netlify="true"
        data-netlify-recaptcha="true"
        className="space-y-6"
      >
        <input type="hidden" name="form-name" value="contact" />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-striationCharcoal mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-dpmOlive rounded-none focus:outline-none focus:ring-2 focus:ring-burntOchre bg-white"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-striationCharcoal mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-dpmOlive rounded-none focus:outline-none focus:ring-2 focus:ring-burntOchre bg-white"
          />
        </div>

        <div>
          <label htmlFor="enquiry-type" className="block text-sm font-medium text-striationCharcoal mb-2">
            Enquiry Type *
          </label>
          <select
            id="enquiry-type"
            name="enquiry-type"
            required
            className="w-full px-3 py-2 border border-dpmOlive rounded-none focus:outline-none focus:ring-2 focus:ring-burntOchre bg-white"
          >
            <option value="">Select an option</option>
            <option value="research">Research</option>
            <option value="services">Services</option>
            <option value="administration">Administration</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-striationCharcoal mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full px-3 py-2 border border-dpmOlive rounded-none focus:outline-none focus:ring-2 focus:ring-burntOchre bg-white resize-vertical"
          />
        </div>

        {/* Netlify reCAPTCHA */}
        <div data-netlify-recaptcha="true"></div>

        <button
          type="submit"
          className="inline-flex items-center justify-center px-6 py-3 bg-burntOchre text-saltWhite font-mono text-sm transition-all duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burntOchre"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
