export const colors = {
  // Primary Colors
  primaryNavy: "#0B2C66",
  deepNavy: "#081F4D",
  primaryGreen: "#4E9F3D",
  darkGreen: "#2E7D32",

  // Accent Colors
  accentBlue: "#1E88E5",
  purpleAccent: "#6A3DF0",

  // Backgrounds
  backgroundGray: "#F7F9FC",
  borderGray: "#E6ECF3",

  // Text Colors
  textDark: "#1C2B3A",
  textMedium: "#5F6B7A",
  white: "#FFFFFF",

  // Light Tints
  lightGreenTint: "#F1F8EE",
  lightBlueTint: "#EEF4FF",
};

// ==================== GRADIENTS ====================
export const gradients = {
  heroCurve: "linear-gradient(135deg, #4E9F3D 0%, #0B2C66 100%)",
  footerCta: "linear-gradient(135deg, #081F4D 0%, #0B2C66 100%)",
  dayConference1: "linear-gradient(135deg, #4E9F3D 0%, #2E7D32 100%)",
  dayConference2: "linear-gradient(135deg, #1E88E5 0%, #0B2C66 100%)",
  dayConference3: "linear-gradient(135deg, #6A3DF0 0%, #4E3BA5 100%)",
};

// ==================== TYPOGRAPHY ====================
export const typography = {
  // Hero Heading
  heroHeading: {
    fontSize: 72,
    fontWeight: 800,
    lineHeight: 84,
    letterSpacing: "-2%",
    fontFamily: "Poppins",
  },

  // Section Label
  sectionLabel: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 24,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontFamily: "Poppins",
  },

  // Section Heading
  sectionHeading: {
    fontSize: 48,
    fontWeight: 700,
    lineHeight: 58,
    fontFamily: "Poppins",
  },

  // Subheading
  subheading: {
    fontSize: 24,
    fontWeight: 600,
    lineHeight: 32,
    fontFamily: "Poppins",
  },

  // Body
  body: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 30,
    fontFamily: "Inter",
  },

  // Card Title
  cardTitle: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 32,
    fontFamily: "Poppins",
  },

  // Small Text
  smallText: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 20,
    fontFamily: "Inter",
  },

  // Button Text
  button: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 24,
    fontFamily: "Poppins",
  },
};

// ==================== SPACING ====================
export const spacing = {
  // Global margins
  outerMargin: 60,

  // Section vertical spacing
  sectionSpacing: 90,

  // Cards and components
  cardGap: 24,
  standardGap: 16,
  largeGap: 32,

  // Padding standards
  cardPadding: 32,
  sectionPadding: 60,
};

// ==================== BORDER RADIUS ====================
export const borderRadius = {
  primary: 20,
  secondary: 16,
  button: 50,
  card: 20,
  icon: 12,
};

// ==================== SHADOWS ====================
export const shadows = {
  standard: "0px 10px 30px rgba(11,44,102,0.08)",
  elevated: "0px 20px 40px rgba(11,44,102,0.12)",
  hover: "0px 15px 35px rgba(11,44,102,0.15)",
};

// ==================== LAYOUT GRID ====================
export const grid = {
  // Desktop
  desktop: {
    width: 1440,
    containerWidth: 1320,
    columns: 12,
    columnWidth: 88,
    gutter: 24,
    outerMargin: 60,
  },

  // Tablet
  tablet: {
    width: 768,
    containerWidth: 700,
    columns: 8,
    columnWidth: 70,
    gutter: 16,
    outerMargin: 34,
  },

  // Mobile
  mobile: {
    width: 390,
    containerWidth: 358,
    columns: 4,
    columnWidth: 79,
    gutter: 12,
    outerMargin: 16,
  },
};

// ==================== COMPONENT SIZES ====================
export const componentSizes = {
  // HERO SECTION
  heroSection: {
    height: 760,
    leftBlockWidth: 540,
    rightImageWidth: 690,
    rightImageHeight: 520,
    badgeSize: { width: 160, height: 38 },
    headingWidth: 580,
    paragraphWidth: 500,
    buttonGap: 16,
    primaryButtonSize: { width: 220, height: 58 },
    secondaryButtonSize: { width: 200, height: 58 },
  },

  // STATS BAR
  statsBar: {
    height: 110,
    width: 1320,
    columnWidth: 220,
    iconSize: 34,
    numberFontSize: 36,
    labelFontSize: 14,
    overlap: -45,
  },

  // WHY ATTEND
  whyAttend: {
    height: 520,
    leftIntroWidth: 540,
    rightGridCols: 3,
    rightGridRows: 2,
    cardWidth: 250,
    cardHeight: 110,
    cardGap: 24,
  },

  // CONFERENCE TRACKS
  conferenceTracks: {
    height: 340,
    cardCount: 8,
    cardWidth: 150,
    cardHeight: 140,
    cardRadius: 18,
    iconSize: 42,
  },

  // 3 DAY CONFERENCE
  threeDayConference: {
    cardWidth: 416,
    cardHeight: 340,
    circularBadgeSize: 74,
    buttonSize: { width: 170, height: 48 },
  },

  // SPEAKERS
  speakers: {
    height: 500,
    cardWidth: 248,
    cardHeight: 320,
    profileCircleSize: 90,
    flagBadgeSize: 40,
    microphoneIconSize: 28,
  },

  // AGENDA
  agenda: {
    leftImageSize: 420,
    rightTableWidth: 860,
    tabHeight: 60,
    rowHeight: 52,
    timeColumnWidth: 140,
  },

  // SPONSOR
  sponsor: {
    leftCardHeight: 280,
    benefitIconSize: 32,
    benefitGridCols: 6,
  },

  // TESTIMONIALS
  testimonials: {
    cardWidth: 416,
    cardHeight: 220,
    quoteIconSize: 48,
  },

  // FINAL CTA
  finalCta: {
    height: 220,
    spacing: 60,
  },
};

// ==================== RESPONSIVE BREAKPOINTS ====================
export const breakpoints = {
  mobile: 390,
  tablet: 768,
  desktop: 1440,
  ultrawide: 1920,
};

// ==================== Z-INDEX SYSTEM ====================
export const zIndex = {
  background: 0,
  base: 10,
  dropdown: 100,
  sticky: 1000,
  modal: 1050,
  tooltip: 1100,
  notification: 1200,
};

// ==================== ANIMATION TIMINGS ====================
export const animation = {
  fast: 200,
  normal: 300,
  slow: 500,
  slowest: 800,
};

// ==================== EXPORT ALL ====================
export const designSystem = {
  colors,
  gradients,
  typography,
  spacing,
  borderRadius,
  shadows,
  grid,
  componentSizes,
  breakpoints,
  zIndex,
  animation,
};

export default designSystem;
