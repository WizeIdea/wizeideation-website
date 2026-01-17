# Code Refactoring Summary

This document outlines the refactoring improvements made to the Wize Ideation website codebase to improve maintainability, reduce duplication, and establish consistent patterns.

## 📁 New Files Created

### 1. **lib/styles.ts** - Centralized Style Constants
Consolidates repeated Tailwind class strings into reusable constants:

- **Layout**: `CONTAINER`, `CONTAINER_WITH_BODY`, `SECTION_SPACING`
- **Typography**: `PAGE_HEADING`, `SECTION_HEADING`, `BODY_TEXT`, `MUTED_TEXT`
- **Cards**: `CARD_BASE`, `CARD_HOVER`, `CARD_INTERACTIVE`, `CARD_LIGHT`, `CALLOUT_BORDER`
- **Interactive**: `TRANSITION`, `HOVER_TEXT`, `FOCUS_RING`
- **Forms**: `INPUT`, `INPUT_BASE`, `INPUT_FOCUS`, `LABEL`
- **Links**: `LINK_TEXT`, `NAV_LINK`
- **Dividers**: `DIVIDER_MAJOR`, `DIVIDER_SUBTLE`
- **Utility**: `cn()` function for conditional class composition

**Benefits**: 
- Single source of truth for styling patterns
- Easy global style updates
- Reduced class string duplication
- Better IntelliSense support

### 2. **lib/types.ts** - Shared TypeScript Types
Centralizes all type definitions:

- `Paper`, `Project`, `Service` - Content types
- `CardProps`, `ResearchItem` - Component props
- `NavItem` - Navigation structure
- `FrontMatter` - Generic frontmatter interface

**Benefits**:
- Type consistency across components
- Single import for common types
- Easier refactoring and updates
- Better type safety

### 3. **lib/metadata.ts** - Metadata Generation Utilities
Provides helper functions for consistent SEO metadata:

- `createPageMetadata()` - Standard pages
- `createArticleMetadata()` - Papers/articles with author info
- `createHomeMetadata()` - Home page with custom format
- `TITLE_TEMPLATE` - Consistent title formatting
- Constants: `SITE_NAME`, `SITE_URL`, `DEFAULT_DESCRIPTION`

**Benefits**:
- DRY metadata generation
- Consistent OpenGraph implementation
- Centralized site configuration
- Reduced boilerplate in pages

### 4. **components/layout/PageLayout.tsx** - Layout Components
Reusable layout components:

- `PageContainer` - Standard max-width container with optional body font
- `PageHeading` - Consistent H1 styling with border
- `SectionHeading` - H2 with larger styling
- `SectionHeader` - Header with optional action button

**Benefits**:
- Consistent page structure
- Reduced markup duplication
- Semantic HTML enforcement
- Easy layout modifications

### 5. **components/layout/HomeComponents.tsx** - Home Page Components
Specialized components for the home page:

- `ServiceCard` - Interactive service showcase cards
- `TrustBadge` - Individual trust/credential badge
- `TrustBar` - Grid layout for trust badges

**Benefits**:
- Reusable home page patterns
- Consistent card styling
- Easy to add/modify services

## 🔄 Modified Files

### **app/globals.css**
**Changes**:
- Added CSS custom properties (`:root` variables) for:
  - Transitions: `--transition-base`, `--transition-colors`, `--transition-transform`
  - Spacing: `--page-gutter`, `--section-spacing`
  - Borders: `--border-width-thin`, `--border-width-thick`, `--border-width-accent`
  - Shadows: `--shadow-card`, `--shadow-card-hover`
- Updated global focus-visible from DPM Olive to Burnt Ochre (design compliance)

**Benefits**:
- Easier theme customization
- Consistent animation timing
- Potential for runtime theme switching

### **lib/papers-data.ts**
**Changes**:
- Removed local `Paper` interface
- Now imports `Paper` type from `lib/types.ts`

**Benefits**:
- Single source for Paper type definition
- Consistency across data fetching functions

### **components/ui/Card.tsx**
**Changes**:
- Refactored to use `CARD_BASE` and `CARD_HOVER` from `lib/styles.ts`
- Added `interactive` prop to toggle hover effects
- Simplified class composition
- Removed `clsx` dependency (using template literals)

**Benefits**:
- Consistent with other card implementations
- More flexible (optional hover)
- Reduced bundle size

### **components/PaperCard.tsx**
**Changes**:
- Now imports `CardProps` type from `lib/types.ts`
- Removed local `PaperCardProps` interface

**Benefits**:
- Type consistency with other card components

### **components/FeaturedPaperCard.tsx**
**Changes**:
- Now uses `CARD_LIGHT` constant from `lib/styles.ts`

**Benefits**:
- Consistent card styling
- Easier to update light card style globally

## 🎯 Usage Examples

### Using Style Constants

**Before:**
```tsx
<h1 className="font-serif-primary text-burntOchre text-xl font-semibold mt-3 mb-4 pb-2 border-b border-burntOchre">
  Page Title
</h1>
```

**After:**
```tsx
import { PAGE_HEADING } from '@/lib/styles';

<h1 className={PAGE_HEADING}>
  Page Title
</h1>
```

### Using Layout Components

**Before:**
```tsx
<section className="max-w-4xl mx-auto font-serif-body text-base">
  <h1 className="font-serif-primary text-burntOchre text-xl font-semibold mt-3 mb-4 pb-2 border-b border-burntOchre">
    About
  </h1>
  {/* content */}
</section>
```

