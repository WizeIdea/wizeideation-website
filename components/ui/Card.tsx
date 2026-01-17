import type { FC, ReactNode } from 'react';
import { CARD_BASE, CARD_HOVER } from '@/lib/styles';

interface CardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

/**
 * Forensic-style card:
 * - Light olive background (olive50)
 * - 1px DPM Olive border
 * - No rounded corners
 * - Optional hover effect (border darkens to Burnt Ochre).
 */
export const Card: FC<CardProps> = ({ children, className = '', interactive = true }) => {
  const hoverClass = interactive ? CARD_HOVER : '';
  return (
    <div className={`${CARD_BASE} ${hoverClass} ${className}`.trim()}>
      {children}
    </div>
  );
};
