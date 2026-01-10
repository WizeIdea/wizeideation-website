/**
 * copy-selected-md.ts
 *
 * Reads every *.md file from the remote Obsidian repo (checked out by the CI),
 * keeps only those with `publish: true` in front‑matter,
 * and copies them into the appropriate content sub‑folder
 *   - papers/
 *   - services/
 *   - projects/
 *
 * This script is run from the GitHub Action (Node 20 runtime).
 */
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

type DocumentType = 'papers' | 'services' | 'projects';

const OB_CONTENT_ROOT = path.resolve(process.cwd(), 'obsidian'); // repo checked out by the Action
const DEST_ROOT = path.resolve(process.cwd(), 'content');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/**
 * Walk the Obsidian folder, find .md files, filter by front‑matter.
 */
function copyPublished() {
  const allFiles = getAllMdFiles(OB_CONTENT_ROOT);

  for (const filePath of allFiles) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(raw);

    // Only copy if `publish: true`
    if (!data.publish) continue;

    // Determine destination based on DocumentType field
    const docType: DocumentType = data.DocumentType?.toLowerCase();
    if (!docType) continue; // skip if we cannot classify

    const destDir = path.join(DEST_ROOT, docType);
    ensureDir(destDir);

    const fileName = path.basename(filePath);
    const destPath = path.join(destDir, fileName);
    fs.copyFileSync(filePath, destPath);
    console.log(`✔ Copied ${fileName} → ${docType}`);
  }
}

/**
 * Recursively collect *.md files.
 */
function getAllMdFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMdFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

// Execute when the script is run directly
if (require.main === module) {
  copyPublished();
}