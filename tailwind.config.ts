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
        // Primary accent
        'burnt-ochre': '#B7410E',
        // Secondary accent
        'dpm-olive': '#4B5320',
        // Dark neutral for text / contrast
        'striation-charcoal': '#2E2E2E',
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
        // Monospace for forensic data read‑outs
        mono: ['"IBM Plex Mono"', ...defaultTheme.fontFamily.mono],
      },
    },
  },

  // ---------- Custom plugin for call‑out box ----------
  plugins: [
    function ({ addComponents, theme }: any) {
      const callout = {
        '.callout': {
          backgroundColor: theme('colors.salt-white'),
          borderWidth: '2px',
          borderColor: theme('colors.burnt-ochre'),
          borderRadius: theme('borderRadius.olive-sm'),
          padding: theme('spacing.4'),
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          fontFamily: '"IBM Plex Mono", monospace',
          color: theme('colors.striation-charcoal'),
        },
      };
      addComponents(callout);
    },
  ],
};

export default config;
