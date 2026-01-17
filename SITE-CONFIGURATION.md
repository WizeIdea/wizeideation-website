# Wize Ideation Website - Site & Style Configuration Summary

**Version**: 1.0  
**Date**: January 17, 2026  
**Status**: Production Ready  
**Framework**: Next.js 14 (App Router) + Tailwind CSS  

---

## 🎨 Design System Overview

### Theme: "The Sovereign Signal"
A distinctive "Desert Fieldwork" aesthetic emphasizing authenticity, geographic sovereignty, and technical precision. Avoids the crowded "blue tech" trademark space with earth-toned, field-research inspired palette.

---

## 🎯 Color Palette

### Primary Colors

| Color | Hex | Usage | Symbolism |
|-------|-----|-------|-----------|
| **Salt White** | `#F8F9FA` | Primary background | Kati Thanda-Lake Eyre salt flats - pristine data canvas |
| **Burnt Ochre** | `#B7410E` | Primary accent, CTAs | Australian desert soil - "this is important, proceed" |
| **DPM Olive** | `#4B5320` | Secondary accent, borders | Technical fieldwork/utility - functional equipment hue |
| **Light Smoke** | `#F5F5F5` | Header/footer, subtle backgrounds | Subtle contrast, professional depth |
| **Striation Charcoal** | `#212529` | Body text | Near-black for AAA accessibility compliance |
| **Olive 50** | `#F2F5EA` | Light backgrounds, cards | Soft olive tint for content areas |

### Tailwind Color Names

```typescript
// Both kebab-case and camelCase available:
'salt-white' / saltWhite
'light-smoke' / lightSmoke
'burnt-ochre' / burntOchre
'dpm-olive' / dpmOlive
'striation-charcoal' / striationCharcoal
olive50
```

### Usage Guidelines

