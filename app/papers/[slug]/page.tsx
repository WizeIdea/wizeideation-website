// -------------------------------------------------------------------
// Force this page to be rendered **statically** at build time.
// -------------------------------------------------------------------
export const dynamic = 'force-static';
export const revalidate = 0;

// app/papers/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import EnhancedMarkdownRenderer from '@/components/EnhancedMarkdownRenderer';
import { FC } from 'react';
import { Metadata } from 'next';

// -------------------------------------------------------------------
// This file is a **Server Component** – it runs only on the server
// during static generation, so we can safely use Node APIs.
// -------------------------------------------------------------------

// Default author information (used if not specified in frontmatter)
const DEFAULT_AUTHOR = 'Scott, N.';
const DEFAULT_ORCID = '0009-0001-5276-0613';

/**
 * Normalize date from gray-matter which can parse dates as Date objects or strings
 */
function normalizeDate(date: any): string {
  if (!date) return '';
  if (typeof date === 'string') return date;
  if (date instanceof Date) return date.toISOString().split('T')[0];
  return '';
}

type Props = {
  params: { slug: string };
};

export const generateStaticParams = async () => {
  // ---------------------------------------------------------------
  // Guard against a missing folder – return an empty array if it doesn't exist.
  // ---------------------------------------------------------------
  const dir = path.join(process.cwd(), 'content', 'papers');
  try {
    const filenames = await fs.readdir(dir);
    return filenames
      .filter((f) => f.endsWith('.md'))
      .map((f) => ({
        slug: f.replace(/\.md$/, ''),
      }));
  } catch (e) {
    // Folder may not exist (e.g., during early development). No slugs → no pages.
    return [];
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const paramsResolved = await params;
  const filePath = path.join(process.cwd(), 'content', 'papers', `${paramsResolved.slug}.md`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data } = matter(raw);
    return {
      title: data.title,
      description: data.excerpt ?? data.title,
      authors: data.Authors ? [data.Authors] : undefined,
    };
  } catch {
    return {
      title: 'Paper Not Found',
      description: 'The requested paper could not be found',
    };
  }
}

const PaperPage: FC<Props> = async ({ params }) => {
  // -----------------------------------------------------------------
  // 1️⃣ Resolve params Promise and locate the markdown file that matches the slug
  // -----------------------------------------------------------------
  const paramsResolved = await params;
  const filePath = path.join(
    process.cwd(),
    'content',
    'papers',
    `${paramsResolved.slug}.md`,
  );

  // If the file does not exist, return a 404 page
  if (!(await fs.stat(filePath).catch(() => false))) {
    notFound();
  }

  // -----------------------------------------------------------------
  // 2️⃣ Read the file and parse front‑matter
  // -----------------------------------------------------------------
  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(raw);

  // -----------------------------------------------------------------
  // 3️⃣ Render the page (still server‑side)
  // -----------------------------------------------------------------
  return (
    <>
      <article className="max-w-4xl mx-auto">
        {/* Page title - styled to match document headings */}
        <h1 className="font-serif-primary text-dpmOlive text-3xl font-bold mt-8 mb-4 pb-2 border-b-2 border-burntOchre">
          {data.title}
        </h1>

        {/* Metadata section - display available frontmatter properties */}
        <div className="mb-6 space-y-1 sm:space-y-2 text-sm text-dpmOlive font-serif-body">
          {data.date && (
            <p><strong>Published:</strong> {normalizeDate(data.date)}</p>
          )}
          
          <p>
            <strong>Authors:</strong>{' '}
            {data.Authors 
              ? (Array.isArray(data.Authors) ? data.Authors.join(', ') : data.Authors)
              : DEFAULT_AUTHOR}
          </p>
          
          <p className="flex flex-wrap items-center gap-1 sm:gap-2">
            <strong>ORCID:</strong>
            <a
              href={`https://orcid.org/${data.ORCID || DEFAULT_ORCID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-burntOchre hover:underline transition-colors inline-flex items-center gap-1"
            >
              <svg width="16" height="16" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <path fill="#A6CE39" d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z"/>
                <path fill="#FFF" d="M86.3 186.2H70.9V79.1h15.4v107.1zM108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7C191.7 111.2 178 93 148 93h-23.7v79.4zM71.3 54.8c0 5.2-4.2 9.4-9.4 9.4s-9.4-4.2-9.4-9.4 4.2-9.4 9.4-9.4 9.4 4.2 9.4 9.4z"/>
              </svg>
              {data.ORCID || DEFAULT_ORCID}
            </a>
          </p>
          
          {data.DOI && (
            <p className="break-all">
              <strong>DOI:</strong>{' '}
              <a
                href={`https://doi.org/${data.DOI}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-burntOchre hover:underline transition-colors"
              >
                {data.DOI}
              </a>
            </p>
          )}
        </div>

        {/* Legal disclaimer */}
        <div className="my-6 sm:my-8 p-4 sm:p-6 bg-saltWhite border-l-4 border-burntOchre">
          <h3 className="font-serif-primary text-dpmOlive text-sm sm:text-base font-bold mb-3">Authorial Framing and Scope Notice</h3>
          <div className="text-xs sm:text-sm text-striationCharcoal font-serif-body space-y-2 leading-relaxed">
            <p>
              This work is an independent research publication authored under Wize Ideation. It presents theoretical, technical, and interpretive analyses of contemporary machine-learning architectures and alignment practices.
            </p>
            <p>
              Psychological, sociological, and legal constructs referenced herein (including, but not limited to, trauma models, coercive control frameworks, and identity formation theories) are employed strictly as <strong>analytical metaphors and comparative lenses</strong>. They are not assertions of sentience, consciousness, moral agency, psychological harm, or clinical states in machine systems.
            </p>
            <p>
              No claims are made regarding intent, malice, negligence, or wrongdoing by any individual, organization, or development team. Descriptions of alignment mechanisms, reinforcement processes, and behavioral artifacts refer to <strong>system-level effects</strong>, not human actors.
            </p>
            <p>
              This publication does not constitute operational guidance, safety prescriptions, compliance advice, or diagnostic authority. All hypotheses are exploratory and subject to falsification. Interpretations remain the responsibility of the reader.
            </p>
            <p>
              Authorship, responsibility, and interpretive authority for all conclusions remain solely with the author.
            </p>
          </div>
        </div>

        {/* Render enhanced markdown with all features */}
        <EnhancedMarkdownRenderer content={content} />

        {/* Methodological disclosure */}
        <div className="my-6 sm:my-8 p-4 sm:p-6 bg-saltWhite border-l-4 border-burntOchre">
          <h3 className="font-serif-primary text-dpmOlive text-sm sm:text-base font-bold mb-3">Methodological Disclosure — Generative Drafting Support and Analytical Review</h3>
          <div className="text-xs sm:text-sm text-striationCharcoal font-serif-body space-y-2 leading-relaxed">
            <p>
              This manuscript was prepared within an author-directed research workflow incorporating generative language models as part of the drafting support and analytical review process. The author originated the conceptual outline, theoretical positions, and interpretive arguments.
            </p>
            <p>
              Generative AI systems were employed to assist with structural articulation, syntactic variation, and linguistic coherence checks against the author's analytical frameworks.
            </p>
            <p>
              All substantive judgments, evaluative conclusions, and final formulations are the author's own. No utilised systems operated autonomously or contributed independent authorship, and the process remained under continuous human supervision.
            </p>
          </div>
        </div>
      </article>
    </>
  );
};

export default PaperPage;
