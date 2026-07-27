# IHWE Conference Design System - Quick Reference

## 🎨 COLOR PALETTE

```
PRIMARY COLORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔵 Navy          #0B2C66  (Main, headings, text)
🟢 Green         #4E9F3D  (CTA, accents, Day 1)
🔷 Blue          #1E88E5  (Highlights, Day 2)
🟣 Purple        #6A3DF0  (Special, Day 3)

BACKGROUNDS & TEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚪ White         #FFFFFF  (Background)
🩶 Light Gray    #F7F9FC  (Section bg)
⚫ Dark Text     #1C2B3A  (Headings)
📝 Medium Text   #5F6B7A  (Body text)
⬜ Border Gray   #E6ECF3  (Borders)

TINTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟢 Green Tint    #F1F8EE  (Light bg)
🔵 Blue Tint     #EEF4FF  (Light bg)
```

## 📝 TYPOGRAPHY

```
HEADING STYLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
H1 Hero      | 72px | Bold 800 | Poppins | -2% letter-spacing
H2 Section   | 48px | Bold 700 | Poppins | 58px line-height
H3 Sub       | 24px | Semi 600 | Poppins | 32px line-height

BODY STYLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Body         | 18px | Reg 400  | Inter   | 30px line-height
Caption      | 14px | Med 500  | Inter   | 20px line-height
Label        | 16px | Semi 600 | Poppins | UPPERCASE
Button       | 16px | Bold 700 | Poppins | UPPERCASE
```

## 📏 SPACING SCALE

```
SPACING VALUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
xs  |  8px    | Component gaps
sm  | 16px    | Element gaps
md  | 24px    | Card gaps (STANDARD)
lg  | 32px    | Large gaps
xl  | 48px    | Section padding
2xl | 60px    | Outer margins (SECTION PADDING)
3xl | 90px    | Section spacing (GAP BETWEEN SECTIONS)
```

## 🔲 BORDER RADIUS

```
SIZES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
12px  | Small (icons, badges)
16px  | Secondary cards
18px  | Track cards
20px  | Primary cards (STANDARD)
32px  | Large sections
50px  | Buttons (STANDARD)
```

## 🎭 SHADOWS

```
ELEVATION LEVELS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Standard  | 0px 10px 30px rgba(11,44,102,0.08)  | Base
Elevated  | 0px 20px 40px rgba(11,44,102,0.12)  | Hover
Hover     | 0px 15px 35px rgba(11,44,102,0.15)  | Interact
Green SM  | 0px 10px 30px rgba(78,159,61,0.2)   | Green btn
Green MD  | 0px 15px 40px rgba(78,159,61,0.3)   | Green hover
```

## 📐 GRID SYSTEM

```
DESKTOP (1440px)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Columns:    12
Column:     88px
Gutter:     24px
Margin:     60px left/right
Container:  1320px

TABLET (768px)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Columns:    8
Column:     70px
Gutter:     16px
Margin:     34px left/right
Container:  700px

MOBILE (390px)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Columns:    4
Column:     79px
Gutter:     12px
Margin:     16px left/right
Container:  358px
```

## 🧩 COMPONENT SIZES

```
BUTTONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Small       | 160 × 40px
Medium      | 200 × 48px
Large       | 220 × 58px (PRIMARY)
Extra Large | 240 × 64px

CARDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Benefit     | 250 × 110px
Speaker     | 248 × 320px
Day Conf    | 416 × 340px
Testimonial | 416 × 220px

ICONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stats       | 34px
Benefits    | 48px
Tracks      | 42px
Speaker     | 90px (circle)
Badges      | 40-44px
```

## 📊 SECTION DIMENSIONS

```
HERO             | 760px height | 2-column layout
STATS BAR        | 110px height | Overlaps hero -45px
WHY ATTEND       | 520px height | 4-col intro + 3-col×2-row benefits
TRACKS           | 340px height | 8 cards horizontal
3-DAY CONFERENCE | 400px height | 3 large cards
SPEAKERS         | 500px height | 5 card carousel
AGENDA           | 500px height | Left image + right table
SPONSOR          | 340px height | Left text + right grid
TESTIMONIALS     | 340px height | 3 cards
FINAL CTA        | 220px height | Left text + right buttons
```

## 🎨 GRADIENTS

