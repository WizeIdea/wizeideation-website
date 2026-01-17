# Quick Reference: Refactored Components & Utilities

## 🎨 Style Constants (`lib/styles.ts`)

### Layout
```tsx
import { CONTAINER, CONTAINER_WITH_BODY, SECTION_SPACING } from '@/lib/styles';

<section className={CONTAINER}>...</section>
<section className={CONTAINER_WITH_BODY}>...</section>
```

### Typography
```tsx
import { PAGE_HEADING, SECTION_HEADING, BODY_TEXT } from '@/lib/styles';

<h1 className={PAGE_HEADING}>Title</h1>
<h2 className={SECTION_HEADING}>Section</h2>
<p className={BODY_TEXT}>Paragraph text</p>
```

### Cards
```tsx
import { CARD_BASE, CARD_HOVER, CARD_INTERACTIVE, CARD_LIGHT } from '@/lib/styles';

// Basic card
<div className={CARD_BASE}>...</div>

// Interactive card with hover
<div className={CARD_INTERACTIVE}>...</div>

// Light card (for featured content)
<div className={CARD_LIGHT}>...</div>
```

### Forms
```tsx
import { INPUT, LABEL, FOCUS_RING } from '@/lib/styles';

<label className={LABEL}>Name</label>
<input className={INPUT} />
```

### Links
```tsx
import { LINK_TEXT, NAV_LINK, HOVER_TEXT } from '@/lib/styles';

<a href="#" className={LINK_TEXT}>Link</a>
<nav><a className={NAV_LINK}>Nav Item</a></nav>
```

### Utility Function
```tsx
import { cn } from '@/lib/styles';

const classes = cn(
  'base-class',
  isActive && 'active-class',
  error && 'error-class'
);
```

---

## 📦 Layout Components (`components/layout/PageLayout.tsx`)

### PageContainer
```tsx
import { PageContainer } from '@/components/layout/PageLayout';

// With body font (default)
<PageContainer>
  {/* content */}
</PageContainer>

// Without body font
<PageContainer withBodyFont={false}>
  {/* content */}
</PageContainer>

// With additional classes
<PageContainer className="py-8">
  {/* content */}
</PageContainer>
```

### PageHeading
```tsx
import { PageHeading } from '@/components/layout/PageLayout';

// Default H1
<PageHeading>Page Title</PageHeading>

// As H2
<PageHeading as="h2">Subsection</PageHeading>

// With custom class
<PageHeading className="text-2xl">Custom Size</PageHeading>
```

### SectionHeading
```tsx
import { SectionHeading } from '@/components/layout/PageLayout';

<SectionHeading>Section Title</SectionHeading>
```

### SectionHeader (with action button)
```tsx
import { SectionHeader } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

<SectionHeader
  title="Featured Research"
  action={
    <Link href="/papers">
      <Button variant="secondary">View All</Button>
    </Link>
  }
/>
```

---

## 🏠 Home Components (`components/layout/HomeComponents.tsx`)

### ServiceCard
```tsx
import { ServiceCard } from '@/components/layout/HomeComponents';

<ServiceCard
  href="/services#service-1"
  title="Attribution Integrity"
  description="Designing systems that preserve authorship clarity..."
  ariaLabel="Learn more about Attribution Integrity services"
/>
```

### TrustBar
```tsx
import { TrustBar } from '@/components/layout/HomeComponents';

<TrustBar
  badges={[
    { title: '20+ Years Experience' },
    { title: 'Independent' },
    { title: 'Research-Backed' }
  ]}
/>

// Or with separate values
<TrustBar
  badges={[
    { title: 'Experience', value: '20+ Years' },
    { title: 'Status', value: 'Independent' }
  ]}
/>
```

---

## 🏷️ Metadata Utilities (`lib/metadata.ts`)

### Standard Page
```tsx
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'About',
  description: 'Learn about our practice...',
  path: '/about'
});
```

### Article/Paper Page
```tsx
import { createArticleMetadata } from '@/lib/metadata';

export const metadata = createArticleMetadata({
  title: 'Research Paper Title',
  description: 'Paper abstract...',
  path: '/papers/paper-slug',
  authors: ['Jane Doe', 'John Smith'],
  publishedTime: '2024-01-15',
  tags: ['AI', 'Stylometry']
});
```

### Home Page
```tsx
import { createHomeMetadata } from '@/lib/metadata';

export const metadata = createHomeMetadata(
  'Custom home page description...'
);
```

### No-Index Page
```tsx
export const metadata = createPageMetadata({
  title: 'Draft Page',
  path: '/draft',
  noIndex: true  // Prevents indexing
});
```

---

## 📝 TypeScript Types (`lib/types.ts`)

### Import Types
```tsx
import type { 
  Paper, 
  Project, 
  Service,
  CardProps,
  ResearchItem,
  NavItem,
  FrontMatter
} from '@/lib/types';
```

