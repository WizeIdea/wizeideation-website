/**
 * scripts/copy-selected-md.ts
 *
 * Copies only markdown files that have `publish: true` in their front‑matter
 * from the checked‑out Obsidian repo into the appropriate `content/` sub‑folder.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';   // <-- default import (works with esModuleInterop)

type DocumentType = 'papers' | 'services' | 'projects';

/**
 * Whitelist of frontmatter fields to include in published files.
 * Only these fields will be copied from Obsidian to the website.
 * This prevents exposure of Obsidian-specific metadata like 'created' and 'updated'.
 */
const ALLOWED_FRONTMATTER_FIELDS = [
  'title',
  'date',
  'publish',
  'DocumentType',
  'Authors',
  'DocID',
  'ORCID',
  'DOI',
  'featured'
];

// ---------------------------------------------------------------
// Determine the source folder that actually contains markdown files.
//   - CI: `obsidian/` (cloned Obsidian repo)
//   - Local dev: fallback to `content/` if `obsidian/` is empty or missing
// ---------------------------------------------------------------
const POSSIBLE_SOURCES = [
  path.resolve(process.cwd(), 'obsidian'), // CI source
  path.resolve(process.cwd(), 'content'), // local fallback
];

let OB_CONTENT_ROOT = '';
for (const src of POSSIBLE_SOURCES) {
  try {
    const entries = fs.readdirSync(src);
    const hasMd = entries.some((e) => e.endsWith('.md'));
    if (hasMd) {
      OB_CONTENT_ROOT = src;
      break;
    }
  } catch {
    // folder may not exist – ignore
  }
}

if (!OB_CONTENT_ROOT) {
  console.warn('⚠️  No markdown source folder found (neither obsidian nor content). Nothing to copy.');
}

const DEST_ROOT = path.resolve(process.cwd(), 'content');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Recursively collect *.md files under a directory.
 */
function getAllMdFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMdFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Filter frontmatter to only include whitelisted fields.
 */
function filterFrontmatter(data: any): any {
  const filtered: any = {};
  for (const field of ALLOWED_FRONTMATTER_FIELDS) {
    if (data[field] !== undefined) {
      filtered[field] = data[field];
    }
  }
  return filtered;
}

/**
 * Main copy routine – only copies files where `publish: true`.
 */
function copyPublished() {
  if (!OB_CONTENT_ROOT) {
    console.log('⚠️  No markdown files were copied because no source folder was found.');
    return;
  }

  const allFiles = getAllMdFiles(OB_CONTENT_ROOT);

  for (const filePath of allFiles) {
    console.log('Scanning:', filePath);   // <-- debug line
    const raw = fs.readFileSync(filePath, 'utf8'); // plain UTF‑8 string
    const { data, content } = matter(raw);         // <-- extract both data and content
    console.log('  -> kept?', data.publish, data.DocumentType); // <-- debug line

    // Skip anything that isn’t explicitly published
    if (!data.publish) continue;

    // Determine destination sub‑folder from the DocumentType front‑matter
    let docType: DocumentType | undefined;
    if (data.DocumentType) {
      // Handle both string and array (in case Obsidian dropdown creates array)
      const rawType = Array.isArray(data.DocumentType) ? data.DocumentType[0] : data.DocumentType;
      docType = rawType?.toLowerCase();
    }
    
    if (!docType) {
      console.error(`❌ ERROR: File ${path.basename(filePath)} has publish:true but missing DocumentType`);
      console.error(`   Required frontmatter: DocumentType (must be "papers", "services", or "projects")`);
      process.exit(1); // Fail the build
    }

    // Require DocID for all published documents
    const docId = data.DocID;
    if (!docId) {
      console.error(`❌ ERROR: File ${path.basename(filePath)} has publish:true but missing DocID`);
      console.error(`   Required frontmatter: DocID (e.g., "WISN-WP-2026-01")`);
      process.exit(1); // Fail the build
    }

    const destDir = path.join(DEST_ROOT, docType);
    ensureDir(destDir);

    const fileName = `${docId}.md`;
    const destPath = path.join(destDir, fileName);
    
    // Filter frontmatter to only include whitelisted fields
    const filteredData = filterFrontmatter(data);
    
    // Reconstruct markdown with filtered frontmatter
    const filteredMarkdown = matter.stringify(content, filteredData);
    
    // Write filtered markdown to destination
    fs.writeFileSync(destPath, filteredMarkdown, 'utf8');
    
    console.log(`✔ Copied ${path.basename(filePath)} → ${docType}/${fileName} (DocID: ${docId})`);
  }
}

// Run when invoked directly (the GitHub Action will call the script)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  copyPublished();
}
