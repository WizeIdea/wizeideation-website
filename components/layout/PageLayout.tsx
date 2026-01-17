import { FC, ReactNode } from 'react';
import { PAGE_HEADING, SECTION_HEADING, CONTAINER, CONTAINER_WITH_BODY } from '@/lib/styles';

// ============================================================================
// PAGE CONTAINER
// ============================================================================

interface PageContainerProps {
  children: ReactNode;
  withBodyFont?: boolean;
  className?: string;
}

/**
 * Standard page container with max-width and centered layout.
 * Use `withBodyFont` to add body typography styling.
 */
export const PageContainer: FC<PageContainerProps> = ({ 
  children, 
  withBodyFont = true,
  className = '' 
}) => {
  const baseClass = withBodyFont ? CONTAINER_WITH_BODY : CONTAINER;
  return (
    <section className={`${baseClass} ${className}`.trim()}>
      {children}
    </section>
  );
};

// ============================================================================
// PAGE HEADING
// ============================================================================

interface PageHeadingProps {
  children: ReactNode;
  as?: 'h1' | 'h2';
  className?: string;
}

/**
 * Consistent page-level heading with Burnt Ochre color and bottom border.
 * Defaults to h1, but can be changed via `as` prop for semantic HTML.
 */
export const PageHeading: FC<PageHeadingProps> = ({ 
  children, 
  as: Component = 'h1',
  className = '' 
}) => {
  return (
    <Component className={`${PAGE_HEADING} ${className}`.trim()}>
      {children}
    </Component>
  );
};

// ============================================================================
// SECTION HEADING
// ============================================================================

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

/**
 * Section-level heading (H2) with Burnt Ochre border and larger styling.
 */
export const SectionHeading: FC<SectionHeadingProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <h2 className={`${SECTION_HEADING} ${className}`.trim()}>
      {children}
    </h2>
  );
};

// ============================================================================
// SECTION HEADER WITH ACTION
// ============================================================================

interface SectionHeaderProps {
  title: string;
  action?: ReactNode;
  className?: string;
}

/**
 * Section header with optional action button (e.g., "View All" link).
 * Commonly used for featured content sections.
 */
export const SectionHeader: FC<SectionHeaderProps> = ({ 
  title, 
  action,
  className = '' 
}) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-2 border-b-2 border-burntOchre ${className}`.trim()}>
      <h2 className="font-serif-primary text-burntOchre text-2xl font-bold">
        {title}
      </h2>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};