```
HERO GRADIENT    | #4E9F3D → #0B2C66 (Green → Navy)
DAY 1 GRADIENT   | #4E9F3D → #2E7D32 (Green shades)
DAY 2 GRADIENT   | #1E88E5 → #0B2C66 (Blue → Navy)
DAY 3 GRADIENT   | #6A3DF0 → #4E3BA5 (Purple shades)
FOOTER GRADIENT  | #081F4D → #0B2C66 (Navy shades)
```

## ✨ TRANSITIONS

```
Fast:      200ms ease-out
Normal:    300ms ease-out (DEFAULT)
Slow:      500ms ease-out
Slowest:   800ms ease-out
```

## 🔌 TAILWIND CLASSES

```
COLORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
text-navy        | Text color navy
bg-green         | Background green
text-medium      | Medium gray text
bg-gray          | Light gray background
bg-green-tint    | Light green tint

SPACING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
p-card           | 32px padding
p-section        | 60px padding
gap-standard     | 24px gap
gap-section      | 90px gap
mx-auto-container| Auto + max-width

BORDER RADIUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
rounded-20       | Primary radius
rounded-50       | Button radius
rounded-12       | Icon radius
rounded-32       | Large sections

SHADOWS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
shadow-standard  | Base shadow
shadow-elevated  | Hover shadow
shadow-green-sm  | Green button
shadow-green-md  | Green hover

GRADIENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
gradient-hero    | Green → Navy
gradient-day1    | Green shades
gradient-day2    | Blue → Navy
gradient-day3    | Purple shades
```

## 🎯 KEY RULES

```
SPACING RHYTHM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Between sections:    90px gap
• Card gaps:           24px gap
• Element gaps:        16px gap
• Container padding:   60px (desktop)
• Section vertical:    90px (top & bottom)

TYPOGRAPHY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Hero font:           Poppins 72px Bold
• Section heading:     Poppins 48px Bold
• Body text:           Inter 18px Regular
• Minimum font size:   14px (captions)
• Minimum line height: 1.4

COLORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Primary color:       Navy #0B2C66
• CTA color:          Green #4E9F3D
• Text color:         #1C2B3A (dark)
• Background:         #FFFFFF (white)
• Section bg:         #F7F9FC (light gray)

LAYOUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Container width:     1320px (max)
• Outer margins:       60px
• Grid columns:        12 (desktop)
• Column width:        88px
• Gutter:              24px
```

## 📋 COMPONENT CHECKLIST

```
BUTTONS
☐ Primary (Green bg, white text)
☐ Secondary (White bg, navy text)
☐ Outline (Transparent, light border)
☐ Hover states
☐ Disabled states

CARDS
☐ Benefit (Icon + text)
☐ Speaker (Image + badges)
☐ Day Conference (Icon + metrics)
☐ Testimonial (Quote + author)
☐ Hover effects

SECTIONS
☐ Hero (760px)
☐ Stats Bar (110px, -45px overlap)
☐ Why Attend (520px)
☐ Tracks (340px)
☐ 3-Day (400px)
☐ Speakers (500px)
☐ Agenda (500px)
☐ Sponsor (340px)
☐ Testimonials (340px)
☐ Final CTA (220px)

RESPONSIVE
☐ Desktop (1440px)
☐ Tablet (768px)
☐ Mobile (390px)

ACCESSIBILITY
☐ Color contrast ≥ 4.5:1
☐ Font size ≥ 14px
☐ Line height ≥ 1.4
☐ Touch targets ≥ 48px
☐ Focus visible
```

## 🚀 QUICK TEMPLATE

```jsx
// Component Template
import React from 'react';

const Component: React.FC = () => {
  return (
    <section className="section-spacing bg-white">
      <div className="section-container">
        <div className="text-center mb-24">
          <p className="section-label">LABEL</p>
          <h2 className="font-section-heading text-dark">
            Heading <span className="text-green">Colored</span>
          </h2>
        </div>

        <div className="grid-12 gap-standard">
          {/* Content grid */}
        </div>
      </div>
    </section>
  );
};

export default Component;
```

## 📞 FILE REFERENCES

```
Design Tokens:        src/styles/designSystem.ts
CSS Utilities:        src/styles/design-system.css
Tailwind Config:      tailwind.config.ts
Figma Blueprint:      FIGMA_DESIGN_BLUEPRINT.md
Implementation:       IMPLEMENTATION_GUIDE.md
Full Documentation:   DESIGN_SYSTEM_README.md
```

---

**Version**: 1.0
**Status**: Production Ready ✅
**Last Updated**: April 30, 2026

**Print this page for quick reference while coding!** 📋✨
