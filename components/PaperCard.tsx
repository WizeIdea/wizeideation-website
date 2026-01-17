import Link from 'next/link';
import type { FC } from 'react';

export interface PaperCardProps {
  slug: string;
  title: string;
  excerpt: string;
}

/**
 * Forensic‑styled card displaying a research paper.
 * Accessible:
 *   - `role="article"` for screen readers.
 *   - `tabIndex={0}` + focus-visible outline.
 */
export const PaperCard: FC<PaperCardProps> = ({ slug, title, excerpt }) => (
  <article
    role="article"
    tabIndex={0}
    className="group py-4 border-b border-striationCharcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-burntOchre"
  >
    <h2 className="font-serif-primary text-lg text-striationCharcoal mb-1">
      <Link
        href={`/papers/${slug}`}
        className="group-hover:text-burntOchre transition-colors"
        aria-label={`Read paper: ${title}`}
      >
        {title}
      </Link>
    </h2>
    <p className="text-sm text-dpmOlive font-serif-body">{excerpt}</p>
  </article>
);
