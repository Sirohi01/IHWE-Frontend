import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        poppins: ["Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Inter", "sans-serif"],
        playfair: ["Inter", "sans-serif"],
        serif: ["Inter", "sans-serif"],
      },
      colors: {
        // IHWE Conference Design System Colors
        // Primary Colors
        navy: {
          DEFAULT: "#0B2C66",
          dark: "#081F4D",
          light: "#1E4B8A",
        },
        green: {
          DEFAULT: "#4E9F3D",
          dark: "#2E7D32",
          light: "#6BBD51",
          800: "#166534",
          900: "#14532d",
          tint: "#F1F8EE",
        },
        // Accent Colors
        blue: {
          DEFAULT: "#1E88E5",
          dark: "#0B2C66",
          light: "#42A5F5",
          tint: "#EEF4FF",
        },
        purple: {
          DEFAULT: "#6A3DF0",
          dark: "#4E3BA5",
          light: "#8B5CF6",
        },
        // Background & Text
        bg: {
          gray: "#F7F9FC",
          dark: "#1C2B3A",
          medium: "#5F6B7A",
        },
        border: {
          DEFAULT: "#E6ECF3",
          dark: "#D0D8E0",
          light: "#F0F3F7",
        },
        text: {
          dark: "#1C2B3A",
          medium: "#5F6B7A",
          light: "#8A95A5",
        },
        white: "#FFFFFF",
        // Legacy support
        "border-legacy": "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "primary-green": {
          DEFAULT: "#23471d",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        expo: {
          dark: "hsl(var(--expo-dark))",
          gray: "hsl(var(--expo-gray))",
          "light-blue": "hsl(var(--expo-light-blue))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        // IHWE Conference Design System Border Radius
        "20": "20px",
        "16": "16px",
        "50": "50px",
        "18": "18px",
        "12": "12px",
        "40": "40px",
        "24": "24px",
        "32": "32px",
        "48": "48px",
        "60": "60px",
        // Legacy support
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        // IHWE Conference Gradients
        "gradient-hero": "linear-gradient(135deg, #4E9F3D 0%, #0B2C66 100%)",
        "gradient-footer": "linear-gradient(135deg, #081F4D 0%, #0B2C66 100%)",
        "gradient-day1": "linear-gradient(135deg, #4E9F3D 0%, #2E7D32 100%)",
        "gradient-day2": "linear-gradient(135deg, #1E88E5 0%, #0B2C66 100%)",
        "gradient-day3": "linear-gradient(135deg, #6A3DF0 0%, #4E3BA5 100%)",
      },
      boxShadow: {
        // IHWE Conference Shadows
        standard: "0px 10px 30px rgba(11, 44, 102, 0.08)",
        elevated: "0px 20px 40px rgba(11, 44, 102, 0.12)",
        hover: "0px 15px 35px rgba(11, 44, 102, 0.15)",
        "green-sm": "0px 10px 30px rgba(78, 159, 61, 0.2)",
        "green-md": "0px 15px 40px rgba(78, 159, 61, 0.3)",
      },
      spacing: {
        // IHWE Conference Design System Spacing
        "60": "60px",
        "90": "90px",
        "74": "18.5rem",
        "88": "88px",
        "110": "110px",
        "140": "140px",
        "160": "160px",
        "220": "220px",
        "240": "240px",
        "248": "248px",
        "250": "250px",
        "280": "280px",
        "320": "320px",
        "340": "340px",
        "380": "380px",
        "416": "416px",
        "420": "420px",
        "500": "500px",
        "520": "520px",
        "540": "540px",
        "580": "580px",
        "690": "690px",
        "760": "760px",
        "860": "860px",
        "1320": "1320px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
