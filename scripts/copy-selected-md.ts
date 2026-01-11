/**
 * scripts/copy-selected-md.ts
 *
 * Copies only markdown files that have `publish: true` in their front‑matter
 * from the checked‑out Obsidian repo into the appropriate `content/` sub‑folder.
 */

import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';   // <-- default import (works with esModuleInterop)

type DocumentType = 'papers' | 'services' | 'projects';

const OB_CONTENT_ROOT = path.resolve(process.cwd(), 'obsidian'); // checked‑out by the CI
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
 * Main copy routine – only copies files where `publish: true`.
 */
function copyPublished() {
  const allFiles = getAllMdFiles(OB_CONTENT_ROOT);

  for (const filePath of allFiles) {
    const raw = fs.readFileSync(filePath, 'utf8'); // plain UTF‑8 string
    const { data } = matter(raw);                  // <-- works now

    // Skip anything that isn’t explicitly published
    if (!data.publish) continue;

    // Determine destination sub‑folder from the DocumentType front‑matter
    const docType: DocumentType = data.DocumentType?.toLowerCase();
    if (!docType) continue; // ignore files without a proper type

    const destDir = path.join(DEST_ROOT, docType);
    ensureDir(destDir);

    const fileName = path.basename(filePath);
    const destPath = path.join(destDir, fileName);
    fs.copyFileSync(filePath, destPath);
    console.log(`✔ Copied ${fileName} → ${docType}`);
  }
}

// Run when invoked directly (the GitHub Action will call the script)
if (require.main === module) {
  copyPublished();
}