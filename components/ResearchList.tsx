import type { FC } from 'react';
import { PaperCard } from './PaperCard';

export interface ResearchItem {
  slug: string;
  title: string;
  excerpt: string;
}

interface Props {
  items: ResearchItem[];
  basePath?: string; // kept for compatibility, unused
}

/**
 * Renders a list of research items using the forensic PaperCard.
 * The wrapper `<ul>` retains ARIA list semantics.
 */
export const ResearchList: FC<Props> = ({ items }) => (
  <ul role="list" className="divide-y divide-[#2E2E2E]">
    {items.map(({ slug, title, excerpt }) => (
      <li key={slug} role="listitem">
        <PaperCard slug={slug} title={title} excerpt={excerpt} />
      </li>
    ))}
  </ul>
);