**After:**
```tsx
import { PageContainer, PageHeading } from '@/components/layout/PageLayout';

<PageContainer>
  <PageHeading>About</PageHeading>
  {/* content */}
</PageContainer>
```

### Using Metadata Helpers

**Before:**
```tsx
export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about our practice...',
  openGraph: {
    title: 'About | Wize Idea',
    description: 'Learn about our practice...',
    url: 'https://wizeidea.com/about/',
    siteName: 'Wize Idea',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};
```

**After:**
```tsx
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'About',
  description: 'Learn about our practice...',
  path: '/about',
});
```

### Using Service Cards

**Before:**
```tsx
<Link href="/services#service-1" className="block">
  <div className="border border-dpmOlive bg-olive50 p-6 hover:border-burntOchre hover:shadow-md transition-all cursor-pointer">
    <h3 className="font-serif-primary text-burntOchre text-xl font-bold mb-3">
      Attribution Integrity
    </h3>
    <p className="font-serif-body text-sm text-striationCharcoal leading-relaxed mb-2">
      Designing systems that preserve authorship clarity...
    </p>
    <span className="font-serif-body text-xs text-burntOchre" aria-hidden="true">
      Learn more →
    </span>
  </div>
</Link>
```

**After:**
```tsx
import { ServiceCard } from '@/components/layout/HomeComponents';

<ServiceCard
  href="/services#service-1"
  title="Attribution Integrity"
  description="Designing systems that preserve authorship clarity..."
/>
```

## 📊 Refactoring Benefits Summary

### Code Quality
- ✅ **Reduced duplication**: 6 page headings → 1 component
- ✅ **DRY metadata**: 9 similar metadata blocks → 1 function
- ✅ **Consistent styling**: Repeated classes → style constants
- ✅ **Type safety**: Centralized types prevent drift

### Maintainability
- ✅ **Single source of truth**: Style changes in one place
- ✅ **Easier debugging**: Find all heading styles in `lib/styles.ts`
- ✅ **Better organization**: Clear separation of concerns
- ✅ **Documentation**: Self-documenting component names

### Developer Experience
- ✅ **Less boilerplate**: Simpler page creation
- ✅ **Better IntelliSense**: Autocomplete for style constants
- ✅ **Faster development**: Reusable components
- ✅ **Easier onboarding**: Clear patterns to follow

### Performance
- ✅ **Smaller bundle**: Removed unnecessary dependencies (clsx in Card)
- ✅ **Better caching**: Shared components cached once
- ✅ **CSS optimization**: Variables enable better CSS compression

## 🚀 Next Steps (Optional Future Improvements)

### 1. Apply Refactoring to Existing Pages
Update pages to use new components:
- `app/about/page.tsx` → Use `PageContainer` + `PageHeading`
- `app/services/page.tsx` → Use new layout components
- `app/page.tsx` → Use `ServiceCard` for three pillars

### 2. Create More Specialized Components
- `HeroSection` - Banner with image and text overlay
- `FeatureGrid` - 3-column feature showcase pattern
- `ContentSection` - Section with optional image

### 3. Expand Metadata Utilities
- `createBlogPostMetadata()` - For blog-style content
- `createSchemaMarkup()` - Structured data generation
- `createSocialMediaTags()` - Twitter cards, etc.

### 4. Create Theme Configuration
- `lib/theme.ts` - Centralize all design tokens
- Export color values, font sizes, spacing scale
- Enable design system documentation

### 5. Add Utility Functions
- `lib/utils.ts` - Common helper functions
- Date formatting, string truncation, etc.
- URL manipulation helpers

### 6. Component Library Documentation
- Create Storybook or similar
- Document all reusable components
- Show usage examples and variants

## 📝 Migration Guide

To migrate existing pages to use the new refactored code:

1. **Import style constants**:
   ```tsx
   import { PAGE_HEADING, CONTAINER } from '@/lib/styles';
   ```

2. **Replace repeated class strings**:
   ```tsx
   // Before
   <h1 className="font-serif-primary text-burntOchre text-xl...">
   
   // After
   <h1 className={PAGE_HEADING}>
   ```

3. **Use layout components**:
   ```tsx
   import { PageContainer, PageHeading } from '@/components/layout/PageLayout';
   
   <PageContainer>
     <PageHeading>Title</PageHeading>
     {/* content */}
   </PageContainer>
   ```

4. **Simplify metadata**:
   ```tsx
   import { createPageMetadata } from '@/lib/metadata';
   
   export const metadata = createPageMetadata({
     title: 'Page Title',
     path: '/page-path',
   });
   ```

5. **Update type imports**:
   ```tsx
   import type { Paper, Project, CardProps } from '@/lib/types';
   ```

## ✅ Testing Checklist

After applying refactoring:
- [ ] Run `npm run build` - ensure no TypeScript errors
- [ ] Check all pages render correctly
- [ ] Verify metadata appears in page source
- [ ] Test responsive behavior on mobile/tablet
- [ ] Verify accessibility (keyboard navigation, focus styles)
- [ ] Check hover effects work correctly
- [ ] Validate HTML structure
- [ ] Test with screen reader (if available)

## 📚 Additional Resources

- **Tailwind CSS Best Practices**: https://tailwindcss.com/docs/reusing-styles
- **Next.js Metadata API**: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/intro.html
