# Responsive Container Classes - Usage Guide

## Overview

Your project now includes a complete responsive container system that works seamlessly with your existing breakpoint utilities.

## Container Classes Available

| Class             | Breakpoint  | Max Width | Horizontal Padding | When Applied               |
| ----------------- | ----------- | --------- | ------------------ | -------------------------- |
| `.container`      | All screens | 100%      | `var(--space-4)`   | Mobile-first base          |
| `.sm:container`   | All screens | 100%      | `var(--space-4)`   | Explicit small screen      |
| `.md:container`   | ≥768px      | 768px     | `var(--space-5)`   | Medium screens and up      |
| `.lg:container`   | ≥1024px     | 1024px    | `var(--space-6)`   | Large screens and up       |
| `.xl:container`   | ≥1280px     | 1280px    | `var(--space-7)`   | Extra large screens and up |
| `.xxl:container`  | ≥1536px     | 1536px    | `var(--space-8)`   | 2XL screens and up         |
| `.xxxl:container` | ≥1920px     | 1920px    | `var(--space-10)`  | 3XL screens and up         |

## Usage Examples

### Example 1: Basic Container (Mobile-First)

```html
<div class="container">
    <!-- Content spans full width on mobile, auto-centered on all screens -->
</div>
```

### Example 2: Responsive Container with Multiple Breakpoints

```html
<div class="container md:container lg:container xl:container">
    <!-- 
    - Mobile: 100% width, padding: var(--space-4)
    - ≥768px: max-width: 768px, padding: var(--space-5)
    - ≥1024px: max-width: 1024px, padding: var(--space-6)
    - ≥1280px: max-width: 1280px, padding: var(--space-7)
    -->
</div>
```

### Example 3: Full Width on Mobile, Contained on Desktop

```html
<section class="py-6 lg:container xl:container">
    <!-- Full width on mobile/tablet, contained on large screens -->
</section>
```

### Example 4: Different Container Sizes

```html
<!-- Narrow container for reading content -->
<article class="container md:container">
    <h1>Article Title</h1>
    <p>This stays narrower for better readability...</p>
</article>

<!-- Wide container for dashboard layouts -->
<div class="container lg:container xl:container xxl:container">
    <div class="dashboard-grid">
        <!-- Wide layout for complex UIs -->
    </div>
</div>
```

### Example 5: Combining with Your Existing Utilities

```html
<div class="container lg:container xl:container py-6 md:py-8 lg:py-10">
    <!-- Responsive container with responsive padding -->
    <h2 class="mb-4 md:mb-6">Section Title</h2>
    <div class="grid gap-4 md:gap-6 lg:gap-8">
        <!-- Content grid with responsive gaps -->
    </div>
</div>
```

## How It Works

### Mobile-First Approach

The `.container` class provides the base styles for all screen sizes:

-   100% width
-   Auto-centering (margin-left/right: auto)
-   Responsive padding using CSS variables

### Breakpoint-Specific Containers

Each breakpoint class (md:, lg:, xl:, etc.) adds a `max-width` constraint and adjusted padding when the screen size matches or exceeds that breakpoint.

### Class Stacking

You can stack multiple container classes to create a fully responsive container:

```html
<div
    class="container md:container lg:container xl:container xxl:container"
></div>
```

This ensures the container adapts its max-width at each breakpoint.

## Best Practices

### 1. **Use Base Container for Global Layout**

```html
<header class="py-4">
    <div class="container lg:container xl:container">
        <!-- Nav content -->
    </div>
</header>
```

### 2. **Combine with Spacing Utilities**

```html
<section class="py-8 md:py-10 lg:py-12">
    <div class="container lg:container xl:container">
        <h2 class="mb-6 md:mb-8">Title</h2>
    </div>
</section>
```

### 3. **Nested Containers (Usually Avoid)**

Generally avoid nesting containers, but if needed:

```html
<div class="container xl:container">
    <div class="py-10">
        <!-- Don't add another container here -->
        <div class="mx-auto" style="max-width: 800px;">
            <!-- Use custom max-width instead -->
        </div>
    </div>
</div>
```

### 4. **Override When Necessary**

```html
<!-- Full bleed section -->
<section class="py-12" style="max-width: none;">
    <div class="container lg:container">
        <!-- Inner content contained -->
    </div>
</section>
```

## Updating Your HTML

Your existing HTML already uses `.container`. You can now enhance it:

### Before:

```html
<section class="hero p-3 md:py-4 lg:py-5 xl:py-7">
    <div class="container text-center"></div>
</section>
```

### After (with responsive container):

```html
<section class="hero p-3 md:py-4 lg:py-5 xl:py-7">
    <div
        class="container lg:container xl:container xxl:container text-center"
    ></div>
</section>
```

## Spacing Variables

The containers use your existing spacing system:

-   `--space-4`: ~12-16px (mobile)
-   `--space-5`: ~16-20px (tablet)
-   `--space-6`: ~20-24px (desktop)
-   `--space-7`: ~24-28px (large desktop)
-   `--space-8`: ~28-32px (xl desktop)
-   `--space-10`: ~40-60px (ultra-wide)

All spacing values use `clamp()` for fluid scaling between breakpoints.

## Browser Support

These container classes work in all modern browsers that support:

-   CSS Custom Properties (CSS Variables)
-   CSS Grid
-   `clamp()` function
-   Media queries

## Notes

1. **The backslash in class names** (e.g., `md\:container`) is required in CSS to escape the colon character
2. **In HTML**, you use the class normally without the backslash: `class="md:container"`
3. **All containers are auto-centered** with `margin-left: auto; margin-right: auto;`
4. **Width is always 100%** until the max-width constraint is applied at the respective breakpoint

## Common Patterns

### Pattern 1: Header/Navigation

```html
<header class="sticky top-0 py-2 md:py-3">
    <div class="container lg:container xl:container">
        <nav class="flex justify-between items-center">
            <!-- Nav items -->
        </nav>
    </div>
</header>
```

### Pattern 2: Hero Section

```html
<section class="hero py-12 md:py-16 lg:py-20">
    <div class="container md:container lg:container xl:container text-center">
        <h1 class="mb-6">Hero Title</h1>
        <p class="mb-8">Hero description</p>
    </div>
</section>
```

### Pattern 3: Content Section

```html
<section class="py-8 md:py-12 lg:py-16">
    <div class="container lg:container xl:container">
        <h2 class="mb-8">Section Title</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Grid content -->
        </div>
    </div>
</section>
```

### Pattern 4: Footer

```html
<footer class="py-10 md:py-12 lg:py-16">
    <div class="container lg:container xl:container">
        <!-- Footer content -->
    </div>
</footer>
```

## Quick Reference

```css
/* What gets applied at each breakpoint */

Mobile (default):
  .container → width: 100%, padding-x: var(--space-4)

Tablet (≥768px):
  .md:container → max-width: 768px, padding-x: var(--space-5)

Desktop (≥1024px):
  .lg:container → max-width: 1024px, padding-x: var(--space-6)

Large Desktop (≥1280px):
  .xl:container → max-width: 1280px, padding-x: var(--space-7)

XL Desktop (≥1536px):
  .xxl:container → max-width: 1536px, padding-x: var(--space-8)

Ultra-wide (≥1920px):
  .xxxl:container → max-width: 1920px, padding-x: var(--space-10)
```
