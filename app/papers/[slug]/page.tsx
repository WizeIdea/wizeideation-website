import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';               // ← named import
import remarkHtml from 'remark-html';          // ← default (declared above)
import Seo from '@/components/Seo';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { FC } from 'react';

type Props = {
  params: { slug: string };
};

export const generateStaticParams = async () => {
  const dir = path.join(process.cwd(), 'content', 'papers');
  const files = await fs.readdir(dir);
  return files.map((f) => ({
    slug: f.replace(/\.md$/, ''),
  }));
};

const PaperPage: FC<Props> = async ({ params }) => {
  const filePath = path.join(
    process.cwd(),
    'content',
    'papers',
    `${params.slug}.md`,
  );
  if (!(await fs.stat(filePath).catch(() => false))) notFound();

  const raw = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(raw);

  // Convert markdown → HTML
  const processed = await remark().use(remarkHtml).process(content);
  const htmlContent = processed.toString();

  return (
    <>
      <Seo
        title={data.title}
        description={data.excerpt ?? data.title}
        meta={{
          author: data.Authors?.join(', ') ?? '',
          orcid: data.ORCID ?? '',
          doi: data.DOI ?? '',
        }}
      />
      <article className="prose lg:prose-xl max-w-none text-striationCharcoal">
        <h1>{data.title}</h1>
        {data.Authors && (
          <p className="text-sm text-dpmOlive">
            <strong>Authors:</strong>{' '}
            {Array.isArray(data.Authors) ? data.Authors.join(', ') : data.Authors}
          </p>
        )}
        <MarkdownRenderer html={htmlContent} />
      </article>
    </>
  );
};

export default PaperPage;