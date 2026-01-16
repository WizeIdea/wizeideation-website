import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ---------- Brand colours ----------
      colors: {
        // Primary background
        'salt-white': '#F8F9FA',
        saltWhite: '#F8F9FA',
        // Light grey for header/footer
        'light-smoke': '#F5F5F5',
        lightSmoke: '#F5F5F5',
        // Primary accent
        'burnt-ochre': '#B7410E',
        burntOchre: '#B7410E',
        // Secondary accent
        'dpm-olive': '#4B5320',
        dpmOlive: '#4B5320',
        // Dark neutral for text / contrast (updated to #212529 for AAA compliance)
        'striation-charcoal': '#212529',
        striationCharcoal: '#212529',
        // Light olive for backgrounds
        olive50: '#F2F5EA',
      },

      // ---------- Thin divider ----------
      borderWidth: {
        // Allows `border-dpm-olive` → 1px solid DPM Olive
        'dpm-olive': '1px',
      },
      borderColor: {
        // Enables `border-dpm-olive` utility
        'dpm-olive': '#4B5320',
      },

      // ---------- Input radius (0‑2 px) ----------
      borderRadius: {
        // Tailwind already has `rounded-sm` (0.125rem ≈ 2 px). We expose a named utility.
        'olive-sm': '2px',
        'olive-none': '0px',
      },

      // ---------- Placeholder & focus ring ----------
      placeholderColor: {
        'olive-muted': '#4B5320',
      },
      ringColor: {
        'olive-focus': '#4B5320',
      },

      // ---------- Font ----------
      fontFamily: {
        // Primary serif for headings and section titles
        'serif-primary': ['var(--font-serif-primary)', ...defaultTheme.fontFamily.serif],
        // Secondary serif for long-form body copy
        'serif-body': ['var(--font-serif-body)', ...defaultTheme.fontFamily.serif],
        // Monospace for code, data tables, stylometric metadata
        mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
        // Utility sans-serif for buttons and UI elements
        'sans-ui': ['var(--font-sans-ui)', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  // ---------- Custom plugin for call‑out box ----------
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addComponents, theme }: any) {
      const callout = {
        '.callout': {
          backgroundColor: theme('colors.salt-white'),
          borderWidth: '2px',
          borderColor: theme('colors.burnt-ochre'),
          borderRadius: theme('borderRadius.olive-sm'),
          padding: theme('spacing.4'),
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          fontFamily: 'var(--font-serif-body)',
          color: theme('colors.striation-charcoal'),
        },
      };
      addComponents(callout);
    },
  ],
};

export default config;
