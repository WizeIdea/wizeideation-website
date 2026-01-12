'use client';

import { useEffect, useRef } from 'react';
import MermaidDiagram from './MermaidDiagram';
import { processEnhancedMarkdown } from '@/lib/enhanced-markdown-processor';
import matter from 'gray-matter';

interface EnhancedMarkdownRendererProps {
  content: string;
  className?: string;
}

const EnhancedMarkdownRenderer: React.FC<EnhancedMarkdownRendererProps> = ({ content, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function renderEnhancedContent() {
      if (!containerRef.current) return;

      try {
        // Process the markdown content
        const { html, mermaidDiagrams, codeBlocks, mathFormulas } = await processEnhancedMarkdown(content);

        // Set the base HTML content
        containerRef.current.innerHTML = html;

        // Render Mermaid diagrams
        for (const diagram of mermaidDiagrams) {
          const placeholder = containerRef.current.querySelector(`[data-placeholder="${diagram.placeholder}"]`);
          if (placeholder) {
            // Create a container for the Mermaid diagram
            const diagramContainer = document.createElement('div');
            diagramContainer.className = 'mermaid-diagram bg-olive50 border border-dpmOlive rounded-olive-sm p-4 my-6 overflow-auto';

            // Render the Mermaid diagram
            try {
              const { default: mermaid } = await import('mermaid');
              mermaid.initialize({
                startOnLoad: false,
                theme: 'default',
                fontFamily: '"IBM Plex Mono", monospace',
              });

              const { svg } = await mermaid.render(`mermaid-${diagram.id}`, diagram.code);
              diagramContainer.innerHTML = svg;
            } catch (error) {
              console.error('Error rendering Mermaid diagram:', error);
              diagramContainer.innerHTML = `
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong class="font-bold">Mermaid Error:</strong>
                  <span class="block sm:inline">Failed to render diagram. Please check the syntax.</span>
                  <pre class="mt-2 text-xs overflow-auto">${escapeHtml(diagram.code)}</pre>
                </div>
              `;
            }

            placeholder.replaceWith(diagramContainer);
          }
        }

        // Render code blocks with syntax highlighting
        for (const codeBlock of codeBlocks) {
          const placeholder = containerRef.current.querySelector(`[data-placeholder="${codeBlock.placeholder}"]`);
          if (placeholder) {
            // Create a code container with proper styling
            const codeContainer = document.createElement('div');
            codeContainer.className = 'code-block bg-gray-900 rounded-olive-sm p-4 my-6 overflow-auto';

            // Add language indicator
            const languageIndicator = document.createElement('div');
            languageIndicator.className = 'flex items-center mb-2';
            languageIndicator.innerHTML = `
              <span class="text-xs font-mono text-gray-400 bg-gray-800 px-2 py-1 rounded">
                ${codeBlock.language}
              </span>
            `;
            codeContainer.appendChild(languageIndicator);

            // Create the code element
            const codeElement = document.createElement('code');
            codeElement.className = `language-${codeBlock.language} text-sm font-mono text-white`;
            codeElement.textContent = codeBlock.code;

            // Create the pre element
            const preElement = document.createElement('pre');
            preElement.className = 'overflow-auto';
            preElement.appendChild(codeElement);

            codeContainer.appendChild(preElement);
            placeholder.replaceWith(codeContainer);

            // Apply syntax highlighting
            if (typeof window !== 'undefined') {
              const { default: hljs } = await import('highlight.js');
              hljs.highlightElement(codeElement);
            }
          }
        }

        // Render math formulas
        for (const mathFormula of mathFormulas) {
          const placeholder = containerRef.current.querySelector(`[data-placeholder="${mathFormula.placeholder}"]`);
          if (placeholder) {
            // Create a math container
            const mathContainer = document.createElement(mathFormula.isBlock ? 'div' : 'span');
            mathContainer.className = mathFormula.isBlock
              ? 'math-formula block my-4 text-center'
              : 'math-formula inline mx-1';

            // Render the math formula
            try {
              const katex = require('katex');
              katex.render(mathFormula.formula, mathContainer, {
                throwOnError: false,
                displayMode: mathFormula.isBlock,
              });
            } catch (error) {
              console.error('Error rendering math formula:', error);
              mathContainer.textContent = `$${mathFormula.formula}$`;
              mathContainer.className += ' text-red-500';
            }

            placeholder.replaceWith(mathContainer);
          }
        }

        } catch (error) {
          console.error('Error processing enhanced markdown:', error);
          const errorMessage = error instanceof Error ? error.message : String(error);
          if (containerRef.current) {
            containerRef.current.innerHTML = `
              <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">Markdown Processing Error:</strong>
                <span class="block sm:inline">Failed to process enhanced markdown content.</span>
                <pre class="mt-2 text-xs overflow-auto">${escapeHtml(errorMessage)}</pre>
              </div>
            `;
          }
        }
    }

    renderEnhancedContent();
  }, [content]);

  return (
    <div
      ref={containerRef}
      className={`enhanced-markdown ${className} prose lg:prose-xl max-w-none text-striationCharcoal`}
    />
  );
};

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export default EnhancedMarkdownRenderer;
