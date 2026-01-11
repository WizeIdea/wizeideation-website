import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import Seo from '@/components/Seo';
import MarkdownRenderer from '@/components/MarkdownRenderer';
export const generateStaticParams = async () => {
    const dir = path.join(process.cwd(), 'content', 'services');
    const files = await fs.readdir(dir);
    return files.map((f) => ({
        slug: f.replace(/\.md$/, ''),
    }));
};
const ServicePage = async ({ params }) => {
    const filePath = path.join(process.cwd(), 'content', 'services', `${params.slug}.md`);
    if (!(await fs.stat(filePath).catch(() => false)))
        notFound();
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);
    const processed = await remark().use(remarkHtml).process(content);
    const htmlContent = processed.toString();
    return (_jsxs(_Fragment, { children: [_jsx(Seo, { title: data.title, description: data.excerpt ?? data.title }), _jsxs("article", { className: "prose lg:prose-xl max-w-none text-striationCharcoal", children: [_jsx("h1", { children: data.title }), _jsx(MarkdownRenderer, { html: htmlContent })] })] }));
};
export default ServicePage;
