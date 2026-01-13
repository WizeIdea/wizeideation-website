import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Directory containing paper markdown files
const PAPERS_DIR = path.join(process.cwd(), 'content', 'papers');

export interface Paper {
  slug: string;
  title: string;
  excerpt: string;
  date?: string;
  Authors?: string | string[];
  ORCID?: string;
  DOI?: string;
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
      .slice(0, 150) + (content.length > 150 ? '...' : '');

    return { slug, title, excerpt };
  });
}