**Backgrounds**:
- Page: `bg-saltWhite` (#F8F9FA)
- Header/Footer: `bg-lightSmoke` (#F5F5F5)
- Cards: `bg-olive50` (#F2F5EA)

**Text**:
- Primary: `text-striationCharcoal` (#212529)
- Headings: `text-burntOchre` OR `text-dpmOlive`
- Muted: `text-dpmOlive`

**Interactive Elements**:
- Primary buttons: `bg-burntOchre text-saltWhite`
- Secondary buttons: `border-dpmOlive text-dpmOlive`
- Links: `text-burntOchre hover:underline`
- Hover states: `hover:text-burntOchre` or `hover:border-burntOchre`

**Borders & Dividers**:
- Major sections: `border-b-2 border-burntOchre`
- Cards/containers: `border border-dpmOlive`
- Subtle dividers: `border-b border-dpmOlive`

**Focus States**:
- All interactive: `focus-visible:ring-2 focus-visible:ring-burntOchre`
- Global outline: 2px Burnt Ochre

---

## 📝 Typography System

### Font Stack - "Academic Authority × Technical Precision"

| Role | Font | Implementation | Usage |
|------|------|----------------|-------|
| **Primary Serif** (Headings) | Libre Baskerville | `font-serif-primary` | H1, H2, section titles, page headings |
| **Secondary Serif** (Body) | IBM Plex Serif | `font-serif-body` | Long-form content, paragraphs |
| **Monospace** (Technical) | JetBrains Mono | `font-mono` | Code blocks, data tables, metadata |
| **Sans UI** (Utility) | Inter | `font-sans-ui` | Buttons, navigation, UI controls |

### Typography Classes

```typescript
// Headings
'font-serif-primary'  // Libre Baskerville
'font-serif-body'     // IBM Plex Serif
'font-mono'           // JetBrains Mono
'font-sans-ui'        // Inter
```

### Font Loading
Configured in `app/layout.tsx` using Next.js `next/font/google`:
- Variable fonts with `display: 'swap'`
- CSS variables: `--font-serif-primary`, `--font-serif-body`, `--font-mono`, `--font-sans-ui`
- Applied via Tailwind custom font families

### Size & Weight Conventions

**Headings**:
- Page H1: `text-xl font-semibold` (Libre Baskerville)
- Section H2: `text-2xl font-bold` (Libre Baskerville)
- Card H3: `text-xl font-bold` or `text-base font-semibold`

**Body Text**:
- Standard: `text-base` (IBM Plex Serif)
- Small: `text-sm`
- Muted: `text-gray-600`

**Technical**:
- Code/Tables: `text-sm font-mono`
- Metadata: `text-xs font-mono`

---

## 🏗️ Layout System

### Container Widths

**Standard Content**: `max-w-4xl mx-auto`
- Used for: All main content areas, pages, sections
- Width: ~896px max-width
- Applies to: About, Services, Papers, Projects, Contact, Legal

**Wide Content**: `max-w-7xl mx-auto`
- Used for: Main wrapper in layout
- Applied in: `app/layout.tsx` main element

**Navigation**: `max-w-4xl mx-auto`
- Used for: Header navigation container

### Spacing Conventions

**Vertical Rhythm**:
- Section spacing: `mt-8 mb-8`
- Paragraph spacing: `mb-4`
- Heading bottom margin: `mb-4` or `mb-3`
- Card padding: `p-6` or `p-4`

**Horizontal Rhythm**:
- Page padding: `px-4` (mobile)
- Grid gaps: `gap-6` or `gap-8`

### Responsive Breakpoints

Using Tailwind defaults:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px

**Common Patterns**:
- Grid: `grid md:grid-cols-3`
- Flex direction: `flex-col sm:flex-row`
- Text size: `text-2xl sm:text-3xl md:text-4xl`

---

## 🎯 Component Patterns

### Page Structure Template

```tsx
<PageContainer>                          // max-w-4xl mx-auto + body font
  <PageHeading>Title</PageHeading>       // H1 with border-b
  <p className={BODY_TEXT}>...</p>       // Body text styling
  {/* Content */}
</PageContainer>
```

### Card Variants

**1. Standard Card** (`CARD_BASE`):
```tsx
border border-dpmOlive bg-olive50 p-6 transition-all
```
- Used for: General content cards
- Hover: `hover:border-burntOchre hover:shadow-md`

**2. Interactive Card** (`CARD_INTERACTIVE`):
```tsx
border border-dpmOlive bg-olive50 p-6 hover:border-burntOchre hover:shadow-md transition-all cursor-pointer
```
- Used for: Clickable service cards, feature cards
- Combined with Link wrapper

**3. Light Card** (`CARD_LIGHT`):
```tsx
border border-dpmOlive bg-lightSmoke p-3 hover:border-burntOchre hover:shadow-md transition-all
```
- Used for: Featured papers, highlighted content
- More subtle than standard card

**4. Callout Box** (`.callout` class):
```tsx
bg-saltWhite border-2 border-burntOchre rounded-olive-sm p-4
```
- Used for: Important notices, research callouts
- Custom Tailwind plugin

### Button Variants

**Primary**:
```tsx
bg-burntOchre text-saltWhite hover:opacity-90 motion-safe:hover:translate-x-0.5
```
- Filled Burnt Ochre background
- White text
- Slight shift on hover

**Secondary**:
```tsx
border border-dpmOlive text-dpmOlive bg-transparent hover:shadow-md motion-safe:hover:translate-x-0.5
```
- Olive outline
- Transparent background
- Adds shadow on hover

### Form Inputs

**Standard Input**:
```tsx
w-full px-3 py-2 border border-dpmOlive rounded-none
focus:outline-none focus:ring-2 focus:ring-burntOchre bg-white
```
- Sharp corners (`rounded-none`)
- Olive border
- Burnt Ochre focus ring

**Label**:
```tsx
block text-sm font-medium text-striationCharcoal mb-2
```

### Navigation

**Desktop**:
- Horizontal list with `space-x-6`
- Font: `font-sans-ui`
- Hover: `hover:text-burntOchre`

**Mobile**:
- Hamburger menu toggle
- Full-width dropdown
- Min touch target: 44px height

---

## 🎨 Design Rules & Constraints

### Border Radius Rules

**Sharp Edges Preferred** (0-2px):
- Buttons: `rounded-none` (0px)
- Inputs: `rounded-none` (0px)
- Cards: No radius (sharp corners)
- Callouts: `rounded-olive-sm` (2px) - exception for softer feel

**Custom Border Radius**:
```typescript
'olive-sm': '2px'
'olive-none': '0px'
```

### Border Widths

**Standard**: 1px (default)
**Section Dividers**: 2px (`border-b-2`)
**Callout Accent**: 4px left border (`border-l-4`)

**Custom Border Utilities**:
```typescript
'border-dpm-olive': '1px'  // Named border width utility
```

### Transitions & Animations

**Standard Duration**: 150ms
**Easing**: `ease-in-out` (default)

**Hover Animations**:
- Color changes: `transition-colors`
- All properties: `transition-all`
- Shift right: `motion-safe:hover:translate-x-0.5`

**CSS Variables** (in `globals.css`):
```css
--transition-base: 150ms ease-in-out
--transition-colors: color 150ms ease-in-out, ...
--transition-transform: transform 150ms ease-in-out
```

### Accessibility Requirements

**Contrast Ratios**:
- Body text: AAA compliant (#212529 on #F8F9FA)
- All interactive elements meet WCAG AA minimum

**Focus Indicators**:
- Global: 2px solid Burnt Ochre
- Offset: 2px
- Visible on all interactive elements

**Keyboard Navigation**:
- Skip link provided
- Focus trap in mobile menu
- Escape key closes modals/menus

**ARIA Labels**:
- All links have descriptive labels
- Image alt text provided
- Semantic HTML throughout

---

## 📦 Technical Configuration

### Tailwind Config (`tailwind.config.ts`)

**Content Paths**:
```typescript
'./app/**/*.{js,ts,jsx,tsx}'
'./components/**/*.{js,ts,jsx,tsx}'
'./ui/**/*.{js,ts,jsx,tsx}'
```

**Custom Colors**: 7 brand colors (see Color Palette section)

**Custom Border Utilities**:
- `borderWidth: { 'dpm-olive': '1px' }`
- `borderColor: { 'dpm-olive': '#4B5320' }`

**Custom Border Radius**:
- `olive-sm`: 2px
- `olive-none`: 0px

**Custom Ring Colors**:
- `olive-focus`: #4B5320

**Custom Plugin**: `.callout` component class

### Next.js Configuration (`next.config.js`)

**Output**: Static export (`output: 'export'`)
**Images**: Unoptimized for static hosting
**Trailing Slashes**: Disabled
**Strict Mode**: Enabled

### Font Configuration (`app/layout.tsx`)

**Fonts Loaded**:
1. Libre Baskerville (400, 700)
2. IBM Plex Serif (400, 500, 600)
3. JetBrains Mono (400, 500, 600, 700)
4. Inter (400, 500, 600)

**Loading Strategy**: `display: 'swap'`
**Subsets**: Latin only

### Global Styles (`app/globals.css`)

**CSS Layers**:
- `@layer components` for markdown styling

**Global Overrides**:
- Scrollbar gutter: stable
- Focus-visible: 2px Burnt Ochre outline
- Skip link styles

**Enhanced Markdown Styling**:
- Custom heading styles with borders
- Code block formatting (4px left border)
- Table zebra striping
- Hover effects on rows

---

## 🗂️ File Structure

### Core Application
```
app/
├── layout.tsx              # Root layout, fonts, metadata
├── page.tsx                # Home page
├── globals.css             # Global styles, CSS variables
├── about/page.tsx          # About page
├── contact/page.tsx        # Contact page
├── legal/page.tsx          # Legal/terms page
├── papers/                 # Research papers
│   ├── page.tsx           # Papers index
│   └── [slug]/page.tsx    # Dynamic paper detail
├── projects/              # Project pages
│   ├── page.tsx          # Projects index
│   └── [slug]/page.tsx   # Dynamic project detail
└── services/              # Services pages
    ├── page.tsx          # Services index
    └── [slug]/page.tsx   # Dynamic service detail
```

### Components
```
components/
├── layout/                    # NEW: Layout components
│   ├── PageLayout.tsx        # PageContainer, PageHeading, etc.
│   └── HomeComponents.tsx    # ServiceCard, TrustBar
├── ui/                       # UI primitives
│   ├── Accordion.tsx         # Collapsible sections
│   ├── Button.tsx            # Primary/secondary buttons
│   ├── Card.tsx              # Content cards
│   ├── DataTable.tsx         # Forensic-style tables
│   ├── Deliverable.tsx       # Deliverable callouts
│   ├── ServiceDivider.tsx    # Image dividers
│   └── ServiceList.tsx       # Bulleted service lists
├── ContactForm.tsx           # Contact form with validation
├── EnhancedMarkdownRenderer.tsx  # Markdown processor
├── FeaturedPaperCard.tsx     # Featured paper display
├── LoadingSpinner.tsx        # Loading state
├── MarkdownRenderer.tsx      # Basic markdown
├── MermaidDiagram.tsx        # Diagram rendering
├── NavMenu.tsx               # Site navigation
├── PaperCard.tsx             # Paper list item
├── ResearchCallout.tsx       # Callout component
└── ResearchList.tsx          # Research paper list
```

### Utilities & Data
```
lib/
├── styles.ts                  # NEW: Style constants (30+)
├── types.ts                   # NEW: TypeScript types
├── metadata.ts                # NEW: SEO metadata utilities
├── papers-data.ts             # Paper data fetching
├── markdown-processor.ts      # Markdown processing
├── enhanced-markdown-processor.ts  # Advanced markdown
└── debug-markdown.ts          # Markdown debugging
```

### Content
```
content/
├── papers/                    # Markdown research papers
├── projects/                  # Markdown project files
└── services/                  # Markdown service descriptions
```

### Configuration
```
├── tailwind.config.ts         # Tailwind customization
├── next.config.js             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── postcss.config.cjs         # PostCSS setup
├── package.json               # Dependencies
└── next-sitemap.config.cjs    # Sitemap generation
```

---

## 🔧 Refactored Architecture (Available)

### New Utility Files

**`lib/styles.ts`** - Style Constants:
- 30+ reusable Tailwind class strings
- `PAGE_HEADING`, `SECTION_HEADING`, `BODY_TEXT`
- `CARD_BASE`, `CARD_HOVER`, `CARD_INTERACTIVE`
- `INPUT`, `LABEL`, `LINK_TEXT`, etc.
- `cn()` utility for conditional classes

**`lib/types.ts`** - Centralized Types:
- `Paper`, `Project`, `Service`
- `CardProps`, `ResearchItem`
- `NavItem`, `FrontMatter`

**`lib/metadata.ts`** - SEO Utilities:
- `createPageMetadata()` - Standard pages
- `createArticleMetadata()` - Articles/papers
- `createHomeMetadata()` - Home page
- Site constants: `SITE_NAME`, `SITE_URL`

### New Component Files

**`components/layout/PageLayout.tsx`**:
- `PageContainer` - Max-width wrapper
- `PageHeading` - H1 with border
- `SectionHeading` - H2 styling
- `SectionHeader` - Title + action button

**`components/layout/HomeComponents.tsx`**:
- `ServiceCard` - Home page service cards
- `TrustBadge` - Individual credential
- `TrustBar` - Trust badge section

### Benefits of Refactored Code

**Code Reduction**: ~150-200 lines when fully applied
**Duplication**: 80% reduction in repeated classes
**Maintainability**: Single source of truth for styles
**Consistency**: All pages use same patterns

**Status**: Complete and ready, 100% optional, fully backward compatible

---

## 📊 Content Management

### Markdown Frontmatter

**Papers** (`content/papers/*.md`):
```yaml
---
title: "Paper Title"
date: "2024-01-15"
Authors: "Author Name"
ORCID: "0000-0000-0000-0000"
DOI: "10.1234/example"
featured: true
excerpt: "Brief description"
---
```

**Projects** (`content/projects/*.md`):
```yaml
---
title: "Project Name"
date: "2024-01-15"
status: "active"
featured: true
---
```

**Services** (`content/services/*.md`):
```yaml
---
title: "Service Name"
summary: "Brief description"
imageName: "logo.png"
---
```

### Data Fetching Functions

**`lib/papers-data.ts`**:
- `getAllPapers()` - Returns all papers
- `getFeaturedPapers(limit)` - Returns featured papers
- Filters by `featured: true` frontmatter
- Sorts by date descending

### Dynamic Routes

**Pattern**: `[slug]/page.tsx`
**Data Source**: Markdown files in `content/`
**Rendering**: Static generation at build time

---

## 🚀 Build & Deploy

### Build Process

1. **TypeScript Compilation**: `scripts/copy-selected-md.ts` → `scripts/copy-selected-md.cjs`
2. **Content Sync**: Copy markdown from Obsidian repo
3. **Static Generation**: `npm run build` → `out/` directory
4. **S3 Upload**: Deploy to AWS S3 bucket
5. **CloudFront Invalidation**: Clear CDN cache

### GitHub Actions Workflow

**Trigger**: Push to `main` or manual dispatch

**Steps**:
1. Checkout website repo
2. Checkout Obsidian repo (SSH key)
3. Install dependencies
4. Compile TypeScript copy script
5. Copy selected markdown files
6. Commit published papers (archival)
7. Build static site
8. Deploy to S3 with cache headers
9. Invalidate CloudFront cache

**Cache Strategy**:
- Immutable assets: 1 year cache
- HTML files: No cache, must revalidate

---

## 🎯 Design Principles

### Visual Identity
1. **Desert Fieldwork Aesthetic** - Earthy, authentic, grounded
2. **Academic Authority** - Serif typography, structured layouts
3. **Technical Precision** - Monospace for data, sharp edges
4. **Forensic Clarity** - High contrast, clear hierarchy
5. **Functional Minimalism** - No decoration without purpose

### Interaction Principles
1. **Subtle Micro-interactions** - 0.5px shift on hover
2. **Clear Focus States** - Always visible for keyboard users
3. **Consistent Transitions** - 150ms throughout
4. **Progressive Disclosure** - Accordions for complex content
5. **Mobile-First** - Responsive from smallest screens

### Content Principles
1. **Readability First** - AAA contrast, generous line-height
2. **Hierarchical Structure** - Clear H1→H2→H3 progression
3. **Scannable Content** - Lists, callouts, tables
4. **Technical Credibility** - Monospace for data/code
5. **Authentic Voice** - No marketing fluff

---

## 📝 Common Patterns Reference

### Page Template
```tsx
import { PageContainer, PageHeading } from '@/components/layout/PageLayout';
import { createPageMetadata } from '@/lib/metadata';
import { BODY_TEXT } from '@/lib/styles';

export const metadata = createPageMetadata({
  title: 'Page Title',
  path: '/page-path'
});

export default function PageName() {
  return (
    <PageContainer>
      <PageHeading>Page Title</PageHeading>
      <p className={BODY_TEXT}>Content...</p>
    </PageContainer>
  );
}
```

### Service Card (Home Page)
```tsx
<ServiceCard
  href="/services#service-1"
  title="Service Name"
  description="Brief description..."
/>
```

### Section Header with Action
```tsx
<SectionHeader
  title="Section Title"
  action={
    <Link href="/link">
      <Button variant="secondary">View All</Button>
    </Link>
  }
/>
```

### Accordion (Services)
```tsx
<Accordion
  id="service-1"
  title="Service Title"
  summary="Brief description"
  imageName="logo.png"
>
  {/* Content */}
</Accordion>
```

### Data Table
```tsx
<DataTable
  columns={[
    { header: 'Name', accessor: 'name' },
    { header: 'Value', accessor: 'value' }
  ]}
  data={dataArray}
/>
```

---

## 🔍 Quick Reference

### Most Used Classes

**Layout**:
- `max-w-4xl mx-auto` - Standard container
- `px-4` - Horizontal padding
- `mt-8 mb-8` - Section spacing

**Typography**:
- `font-serif-primary` - Headings (Libre Baskerville)
- `font-serif-body` - Body text (IBM Plex Serif)
- `font-mono` - Code/data (JetBrains Mono)
- `text-striationCharcoal` - Body text color
- `text-burntOchre` - Accent text

**Components**:
- `border border-dpmOlive` - Card border
- `bg-olive50` - Light background
- `hover:border-burntOchre` - Interactive border
- `focus-visible:ring-2 focus-visible:ring-burntOchre` - Focus ring

**Responsive**:
- `hidden md:block` - Show on desktop only
- `grid md:grid-cols-3` - 3 columns on desktop
- `flex-col sm:flex-row` - Stack mobile, row desktop

---

## 📚 Documentation Files

Located in `docs/`:

1. **README.md** - Documentation index
2. **REFACTORING-SUMMARY.md** - Executive summary
3. **QUICK-REFERENCE.md** - Daily reference guide
4. **REFACTORING-GUIDE.md** - Complete technical guide
5. **REFACTORING-CHECKLIST.md** - Implementation steps
6. **design-system.md** - Original design specification
7. **examples/** - Refactored page examples

---

## ✅ Site Status

**Production**: ✅ Live and fully functional
**Design Compliance**: ✅ 100% matches Corporate Theme
**Accessibility**: ✅ WCAG AA compliant
**Performance**: ✅ Static site, optimized
**SEO**: ✅ Complete metadata, sitemap
**Code Quality**: ✅ TypeScript, no errors
**Documentation**: ✅ Comprehensive
**Refactoring**: ✅ Complete infrastructure available (optional)

---

## 💡 For LLM Context

When assisting with this codebase:

1. **Color Usage**: Always use named colors (burntOchre, dpmOlive, etc.) not hex codes
2. **Typography**: Headings use `font-serif-primary`, body uses `font-serif-body`
3. **Borders**: Sharp edges preferred (rounded-none), 0-2px radius maximum
4. **Focus States**: Always Burnt Ochre, 2px solid
5. **Container Width**: Use `max-w-4xl mx-auto` for content
6. **Spacing**: Follow 4-point grid (4, 8, 12, 16, 24, 32...)
7. **Hover Effects**: Use `transition-all` or `transition-colors`, 150ms duration
8. **New Pages**: Use refactored components from `components/layout/` when available
9. **Style Constants**: Import from `lib/styles.ts` instead of repeating classes
10. **Metadata**: Use helpers from `lib/metadata.ts` for SEO

**Key Files to Reference**:
- Colors/Theme: `tailwind.config.ts`
- Style Constants: `lib/styles.ts`
- Layout Components: `components/layout/PageLayout.tsx`
- Types: `lib/types.ts`
- Global Styles: `app/globals.css`

---

**Document Version**: 1.0  
**Last Updated**: January 17, 2026  
**Status**: Complete and Current
