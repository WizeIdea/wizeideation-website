import { ReactNode } from 'react';

interface ServiceListProps {
  items: ReactNode[];
}

export function ServiceList({ items }: ServiceListProps) {
  return (
    <ul className="ml-6 mb-4 space-y-2 font-serif-body text-base text-striationCharcoal">
      {items.map((item, index) => (
        <li key={index} className="relative pl-4 before:content-['–'] before:absolute before:left-0 before:text-dpmOlive">
          {item}
        </li>
      ))}
    </ul>
  );
}
