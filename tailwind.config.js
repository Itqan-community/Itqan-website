/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'system': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'fustat': ['Fustat', 'serif'],
      },
      colors: {
        primary: {
          50: '#F0F5F2',
          100: '#E0EBE6',
          200: '#D1E1D9',
          300: '#C2D7CC',
          400: '#A3C3B3',
          500: '#85A999',
          600: '#669B80',
          700: '#527C66',
          800: '#3D5D4D',
          900: '#293E33',
          950: '#141F1A',
        },
        secondary: {
          50: '#E9ECEC',
          100: '#D3D9D8',
          200: '#BDC7C5',
          300: '#A7B4B1',
          400: '#7A8E8B',
          500: '#4E6964',
          600: '#22433D',
          700: '#1B3631',
          800: '#142825',
          900: '#0E1B18',
          950: '#070D0C',
        },
      },
    },
  },
  plugins: [],
} 