### Usage Examples
```tsx
// Paper type
const paper: Paper = {
  slug: 'my-paper',
  title: 'Research Title',
  excerpt: 'Brief description...',
  date: '2024-01-15',
  DOI: '10.1234/example',
  featured: true
};

// Card props
const props: CardProps = {
  slug: 'item-slug',
  title: 'Item Title',
  excerpt: 'Description...'
};

// Navigation item
const navItem: NavItem = {
  title: 'Services',
  href: '/services',
  children: [
    { title: 'Service 1', href: '/services#service-1' }
  ]
};
```

---

## 🎯 Updated Component APIs

### Card (Enhanced)
```tsx
import { Card } from '@/components/ui/Card';

// With hover (default)
<Card>Content</Card>

// Without hover
<Card interactive={false}>Content</Card>

// With custom class
<Card className="p-8">Content</Card>
```

### PaperCard
```tsx
import { PaperCard } from '@/components/PaperCard';
import type { CardProps } from '@/lib/types';

const props: CardProps = {
  slug: 'paper-slug',
  title: 'Paper Title',
  excerpt: 'Brief description...'
};

<PaperCard {...props} />
```

### FeaturedPaperCard
```tsx
import { FeaturedPaperCard } from '@/components/FeaturedPaperCard';

<FeaturedPaperCard
  slug="paper-slug"
  title="Paper Title"
  excerpt="Description..."
  DOI="10.1234/example"
/>
```

---

## 🎨 CSS Custom Properties

Available in `app/globals.css`:

```css
/* Use in custom CSS */
.my-element {
  transition: var(--transition-colors);
  box-shadow: var(--shadow-card);
  border-width: var(--border-width-thin);
}
```

Available variables:
- `--transition-base`, `--transition-colors`, `--transition-transform`
- `--page-gutter`, `--section-spacing`
- `--border-width-thin`, `--border-width-thick`, `--border-width-accent`
- `--shadow-card`, `--shadow-card-hover`

---

## 📋 Cheat Sheet

### Complete Page Template
```tsx
import { PageContainer, PageHeading } from '@/components/layout/PageLayout';
import { createPageMetadata } from '@/lib/metadata';
import { BODY_TEXT } from '@/lib/styles';

export const metadata = createPageMetadata({
  title: 'Page Title',
  description: 'Page description',
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

### Service Card Grid (Home Page)
```tsx
import { ServiceCard } from '@/components/layout/HomeComponents';

<div className="grid md:grid-cols-3 gap-6 mb-8">
  <ServiceCard
    href="/services#service-1"
    title="Service 1"
    description="Description..."
  />
  <ServiceCard
    href="/services#service-2"
    title="Service 2"
    description="Description..."
  />
  <ServiceCard
    href="/services#service-3"
    title="Service 3"
    description="Description..."
  />
</div>
```

### Section with Action Button
```tsx
import { SectionHeader } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

<section className="max-w-4xl mx-auto mb-8">
  <SectionHeader
    title="Featured Content"
    action={
      <Link href="/view-all">
        <Button variant="secondary">View All</Button>
      </Link>
    }
  />
  {/* content */}
</section>
```

---

## 🔗 File Locations

```
lib/
  ├── styles.ts         # Style constants
  ├── types.ts          # TypeScript types
  ├── metadata.ts       # Metadata helpers
  └── papers-data.ts    # Data fetching

components/
  ├── layout/
  │   ├── PageLayout.tsx      # Page/heading components
  │   └── HomeComponents.tsx  # Home-specific components
  └── ui/
      ├── Card.tsx           # Enhanced card component
      ├── Button.tsx         # Button component
      └── ...

docs/
  ├── REFACTORING-GUIDE.md    # Full refactoring docs
  ├── QUICK-REFERENCE.md      # This file
  └── examples/               # Example implementations
```

---

## 💡 Best Practices

1. **Always use style constants** instead of repeating Tailwind classes
2. **Import types** from `lib/types.ts` for consistency
3. **Use metadata helpers** for all pages to ensure SEO compliance
4. **Prefer layout components** over manual div/section structures
5. **Check examples** in `docs/examples/` when unsure about usage
6. **Keep components simple** - compose multiple simple components instead of complex ones

---

## 🐛 Common Issues

### Style constant not applying?
- Ensure you're importing from `@/lib/styles`
- Check if you need to wrap in template literals: `` `${CONSTANT} extra-class` ``

### Type errors with Paper/Project?
- Import types: `import type { Paper } from '@/lib/types'`
- Ensure all required fields are present

### Metadata not showing?
- Check the path starts with `/`
- Verify you're using the correct metadata function

### Component not found?
- Check import path: `@/components/layout/PageLayout`
- Ensure file exists in correct location
