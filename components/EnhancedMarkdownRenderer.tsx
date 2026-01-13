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
        const html = await processEnhancedMarkdown(content);

        // Set the base HTML content
        containerRef.current.innerHTML = html;
        console.log('HTML content set:', html);

        // Convert Mermaid code blocks to div.mermaid elements
        const mermaidCodes = containerRef.current.querySelectorAll('code.language-mermaid');
        console.log('Found Mermaid code blocks:', mermaidCodes.length);
        for (const code of mermaidCodes) {
          const pre = code.parentElement;
          if (pre && pre.tagName === 'PRE') {
            const div = document.createElement('div');
            div.className = 'mermaid';
            div.textContent = code.textContent;
            pre.replaceWith(div);
          }
        }

        // Initialize Mermaid diagrams
        if (typeof window !== 'undefined') {
          const { default: mermaid } = await import('mermaid');
          mermaid.initialize({
            startOnLoad: false,
            theme: 'default',
            fontFamily: 'var(--font-mono)',
          });

          // Render each Mermaid diagram individually
          const elements = containerRef.current.querySelectorAll('.mermaid');
          console.log('Found Mermaid elements:', elements.length);
          for (const element of elements) {
            try {
              const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
              const { svg } = await mermaid.render(id, element.textContent);
              element.innerHTML = svg;
            } catch (error) {
              console.error('Mermaid rendering error:', error);
              const errorMessage = error instanceof Error ? error.message : String(error);
              element.innerHTML = `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong class="font-bold">Mermaid Error:</strong>
                <span class="block sm:inline">Failed to render diagram.</span>
                <pre class="mt-2 text-xs overflow-auto">${escapeHtml(errorMessage)}</pre>
              </div>`;
            }
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
      className={`enhanced-markdown ${className} max-w-none text-striationCharcoal`}
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
