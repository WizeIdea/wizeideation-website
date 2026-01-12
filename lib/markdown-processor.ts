import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { visit } from 'unist-util-visit';
import { Node } from 'unist';

interface MermaidNode extends Node {
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
}

export async function processMarkdownWithMermaid(content: string): Promise<ProcessedMarkdown> {
  const mermaidDiagrams: Array<{ id: string; code: string; placeholder: string }> = [];

  // Process the markdown to extract mermaid diagrams and convert to HTML
  const processed = await remark()
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

  return {
    html: processed.toString(),
    mermaidDiagrams: mermaidDiagrams,
  };
}

export function replaceMermaidPlaceholders(
  html: string,
  diagrams: Array<{ id: string; placeholder: string; rendered: string }>
): string {
  let result = html;
  diagrams.forEach((diagram) => {
    result = result.replace(diagram.placeholder, diagram.rendered);
  });
  return result;
}
