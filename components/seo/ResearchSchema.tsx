import Head from 'next/head';

/** Shape of a research item */
export interface ResearchItem {
  /** Unique identifier (URL) */
  '@id': string;
  /** Title of the work */
  name: string;
  /** Short description */
  description: string;
  /** Publication date (ISO) */
  datePublished?: string;
  /** Type: 'ScholarlyArticle' | 'CreativeWork' etc. */
  '@type': string;
}

/**
 * Renders a JSON‑LD script with an array of research items.
 * The component can be placed in any page that lists papers / projects.
 */
export const ResearchSchema = ({ items }: { items: ResearchItem[] }) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: item['@id'],
      item,
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
};
