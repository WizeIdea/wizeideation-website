import { FC } from 'react';

const frames = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

const LoadingSpinner: FC = () => (
  <div
    className="font-mono text-2xl text-dpmOlive animate-pulse"
    aria-label="Loading"
  >
    {frames.map((f, i) => (
      <span
        key={i}
        className="inline-block"
        style={{ animationDelay: `${i * 0.1}s` }}
      >
        {f}
      </span>
    ))}
  </div>
);

export default LoadingSpinner;