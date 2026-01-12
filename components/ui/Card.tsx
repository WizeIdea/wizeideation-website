import type { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Forensic-style card:
 * - Light olive background (olive50)
 * - 1px DPM Olive border
 * - No rounded corners
 * - Subtle hover: border darkens to Burnt Ochre.
 */
export const Card: FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={clsx(
        'border border-dpmOlive bg-olive50 p-4 transition-colors duration-150',
        'hover:border-burntOchre',
        className,
      )}
    >
      {children}
    </div>
  );
};
