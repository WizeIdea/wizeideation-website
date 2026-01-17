/**
 * Shared TypeScript types for the application
 */

// ============================================================================
// CONTENT TYPES
// ============================================================================

export interface Paper {
  slug: string;
  title: string;
  excerpt: string;
  date?: string;
  Authors?: string | string[];
  ORCID?: string;
  DOI?: string;
  DocID?: string;
  featured?: boolean;
}

export interface Project {
  slug: string;
  title: string;
  excerpt: string;
  date?: string;
  status?: 'active' | 'completed' | 'archived';
  featured?: boolean;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description?: string;
  imageName?: string;
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface CardProps {
  slug: string;
  title: string;
  excerpt: string;
  href?: string;
}

export interface ResearchItem {
  slug: string;
  title: string;
  excerpt: string;
}

// ============================================================================
// NAVIGATION
// ============================================================================

export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

// ============================================================================
// METADATA
// ============================================================================

export interface FrontMatter {
  title: string;
  date?: string | Date;
  Authors?: string | string[];
  ORCID?: string;
  DOI?: string;
  DocID?: string;
  featured?: boolean;
  excerpt?: string;
  status?: string;
  [key: string]: unknown;
}
