# IHWE CONFERENCE - FIGMA DESIGN SYSTEM BLUEPRINT

## Pixel-Perfect Premium Healthcare Landing Page

### Version 1.0 | Enterprise Grade | Figma-Ready

---

## TABLE OF CONTENTS

1. [Global Frame Structure](#global-frame-structure)
2. [Color System](#color-system)
3. [Typography Hierarchy](#typography-hierarchy)
4. [Grid & Spacing System](#grid--spacing-system)
5. [Section Breakdown](#section-breakdown)
6. [Component Library](#component-library)
7. [Responsive Specifications](#responsive-specifications)
8. [Figma Build Instructions](#figma-build-instructions)

---

## GLOBAL FRAME STRUCTURE

### DESKTOP MASTER FRAME

```
Frame Name: "IHWE Conference Desktop - 1440px"
Width: 1440px
Height: 4200px (approx, stacked sections)
Background: #FFFFFF
Fill: Solid

GRID SETTINGS:
- Layout Grid: 12 Columns
- Column Width: 88px
- Gutter Width: 24px
- Offset (Left/Right): 60px (margin)
- Rows: Custom spacing (section-based)
- Row Height: 90px (section gap standard)
```

### CONTAINER SPECIFICATIONS

```
Main Content Container:
- Width: 1320px (1440px - 60px left - 60px right)
- Centered on canvas
- All sections nest within this container
```

### VERTICAL SPACING RHYTHM

```
Section Vertical Gap: 90px
Hero to Stats Overlap: -45px (Stats float above next section)
Card gaps: 24px (standard)
Element gaps: 16px (standard)
Component gaps: 8px (tight)
```

---

## COLOR SYSTEM

### PRIMARY COLORS

| Name          | Hex     | Usage                                   |
| ------------- | ------- | --------------------------------------- |
| Primary Navy  | #0B2C66 | Section headings, primary text, buttons |
| Deep Navy     | #081F4D | Footer, dark backgrounds                |
| Primary Green | #4E9F3D | Call-to-action, accents, Day 1 theme    |
| Dark Green    | #2E7D32 | Hover states, shadows                   |

### ACCENT COLORS

| Name          | Hex     | Usage                           |
| ------------- | ------- | ------------------------------- |
| Accent Blue   | #1E88E5 | Secondary elements, Day 2 theme |
| Purple Accent | #6A3DF0 | Day 3 theme, special highlights |

### BACKGROUND & BORDER COLORS

| Name             | Hex     | Usage                             |
| ---------------- | ------- | --------------------------------- |
| Background Gray  | #F7F9FC | Section backgrounds               |
| Border Gray      | #E6ECF3 | Card borders, dividers            |
| Light Green Tint | #F1F8EE | Light backgrounds with green tint |
| Light Blue Tint  | #EEF4FF | Light backgrounds with blue tint  |

### TEXT COLORS

| Name        | Hex     | Usage                    |
| ----------- | ------- | ------------------------ |
| Text Dark   | #1C2B3A | Primary body text        |
| Text Medium | #5F6B7A | Secondary text, captions |
| White       | #FFFFFF | Text on dark backgrounds |

### GRADIENTS

```
Hero Curve Gradient:
Direction: 135° diagonal
Colors: #4E9F3D (top-left) → #0B2C66 (bottom-right)
Opacity: Full

Day Conference Gradients:
Day 1 (Green): #4E9F3D → #2E7D32
Day 2 (Blue): #1E88E5 → #0B2C66
Day 3 (Purple): #6A3DF0 → #4E3BA5

Footer CTA Gradient:
Direction: 135° diagonal
Colors: #081F4D → #0B2C66
```

---

## TYPOGRAPHY HIERARCHY

### FONT FAMILIES

```
Primary Font: Poppins
- Used for: Headings, labels, buttons, calls-to-action
- Weights: 600, 700, 800

Secondary Font: Inter
- Used for: Body text, descriptions, captions
- Weights: 400, 500, 600
```

### TYPE STYLES

#### HERO HEADING (H1)

```
Font: Poppins
Size: 72px
Weight: 800
Line Height: 84px (1.17)
Letter Spacing: -2%
Text Transform: None
Color Mapping:
  - "Learn" = #0B2C66 (Navy)
  - "Connect" = #4E9F3D (Green)
  - "Lead" = #1E88E5 (Blue)
```

#### SECTION LABEL (Overline)

```
Font: Poppins
Size: 16px
Weight: 600
Line Height: 24px
Letter Spacing: 0.08em
Text Transform: UPPERCASE
Color: #4E9F3D (Primary Green)
Margin Bottom: 12px
```

#### SECTION HEADING (H2)

```
Font: Poppins
Size: 48px
Weight: 700
Line Height: 58px (1.21)
Color: #1C2B3A (Text Dark)
Margin Bottom: 24px
```

#### SUBHEADING (H3)

```
Font: Poppins
Size: 24px
Weight: 600
Line Height: 32px
Color: #1C2B3A (Text Dark)
```

#### BODY TEXT (Paragraph)

```
Font: Inter
Size: 18px
Weight: 400
Line Height: 30px (1.67)
Color: #5F6B7A (Text Medium)
```

#### CARD TITLE

```
Font: Poppins
Size: 22px
Weight: 700
Line Height: 32px
Color: #1C2B3A (Text Dark)
```

#### SMALL TEXT (Caption)

```
Font: Inter
Size: 14px
Weight: 500
Line Height: 20px
Color: #5F6B7A (Text Medium)
```

#### BUTTON TEXT

```
Font: Poppins
Size: 16px
Weight: 700
Line Height: 24px
Letter Spacing: 0.05em
Text Transform: UPPERCASE
```

---

## GRID & SPACING SYSTEM

### DESKTOP GRID (1440px)

```
Total Width: 1440px
Columns: 12
Column Width: 88px
Gutter: 24px
Left Margin: 60px
Right Margin: 60px
Container Width: 1320px

Calculation:
(1440 - 60 - 60) = 1320px available
(1320 - (11 × 24px gutters)) = 1320 - 264 = 1056px for columns
1056 / 12 = 88px per column
```

### SECTION VERTICAL SPACING

```
Between sections: 90px gap
Hero section height: 760px
Stats bar overlap: -45px (positioned -45px from section bottom)

Example sequence:
Hero: 0px - 760px (height)
Stats: 715px - 825px (starts at 760 - 45, overlaps last 45px)
Why Attend: 915px (825 + 90 spacing)
Conference Tracks: 1455px (915 + 520 + 20 buffer)
```

### CARD AND COMPONENT SPACING

```
Standard card gap: 24px
Standard element gap: 16px
Tight component gap: 8px
Large section gap: 32px
Button group gap: 16px
```

### PADDING STANDARDS

```
Large container padding: 60px (outer sections)
Card padding: 32px
Compact section padding: 24px
Button padding: 16px vertical, 32px horizontal (min)
```

---

## SECTION BREAKDOWN

### SECTION 1: HERO SECTION

**Height:** 760px
**Background:** White
**Overlay:** Curved gradient wave (green-blue)

#### LAYOUT STRUCTURE

```
Left Content Block (Columns 1-5):
├─ Badge (160×38px)
│  ├ Background: Navy #0B2C66
│  ├ Padding: 8px 16px
│  ├ Border Radius: 20px
│  └ Text: "IHWE CONFERENCE 2026" (Poppins 14px SemiBold)
│
├─ Heading (Width: 580px)
│  ├ Font: Poppins 72px Bold 800
│  ├ Line Height: 84px
│  ├ Letter Spacing: -2%
│  └ Text: "Learn. Connect. Lead." (Multi-color)
│
├─ Paragraph (Width: 500px)
│  ├ Font: Inter 18px Regular
│  ├ Line Height: 30px
│  ├ Color: Text Medium
│  └ Top margin: 24px
│
└─ Button Group (Gap: 16px)
   ├ Primary Button (220×58px)
   │  ├ Background: Green #4E9F3D
   │  ├ Text: White, Poppins 16px Bold
   │  ├ Border Radius: 50px
   │  └ Hover: Dark Green #2E7D32
   │
   └─ Secondary Button (200×58px)
      ├ Background: White
      ├ Border: 2px Gray #E6ECF3
      ├ Text: Navy #0B2C66, Poppins 16px Bold
      └ Hover: Background Light Gray

Right Image Block (Columns 6-12):
├─ Image Container (690×520px)
│  ├ Border Radius: 40px (organic blob shape)
│  ├ Box Shadow: 0px 20px 40px rgba(11,44,102,0.12)
│  └ Image: Conference hall / audience photo
│
└─ Gradient Overlay:
   ├ Type: Curved wave divider
   ├ Colors: Green → Blue
   └ Position: Center right overlay
```

#### HERO BACKGROUND ELEMENTS

```
1. Leaf/Healthcare texture in corners (opacity: 20%)
2. Curved green-blue wave crossing center
3. Soft gradient overlay (opacity: 15%)
```

---

### SECTION 2: STATS BAR

**Position:** Overlaps hero section bottom by -45px
**Height:** 110px
**Width:** 1320px
**Background:** Navy #0B2C66
**Border Radius:** 20px
**Box Shadow:** 0px 10px 30px rgba(11,44,102,0.08)

#### GRID LAYOUT

```
6 Equal Columns:
├─ Column Width: 220px
├─ Column Count: 6
└─ Gap: 0px (columns fill container)

Each Column:
├─ Icon: 34px (centered)
├─ Number: 36px Bold White (Poppins)
├─ Label: 14px Medium White (Poppins, uppercase)
├─ Layout: Vertical center
└─ Padding: 16px top/bottom
```

#### STAT DATA STRUCTURE

```
Stat 1: "50+" Expert Speakers
Stat 2: "18" Premium Sessions
Stat 3: "3" Major Conferences
Stat 4: "1000+" Delegates
Stat 5: "20+" Countries
Stat 6: "∞" Endless Opportunities
```

---

### SECTION 3: WHY ATTEND

**Height:** 520px
**Background:** Light Gray #F7F9FC
**Vertical Spacing:** 90px top, 90px bottom

#### GRID LAYOUT

```
Left Intro (Columns 1-4):
├─ Width: 540px
├─ Label: "WHY ATTEND CONFERENCE?" (Poppins 16px SemiBold Uppercase)
├─ Heading: "Where Ideas Meet Industry" (Poppins 48px Bold)
│  └─ Color Split: "Ideas" = Green, "Industry" = Blue
└─ Paragraph: Description (Inter 18px, Line Height 30px)

Right Benefits Grid (Columns 5-12):
├─ Layout: 3 Columns × 2 Rows
├─ Card Count: 6
├─ Card Width: 250px
├─ Card Height: 110px
├─ Card Gap: 24px
│
Each Benefit Card:
├─ Background: White
├─ Border: 1px Gray #E6ECF3
├─ Border Radius: 20px
├─ Padding: 24px
├─ Box Shadow: 0px 10px 30px rgba(11,44,102,0.08)
├─ Hover: Scale 1.02, Shadow elevated
│
├─ Icon (Left):
│  ├─ Size: 48px
│  ├─ Background: Color tinted (per benefit)
│  ├─ Border Radius: 12px
│  └─ Color: Respective color (Green/Blue/Purple/etc)
│
└─ Text (Right):
   ├─ Font: Inter 15px SemiBold
   ├─ Line Height: 1.6
   └─ Color: Text Dark
```

---

### SECTION 4: CONFERENCE TRACKS

**Height:** 340px
**Background:** White
**Vertical Spacing:** 90px top, 90px bottom

#### GRID LAYOUT

```
Header:
├─ Label: "EXPLORE CONFERENCE TRACKS" (Poppins 16px SemiBold Uppercase)
├─ Margin Bottom: 48px
└─ Decoration: Horizontal lines with text centered

Track Cards Grid:
├─ Layout: 8 Cards Horizontal Scroll
├─ Card Width: 150px
├─ Card Height: 140px
├─ Card Gap: 24px
├─ Border Radius: 18px
│
Each Track Card:
├─ Background: Light Gray #F7F9FC
├─ Border: 1px Gray #E6ECF3
├─ Padding: 20px
├─ Hover: Background Green, Border Green, Text White
│
├─ Icon (Top):
│  ├─ Size: 42px
│  ├─ Background: Circular white
│  ├─ Box Shadow: Subtle
│  └─ Color: Green #4E9F3D
│
└─ Label (Bottom):
   ├─ Font: Poppins 12px SemiBold
   ├─ Line Height: 1.4
   ├─ Color: Text Dark (gray on hover)
   └─ Text Align: Center
```

---

### SECTION 5: 3-DAY CONFERENCE

**Height:** 400px + spacing
**Background:** Light Gray #F7F9FC
**Vertical Spacing:** 90px top, 90px bottom

#### GRID LAYOUT

```
Header:
├─ Text: "3 DAYS. 3 POWERFUL CONFERENCES. 18 GAME-CHANGING SESSIONS."
├─ Font: Poppins 16px SemiBold Uppercase
├─ Color: Green #4E9F3D
├─ Margin Bottom: 60px
└─ Decoration: Underline bar (Green)

Card Grid:
├─ Layout: 3 Equal Cards
├─ Card Width: 416px
├─ Card Height: 340px
├─ Card Gap: 32px
├─ Border Radius: 20px
│
Each Day Card (Day 1, 2, 3):
├─ Background: White
├─ Border: 1px Gray #E6ECF3
├─ Box Shadow: 0px 20px 40px rgba(11,44,102,0.12)
├─ Padding: 32px
│
├─ Day Badge (Top Right):
│  ├─ Size: 120×40px
│  ├─ Background: Gradient (per day)
│  ├─ Text: "DAY 1", "DAY 2", "DAY 3" (Poppins 12px Bold White)
│  └─ Border Radius: 50px
│
├─ Icon Circle (Center):
│  ├─ Size: 74×74px
│  ├─ Background: Color tinted (per day)
│  ├─ Border Radius: 50%
│  ├─ Ring: 8px white
│  └─ Box Shadow: 0px 20px 40px rgba(color, 0.12)
│
├─ Heading:
│  ├─ Font: Poppins 22px Bold
│  ├─ Line Height: 32px
│  ├─ Color: Text Dark
│  └─ Margin Top: 24px
│
├─ Description:
│  ├─ Font: Inter 15px Regular
│  ├─ Line Height: 24px
│  ├─ Color: Text Medium
│  └─ Margin: 20px top/bottom
│
├─ Metrics Grid (3 equal columns):
│  ├─ Height: 80px
│  ├─ Border Top/Bottom: 1px Gray
│  ├─ Gap: 16px
│  │
│  └─ Each Metric:
│    ├─ Label: Poppins 10px Bold Uppercase (Gray)
│    ├─ Value: Poppins 12px Bold (Navy)
│    └─ Icon: 16px (Small)
│
└─ View Sessions Button:
   ├─ Size: 170×48px
   ├─ Background: Gradient (per day)
   ├─ Text: "VIEW SESSIONS" (Poppins 14px Bold White)
   ├─ Border Radius: 50px
   ├─ Hover: Scale 1.03, Shadow elevated
   └─ Margin Top: 24px
```

---

### SECTION 6: DISTINGUISHED SPEAKERS

**Height:** 500px
**Background:** White
**Vertical Spacing:** 90px top, 90px bottom

#### LAYOUT STRUCTURE

```
Header (Columns 1-12):
├─ Label: "MEET OUR DISTINGUISHED" (Poppins 14px SemiBold Uppercase)
├─ Heading: "Global Speakers" (Poppins 44px Bold)
│  └─ "Speakers" = Green #4E9F3D
├─ Navigation Arrows (Right):
│  ├─ Left Arrow: 56×56px, Border Gray, Gray text
│  └─ Right Arrow: 56×56px, Navy background, White text
└─ Margin Bottom: 48px

Speaker Cards (Horizontal Scroll):
├─ Layout: 5+ cards in carousel
├─ Visible Cards: 5 on desktop
├─ Card Width: 248px
├─ Card Height: 320px
├─ Card Gap: 32px
├─ Border Radius: 20px
│
Each Speaker Card:
├─ Background: Light tint #F8FCFF
├─ Border: 1px Gray #E6ECF3
├─ Padding: 24px
├─ Box Shadow: 0px 10px 30px rgba(11,44,102,0.08)
│
├─ Profile Image Section:
│  ├─ Circle Size: 90×90px
│  ├─ Border Radius: 50%
│  ├─ Box Shadow: 0px 15px 35px rgba(11,44,102,0.15)
│  ├─ Overflow: Hidden
│  │
│  ├─ Flag Badge (Top Right):
│  │  ├─ Size: 40×40px
│  │  ├─ Background: White
│  │  ├─ Border Radius: 16px
│  │  ├─ Text: Emoji/flag
│  │  └─ Box Shadow: 0px 10px 30px rgba(11,44,102,0.08)
│  │
│  └─ Microphone Badge (Bottom Right):
│     ├─ Size: 44×44px
│     ├─ Background: Green #4E9F3D
│     ├─ Border Radius: 12px
│     ├─ Icon: White microphone 20px
│     └─ Box Shadow: 0px 10px 30px rgba(11,44,102,0.12)
│
├─ Name:
│  ├─ Font: Poppins 18px Bold
│  ├─ Color: Text Dark
│  └─ Margin Top: 20px
│
├─ Role:
│  ├─ Font: Poppins 11px Bold Uppercase
│  ├─ Color: Green #4E9F3D
│  └─ Margin Top: 4px
│
├─ Organization:
│  ├─ Font: Inter 14px Medium Uppercase
│  ├─ Color: Text Medium
│  └─ Opacity: 70%
│
├─ Divider:
│  ├─ Type: 1px Gray #E6ECF3
│  ├─ Margin: 20px vertical
│  └─ Height: 60px section
│
└─ Topic:
   ├─ Label: "TOPIC SESSION:" (Poppins 10px Bold Uppercase Gray)
   ├─ Quote: Italic text (Inter 14px)
   ├─ Color: Text Dark
   └─ Padding: 0 16px
```

---

### SECTION 7: AGENDA

**Height:** 500px
**Background:** Light Gray #F7F9FC
**Vertical Spacing:** 90px top, 90px bottom

#### LAYOUT STRUCTURE

```
Left Image (Columns 1-4):
├─ Size: 420×420px
├─ Border Radius: 20px
├─ Image: Conference photo
├─ Box Shadow: 0px 20px 40px rgba(11,44,102,0.12)
└─ Overlay: Gradient tint (optional)

Right Agenda Section (Columns 5-12):
│
├─ Tabs (3 equal):
│  ├─ Tab 1: "DAY 1 | 20 AUG" (Healthcare Innovation)
│  ├─ Tab 2: "DAY 2 | 21 AUG" (Global Wellness)
│  ├─ Tab 3: "DAY 3 | 22 AUG" (Preventive Healthcare)
│  │
│  Each Tab:
│  ├─ Height: 60px
│  ├─ Border Radius: 20px
│  ├─ Border: 2px
│  ├─ Padding: 16px 20px
│  ├─ Font: Poppins 13px SemiBold
│  │
│  ├─ Inactive State:
│  │  ├─ Background: White
│  │  ├─ Border: Gray #E6ECF3
│  │  ├─ Text: Gray #5F6B7A
│  │  └─ Hover: Border Green
│  │
│  └─ Active State:
│     ├─ Background: Green #4E9F3D
│     ├─ Border: Green
│     ├─ Text: White
│     └─ Box Shadow: 0px 10px 30px rgba(78,159,61,0.2)
│
├─ Agenda Table (Below tabs):
│  ├─ Width: 100% (right section)
│  ├─ Border Radius: 20px
│  ├─ Background: White
│  ├─ Border: 1px Gray
│  ├─ Box Shadow: 0px 10px 30px rgba(11,44,102,0.08)
│  ├─ Overflow: Hidden
│  │
│  ├─ Table Header:
│  │  ├─ Background: Light Gray #F7F9FC
│  │  ├─ Height: 50px
│  │  ├─ Padding: 16px
│  │  │
│  │  └─ Columns:
│  │     ├─ Time: 140px
│  │     ├─ Session: Flex (remaining)
│  │     └─ Speakers: Auto
│  │
│  └─ Table Rows (Session Items):
│     ├─ Height: 52px
│     ├─ Padding: 16px
│     ├─ Border Bottom: 1px Gray #E6ECF3
│     │
│     └─ Row Structure:
│        ├─ Time:
│        │  ├─ Font: Poppins 12px Bold
│        │  ├─ Color: Green #4E9F3D
│        │  ├─ Icon: Clock 16px
│        │  └─ Badge: Gray background, "Keynote" label
│        │
│        ├─ Topic:
│        │  ├─ Font: Inter 15px SemiBold
│        │  ├─ Color: Text Dark
│        │  └─ Hover: Green
│        │
│        └─ Speakers:
│           ├─ Font: Inter 14px Regular
│           ├─ Color: Text Medium
│           ├─ Icon: User 16px
│           └─ Last column: Arrow button (Poppins)
│
└─ Agenda Note (Below table):
   ├─ Text: "* Agenda is subject to change"
   ├─ Font: Inter 12px Italic
   ├─ Color: Text Medium
   └─ Margin Top: 24px
```

---

### SECTION 8: SPONSOR THE FUTURE

**Height:** 280px
**Background:** Navy Gradient #081F4D → #0B2C66
**Vertical Spacing:** 90px top, 90px bottom

#### LAYOUT STRUCTURE

```
Left CTA Block (Columns 1-4):
├─ Label: "SPONSOR THE" (Poppins 14px SemiBold Uppercase Green)
├─ Heading: "FUTURE OF HEALTHCARE" (Poppins 48px Bold White)
│  └─ "FUTURE" = Green #4E9F3D
├─ Description:
│  ├─ Font: Inter 18px Regular
│  ├─ Line Height: 30px
│  ├─ Color: White opacity 70%
│  └─ Width: 480px
├─ Button:
│  ├─ Size: 260×56px
│  ├─ Background: Green #4E9F3D
│  ├─ Text: "BECOME A CONFERENCE SPONSOR" (Poppins 14px Bold White)
│  ├─ Border Radius: 50px
│  └─ Hover: White background, Navy text
└─ Margin Top: 32px

Right Benefits Grid (Columns 5-12):
├─ Layout: 2 Rows × 3 Columns
├─ Card Count: 6
├─ Card Width: 160px
├─ Card Height: 140px
├─ Card Gap: 20px
│
Each Benefit Card:
├─ Background: White opacity 5%
├─ Border: 1px White opacity 10%
├─ Padding: 20px
├─ Border Radius: 20px
├─ Hover: White opacity 10%, Text White
│
├─ Icon:
│  ├─ Size: 32×32px
│  ├─ Background: Green opacity 20%
│  ├─ Border Radius: 12px
│  ├─ Color: Green #4E9F3D
│  └─ Hover: Scale 1.1
│
└─ Label:
   ├─ Font: Poppins 12px Bold Uppercase
   ├─ Line Height: 1.4
   ├─ Color: White
   └─ Text Align: Center
```

---

### SECTION 9: INDUSTRY VOICES / TESTIMONIALS

**Height:** 340px
**Background:** Light Gray #F7F9FC
**Vertical Spacing:** 90px top, 90px bottom

#### LAYOUT STRUCTURE

```
Header:
├─ Label: "VOICES FROM" (Poppins 14px SemiBold Uppercase Green)
├─ Heading: "Industry Leaders" (Poppins 44px Bold Navy)
│  └─ "Leaders" = Green #4E9F3D
├─ Navigation (Right):
│  ├─ Left Arrow: 48×48px, Border Gray, Gray text
│  └─ Right Arrow: 48×48px, Green background, White text
└─ Margin Bottom: 48px

Testimonial Cards Grid:
├─ Layout: 3 Cards
├─ Card Width: 416px
├─ Card Height: 220px
├─ Card Gap: 32px
├─ Border Radius: 20px
│
Each Testimonial Card:
├─ Background: White
├─ Border: 1px Gray #E6ECF3
├─ Padding: 32px
├─ Box Shadow: 0px 10px 30px rgba(11,44,102,0.08)
├─ Hover: Translate Y -8px, Shadow elevated
│
├─ Quote Icon (Top Left):
│  ├─ Size: 48×48px
│  ├─ Color: Green #4E9F3D
│  ├─ Opacity: 100% (hover changes color)
│  └─ Fill: Solid
│
├─ Quote Text:
│  ├─ Font: Inter 15px Regular Italic
│  ├─ Line Height: 26px
│  ├─ Color: Text Medium
│  ├─ Padding: 24px top
│  └─ Margin Bottom: 24px
│
├─ Divider:
│  ├─ Type: 1px Gray #E6ECF3
│  └─ Margin: 24px bottom
│
├─ Author Name:
│  ├─ Font: Poppins 16px Bold
│  ├─ Color: Text Dark
│  └─ Margin Bottom: 4px
│
└─ Author Role:
   ├─ Font: Poppins 12px Bold Uppercase
   ├─ Color: Green #4E9F3D
   └─ Letter Spacing: 0.05em
```

---

### SECTION 10: FINAL CTA FOOTER

**Height:** 220px
**Background:** Navy Gradient #081F4D → #0B2C66
**Vertical Spacing:** 90px top (no bottom as footer)

#### LAYOUT STRUCTURE

```
Left Text Block (Columns 1-6):
├─ Heading:
│  ├─ Font: Poppins 48px Bold
│  ├─ Line Height: 58px
│  ├─ Color: White
│  │
│  └─ Text: "Be Part of the Conversation That Shapes Tomorrow"
│     └─ Color Accents:
│        ├─ "Conversation" = Green #4E9F3D
│        └─ "Tomorrow" = Light Green #A7D83B
│
└─ Description:
   ├─ Font: Inter 16px Regular
   ├─ Line Height: 26px
   ├─ Color: White opacity 60%
   └─ Margin Top: 16px

Right Button Block (Columns 7-12):
├─ Layout: Vertical stack (column)
├─ Gap: 16px
├─ Alignment: Right
│
├─ Primary Button:
│  ├─ Size: 240×56px
│  ├─ Background: Green #4E9F3D
│  ├─ Text: "BOOK YOUR DELEGATE PASS" (Poppins 14px Bold White)
│  ├─ Border Radius: 50px
│  ├─ Icon: Arrow right 18px
│  ├─ Box Shadow: 0px 20px 40px rgba(78,159,61,0.3)
│  └─ Hover: Scale 1.02, Brightness 110%
│
└─ Secondary Button:
   ├─ Size: 220×56px
   ├─ Background: Transparent
   ├─ Border: 2px Green opacity 30%
   ├─ Text: "PARTNER WITH US" (Poppins 14px Bold White)
   ├─ Border Radius: 50px
   ├─ Icon: Users 18px Green
   └─ Hover: Background Green opacity 10%
```

---

## COMPONENT LIBRARY

### BUTTONS (Figma Components with Variants)

#### Button - Primary

```
States:
├─ Default
├─ Hover
├─ Pressed
├─ Disabled

Specifications:
├─ Size Options:
│  ├─ Small: 160×40px
│  ├─ Medium: 200×48px
│  ├─ Large: 240×56px
│  └─ Extra Large: 280×64px
│
├─ Background: Green #4E9F3D
├─ Text: White, Poppins 14px-16px Bold Uppercase
├─ Border Radius: 50px
├─ Box Shadow: 0px 10px 30px rgba(78,159,61,0.2)
├─ Hover State:
│  ├─ Background: Dark Green #2E7D32
│  ├─ Transform: Scale 1.02
│  └─ Box Shadow: 0px 15px 40px rgba(78,159,61,0.3)
└─ Disabled State:
   ├─ Opacity: 50%
   └─ Cursor: Not-allowed
```

#### Button - Secondary

```
Specifications:
├─ Border: 2px Gray #E6ECF3
├─ Background: White
├─ Text: Navy #0B2C66, Poppins 14px-16px Bold Uppercase
├─ Border Radius: 50px
├─ Hover State:
│  ├─ Background: Light Gray #F7F9FC
│  ├─ Border: Green #4E9F3D
│  └─ Text: Green
└─ Disabled State:
   ├─ Opacity: 50%
   └─ Cursor: Not-allowed
```

#### Button - Outline (Dark)

```
Specifications:
├─ Border: 2px White opacity 30%
├─ Background: Transparent
├─ Text: White, Poppins 14px-16px Bold Uppercase
├─ Border Radius: 50px
├─ Hover State:
│  ├─ Background: White opacity 10%
│  └─ Border: White
└─ Icon: Optional right-side
```

### CARDS (Figma Components)

#### Benefit Card

```
├─ Size: 250×110px (variable)
├─ Background: White
├─ Border: 1px Gray #E6ECF3
├─ Border Radius: 20px
├─ Padding: 24px
├─ Box Shadow: 0px 10px 30px rgba(11,44,102,0.08)
│
├─ Layout: Flex row
│
├─ Icon (Left):
│  ├─ Size: 48×48px
│  ├─ Background: Color-coded
│  ├─ Border Radius: 12px
│  └─ Color: Respective color
│
├─ Content (Right):
│  ├─ Font: Inter 14px-15px SemiBold
│  ├─ Line Height: 1.6
│  └─ Color: Text Dark
│
└─ Hover:
   ├─ Transform: Scale 1.02, Translate Y -4px
   └─ Box Shadow: elevated
```

#### Speaker Card

```
├─ Size: 248×320px
├─ Background: Light tint #F8FCFF
├─ Border: 1px Gray #E6ECF3
├─ Border Radius: 20px
├─ Padding: 24px
├─ Box Shadow: 0px 10px 30px rgba(11,44,102,0.08)
│
├─ Profile Image:
│  ├─ Size: 90×90px
│  ├─ Border Radius: 50%
│  ├─ Box Shadow: 0px 15px 35px rgba(11,44,102,0.15)
│  └─ Hover: Scale 1.05
│
├─ Flag Badge:
│  ├─ Size: 40×40px
│  ├─ Position: Top right (absolute)
│  ├─ Background: White
│  ├─ Border Radius: 12px
│  └─ Box Shadow: 0px 10px 30px rgba(11,44,102,0.08)
│
├─ Microphone Badge:
│  ├─ Size: 44×44px
│  ├─ Position: Bottom right (absolute)
│  ├─ Background: Green #4E9F3D
│  ├─ Border Radius: 12px
│  ├─ Icon: White microphone
│  └─ Box Shadow: 0px 10px 30px rgba(11,44,102,0.12)
│
├─ Name:
│  ├─ Font: Poppins 18px Bold
│  ├─ Color: Text Dark
│  └─ Margin Top: 20px
│
├─ Role:
│  ├─ Font: Poppins 11px Bold Uppercase
│  ├─ Color: Green #4E9F3D
│  └─ Margin Top: 4px
│
├─ Organization:
│  ├─ Font: Inter 13px Medium Uppercase
│  ├─ Color: Text Medium
│  ├─ Opacity: 70%
│  └─ Margin Top: 2px
│
├─ Divider:
│  ├─ Type: 1px Gray #E6ECF3
│  ├─ Margin: 20px vertical
│  └─ Height: expand
│
└─ Topic Quote:
   ├─ Label: "TOPIC SESSION:" (Poppins 10px Bold Uppercase)
   ├─ Quote: Italic (Inter 13px)
   ├─ Color: Text Dark
   └─ Padding: 0 8px
```

#### Testimonial Card

```
├─ Size: 416×220px
├─ Background: White
├─ Border: 1px Gray #E6ECF3
├─ Border Radius: 20px
├─ Padding: 32px
├─ Box Shadow: 0px 10px 30px rgba(11,44,102,0.08)
│
├─ Quote Icon:
│  ├─ Size: 48×48px
│  ├─ Color: Green #4E9F3D
│  ├─ Position: Top left
│  └─ Hover: Opacity changes
│
├─ Quote Text:
│  ├─ Font: Inter 15px Regular Italic
│  ├─ Line Height: 26px
│  ├─ Color: Text Medium
│  ├─ Margin Top: 20px
│  └─ Margin Bottom: 24px
│
├─ Divider:
│  ├─ Type: 1px Gray #E6ECF3
│  └─ Margin: 24px bottom
│
├─ Author Name:
│  ├─ Font: Poppins 16px Bold
│  ├─ Color: Text Dark
│  └─ Margin Bottom: 4px
│
└─ Author Role:
   ├─ Font: Poppins 11px Bold Uppercase
   ├─ Color: Green #4E9F3D
   └─ Letter Spacing: 0.05em
```

#### Day Conference Card

```
├─ Size: 416×340px
├─ Background: White
├─ Border: 1px Gray #E6ECF3
├─ Border Radius: 20px
├─ Padding: 32px
├─ Box Shadow: 0px 20px 40px rgba(11,44,102,0.12)
│
├─ Day Badge:
│  ├─ Size: 120×40px
│  ├─ Position: Top right (absolute)
│  ├─ Background: Gradient (per day)
│  ├─ Text: Day label (Poppins 12px Bold White)
│  ├─ Border Radius: 50px
│  └─ Box Shadow: 0px 10px 30px rgba(color, 0.2)
│
├─ Icon Circle:
│  ├─ Size: 74×74px
│  ├─ Background: Color tinted (per day)
│  ├─ Border Radius: 50%
│  ├─ Ring: 8px white
│  ├─ Margin Top: 20px
│  └─ Box Shadow: 0px 20px 40px rgba(color, 0.12)
│
├─ Title:
│  ├─ Font: Poppins 22px Bold
│  ├─ Line Height: 32px
│  ├─ Color: Text Dark
│  └─ Margin Top: 24px
│
├─ Description:
│  ├─ Font: Inter 15px Regular
│  ├─ Line Height: 24px
│  ├─ Color: Text Medium
│  └─ Margin: 20px top/bottom
│
├─ Metrics Grid:
│  ├─ Layout: 3 equal columns
│  ├─ Border Top/Bottom: 1px Gray
│  ├─ Padding: 16px vertical
│  │
│  └─ Each Metric:
│     ├─ Label: Poppins 9px Bold Uppercase (Gray)
│     ├─ Value: Poppins 11px Bold (Navy)
│     └─ Icon: 16px
│
└─ Button:
   ├─ Text: "VIEW SESSIONS" (Poppins 13px Bold White)
   ├─ Size: 170×48px
   ├─ Background: Gradient (per day)
   ├─ Border Radius: 50px
   ├─ Margin Top: 24px
   └─ Hover: Scale 1.03
```

---

## RESPONSIVE SPECIFICATIONS

### TABLET (768px)

```
Grid Changes:
├─ Columns: 8
├─ Column Width: 70px
├─ Gutter: 16px
├─ Left/Right Margin: 34px
├─ Container Width: 700px

Typography Changes:
├─ Hero Heading: 56px → 52px
├─ Section Heading: 48px → 40px
├─ Subheading: 24px → 20px
├─ Body: 18px → 16px

Component Adjustments:
├─ Card Width: 75% of desktop
├─ Stats Bar: 2 rows × 3 columns
├─ Why Attend: Single column (stacked)
├─ Conference Tracks: 4 cards per row
├─ Day Cards: Single column (carousel)
├─ Speaker Cards: 3 visible (carousel)
├─ Button Sizes: Reduced by 10%
└─ Section Spacing: 70px (from 90px)
```

### MOBILE (390px)

```
Grid Changes:
├─ Columns: 4
├─ Column Width: 79px
├─ Gutter: 12px
├─ Left/Right Margin: 16px
├─ Container Width: 358px

Typography Changes:
├─ Hero Heading: 72px → 42px
├─ Section Heading: 48px → 32px
├─ Subheading: 24px → 18px
├─ Body: 18px → 14px
├─ Button Text: 16px → 13px

Component Adjustments:
├─ Card Width: Full width (100%)
├─ Stats Bar: Single column (carousel)
├─ Why Attend: Single column
├─ Conference Tracks: Single column (carousel)
├─ Day Cards: Single column (carousel)
├─ Speaker Cards: 1-2 visible (carousel)
├─ Agenda: Image above table
├─ Button Sizes: 100% width, reduced height
├─ All Paddings: Reduced by 30%
└─ Section Spacing: 48px (from 90px)
```

---

## FIGMA BUILD INSTRUCTIONS

### PROJECT SETUP

```
1. Create new Figma project: "IHWE Conference Design System"
2. Create pages:
   ├─ 📋 Cover (project info)
   ├─ 🎨 Design System (tokens, colors, typography)
   ├─ 📐 Components (all reusable components)
   ├─ 📱 Desktop (1440px master frame)
   ├─ 📱 Tablet (768px responsive)
   ├─ 📱 Mobile (390px responsive)
   └─ 🚀 Prototype (interactive flows)

3. Enable Figma Tokens plugin for:
   ├─ Color definitions
   ├─ Typography styles
   ├─ Spacing tokens
   └─ Component variants
```

### DESIGN SYSTEM PAGE

```
1. Create color library:
   ├─ Primary colors (Navy, Green, Blue, Purple)
   ├─ Background colors
   ├─ Text colors
   ├─ Semantic colors (success, warning, error)
   └─ Gradient definitions

2. Create typography styles:
   ├─ Hero Heading
   ├─ Section Heading
   ├─ Body
   ├─ Button
   ├─ Caption
   └─ All variants

3. Create spacing/sizing system:
   ├─ Padding scale (8px, 16px, 24px, 32px, 48px, 60px)
   ├─ Gap scale
   ├─ Border radius scale
   └─ Shadow definitions

4. Document in Figma:
   ├─ Color swatches with names
   ├─ Type samples with specs
   ├─ Spacing reference grid
   └─ Shadow/elevation legend
```

### COMPONENTS PAGE

```
1. Create button components:
   ├─ Button/Primary
   │  ├─ ✓ Size: Small, Medium, Large, XL
   │  ├─ ✓ State: Default, Hover, Pressed, Disabled
   │  ├─ ✓ Icon position: Left, Right, None
   │  └─ ✓ Text: Dynamic content
   │
   ├─ Button/Secondary
   │  └─ Same variants as primary
   │
   └─ Button/Outline
      └─ Same variants

2. Create card components:
   ├─ Card/Benefit
   │  ├─ ✓ Variants: 6 color options
   │  ├─ ✓ Icon (auto-colored)
   │  └─ ✓ Text content
   │
   ├─ Card/Speaker
   │  ├─ ✓ Profile image slot
   │  ├─ ✓ Flag emoji slot
   │  ├─ ✓ Text content (name, role, org, topic)
   │  └─ ✓ Microphone badge (auto-positioned)
   │
   ├─ Card/DayConference
   │  ├─ ✓ Variants: Day 1, 2, 3 (color-coded)
   │  ├─ ✓ Image slot
   │  ├─ ✓ Badge position (auto-styled)
   │  └─ ✓ Text content
   │
   └─ Card/Testimonial
      ├─ ✓ Quote icon
      ├─ ✓ Text content
      └─ ✓ Author info

3. Create section components:
   ├─ Section/Header
   │  ├─ ✓ Label slot
   │  ├─ ✓ Heading slot (with accent color option)
   │  └─ ✓ Description slot
   │
   ├─ Tab/Group
   │  ├─ ✓ Variants: 1-3 tabs
   │  ├─ ✓ State: Active, Inactive
   │  └─ ✓ Text content
   │
   ├─ Badge/Day
   │  ├─ ✓ Variants: Day 1, 2, 3
   │  └─ ✓ Text content
   │
   └─ Icon/Badge
      ├─ ✓ Size variants
      ├─ ✓ Color variants
      └─ ✓ Icon slot

4. Create navigation components:
   ├─ Button/Arrow
   │  ├─ ✓ Direction: Left, Right
   │  ├─ ✓ State: Active, Disabled
   │  └─ ✓ Style: Ghost, Solid
   │
   └─ Tab/Carousel
      ├─ ✓ Navigation buttons
      └─ ✓ Scroll indicator (dots)
```

### DESKTOP MASTER FRAME (1440px)

```
1. Create frame: 1440×4200px
2. Set up grid: 12 columns, 88px width, 24px gutter, 60px margins
3. Build sections in order:
   ├─ Hero (760px)
   ├─ Stats Bar (110px, -45px overlap)
   ├─ Why Attend (520px)
   ├─ Conference Tracks (340px)
   ├─ 3-Day Conference (400px)
   ├─ Speakers (500px)
   ├─ Agenda (500px)
   ├─ Sponsor (340px)
   ├─ Testimonials (340px)
   └─ Final CTA (220px)

4. For each section:
   ├─ Use components from Components page
   ├─ Override content (text, images)
   ├─ Apply proper spacing/alignment
   ├─ Add interactions for prototype
   └─ Document design notes

5. Final steps:
   ├─ Align all text to baseline grid
   ├─ Check color contrast ratios
   ├─ Verify hover/interaction states
   ├─ Add shadow definitions
   └─ Create high-res export variants
```

### TABLET & MOBILE FRAMES

```
1. Duplicate desktop frame
2. Rename to "Tablet - 768px" and "Mobile - 390px"
3. Adjust grid and container widths
4. Adapt section heights
5. Reorganize card layouts (columns → rows)
6. Reduce typography sizes
7. Adjust spacing/padding
8. Test readability and usability
9. Export responsive preview
```

### PROTOTYPE INTERACTIONS

```
1. Button Interactions:
   ├─ Hover: Slight scale + shadow change
   ├─ Click: Navigate to relevant pages
   └─ Disabled: Opacity change

2. Carousel Interactions:
   ├─ Left/Right arrows: Scroll to next/prev
   ├─ Auto-scroll: Optional timer
   └─ Dot indicators: Jump to specific card

3. Tab Interactions:
   ├─ Tab click: Animate content change
   ├─ Smooth transition: 300ms animation
   └─ Underline indicator: Animate to active tab

4. Scroll Behavior:
   ├─ Hero to Stats: Smooth transition
   ├─ Parallax layers: Optional on hero background
   └─ Section reveals: Fade-in animations

5. Responsiveness:
   ├─ Desktop → Tablet: Test responsive preview
   ├─ Tablet → Mobile: Test responsive preview
   └─ Test all interactions on each breakpoint
```

### EXPORT & HANDOFF

```
1. Export assets:
   ├─ PNG icons (2x, 3x resolution)
   ├─ Logo files (SVG, PNG)
   ├─ Photo assets (optimized for web)
   └─ Color palette (CSS variables, JSON)

2. Generate specs:
   ├─ For each component: Size, padding, spacing
   ├─ Typography details: Font, size, weight, line-height
   ├─ Color codes: Hex, RGB, CSS variables
   ├─ Shadow/border-radius: CSS values
   └─ Animation timings: Durations, easing

3. Create documentation:
   ├─ Component usage guide
   ├─ Content guidelines
   ├─ Responsive behavior
   ├─ Accessibility notes
   └─ Developer handoff guide

4. Share with team:
   ├─ Publish to Figma Team workspace
   ├─ Enable comments and inspection
   ├─ Generate sharing link
   └─ Create versioning system
```

---

## DESIGN CHECKLIST

- [ ] All colors match spec (#0B2C66, #4E9F3D, etc.)
- [ ] Typography hierarchy correct (72px hero, 48px sections, etc.)
- [ ] Spacing follows rhythm (90px section gaps, 24px card gaps)
- [ ] All cards use proper border radius (20px primary, 16px secondary)
- [ ] Buttons sized correctly (220×58px primary, etc.)
- [ ] Icons properly sized and colored
- [ ] Shadows match spec (0px 10px 30px rgba(11,44,102,0.08))
- [ ] Grid alignment perfect (12 columns, 1320px container)
- [ ] Stats bar overlaps hero by -45px
- [ ] Carousels have proper navigation (arrows, dots)
- [ ] Responsive breakpoints implemented (1440, 768, 390)
- [ ] All components exported as .figma components
- [ ] Interactions/prototype complete
- [ ] Design tokens defined
- [ ] Accessibility contrast ratios checked (WCAG AA)
- [ ] Documenation complete for developer handoff

---

## NOTES FOR DEVELOPERS

This design system is built for seamless handoff to development:

1. **Figma to Code**: All measurements are in pixels, easily convertible to Tailwind/CSS
2. **Component Library**: React components can mirror Figma components 1:1
3. **Responsive Design**: Breakpoints defined (1440/768/390) → Tailwind breakpoints
4. **Color System**: All colors named → CSS custom properties (variables)
5. **Typography**: All styles defined → Tailwind text classes
6. **Spacing**: All gaps defined → Tailwind spacing scale
7. **Tokens**: Can be exported as JSON and integrated into codebase
8. **Variants**: Component variants → React props (size, color, state, etc.)

**Dev Integration Path**:

```
Figma Design System
       ↓
Figma Tokens Plugin (export JSON)
       ↓
Tailwind Config (colors, spacing, typography)
       ↓
React Components (match Figma structure)
       ↓
Fully responsive website
```

---

## VERSION HISTORY

| Version | Date       | Changes                             |
| ------- | ---------- | ----------------------------------- |
| 1.0     | 2026-04-30 | Initial comprehensive design system |

---

**Design System Created**: April 30, 2026
**Last Updated**: April 30, 2026
**Status**: Production Ready ✅
