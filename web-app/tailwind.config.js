/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00C48C',
          50: '#E6FFF7',
          100: '#CCFFEF',
          200: '#99FFE0',
          300: '#66FFD0',
          400: '#33FFC0',
          500: '#00C48C',
          600: '#00A076',
          700: '#007C5F',
          800: '#005847',
          900: '#003430',
        },
        secondary: {
          DEFAULT: '#00C990',
        },
        background: {
          DEFAULT: '#EEECE2',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

