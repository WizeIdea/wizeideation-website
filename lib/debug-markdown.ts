import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { Node } from 'unist';

interface MermaidNode extends Node {
  type: 'code';
  lang: string;
  value: string;
}

interface ProcessedMarkdown {
  html: string;
  mermaidDiagrams: Array<{
    id: string;
    code: string;
    placeholder: string;
  }>;
  debugInfo: {
    originalContent: string;
    processedContent: string;
    diagramCount: number;
  };
}

export async function debugMarkdownProcessing(content: string): Promise<ProcessedMarkdown> {
  const mermaidDiagrams: Array<{ id: string; code: string; placeholder: string }> = [];
  let processedContent = content;

  console.log('=== ORIGINAL MARKDOWN ===');
  console.log(content);

  // Enhanced markdown processing with GFM (tables, task lists)
  // Note: Math formulas are handled client-side to avoid compatibility issues
  const processed = await remark()
    .use(remarkGfm) // Add GitHub Flavored Markdown support
    .use(() => (tree: any) => {
      // Find all code blocks with language 'mermaid'
      visit(tree, 'code', (node: MermaidNode, index, parent) => {
        if (node.lang === 'mermaid') {
          const diagramId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const placeholder = `<!-- MERMAID_PLACEHOLDER:${diagramId} -->`;

          // Store the diagram for later rendering
          mermaidDiagrams.push({
            id: diagramId,
            code: node.value,
            placeholder: placeholder,
          });

          // Replace the code block with a placeholder
          if (parent && typeof index === 'number') {
            parent.children[index] = {
              type: 'html',
              value: placeholder,
            };
          }
        }
      });
    })
    .use(remarkHtml)
    .process(content);

  const htmlOutput = processed.toString();
  console.log('=== PROCESSED HTML ===');
  console.log(htmlOutput);

  return {
    html: htmlOutput,
    mermaidDiagrams: mermaidDiagrams,
    debugInfo: {
      originalContent: content,
      processedContent: htmlOutput,
      diagramCount: mermaidDiagrams.length,
    },
  };
}
