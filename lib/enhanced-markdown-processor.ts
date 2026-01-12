import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import { Node } from 'unist';

interface MermaidNode extends Node {
  type: 'code';
  lang: string;
  value: string;
}

interface CodeNode extends Node {
  type: 'code';
  lang: string;
  value: string;
  data?: {
    hProperties?: {
      className?: string[];
    };
  };
}

interface ProcessedMarkdown {
  html: string;
  mermaidDiagrams: Array<{
    id: string;
    code: string;
    placeholder: string;
  }>;
  codeBlocks: Array<{
    id: string;
    code: string;
    language: string;
    placeholder: string;
  }>;
  mathFormulas: Array<{
    id: string;
    formula: string;
    placeholder: string;
    isBlock: boolean;
  }>;
}

export async function processEnhancedMarkdown(content: string): Promise<ProcessedMarkdown> {
  const mermaidDiagrams: Array<{ id: string; code: string; placeholder: string }> = [];
  const codeBlocks: Array<{ id: string; code: string; language: string; placeholder: string }> = [];
  const mathFormulas: Array<{ id: string; formula: string; placeholder: string; isBlock: boolean }> = [];

  try {
    // Enhanced markdown processing with GFM (tables, task lists)
    // Note: Math formulas are handled client-side to avoid compatibility issues
    const processed = await remark()
      .use(remarkGfm) // Add GitHub Flavored Markdown support
      .use(() => (tree: any) => {
        // Process Mermaid diagrams
        visit(tree, 'code', (node: MermaidNode, index, parent) => {
          if (node.lang === 'mermaid') {
            const diagramId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
            const placeholder = `<!-- MERMAID_PLACEHOLDER:${diagramId} -->`;

            mermaidDiagrams.push({
              id: diagramId,
              code: node.value,
              placeholder: placeholder,
            });

            if (parent && typeof index === 'number') {
              parent.children[index] = {
                type: 'html',
                value: placeholder,
              };
            }
          }
        });

        // Process code blocks for syntax highlighting
        visit(tree, 'code', (node: CodeNode, index, parent) => {
          if (node.lang && node.lang !== 'mermaid') {
            const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;
            const placeholder = `<!-- CODE_PLACEHOLDER:${codeId} -->`;

            codeBlocks.push({
              id: codeId,
              code: node.value,
              language: node.lang,
              placeholder: placeholder,
            });

            if (parent && typeof index === 'number') {
              parent.children[index] = {
                type: 'html',
                value: placeholder,
              };
            }
          }
        });

        // Note: Math formulas are NOT processed server-side to avoid compatibility issues
        // They will be handled entirely client-side using KaTeX
      })
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(content);

    return {
      html: processed.toString(),
      mermaidDiagrams: mermaidDiagrams,
      codeBlocks: codeBlocks,
      mathFormulas: mathFormulas,
    };
  } catch (error) {
    console.error('Error processing enhanced markdown:', error);
    // Return fallback content with error information
    return {
      html: `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Markdown Processing Error:</strong>
        <span class="block sm:inline">Failed to process enhanced markdown content.</span>
        <pre class="mt-2 text-xs overflow-auto">${escapeHtml(error instanceof Error ? error.message : String(error))}</pre>
      </div>`,
      mermaidDiagrams: [],
      codeBlocks: [],
      mathFormulas: [],
    };
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
