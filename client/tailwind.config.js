/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Every colour resolves through a CSS variable defined in
      // src/styles/theme.css. The literal fallback inside each var() is the
      // default palette, so the app still renders correctly if theme.css is
      // ever emptied or deleted. The channel-triplet form is what enables
      // opacity modifiers (bg-primary/10, text-muted-foreground/70).
      colors: {
        background: 'rgb(var(--background, 249 250 251) / <alpha-value>)',
        foreground: 'rgb(var(--foreground, 17 24 39) / <alpha-value>)',
        card: {
          DEFAULT: 'rgb(var(--card, 255 255 255) / <alpha-value>)',
          foreground: 'rgb(var(--card-foreground, 17 24 39) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--muted, 243 244 246) / <alpha-value>)',
          foreground: 'rgb(var(--muted-foreground, 107 114 128) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--primary, 99 102 241) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground, 255 255 255) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary, 243 244 246) / <alpha-value>)',
          foreground: 'rgb(var(--secondary-foreground, 31 41 55) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent, 238 242 255) / <alpha-value>)',
          foreground: 'rgb(var(--accent-foreground, 67 56 202) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--destructive, 239 68 68) / <alpha-value>)',
          foreground: 'rgb(var(--destructive-foreground, 255 255 255) / <alpha-value>)',
        },
        success: 'rgb(var(--success, 16 185 129) / <alpha-value>)',
        warning: 'rgb(var(--warning, 245 158 11) / <alpha-value>)',
        border: 'rgb(var(--border, 229 231 235) / <alpha-value>)',
        input: 'rgb(var(--input, 209 213 219) / <alpha-value>)',
        ring: 'rgb(var(--ring, 99 102 241) / <alpha-value>)',
      },
      // Radius derives from one --radius token so rounded-md/lg/xl stay in
      // proportion instead of drifting per component.
      borderRadius: {
        md: 'calc(var(--radius, 0.875rem) - 4px)',
        lg: 'calc(var(--radius, 0.875rem) - 2px)',
        xl: 'var(--radius, 0.875rem)',
        '2xl': 'calc(var(--radius, 0.875rem) + 4px)',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, rgb(var(--primary)), rgb(139 92 246))',
        'gradient-hero': 'linear-gradient(135deg, rgb(var(--accent)), rgb(var(--background)), rgb(237 233 254))',
        'gradient-card-hover': 'linear-gradient(135deg, rgb(var(--primary) / 0.05), rgb(139 92 246 / 0.05))',
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'elevated': '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'floating': '0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.04)',
        'glow': '0 0 20px -4px rgb(var(--primary) / 0.3)',
        'glow-lg': '0 0 30px -4px rgb(var(--primary) / 0.25)',
        'inner-light': 'inset 0 1px 0 0 rgb(255 255 255 / 0.05)',
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgb(var(--primary) / 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgb(var(--primary) / 0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'scale-in': 'scale-in 0.3s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
