# PDF Generation Options for Academic Papers in GitHub Actions

## Option 1: Pandoc + LaTeX (Recommended for Academic Papers)

### GitHub Actions Workflow Addition

```yaml
# Add after the "Copy selected markdown" step in .github/workflows/obsidian-sync.yml

      # 6️⃣ Install Pandoc and LaTeX
      - name: Install Pandoc and LaTeX
        run: |
          sudo apt-get update
          sudo apt-get install -y pandoc texlive-latex-base texlive-latex-extra texlive-fonts-recommended

      # 7️⃣ Generate PDFs from papers
      - name: Generate PDFs for papers
        run: |
          mkdir -p public/papers
          
          for file in content/papers/*.md; do
            if [ -f "$file" ]; then
              filename=$(basename "$file" .md)
              
              # Extract metadata from frontmatter
              title=$(grep "^title:" "$file" | sed 's/title: "\(.*\)"/\1/' | sed "s/title: '\(.*\)'/\1/" | sed 's/title: //')
              author=$(grep "^Authors:" "$file" | sed 's/Authors: //')
              date=$(grep "^date:" "$file" | sed 's/date: //' | tr -d '"')
              doi=$(grep "^DOI:" "$file" | sed 's/DOI: //')
              
              # Generate PDF with Pandoc
              pandoc "$file" \
                --from markdown \
                --to pdf \
                --output "public/papers/${filename}.pdf" \
                --pdf-engine=xelatex \
                --variable papersize=a4 \
                --variable geometry:margin=1in \
                --variable fontsize=11pt \
                --variable documentclass=article \
                --variable colorlinks=true \
                --variable linkcolor=burntochre \
                --variable urlcolor=burntochre \
                --metadata title="$title" \
                --metadata author="$author" \
                --metadata date="$date" \
                --metadata doi="$doi" \
                --standalone \
                --toc \
                --number-sections
              
              echo "Generated PDF: ${filename}.pdf"
            fi
          done

      # 8️⃣ Commit generated PDFs to repo
      - name: Commit PDFs
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add public/papers/*.pdf
          git diff --staged --quiet || git commit -m "Generate PDFs for papers [skip ci]"
          git push
```

### Custom LaTeX Template for Wize Idea Branding

Create `scripts/paper-template.tex`:

```latex
\documentclass[11pt,a4paper]{article}

% Packages
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{lmodern}
\usepackage{microtype}
\usepackage{geometry}
\usepackage{fancyhdr}
\usepackage{graphicx}
\usepackage{hyperref}
\usepackage{xcolor}

% Brand colors
\definecolor{burntochre}{HTML}{B7410E}
\definecolor{dpmolive}{HTML}{4B5320}
\definecolor{striationcharcoal}{HTML}{212529}

% Page geometry
\geometry{
  a4paper,
  left=1in,
  right=1in,
  top=1in,
  bottom=1in,
  headheight=14pt
}

% Header and footer
\pagestyle{fancy}
\fancyhf{}
\fancyhead[L]{\small\textcolor{dpmolive}{$title$}}
\fancyhead[R]{\small\textcolor{dpmolive}{Wize Idea}}
\fancyfoot[C]{\small\textcolor{dpmolive}{\thepage}}
\renewcommand{\headrulewidth}{0.5pt}
\renewcommand{\footrulewidth}{0pt}

% Hyperlinks
\hypersetup{
  colorlinks=true,
  linkcolor=burntochre,
  urlcolor=burntochre,
  citecolor=dpmolive,
  pdfauthor={$author$},
  pdftitle={$title$},
  pdfkeywords={AI, Stylometry, Authorship}
}

% Title formatting
\makeatletter
\renewcommand{\maketitle}{
  \begin{center}
    {\LARGE\bfseries\textcolor{burntochre}{$title$}\par}
    \vspace{0.5em}
    {\large $author$\par}
    $if(orcid)$
      \vspace{0.2em}
      {\small ORCID: \href{https://orcid.org/$orcid$}{$orcid$}\par}
    $endif$
    \vspace{0.5em}
    {\normalsize $date$\par}
    $if(doi)$
      \vspace{0.2em}
      {\small DOI: \href{https://doi.org/$doi$}{$doi$}\par}
    $endif$
    \vspace{1em}
  \end{center}
}
\makeatother

% Section formatting
\usepackage{titlesec}
\titleformat{\section}
  {\Large\bfseries\color{burntochre}}
  {\thesection}{1em}{}
  [\titlerule]
\titleformat{\subsection}
  {\large\bfseries\color{dpmolive}}
  {\thesubsection}{1em}{}

\begin{document}

\maketitle

$if(abstract)$
\begin{abstract}
$abstract$
\end{abstract}
$endif$

$body$

$if(doi)$
\vfill
\noindent\rule{\textwidth}{0.5pt}
\small
\textbf{Citation:} $author$ ($date$). \textit{$title$}. DOI: \href{https://doi.org/$doi$}{$doi$}
$endif$

\end{document}
```

