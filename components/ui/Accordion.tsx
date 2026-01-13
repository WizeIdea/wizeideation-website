'use client';

import { useState, ReactNode } from 'react';

interface AccordionProps {
  title: string;
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({ title, summary, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-dpmOlive mb-6 transition-colors hover:border-burntOchre">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex items-start justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-dpmOlive focus:ring-offset-2"
        aria-expanded={isOpen}
      >
        <div className="flex-1">
          <h2 className="font-serif-primary text-dpmOlive text-2xl font-bold mb-2">
            {title}
          </h2>
          <p className="font-serif-body text-base text-striationCharcoal leading-relaxed">
            {summary}
          </p>
        </div>
        <div className="flex-shrink-0 mt-2">
          <svg
            className={`w-6 h-6 text-burntOchre transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6 border-t border-dpmOlive">
          <div className="pt-6">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
