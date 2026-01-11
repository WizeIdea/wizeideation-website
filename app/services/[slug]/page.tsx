// -------------------------------------------------------------------
// Force this page to be rendered **statically** at build time.
// -------------------------------------------------------------------
export const dynamic = 'force-static';
export const revalidate = 0;

import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { FC } from 'react';
import { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export const generateStaticParams = async () => {
  const dir = path.join(process.cwd(), 'content', 'services');
  const files = await fs.readdir(dir);
  return files
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({
      slug: f.replace(/\.md$/, ''),
    }));
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const filePath = path.join(process.cwd(), 'content', 'services', `${params.slug}.md`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data } = matter(raw);
    return {
      title: data.title,
      description: data.excerpt ?? data.title,
    };
  } catch {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found',
    };
  }
}

const ServicePage: FC<Props> = async ({ params }) => {
  const filePath = path.join(
    process.cwd(),
    'content',
    'services',
    `${params.slug}.md`,
  );
  if (!(await fs.stat(filePath).catch(() => false))) notFound();

  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkHtml).process(content);
  const htmlContent = processed.toString();

  return (
    <>
      <article className="prose lg:prose-xl max-w-none text-striationCharcoal">
        <h1>{data.title}</h1>
        <MarkdownRenderer html={htmlContent} />
      </article>
    </>
  );
};

export default ServicePage;