**Updated workflow to use template**:

```yaml
      - name: Generate PDFs with custom template
        run: |
          mkdir -p public/papers
          
          for file in content/papers/*.md; do
            if [ -f "$file" ]; then
              filename=$(basename "$file" .md)
              
              pandoc "$file" \
                --from markdown \
                --to pdf \
                --output "public/papers/${filename}.pdf" \
                --pdf-engine=xelatex \
                --template=scripts/paper-template.tex \
                --standalone \
                --toc \
                --number-sections
              
              echo "Generated PDF: ${filename}.pdf"
            fi
          done
```

---

## Option 2: Puppeteer (HTML to PDF) - Use Your Existing Design

**Best for**: Maintaining visual consistency with website

**Advantages**:
- Uses your existing Tailwind CSS
- Consistent branding
- Easier to customize
- Supports your font stack

**Implementation**:

```yaml
      # Install Node dependencies
      - name: Install Puppeteer
        run: npm install puppeteer

      # Generate PDFs using Puppeteer
      - name: Generate PDFs with Puppeteer
        run: node scripts/generate-pdfs.js
```

Create `scripts/generate-pdfs.js`:

```javascript
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

async function generatePDF(markdownPath, outputPath) {
  // Read and parse markdown
  const markdown = fs.readFileSync(markdownPath, 'utf8');
  const { data, content } = matter(markdown);
  const html = marked.parse(content);
  
  // Create HTML template with Wize Idea styling
  const fullHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=IBM+Plex+Serif:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        :root {
          --burnt-ochre: #B7410E;
          --dpm-olive: #4B5320;
          --striation-charcoal: #212529;
          --salt-white: #F8F9FA;
          --light-smoke: #F5F5F5;
        }
        
        @page {
          size: A4;
          margin: 1in;
          @top-center {
            content: "${data.title || ''}";
            font-family: 'IBM Plex Serif', serif;
            font-size: 10pt;
            color: var(--dpm-olive);
          }
          @bottom-center {
            content: counter(page);
            font-family: 'IBM Plex Serif', serif;
            font-size: 10pt;
            color: var(--dpm-olive);
          }
        }
        
        body {
          font-family: 'IBM Plex Serif', serif;
          font-size: 11pt;
          line-height: 1.6;
          color: var(--striation-charcoal);
          max-width: 100%;
        }
        
        h1, h2, h3, h4 {
          font-family: 'Libre Baskerville', serif;
          color: var(--burnt-ochre);
          page-break-after: avoid;
        }
        
        h1 {
          font-size: 24pt;
          border-bottom: 2px solid var(--burnt-ochre);
          padding-bottom: 0.5em;
          margin-bottom: 0.5em;
        }
        
        h2 {
          font-size: 18pt;
          border-bottom: 1px solid var(--dpm-olive);
          padding-bottom: 0.3em;
          margin-top: 1.5em;
        }
        
        h3 {
          font-size: 14pt;
          color: var(--dpm-olive);
          margin-top: 1em;
        }
        
        code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9pt;
          background: var(--light-smoke);
          padding: 2px 4px;
          border: 1px solid var(--dpm-olive);
        }
        
        pre {
          background: var(--light-smoke);
          border-left: 4px solid var(--dpm-olive);
          padding: 1em;
          overflow-x: auto;
          page-break-inside: avoid;
        }
        
        pre code {
          background: none;
          border: none;
          padding: 0;
        }
        
        a {
          color: var(--burnt-ochre);
          text-decoration: none;
        }
        
        .title-page {
          text-align: center;
          margin-bottom: 2em;
          page-break-after: always;
        }
        
        .title-page h1 {
          font-size: 28pt;
          margin-bottom: 0.5em;
          border: none;
        }
        
        .metadata {
          font-size: 12pt;
          color: var(--dpm-olive);
          margin-top: 1em;
        }
        
        .doi {
          margin-top: 0.5em;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10pt;
        }
        
        table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9pt;
        }
        
        th, td {
          border: 1px solid var(--dpm-olive);
          padding: 0.5em;
          text-align: left;
        }
        
        th {
          background: var(--light-smoke);
          font-weight: 600;
        }
        
        blockquote {
          border-left: 4px solid var(--burnt-ochre);
          background: var(--light-smoke);
          padding: 1em;
          margin: 1em 0;
          page-break-inside: avoid;
        }
      </style>
    </head>
    <body>
      <div class="title-page">
        <h1>${data.title || 'Untitled'}</h1>
        <div class="metadata">
          ${data.Authors ? `<p><strong>Author:</strong> ${data.Authors}</p>` : ''}
          ${data.ORCID ? `<p><strong>ORCID:</strong> <a href="https://orcid.org/${data.ORCID}">${data.ORCID}</a></p>` : ''}
          ${data.date ? `<p><strong>Date:</strong> ${data.date}</p>` : ''}
          ${data.DOI ? `<p class="doi"><strong>DOI:</strong> <a href="https://doi.org/${data.DOI}">${data.DOI}</a></p>` : ''}
        </div>
      </div>
      
      ${html}
      
      ${data.DOI ? `
        <hr style="margin-top: 2em; border: none; border-top: 1px solid var(--dpm-olive);">
        <div style="font-size: 10pt; color: var(--dpm-olive); margin-top: 1em;">
          <strong>Citation:</strong> ${data.Authors || ''} (${data.date || ''}). <em>${data.title || ''}</em>. 
          DOI: <a href="https://doi.org/${data.DOI}">${data.DOI}</a>
        </div>
      ` : ''}
    </body>
    </html>
  `;
  
  // Launch browser and generate PDF
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
  
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '1in',
      right: '1in',
      bottom: '1in',
      left: '1in'
    },
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="width: 100%; font-size: 10pt; text-align: center; color: #4B5320; font-family: 'IBM Plex Serif', serif;">
        <span>${data.title || ''}</span>
      </div>
    `,
    footerTemplate: `
      <div style="width: 100%; font-size: 10pt; text-align: center; color: #4B5320; font-family: 'IBM Plex Serif', serif;">
        <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>
    `
  });
  
  await browser.close();
  console.log(`Generated: ${outputPath}`);
}

// Process all papers
async function processAllPapers() {
  const papersDir = path.join(process.cwd(), 'content', 'papers');
  const outputDir = path.join(process.cwd(), 'public', 'papers');
  
  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const files = fs.readdirSync(papersDir).filter(f => f.endsWith('.md'));
  
  for (const file of files) {
    const markdownPath = path.join(papersDir, file);
    const pdfName = file.replace('.md', '.pdf');
    const outputPath = path.join(outputDir, pdfName);
    
    await generatePDF(markdownPath, outputPath);
  }
}

processAllPapers().catch(console.error);
```

