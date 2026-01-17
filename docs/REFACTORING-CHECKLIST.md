# Refactoring Implementation Checklist

This checklist guides you through applying the refactored code to your existing pages.

## ✅ Phase 1: Foundation (Already Complete)

- [x] Create `lib/styles.ts` - Style constants
- [x] Create `lib/types.ts` - TypeScript types
- [x] Create `lib/metadata.ts` - Metadata utilities
- [x] Create `components/layout/PageLayout.tsx` - Layout components
- [x] Create `components/layout/HomeComponents.tsx` - Home components
- [x] Update `app/globals.css` - Add CSS custom properties
- [x] Update `lib/papers-data.ts` - Use centralized types
- [x] Update `components/ui/Card.tsx` - Use style constants
- [x] Update `components/PaperCard.tsx` - Use centralized types
- [x] Update `components/FeaturedPaperCard.tsx` - Use style constants
- [x] Create documentation in `docs/` folder

## 📝 Phase 2: Update Existing Pages (Optional)

### Priority 1: High-Traffic Pages

#### Home Page (`app/page.tsx`)
- [ ] Import `ServiceCard` from `@/components/layout/HomeComponents`
- [ ] Replace three pillar cards with `<ServiceCard />` components
- [ ] Import `TrustBar` and replace trust section
- [ ] Import `SectionHeader` and update Featured Research header
- [ ] Update metadata using `createHomeMetadata()`

**Estimated savings**: ~40 lines of code

#### About Page (`app/about/page.tsx`)
- [ ] Import `PageContainer`, `PageHeading` from `@/components/layout/PageLayout`
- [ ] Replace `<section className="max-w-4xl...">` with `<PageContainer>`
- [ ] Replace heading with `<PageHeading>`
- [ ] Update metadata using `createPageMetadata()`
- [ ] Import and use `BODY_TEXT` constant for paragraphs

**Estimated savings**: ~15 lines of code

#### Services Page (`app/services/page.tsx`)
- [ ] Import `PageContainer`, `PageHeading`
- [ ] Replace container and heading
- [ ] Update metadata using `createPageMetadata()`
- [ ] Apply `BODY_TEXT` to intro paragraphs

**Estimated savings**: ~12 lines of code

### Priority 2: Content Pages

#### Papers Index (`app/papers/page.tsx`)
- [ ] Import `PageContainer`, `PageHeading`
- [ ] Replace container and heading
- [ ] Update metadata using `createPageMetadata()`

**Estimated savings**: ~10 lines of code

#### Projects Index (`app/projects/page.tsx`)
- [ ] Import `PageContainer`, `PageHeading`
- [ ] Replace container and heading
- [ ] Update metadata using `createPageMetadata()`
- [ ] Apply `BODY_TEXT` constant

**Estimated savings**: ~10 lines of code

#### Legal Page (`app/legal/page.tsx`)
- [ ] Import `PageContainer`, `PageHeading`
- [ ] Replace container and heading
- [ ] Update metadata using `createPageMetadata()`
- [ ] Apply `BODY_TEXT` constant

**Estimated savings**: ~10 lines of code

#### Contact Page (`app/contact/page.tsx`)
- [ ] Import `PageContainer`, `PageHeading`
- [ ] Replace container and heading
- [ ] Update metadata using `createPageMetadata()`

**Estimated savings**: ~10 lines of code

### Priority 3: Dynamic Pages

#### Paper Detail (`app/papers/[slug]/page.tsx`)
- [ ] Update metadata generation using `createArticleMetadata()`
- [ ] Import `PageContainer` (if using container)
- [ ] Consider extracting repeated classes to constants

**Estimated savings**: ~15 lines of code

#### Service Detail (`app/services/[slug]/page.tsx`)
- [ ] Update metadata generation using `createArticleMetadata()` or `createPageMetadata()`
- [ ] Import `PageContainer` (if applicable)

**Estimated savings**: ~10 lines of code

#### Project Detail (`app/projects/[slug]/page.tsx`)
- [ ] Update metadata generation using `createArticleMetadata()` or `createPageMetadata()`
- [ ] Import `PageContainer` (if applicable)

**Estimated savings**: ~10 lines of code

## 🔧 Phase 3: Component Updates (Optional)

