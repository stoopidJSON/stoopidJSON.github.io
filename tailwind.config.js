import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        // Body copy
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
        // Wordmark and headlines — the "this is an institution" voice
        display: ['Libre Baskerville', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        // Stamps, datelines, docket numbers. Deliberately system-only (no extra font load).
        stamp: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace']
      },
      colors: {
        // Campaign navy
        primary: {
          50: '#f0f4fa',
          100: '#dbe4f3',
          200: '#b8c9e5',
          300: '#8ba6d2',
          400: '#5b7cb8',
          500: '#3a5a96',
          600: '#294478',
          700: '#1d3261',
          800: '#14234a',
          900: '#0b1733',
          950: '#060e21'
        },
        // Oxidized campaign red, for CTAs, rules and the resignation motif
        accent: {
          50: '#fdf3f3',
          100: '#fbe3e2',
          200: '#f6cac8',
          300: '#eda5a2',
          400: '#e07370',
          500: '#cf4a46',
          600: '#b5332f',
          700: '#962724',
          800: '#7c2422',
          900: '#682322'
        },
        // Parchment, for section backgrounds that shouldn't be stark white
        cream: {
          50: '#fdfcf8',
          100: '#faf7ef',
          200: '#f3eddd',
          300: '#e9dfc6',
          400: '#dccba3',
          500: '#cbb37e'
        },
        // Warm ink grays, to sit with the cream rather than fight it
        neutral: {
          50: '#f8f7f5',
          100: '#efedea',
          200: '#ddd9d3',
          300: '#c3bdb3',
          400: '#9c9488',
          500: '#7a7266',
          600: '#5f5950',
          700: '#4a453e',
          800: '#312e29',
          900: '#1d1b18'
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#4a453e',
            lineHeight: '1.75',
            h1: { color: '#0b1733', fontWeight: '700' },
            h2: { color: '#14234a', fontWeight: '700' },
            h3: { color: '#1d3261', fontWeight: '600' },
            strong: { color: '#14234a', fontWeight: '600' },
            a: {
              color: '#294478',
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
              '&:hover': { color: '#b5332f' }
            }
          }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        // The wheel
        'spin-slow': 'spin 6s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: [typography]
};
