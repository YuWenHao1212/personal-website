/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // James Clear inspired - warm, minimal palette
        cream: {
          50: '#FDFCFA',
          100: '#FAF8F5',
          200: '#F5F1EB',
          300: '#EBE6DC',
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
        accent: {
          DEFAULT: '#2563EB', // Primary blue
          hover: '#1D4ED8',
          light: '#DBEAFE',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'Noto Sans TC',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        serif: [
          'Georgia',
          'Noto Serif TC',
          'Times New Roman',
          'serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Consolas',
          'Monaco',
          'monospace',
        ],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '70ch',
            color: '#1A1A1A',
            a: {
              color: '#2563EB',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            'h1, h2, h3, h4': {
              color: '#1A1A1A',
              fontWeight: '600',
            },
            code: {
              backgroundColor: '#F5F1EB',
              borderRadius: '0.25rem',
              padding: '0.125rem 0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              borderLeftColor: '#2563EB',
              fontStyle: 'normal',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
