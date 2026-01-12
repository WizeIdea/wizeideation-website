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
    className="group py-4 border-b border-[#2E2E2E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-burnt-ochre"
  >
    <h2 className="font-mono text-lg text-striation-charcoal mb-1">
      <Link
        href={`/papers/${slug}`}
        className="group-hover:text-burnt-ochre transition-colors"
      >
        {title}
      </Link>
    </h2>
    <p className="text-sm text-dpm-olive">{excerpt}</p>
  </article>
);
