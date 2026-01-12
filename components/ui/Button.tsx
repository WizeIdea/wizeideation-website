'use client';

import type { FC, ReactNode } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
  className?: string;
  disabled?: boolean;
}

/**
 * Forensic-style button:
 * - Primary → Burnt Ochre background, white text.
 * - Secondary → DPM Olive border, transparent background.
 * - 0-2px radius, focus-visible outline in Burnt Ochre.
 */
export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
}) => {
  const baseStyles =
    'inline-flex items-center justify-center px-4 py-2 font-mono text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2';

  const variantStyles =
    variant === 'primary'
      ? 'bg-burntOchre text-saltWhite hover:bg-burntOchre/90 focus-visible:ring-burntOchre'
      : 'border border-dpmOlive text-dpmOlive bg-transparent hover:bg-dpmOlive/10 focus-visible:ring-burntOchre';

  const disabledStyles = disabled
    ? 'opacity-50 cursor-not-allowed'
    : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyles, variantStyles, disabledStyles, className)}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};
