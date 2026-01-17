/**
 * Centralized style constants for consistent styling across the application.
 * Use these constants to avoid repeating long Tailwind class strings.
 */

// ============================================================================
// LAYOUT & CONTAINERS
// ============================================================================

/** Standard max-width container centered horizontally */
export const CONTAINER = 'max-w-4xl mx-auto';

/** Standard max-width container with body typography */
export const CONTAINER_WITH_BODY = 'max-w-4xl mx-auto font-serif-body text-base';

/** Section spacing - standard margins */
export const SECTION_SPACING = 'mt-8 mb-8';

// ============================================================================
// TYPOGRAPHY
// ============================================================================

/** Page-level H1 heading with divider */
export const PAGE_HEADING = 'font-serif-primary text-burntOchre text-xl font-semibold mt-3 mb-4 pb-2 border-b border-burntOchre';

/** Section-level H2 heading with divider */
export const SECTION_HEADING = 'font-serif-primary text-burntOchre text-2xl font-bold pb-2 border-b-2 border-burntOchre';

/** Standard body paragraph */
export const BODY_TEXT = 'font-serif-body text-base text-striationCharcoal leading-relaxed';

/** Secondary/muted text */
export const MUTED_TEXT = 'font-serif-body text-sm text-gray-600';

// ============================================================================
// CARDS & BOXES
// ============================================================================

/** Standard card with olive border and hover effect */
export const CARD_BASE = 'border border-dpmOlive bg-olive50 p-6 transition-all';

/** Card hover effect (border and shadow) */
export const CARD_HOVER = 'hover:border-burntOchre hover:shadow-md';

/** Interactive card (combines base + hover + cursor) */
export const CARD_INTERACTIVE = `${CARD_BASE} ${CARD_HOVER} cursor-pointer`;

/** Callout box with left border (already defined in tailwind as .callout) */
export const CALLOUT_BORDER = 'border-l-4 border-burntOchre bg-olive50 p-4';

/** Light card variant (for featured content) */
export const CARD_LIGHT = 'border border-dpmOlive bg-lightSmoke p-3 hover:border-burntOchre hover:shadow-md transition-all';

// ============================================================================
// INTERACTIVE ELEMENTS
// ============================================================================

/** Standard transition for hover effects */
export const TRANSITION = 'transition-colors duration-150';

/** Interactive element hover (text color change) */
export const HOVER_TEXT = 'hover:text-burntOchre transition-colors';

/** Focus ring for accessibility */
export const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burntOchre';

// ============================================================================
// LINKS
// ============================================================================

/** Standard text link with underline on hover */
export const LINK_TEXT = 'text-burntOchre hover:underline';

/** Navigation link styling */
export const NAV_LINK = 'font-sans-ui text-striationCharcoal hover:text-burntOchre transition-colors';

// ============================================================================
// FORMS
// ============================================================================

/** Standard form input styling */
export const INPUT_BASE = 'w-full px-3 py-2 border border-dpmOlive rounded-none bg-white';

/** Form input focus state */
export const INPUT_FOCUS = 'focus:outline-none focus:ring-2 focus:ring-burntOchre';

/** Complete input styling */
export const INPUT = `${INPUT_BASE} ${INPUT_FOCUS}`;

/** Form label styling */
export const LABEL = 'block text-sm font-medium text-striationCharcoal mb-2';

// ============================================================================
// DIVIDERS
// ============================================================================

/** 2px Burnt Ochre divider (for major sections) */
export const DIVIDER_MAJOR = 'border-b-2 border-burntOchre';

/** 1px DPM Olive divider (for subtle separation) */
export const DIVIDER_SUBTLE = 'border-b border-dpmOlive';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Combine multiple class strings, filtering out undefined/empty values
 * Useful for conditional styling
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
