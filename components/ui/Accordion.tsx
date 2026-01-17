'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import Image from 'next/image';

interface AccordionProps {
  id?: string;
  title: string;
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
  imageName?: string;
  className?: string;
  headingLevel?: 'h2' | 'h3';
  contentBgColor?: string;
  bgColor?: string;
}

export function Accordion({ id, title, summary, children, defaultOpen = false, imageName, className, headingLevel = 'h2', contentBgColor, bgColor }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if URL hash matches this accordion's ID
    if (id && typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1); // Remove the # character
      if (hash === id) {
        setIsOpen(true);
        // Scroll to accordion after a brief delay to ensure it's rendered
        setTimeout(() => {
          accordionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [id]);

  return (
    <div ref={accordionRef} id={id} className={`border border-dpmOlive mb-6 transition-colors hover:border-burntOchre ${bgColor || ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-6 flex ${summary ? 'items-start' : 'items-center'} justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-dpmOlive focus:ring-offset-2 ${className || ''}`}
        aria-expanded={isOpen}
      >
        <div className="flex-1">
          {headingLevel === 'h2' ? (
            <h2 className={`font-serif-primary text-dpmOlive text-xl font-semibold ${summary ? 'mb-2' : ''}`}>
              {title}
            </h2>
          ) : (
            <h3 className={`font-serif-primary text-dpmOlive text-base font-semibold ${summary ? 'mb-2' : ''}`}>
              {title}
            </h3>
          )}
          {summary && (
            <p className="font-serif-body text-base text-striationCharcoal leading-relaxed">
              {summary}
            </p>
          )}
        </div>
        
        {imageName && (
          <div className="hidden md:block flex-shrink-0 w-24 h-24 ml-4">
            <Image
              src={`/${imageName}`}
              alt=""
              width={96}
              height={96}
              className="w-full h-full object-contain opacity-70"
            />
          </div>
        )}
        
        <div className="flex-shrink-0 self-end ml-2">
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
        <div className={`px-6 pb-6 border-t border-dpmOlive ${contentBgColor || ''}`}>
          <div className="pt-6">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
