import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Paper } from './types';

// Directory containing paper markdown files
const PAPERS_DIR = path.join(process.cwd(), 'content', 'papers');

/**
 * Normalize date from gray-matter which can parse dates as Date objects or strings
 */
function normalizeDate(date: any): string | undefined {
  if (!date) return undefined;
  if (typeof date === 'string') return date;
  if (date instanceof Date) return date.toISOString().split('T')[0];
  return undefined;
}

/**
 * Reads all markdown files in `content/papers` and returns an array of
 * objects: { slug, title, excerpt }.
 * - `slug` – filename without extension, used for routing.
 * - `title` – extracted from front‑matter; falls back to filename.
 * - `excerpt` – first 150 characters of the markdown body (plain text).
 */
export function getAllPapers(): Paper[] {
  // Check if directory exists
  if (!fs.existsSync(PAPERS_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(PAPERS_DIR).filter((f) => f.endsWith('.md'));

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(PAPERS_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const title = data.title ?? slug.replace(/-/g, ' ');
    const excerpt = content
      .replace(/[\r\n]+/g, ' ')
      .trim()
      .slice(0, 120) + (content.length > 120 ? '...' : '');

    return { 
      slug, 
      title, 
      excerpt,
      date: normalizeDate(data.date),
      Authors: data.Authors,
      ORCID: data.ORCID,
      DOI: data.DOI,
      featured: data.featured,
    };
  });
}

/**
 * Returns featured papers, sorted by date descending.
 * Falls back to most recent papers if none are marked as featured.
 */
export function getFeaturedPapers(limit: number = 3): Paper[] {
  const allPapers = getAllPapers();
  
  // Filter for papers marked as featured
  const featuredPapers = allPapers.filter(paper => paper.featured === true);
  
  // Sort by date descending (newest first)
  const sortedPapers = featuredPapers.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });
  
  // If we have featured papers, return up to limit
  if (sortedPapers.length > 0) {
    return sortedPapers.slice(0, limit);
  }
  
  // Fallback: return most recent papers if none are featured
  const allSorted = allPapers.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });
  
  return allSorted.slice(0, limit);
}
