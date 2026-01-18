import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f0f4f8',
        foreground: '#1e293b',
        card: '#ffffff',
        'card-foreground': '#1e293b',
        primary: {
          DEFAULT: '#8b5cf6',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f1f5f9',
          foreground: '#475569',
        },
        muted: {
          DEFAULT: '#f1f5f9',
          foreground: '#64748b',
        },
        accent: {
          coral: '#f87171',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          teal: '#14b8a6',
        },
        destructive: {
          DEFAULT: '#f87171',
          foreground: '#ffffff',
        },
        border: '#e2e8f0',
        input: '#e2e8f0',
        ring: '#8b5cf6',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