### Enhance Existing Components

#### Button Component (`components/ui/Button.tsx`)
- [ ] Consider importing style constants from `lib/styles.ts`
- [ ] Use `cn()` utility if conditional classes needed

#### ContactForm (`components/ContactForm.tsx`)
- [ ] Import `INPUT`, `LABEL` constants
- [ ] Replace repeated input classes
- [ ] Consider extracting error alert to separate component

**Estimated savings**: ~20 lines of code

#### Accordion (`components/ui/Accordion.tsx`)
- [ ] Already uses proper focus ring (Burnt Ochre) ✓
- [ ] Consider extracting repeated classes to constants

#### DataTable (`components/ui/DataTable.tsx`)
- [ ] Already well-structured ✓
- [ ] No changes needed

## 📊 Expected Results

### Code Reduction
- **Total estimated savings**: ~150-200 lines of code across all pages
- **Duplication eliminated**: ~80% reduction in repeated Tailwind classes
- **Metadata boilerplate**: ~70% reduction

### Maintainability Improvements
- **Single source of truth**: Style changes in 1 place instead of 10+
- **Type safety**: Centralized types prevent drift
- **Consistency**: All pages use same patterns
- **Documentation**: Clear examples and references

### Developer Experience
- **Faster page creation**: Less boilerplate
- **Better autocomplete**: IntelliSense for constants
- **Easier onboarding**: Clear patterns to follow
- **Simpler debugging**: Find all styles in one file

## 🧪 Testing After Each Phase

After updating each page:

1. **Visual Check**
   - [ ] Page renders correctly
   - [ ] No visual regressions
   - [ ] Responsive behavior intact

2. **Functional Check**
   - [ ] Links work
   - [ ] Buttons function
   - [ ] Forms submit (if applicable)

3. **Technical Check**
   - [ ] No TypeScript errors: `npm run build`
   - [ ] No console errors in browser
   - [ ] Lighthouse score maintained

4. **Accessibility Check**
   - [ ] Keyboard navigation works
   - [ ] Focus indicators visible
   - [ ] ARIA labels intact

5. **SEO Check**
   - [ ] Metadata appears in page source
   - [ ] OpenGraph tags present
   - [ ] Title format correct

## 🚀 Deployment Strategy

### Option A: Gradual Migration
1. Update one page at a time
2. Test thoroughly after each update
3. Deploy incrementally
4. Monitor for issues

**Pros**: Lower risk, easy to rollback
**Cons**: Takes longer

### Option B: Batch Migration
1. Update all pages in a branch
2. Test comprehensively
3. Deploy all at once
4. Monitor closely

**Pros**: Faster completion, consistent patterns
**Cons**: Higher risk if issues occur

### Recommended: Option A for Production Sites

## 📝 Notes and Tips

### Before You Start
- Create a new git branch: `git checkout -b refactor/layout-components`
- Keep backup of original files
- Test locally before deploying
- Review examples in `docs/examples/`

### During Migration
- Update one file at a time
- Test after each change
- Commit frequently: `git commit -m "refactor: update about page"`
- Use Quick Reference for syntax

### After Migration
- Run full test suite
- Check Lighthouse scores
- Verify analytics tracking
- Update team documentation

### If Issues Arise
- Check `docs/QUICK-REFERENCE.md` for common issues
- Verify import paths
- Ensure all required props passed
- Check browser console for errors

## 🎯 Success Criteria

Migration is complete when:
- [ ] All pages build without errors
- [ ] Visual appearance unchanged
- [ ] All functionality works
- [ ] Metadata correctly displays
- [ ] Accessibility maintained or improved
- [ ] Lighthouse scores maintained or improved
- [ ] Code is easier to understand and maintain

## 📚 Additional Resources

- **Full Guide**: `docs/REFACTORING-GUIDE.md`
- **Quick Reference**: `docs/QUICK-REFERENCE.md`
- **Examples**: `docs/examples/`
- **Original Design**: `docs/design-system.md`

## 💬 Questions?

When in doubt:
1. Check the Quick Reference
2. Look at example files
3. Compare with current working pages
4. Test in dev environment first

---

**Remember**: This refactoring is **optional**. The site works perfectly as-is. These changes improve maintainability and developer experience for future updates.
