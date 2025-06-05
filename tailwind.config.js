/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '10': '2.5rem',
        '6': '1.5rem',
        '8': '2rem',
      },
    },
  },
  plugins: [],
  important: true, // This makes all Tailwind classes important by default
} 