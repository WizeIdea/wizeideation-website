import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { CARD_INTERACTIVE } from '@/lib/styles';

// ============================================================================
// SERVICE CARD (for home page pillars)
// ============================================================================

interface ServiceCardProps {
  href: string;
  title: string;
  description: string;
  ariaLabel?: string;
}

/**
 * Interactive card for showcasing services on the home page.
 * Features olive border with burnt ochre hover effect.
 */
export const ServiceCard: FC<ServiceCardProps> = ({ 
  href, 
  title, 
  description,
  ariaLabel 
}) => {
  return (
    <Link 
      href={href} 
      className="block" 
      aria-label={ariaLabel || `Learn more about ${title} services`}
    >
      <div className={CARD_INTERACTIVE}>
        <h3 className="font-serif-primary text-burntOchre text-xl font-bold mb-3">
          {title}
        </h3>
        <p className="font-serif-body text-sm text-striationCharcoal leading-relaxed mb-2">
          {description}
        </p>
        <span className="font-serif-body text-xs text-burntOchre" aria-hidden="true">
          Learn more →
        </span>
      </div>
    </Link>
  );
};

// ============================================================================
// TRUST BADGE (for trust bar)
// ============================================================================

interface TrustBadgeProps {
  title: string;
  value?: string;
}

/**
 * Simple trust badge component for displaying credentials/stats.
 */
export const TrustBadge: FC<TrustBadgeProps> = ({ title, value }) => {
  return (
    <div>
      <div className="font-serif-primary text-xl text-burntOchre font-bold">
        {value || title}
      </div>
    </div>
  );
};

// ============================================================================
// TRUST BAR
// ============================================================================

interface TrustBarProps {
  badges: Array<{ title: string; value?: string }>;
  className?: string;
}

/**
 * Horizontal bar displaying trust badges in a grid layout.
 */
export const TrustBar: FC<TrustBarProps> = ({ badges, className = '' }) => {
  return (
    <section className={`bg-olive50 border-y border-dpmOlive py-4 mb-1 ${className}`.trim()}>
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
        {badges.map((badge, index) => (
          <TrustBadge key={index} {...badge} />
        ))}
      </div>
    </section>
  );
};