---

## Option 3: Typst (Modern Alternative to LaTeX)

**Best for**: Fast compilation, modern syntax

**Advantages**:
- Much faster than LaTeX
- Easier syntax
- Good typography
- Growing in academic community

```yaml
      - name: Install Typst
        run: |
          curl -fsSL https://github.com/typst/typst/releases/download/v0.11.0/typst-x86_64-unknown-linux-musl.tar.gz | tar xz
          sudo mv typst-x86_64-unknown-linux-musl/typst /usr/local/bin/

      - name: Convert markdown to Typst and generate PDFs
        run: |
          mkdir -p public/papers
          # Conversion script needed
          node scripts/markdown-to-typst.js
```

---

## Recommended Implementation Strategy

### Phase 1: Quick Start (Pandoc Basic)
Use simple Pandoc without custom template to get PDFs quickly.

### Phase 2: Professional Template (Pandoc + LaTeX Template)
Add custom LaTeX template for Wize Idea branding.

### Phase 3: Enhanced Features
- Add bibliography support
- Include figures/diagrams
- Watermark with DOI
- Metadata embedding for archival

---

## Additional Considerations

### 1. PDF Metadata (Important for DOI/Zenodo)

All methods should embed:
- Title
- Author name
- ORCID
- DOI
- Date
- Keywords

### 2. File Storage Structure

```
public/
  papers/
    my-paper.pdf           # PDF version
    my-paper-preprint.pdf  # Optional: Preprint version
```

### 3. Link PDFs in HTML

Update paper pages to include download link:

```tsx
{DOI && (
  <div className="mt-4">
    <a 
      href={`/papers/${slug}.pdf`}
      className="inline-flex items-center px-4 py-2 bg-burntOchre text-saltWhite"
      download
    >
      Download PDF
    </a>
  </div>
)}
```

### 4. Version Control

Consider:
- Version numbers in PDFs
- Archive old versions
- Preprint vs published versions

---

## My Recommendation

**Start with Puppeteer (Option 2)** because:

1. ✅ Uses your existing design system
2. ✅ No LaTeX installation needed
3. ✅ Easier to customize
4. ✅ Consistent with website branding
5. ✅ Can add watermarks, headers easily
6. ✅ Full control over styling

**Upgrade to Pandoc + LaTeX later** if you need:
- More complex academic formatting
- Journal-specific templates
- Advanced citation management

Would you like me to implement the Puppeteer solution fully in your GitHub Actions workflow?
