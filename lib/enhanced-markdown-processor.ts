import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { Node } from 'unist';



export async function processEnhancedMarkdown(content: string): Promise<string> {
  try {
    // Enhanced markdown processing with GFM, math, and syntax highlighting
    const processed = await remark()
      .use(remarkGfm) // Add GitHub Flavored Markdown support
      .use(remarkMath) // Add math formula parsing
      .use(remarkRehype)
      .use(rehypeKatex, { throwOnError: false }) // Render math to HTML
      .use(rehypeHighlight) // Add syntax highlighting to code blocks
      .use(rehypeRaw) // Parse raw HTML
      .use(rehypeStringify)
      .process(content);

    return processed.toString();
  } catch (error) {
    console.error('Error processing enhanced markdown:', error);
    // Return fallback content with error information
    return `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Markdown Processing Error:</strong>
      <span class="block sm:inline">Failed to process enhanced markdown content.</span>
      <pre class="mt-2 text-xs overflow-auto">${escapeHtml(error instanceof Error ? error.message : String(error))}</pre>
    </div>`;
  }
}

// Helper function to escape HTML (server-safe)
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;');
}
