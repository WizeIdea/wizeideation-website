import { Metadata } from 'next';

/**
 * Site-wide constants for consistent metadata
 */
const SITE_NAME = 'Wize Idea';
const SITE_URL = 'https://wizeidea.com';
const DEFAULT_DESCRIPTION = 'Independent consulting and research practice specializing in AI systems architecture, authorship provenance, and forensic stylometry.';

/**
 * Default robots configuration for indexed pages
 */
const DEFAULT_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
  },
};

// ============================================================================
// METADATA GENERATORS
// ============================================================================

interface PageMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}

/**
 * Generate consistent metadata for standard pages.
 * Automatically includes OpenGraph and robots configuration.
 * 
 * @example
 * export const metadata = createPageMetadata({
 *   title: 'About',
 *   description: 'Learn about our practice',
 *   path: '/about'
 * });
 */
export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const fullUrl = path ? `${SITE_URL}${path}` : SITE_URL;
  const fullTitle = title === 'Home' ? `${SITE_NAME} - AI Architecture - Research - Advisory Practice` : title;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: fullUrl,
      siteName: SITE_NAME,
      type: 'website',
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : DEFAULT_ROBOTS,
  };
}

/**
 * Generate metadata for article/paper pages with additional fields.
 */
interface ArticleMetadataOptions extends PageMetadataOptions {
  authors?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

export function createArticleMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '',
  authors,
  publishedTime,
  modifiedTime,
  tags,
  noIndex = false,
}: ArticleMetadataOptions): Metadata {
  const fullUrl = `${SITE_URL}${path}`;

  return {
    title,
    description,
    authors: authors ? authors.map(name => ({ name })) : undefined,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: fullUrl,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: authors,
      tags,
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : DEFAULT_ROBOTS,
  };
}

/**
 * Generate metadata for home page with custom title format
 */
export function createHomeMetadata(description?: string): Metadata {
  return {
    title: 'Home',
    description: description || 'Independent consulting and research practice operating at the intersection of artificial intelligence, systems architecture, and human authorship.',
    openGraph: {
      title: `${SITE_NAME} - Strategic AI Architecture & Authorship Integrity`,
      description: description || DEFAULT_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_NAME,
      type: 'website',
    },
    robots: DEFAULT_ROBOTS,
  };
}

// ============================================================================
// TITLE TEMPLATE CONFIGURATION
// ============================================================================

/**
 * Title template for root layout to ensure consistent title format
 * Usage in layout.tsx: title: { default: '...', template: TITLE_TEMPLATE }
 */
export const TITLE_TEMPLATE = `%s | ${SITE_NAME}`;

// ============================================================================
// EXPORT CONSTANTS
// ============================================================================

export { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION };
