import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        // Two families only.
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Anton', 'Impact', 'Haettenschweiler', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        // Editorial dark system
        ink: {
          DEFAULT: '#080b09',
          raised:  '#0e1411',
          deep:    '#050806',
        },
        bone: {
          DEFAULT: '#f2f4f1',
          dim:     'rgba(242,244,241,0.55)',
          faint:   'rgba(242,244,241,0.32)',
        },
        brand: {
          DEFAULT: '#1e8a3c',
          bright:  '#2db355',
          deep:    '#145c28',
        },
        g: {
          green:       '#1e8a3c',
          glow:        '#2db355',
          dark:        '#145c28',
          deep:        '#0a1a0f',
          card:        '#12261e',
          surf:        '#1c3426',
          yellow:      '#f5a623',
          'yellow-dk': '#d4880a',
          off:         '#f0f2f0',
          border:      '#dde8dd',
          muted:       '#6b7b6b',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
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
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        phoneFloat: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        floatCard1: {
          "0%, 100%": { transform: "translateY(0px) rotate(-2deg)" },
          "50%": { transform: "translateY(-8px) rotate(-2deg)" },
        },
        floatCard2: {
          "0%, 100%": { transform: "translateY(0px) rotate(1.5deg)" },
          "50%": { transform: "translateY(-10px) rotate(1.5deg)" },
        },
        floatCard3: {
          "0%, 100%": { transform: "translateY(0px) rotate(-1deg)" },
          "50%": { transform: "translateY(-7px) rotate(-1deg)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
        liveBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        cursorBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scrollHint: {
          "0%":        { transform: "translateY(0)",    opacity: "0" },
          "35%":       { opacity: "1" },
          "100%":      { transform: "translateY(14px)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "phone-float": "phoneFloat 4s ease-in-out infinite",
        "float-card-1": "floatCard1 3s ease-in-out infinite",
        "float-card-2": "floatCard2 3.5s ease-in-out infinite",
        "float-card-3": "floatCard3 4s ease-in-out infinite",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "live-blink": "liveBlink 1s ease-in-out infinite",
        "cursor-blink": "cursorBlink 1s step-end infinite",
        "scroll-hint": "scrollHint 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
