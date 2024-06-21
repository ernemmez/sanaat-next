/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sanaat-red": "#DC3939",
        "sanaat-text": "#fff",
        "sanaat-text-gray": "#2A2A2D",
        "sanaat-black": "#080808"
      },
      boxShadow: {
        'custom': '0 4px 20px rgba(0, 0, 0, 0.1)',
      },
      textShadow: {
        sm: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        md: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        lg: '3px 3px 6px rgba(0, 0, 0, 0.5)',
        xl: '4px 4px 8px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-md': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-xl': {
          textShadow: '4px 4px 8px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-2xl': {
          textShadow: '6px 6px 12px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-3xl': {
          textShadow: '8px 8px 16px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-4xl': {
          textShadow: '10px 10px 20px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-5xl': {
          textShadow: '12px 12px 24px rgba(0, 0, 0, 0.5)',
        },
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    },
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* For Firefox */
          'scrollbar-width': 'none',
          /* For Chrome, Safari, and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
  important: true,
};