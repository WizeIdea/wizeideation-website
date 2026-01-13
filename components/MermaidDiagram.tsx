'use client';

import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart, className = '' }) => {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize mermaid
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      fontFamily: 'var(--font-mono)',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
      },
      sequence: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
      },
      gantt: {
        titleTopMargin: 25,
        barHeight: 20,
        barGap: 4,
        topPadding: 50,
        leftPadding: 75,
        gridLineStartPadding: 35,
      },
    });

    if (diagramRef.current) {
      try {
        // Clear previous content
        diagramRef.current.innerHTML = '';

        // Render the mermaid diagram (mermaid.render returns a promise)
        mermaid.render(
          `mermaid-${Math.random().toString(36).substr(2, 9)}`,
          chart
        ).then((renderResult) => {
          if (diagramRef.current && renderResult.svg) {
            diagramRef.current.innerHTML = renderResult.svg;
          }
        }).catch((error) => {
          console.error('Error rendering mermaid diagram:', error);
          if (diagramRef.current) {
            diagramRef.current.innerHTML = `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong class="font-bold">Mermaid Error:</strong>
              <span class="block sm:inline">Failed to render diagram. Please check the syntax.</span>
            </div>`;
          }
        });
      } catch (error) {
        console.error('Error rendering mermaid diagram:', error);
        if (diagramRef.current) {
          diagramRef.current.innerHTML = `<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Mermaid Error:</strong>
            <span class="block sm:inline">Failed to render diagram. Please check the syntax.</span>
          </div>`;
        }
      }
    }
  }, [chart]);

  return (
    <div
      ref={diagramRef}
      className={`mermaid-diagram ${className} bg-olive50 border border-dpmOlive rounded-olive-sm p-4 my-6 overflow-auto`}
    />
  );
};

export default MermaidDiagram;
