'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [enquiryType, setEnquiryType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget; // Store reference before async
    setIsSubmitting(true);
    setStatus('idle');

    const formData = new FormData(form);
    
    // Prepare submission data
    const submissionData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      enquiryType: formData.get('enquiry-type') as string,
      service: formData.get('select-service') as string || undefined,
      message: formData.get('message') as string,
      website: '', // Honeypot field - always empty string
    };

    try {
      const response = await fetch('https://74upj2eh3k.execute-api.ap-southeast-2.amazonaws.com/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        setStatus('success');
        form.reset(); // Use stored reference
        setEnquiryType('');
      } else {
        const data = await response.json();
        console.error('Form error:', data);
        setStatus('error');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {status === 'success' && (
        <div className="mb-6 p-4 border-l-4 border-burntOchre bg-olive50">
          <p className="font-serif-body text-striationCharcoal">
            <strong>Thank you!</strong> Your message has been sent successfully. We'll respond within 1-2 business days.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 border-l-4 border-red-600 bg-red-50">
          <p className="font-serif-body text-striationCharcoal">
            <strong>Error:</strong> Unable to send message. Please try again later.
          </p>
        </div>
      )}

      <form
        name="contact"
        method="POST"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Honeypot field - hidden from humans, visible to bots */}
        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor="website">
            Website (leave blank)
          </label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-striationCharcoal mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-dpmOlive rounded-none focus:outline-none focus:ring-2 focus:ring-burntOchre bg-white disabled:opacity-50"
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
            disabled={isSubmitting}
            autoComplete="email"
            className="w-full px-3 py-2 border border-dpmOlive rounded-none focus:outline-none focus:ring-2 focus:ring-burntOchre bg-white disabled:opacity-50"
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
            value={enquiryType}
            onChange={(e) => setEnquiryType(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-dpmOlive rounded-none focus:outline-none focus:ring-2 focus:ring-burntOchre bg-white disabled:opacity-50"
          >
            <option value="">Select an option</option>
            <option value="Research">Research</option>
            <option value="Services">Services</option>
            <option value="Administration">Administration</option>
          </select>
        </div>

        {/* Conditional Service Selection - only shown when "Services" is selected */}
        {enquiryType === 'Services' && (
          <div>
            <label htmlFor="select-service" className="block text-sm font-medium text-striationCharcoal mb-2">
              Select Service *
            </label>
            <select
              id="select-service"
              name="select-service"
              required={enquiryType === 'Services'}
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-dpmOlive rounded-none focus:outline-none focus:ring-2 focus:ring-burntOchre bg-white disabled:opacity-50"
            >
              <option value="">Select a service</option>
              <option value="Technical Research">Technical Research</option>
              <option value="Forensic Stylometry">Forensic Stylometry</option>
              <option value="AI Architecture">AI Architecture</option>
              <option value="Prompt Design">Prompt Design</option>
            </select>
          </div>
        )}

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-striationCharcoal mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-dpmOlive rounded-none focus:outline-none focus:ring-2 focus:ring-burntOchre bg-white resize-vertical disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center px-6 py-3 bg-burntOchre text-saltWhite font-mono text-sm transition-all duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burntOchre disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </>
  );
}
