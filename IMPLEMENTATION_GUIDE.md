# IHWE Conference - Implementation Guide

## Complete Figma-to-Code Workflow

### Overview

This guide walks through implementing the IHWE Conference landing page using the pixel-perfect design system. Every section, component, and detail is specified for both Figma design and React implementation.

---

## 📋 Table of Contents

1. [Project Setup](#project-setup)
2. [Component Implementation](#component-implementation)
3. [Layout & Grid](#layout--grid)
4. [Typography Implementation](#typography-implementation)
5. [Color Implementation](#color-implementation)
6. [Spacing & Sizing](#spacing--sizing)
7. [Responsive Design](#responsive-design)
8. [Testing Checklist](#testing-checklist)

---

## 🚀 Project Setup

### Step 1: Install Dependencies

```bash
npm install
# or
bun install
```

### Step 2: Verify Design Tokens

Files created:

- ✅ `src/styles/designSystem.ts` - TypeScript tokens
- ✅ `src/styles/design-system.css` - CSS utilities
- ✅ `tailwind.config.ts` - Tailwind configuration
- ✅ `FIGMA_DESIGN_BLUEPRINT.md` - Figma specifications
- ✅ `DESIGN_SYSTEM_README.md` - System documentation

### Step 3: Import Design System

In your components:

```typescript
import { designSystem } from "@/styles/designSystem";
import "@/styles/design-system.css";
```

---

## 🎨 Component Implementation

### Master Container Setup

All sections should use this structure:

```typescript
import React from 'react';
import { designSystem } from '@/styles/designSystem';

const SectionComponent: React.FC = () => {
  return (
    <section className="bg-white section-spacing">
      <div className="section-container mx-auto-container">
        {/* Section content */}
      </div>
    </section>
  );
};

export default SectionComponent;
```

### Grid Implementation

**Desktop (12 columns)**:

```jsx
<div className="grid-12">
  <div className="col-span-6">Left Content</div>
  <div className="col-span-6">Right Content</div>
</div>
```

**Tablet (8 columns)**:

```jsx
// Automatically adjusts with media queries
<div className="grid-12">{/* Same HTML, responsive via CSS */}</div>
```

**Mobile (4 columns)**:

```jsx
// Automatically adjusts with media queries
<div className="grid-12">{/* Stacks responsively */}</div>
```

---

## 📐 Layout & Grid

### Container Width Reference

```typescript
const containerWidths = {
  desktop: 1320, // 1440 - 60 left - 60 right
  tablet: 700, // 768 - 34 left - 34 right
  mobile: 358, // 390 - 16 left - 16 right
};

const gridColumns = {
  desktop: 12,
  tablet: 8,
  mobile: 4,
};

const columnWidth = {
  desktop: 88, // (1320 - 11×24 gutter) / 12
  tablet: 70, // (700 - 7×16 gutter) / 8
  mobile: 79, // (358 - 3×12 gutter) / 4
};
```

### Section Spacing

All sections follow this pattern:

```typescript
<section className="section-spacing bg-[background-color]">
  {/* 90px top and bottom margin */}
  <div className="section-container">
    {/* 60px left and right padding */}
  </div>
</section>
```

---

## 📝 Typography Implementation

### Using Typography Classes

```jsx
// Hero Heading
<h1 className="font-hero text-navy">Learn. Connect. Lead.</h1>

// Section Label
<p className="font-section-label text-green">WHY ATTEND?</p>

// Section Heading
<h2 className="font-section-heading text-dark">Section Title</h2>

// Body Text
<p className="font-body text-medium">Description text here...</p>

// Button Text
<button className="font-button uppercase">Click Me</button>
```

### Custom Typography in Tailwind

Add to your className:

```jsx
<h1 className="text-[72px] font-[800] leading-[84px] tracking-[-2%]">
  Large Heading
</h1>

<p className="text-[18px] font-[400] leading-[30px]">
  Body text with proper line height
</p>
```

### Font Family Setup

In `tailwind.config.ts`, fonts are configured:

```typescript
fontFamily: {
  poppins: ["Poppins", "sans-serif"],
  inter: ["Inter", "sans-serif"],
}
```

Use them:

```jsx
<h1 className="font-poppins text-[72px] font-bold">Title</h1>
<p className="font-inter text-base">Body text</p>
```

---

## 🎨 Color Implementation

### Using Color System

```jsx
// Text colors
<h1 className="text-navy">Navy heading</h1>
<p className="text-green">Green text</p>
<p className="text-blue">Blue text</p>
<p className="text-medium">Medium gray text</p>

// Background colors
<div className="bg-navy">Navy background</div>
<div className="bg-green">Green background</div>
<div className="bg-gray">Light gray background</div>
<div className="bg-green-tint">Light green tint</div>

// Gradient backgrounds
<div className="gradient-hero">Hero gradient (Green → Blue)</div>
<div className="gradient-day1">Day 1 gradient</div>
<div className="gradient-day2">Day 2 gradient</div>
<div className="gradient-day3">Day 3 gradient</div>

// Border colors
<div className="border border-gray">Gray border</div>
```

### Color Values Reference

```typescript
const colorMap = {
  navy: "#0B2C66",
  "navy-dark": "#081F4D",
  green: "#4E9F3D",
  "green-dark": "#2E7D32",
  blue: "#1E88E5",
  purple: "#6A3DF0",
  "bg-gray": "#F7F9FC",
  "border-gray": "#E6ECF3",
  "text-dark": "#1C2B3A",
  "text-medium": "#5F6B7A",
  white: "#FFFFFF",
};
```

---

## 📏 Spacing & Sizing

### Spacing Scale

```jsx
// Use spacing classes
<div className="gap-standard">      {/* 24px gap */}
<div className="gap-large">         {/* 32px gap */}
<div className="gap-section">       {/* 90px gap */}

// Custom spacing
<div className="p-card">            {/* 32px padding */}
<div className="p-section">         {/* 60px padding */}

// Margin classes
<div className="mt-90">             {/* 90px top margin */}
<div className="mx-auto-container"> {/* auto margins + max-width */}
```

### Component Sizes

```typescript
// Hero Section
const heroSizes = {
  height: 760,
  leftBlockWidth: 540,
  rightImageWidth: 690,
  rightImageHeight: 520,
};

// Card Sizes
const cardSizes = {
  benefit: { width: 250, height: 110 },
  speaker: { width: 248, height: 320 },
  dayConference: { width: 416, height: 340 },
  testimonial: { width: 416, height: 220 },
};

// Button Sizes
const buttonSizes = {
  small: { width: 160, height: 40 },
  medium: { width: 200, height: 48 },
  large: { width: 220, height: 58 },
};
```

Implement in JSX:

```jsx
<div style={{ width: '540px', maxWidth: '100%' }}>
  Content
</div>

<button className="w-220 h-58 rounded-50 bg-green text-white">
  Large Button
</button>
```

---

## 📱 Responsive Design

### Mobile-First Approach

```jsx
// Default: Mobile (390px)
<div className="text-[42px] font-bold">
  // Tablet (768px)
  <style>{`
    @media (min-width: 768px) {
      .responsive-text { font-size: 48px; }
    }
  `}</style>
  // Desktop (1440px)
  <style>{`
    @media (min-width: 1440px) {
      .responsive-text { font-size: 72px; }
    }
  `}</style>
</div>
```

### Using Tailwind Responsive Prefixes

```jsx
<div
  className="
  text-[32px] md:text-[48px] lg:text-[72px]
  px-[16px] md:px-[34px] lg:px-[60px]
  py-[48px] md:py-[70px] lg:py-[90px]
"
>
  Responsive content
</div>
```

### Breakpoint Sizes

```typescript
const breakpoints = {
  mobile: 390, // xs
  tablet: 768, // md
  desktop: 1440, // lg
};
```

Map to Tailwind:

```
sm: 640px
md: 768px  ← Our tablet
lg: 1024px
xl: 1280px
2xl: 1440px ← Our desktop
```

---

## 🧪 Testing Checklist

### Visual Testing

- [ ] Colors match hex codes exactly
- [ ] Typography sizes correct (72px hero, 48px sections, etc.)
- [ ] Spacing follows 90px section rhythm
- [ ] Cards have correct dimensions
- [ ] Buttons are correct sizes (220×58px primary)
- [ ] Icons are correct sizes (34px in stats, etc.)
- [ ] Shadows match specifications
- [ ] Border radius correct (20px cards, 50px buttons)

### Layout Testing

- [ ] Container width 1320px on desktop
- [ ] 60px left/right margins
- [ ] 12-column grid aligns properly
- [ ] Stats bar overlaps hero by -45px
- [ ] Card gaps are 24px
- [ ] Section spacing is 90px

### Responsive Testing

- [ ] Desktop (1440px): All components visible
- [ ] Tablet (768px): 8-column grid, adjusted sizing
- [ ] Mobile (390px): Single column, carousels work
- [ ] No horizontal scrolling on any breakpoint
- [ ] Text readable at all sizes
- [ ] Touch targets ≥ 48px on mobile

### Component Testing

- [ ] Buttons have hover states
- [ ] Cards have hover effects
- [ ] Carousels scroll smoothly
- [ ] Modals/popups work
- [ ] Forms validate
- [ ] Links navigate correctly

### Accessibility Testing

- [ ] Color contrast ≥ 4.5:1 for text
- [ ] Font sizes ≥ 14px (minimum)
- [ ] Line heights ≥ 1.4
- [ ] Focus states visible
- [ ] Alt text on images
- [ ] ARIA labels where needed

### Performance Testing

- [ ] Page loads < 3 seconds
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Images optimized
- [ ] CSS/JS minified
- [ ] No unused styles

---

## 📊 Section-by-Section Implementation

### SECTION 1: HERO (760px height)

```jsx
export const ConferenceHero = () => (
  <section className="relative h-760 bg-white overflow-hidden">
    <div className="section-container grid-12 items-center">
      {/* Left Block - Columns 1-5 */}
      <div className="col-span-5">
        <div className="badge mb-24">
          {/* Badge: 160×38px, navy, rounded-50 */}
        </div>
        <h1 className="font-hero text-navy mb-24">
          Learn. <span className="text-green">Connect.</span> Lead.
        </h1>
        <p className="font-body text-medium mb-32">
          {/* Paragraph: width 500px */}
        </p>
        <div className="flex gap-16">
          {/* Primary Button: 220×58px */}
          {/* Secondary Button: 200×58px */}
        </div>
      </div>

      {/* Right Block - Columns 6-12 */}
      <div className="col-span-6">
        <div className="w-690 h-520 rounded-40">
          {/* Hero image with gradient overlay */}
        </div>
      </div>
    </div>
  </section>
);
```

### SECTION 2: STATS BAR (110px height, -45px overlap)

```jsx
export const ConferenceStats = () => (
  <section className="relative -mt-45 z-50">
    <div className="section-container">
      <div className="h-110 bg-navy rounded-20 shadow-standard">
        <div className="grid-6 items-center justify-center h-full">
          {/* 6 equal columns, each 220px */}
          {stats.map((stat) => (
            <div key={stat.id} className="flex-col flex-center gap-16">
              <div className="w-34 h-34 bg-[color-tint] rounded-12">
                {/* Icon 34×34px */}
              </div>
              <div className="text-white text-[36px] font-bold">
                {stat.value}
              </div>
              <div className="text-white text-[14px] font-medium uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
```

### SECTION 3: WHY ATTEND (520px height)

```jsx
export const WhyAttend = () => (
  <section className="section-spacing bg-gray">
    <div className="section-container">
      <div className="grid-12 gap-32">
        {/* Left Intro - Columns 1-4 */}
        <div className="col-span-4">
          <p className="section-label">WHY ATTEND CONFERENCE?</p>
          <h2 className="font-section-heading text-dark mb-24">
            Where <span className="text-green">Ideas</span> Meet
            <span className="text-blue">Industry</span>
          </h2>
          <p className="font-body text-medium">Description text...</p>
        </div>

        {/* Right Benefits - Columns 5-12 */}
        <div className="col-span-8">
          <div className="grid grid-cols-3 gap-24">
            {/* 3 columns × 2 rows = 6 benefit cards */}
            {benefits.map((benefit) => (
              <div key={benefit.id} className="card">
                <div className={`w-48 h-48 rounded-12 ${benefit.bgColor}`}>
                  {/* Icon 48×48px */}
                </div>
                <p className="font-card-title text-dark">{benefit.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
```

Continue similarly for other sections...

---

## 🔄 Component Patterns

### Button Pattern

```jsx
// Primary Button
<button className="
  px-32 py-16 rounded-50
  bg-green text-white font-button
  shadow-green-sm
  hover:bg-green-dark hover:shadow-green-md
  transition-all
">
  REGISTER NOW
</button>

// Secondary Button
<button className="
  px-32 py-16 rounded-50
  bg-white text-navy font-button
  border-2 border-gray
  hover:bg-gray hover:border-green hover:text-green
  transition-all
">
  LEARN MORE
</button>

// Outline Button (Light)
<button className="
  px-32 py-16 rounded-50
  bg-transparent text-white font-button
  border-2 border-white border-opacity-30
  hover:bg-white hover:bg-opacity-10 hover:border-white
  transition-all
">
  CONTACT US
</button>
```

### Card Pattern

```jsx
// Standard Card
<div className="
  rounded-20 border border-gray bg-white
  p-32 shadow-standard
  hover:shadow-elevated hover:-translate-y-8
  transition-all
">
  {/* Card content */}
</div>

// Elevated Card
<div className="
  rounded-20 border border-gray bg-white
  p-32 shadow-elevated
">
  {/* Card content */}
</div>
```

### Section Header Pattern

```jsx
<div className="text-center mb-48">
  <p className="section-label">SECTION LABEL</p>
  <h2 className="font-section-heading text-dark mb-24">
    Section <span className="text-green">Heading</span>
  </h2>
  <div className="w-20 h-1 bg-green mx-auto rounded-full" />
</div>
```

---

## 📦 Export & Build

### Build for Production

```bash
npm run build
# or
bun run build
```

### Optimize Images

Images should be:

- Compressed (WebP preferred)
- Responsive (srcset)
- Lazy loaded

### CSS/JS Minification

Already handled by build tool. Verify with:

```bash
npm run build
# Check dist folder for minified files
```

---

## ✅ Final Verification

Before deploying, verify:

- [ ] All colors match design system
- [ ] All typography sizes correct
- [ ] All spacing follows grid
- [ ] All components properly sized
- [ ] All responsive breakpoints work
- [ ] No console errors
- [ ] Performance metrics good
- [ ] Accessibility standards met
- [ ] Design system documentation updated

---

## 🎓 Key Principles

1. **Consistency**: Use design system for everything
2. **Scalability**: Built to grow with the project
3. **Maintainability**: Easy to update colors/spacing globally
4. **Accessibility**: WCAG AA compliant
5. **Performance**: Optimized for web
6. **Responsiveness**: Works on all devices
7. **Developer Experience**: Easy to use and understand

---

## 🚀 You're Ready!

Everything is set up for a pixel-perfect, production-ready website. Happy coding! 🎉

---

**Created**: April 30, 2026
**Status**: Production Ready ✅
**Version**: 1.0
