import { ReactNode } from 'react';

interface DeliverableProps {
  children: ReactNode;
}

export function Deliverable({ children }: DeliverableProps) {
  return (
    <div className="my-4 pl-4 py-3 border-l-4 border-burntOchre bg-olive50">
      <p className="font-serif-body font-semibold text-striationCharcoal">
        {children}
      </p>
    </div>
  );
}
