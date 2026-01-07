/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Editorial Minimalism - warm, sophisticated palette
        cream: {
          50: '#FDFCFA',
          100: '#FAF8F5',
          200: '#F5F1EB',
          300: '#EBE6DC',
          400: '#DDD5C8',
        },
        ink: {
          50: '#F7F7F7',
          100: '#E3E3E3',
          200: '#C8C8C8',
          300: '#A4A4A4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#1A1A1A',
        },
        // Elegant gold accent - warm, sophisticated, distinctive
        accent: {
          DEFAULT: '#CA8A04',
          hover: '#A16207',
          light: '#FEF9C3',
          muted: '#EAB308',
        },
        // Teal for links - complementary to amber
        link: {
          DEFAULT: '#0D9488',
          hover: '#0F766E',
        },
      },
      fontFamily: {
        // Editorial serif for headings - distinctive character
        serif: [
          'Newsreader',
          'Noto Serif TC',
          'Georgia',
          'serif',
        ],
        // Clean sans for body - warmer, approachable
        sans: [
          'Satoshi',
          'Noto Sans TC',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        // Mono for code
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Consolas',
          'monospace',
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '70ch',
            color: '#1A1A1A',
            a: {
              color: '#0D9488',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: '#0F766E',
                textDecoration: 'underline',
              },
            },
            'h1, h2, h3, h4': {
              color: '#1A1A1A',
              fontFamily: 'Newsreader, Noto Serif TC, Georgia, serif',
              fontWeight: '600',
              letterSpacing: '-0.02em',
            },
            strong: {
              color: '#383838',
              fontWeight: '600',
            },
            code: {
              backgroundColor: '#F5F1EB',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.375rem',
              fontWeight: '400',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              borderLeftColor: '#CA8A04',
              borderLeftWidth: '3px',
              fontStyle: 'normal',
              color: '#434343',
              backgroundColor: '#FDFCFA',
              paddingLeft: '1.5rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
            },
            hr: {
              borderColor: '#EBE6DC',
            },
          },
        },
      },
      // Subtle animations for editorial feel
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
