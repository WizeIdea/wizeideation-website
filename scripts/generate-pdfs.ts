/**
 * scripts/generate-pdfs.ts
 *
 * Generates PDF files for published papers using Pandoc + LaTeX.
 * Only generates PDFs for papers that don't already have one.
 * Requires DOI to be present in frontmatter.
 */

import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { execSync } from 'child_process';

const PAPERS_DIR = path.resolve(process.cwd(), 'content', 'papers');
const OUTPUT_DIR = path.resolve(process.cwd(), 'public', 'papers');
const TEMPLATE_PATH = path.resolve(process.cwd(), 'templates', 'academic-paper.tex');

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Check if Pandoc and LaTeX are installed
 */
function checkDependencies() {
  try {
    execSync('pandoc --version', { stdio: 'ignore' });
    execSync('pdflatex --version', { stdio: 'ignore' });
  } catch (error) {
    console.error('❌ ERROR: Pandoc or LaTeX not installed');
    console.error('   Install with: apt-get install pandoc texlive-latex-base texlive-latex-extra');
    process.exit(1);
  }
}

/**
 * Generate PDF for a single paper
 */
function generatePDF(markdownPath: string) {
  const raw = fs.readFileSync(markdownPath, 'utf8');
  const { data, content } = matter(raw);

  // Validate required fields
  if (!data.DocID) {
    console.error(`❌ ERROR: Missing DocID in ${path.basename(markdownPath)}`);
    process.exit(1);
  }

  if (!data.DOI) {
    console.error(`❌ ERROR: Missing DOI in ${path.basename(markdownPath)}`);
    console.error(`   Paper: ${data.DocID || path.basename(markdownPath)}`);
    console.error(`   PDFs can only be generated for papers with assigned DOIs`);
    process.exit(1);
  }

  const docId = data.DocID;
  const outputFolder = path.join(OUTPUT_DIR, docId);
  const pdfPath = path.join(outputFolder, `${docId}.pdf`);

  // Skip if PDF already exists
  if (fs.existsSync(pdfPath)) {
    console.log(`⏭️  Skipping ${docId} - PDF already exists`);
    return false;
  }

  console.log(`📄 Generating PDF for ${docId}...`);
  ensureDir(outputFolder);

  // Create temporary markdown file with frontmatter for Pandoc
  const tempMd = path.join(outputFolder, `${docId}-temp.md`);
  const fullContent = matter.stringify(content, data);
  fs.writeFileSync(tempMd, fullContent, 'utf8');

  try {
    // Generate PDF using Pandoc + LaTeX
    const pandocCmd = `pandoc "${tempMd}" \
      --template="${TEMPLATE_PATH}" \
      --pdf-engine=pdflatex \
      --output="${pdfPath}" \
      --metadata title="${data.title || docId}" \
      --metadata date="${data.date || ''}" \
      --metadata Authors="${data.Authors || 'Scott, N.'}" \
      --metadata DOI="${data.DOI}" \
      --metadata ORCID="${data.ORCID || '0009-0001-5276-0613'}"`;

    execSync(pandocCmd, { stdio: 'inherit' });

    // Clean up temporary files
    fs.unlinkSync(tempMd);
    
    // Clean up LaTeX auxiliary files if they exist
    const auxFiles = ['.aux', '.log', '.out'].map(ext => path.join(outputFolder, `${docId}${ext}`));
    auxFiles.forEach(file => {
      if (fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    });

    console.log(`✅ Generated PDF: ${pdfPath}`);
    return true;
  } catch (error) {
    console.error(`❌ ERROR: Failed to generate PDF for ${docId}`);
    console.error(error);
    // Clean up temp file on error
    if (fs.existsSync(tempMd)) {
      fs.unlinkSync(tempMd);
    }
    process.exit(1);
  }
}

/**
 * Main function
 */
function main() {
  console.log('🔍 Checking for Pandoc and LaTeX...');
  checkDependencies();

  if (!fs.existsSync(PAPERS_DIR)) {
    console.log('⚠️  No papers directory found. Skipping PDF generation.');
    return;
  }

  const papers = fs.readdirSync(PAPERS_DIR).filter(f => f.endsWith('.md'));

  if (papers.length === 0) {
    console.log('⚠️  No papers found. Skipping PDF generation.');
    return;
  }

  console.log(`\n📚 Found ${papers.length} paper(s). Checking for new PDFs to generate...\n`);

  let generatedCount = 0;
  for (const paperFile of papers) {
    const paperPath = path.join(PAPERS_DIR, paperFile);
    const wasGenerated = generatePDF(paperPath);
    if (wasGenerated) {
      generatedCount++;
    }
  }

  if (generatedCount > 0) {
    console.log(`\n✅ Generated ${generatedCount} new PDF(s)`);
  } else {
    console.log('\n✅ All PDFs up to date - no generation needed');
  }
}

main();
