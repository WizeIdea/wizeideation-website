// -------------------------------------------------------------------
// Force this page to be rendered **statically** at build time.
// -------------------------------------------------------------------
export const dynamic = 'force-static';
export const revalidate = 0;

// app/projects/[slug]/page.tsx
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

type Props = {
  params: { slug: string };
};

export const generateStaticParams = async () => {
  // ---------------------------------------------------------------
  // Guard against a missing folder – return an empty array if it doesn't exist.
  // ---------------------------------------------------------------
  const dir = path.join(process.cwd(), 'content', 'projects');
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
  const filePath = path.join(process.cwd(), 'content', 'projects', `${paramsResolved.slug}.md`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data } = matter(raw);
    return {
      title: data.title,
      description: data.excerpt ?? data.title,
    };
  } catch {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found',
    };
  }
}

const ProjectPage: FC<Props> = async ({ params }) => {
  // -----------------------------------------------------------------
  // 1️⃣ Resolve params Promise and locate the markdown file that matches the slug
  // -----------------------------------------------------------------
  const paramsResolved = await params;
  const filePath = path.join(
    process.cwd(),
    'content',
    'projects',
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
      <article className="prose lg:prose-xl max-w-none text-striationCharcoal">
        <h1>{data.title}</h1>

        {/* Render enhanced markdown with all features */}
        <EnhancedMarkdownRenderer content={content} />
      </article>
    </>
  );
};

export default ProjectPage;
