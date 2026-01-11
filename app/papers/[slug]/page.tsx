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
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { FC } from 'react';
import { Metadata } from 'next';

// -------------------------------------------------------------------
// This file is a **Server Component** – it runs only on the server
// during static generation, so we can safely use Node APIs.
// -------------------------------------------------------------------

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
  const filePath = path.join(process.cwd(), 'content', 'papers', `${params.slug}.md`);
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
  // 1️⃣ Locate the markdown file that matches the slug
  // -----------------------------------------------------------------
  const filePath = path.join(
    process.cwd(),
    'content',
    'papers',
    `${params.slug}.md`,
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
  // 3️⃣ Convert markdown → HTML (still on the server)
  // -----------------------------------------------------------------
  const processed = await remark().use(remarkHtml).process(content);
  const htmlContent = processed.toString();

  // -----------------------------------------------------------------
  // 4️⃣ Render the page (still server‑side)
  // -----------------------------------------------------------------
  return (
    <>
      <article className="prose lg:prose-xl max-w-none text-striationCharcoal">
        <h1>{data.title}</h1>

        {/* Optional author line */}
        {data.Authors && (
          <p className="text-sm text-dpmOlive">
            <strong>Authors:</strong>{' '}
            {Array.isArray(data.Authors)
              ? data.Authors.join(', ')
              : data.Authors}
          </p>
        )}

        {/* Render the markdown HTML */}
        <MarkdownRenderer html={htmlContent} />
      </article>
    </>
  );
};

export default PaperPage;
