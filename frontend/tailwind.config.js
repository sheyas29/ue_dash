/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{html,js,jsx}', // Include all files in src/pages
    './src/components/**/*.{html,js,jsx}', // Include all files in src/components
    './src/apis/**/*.{html,js,jsx}', // Include all files in src/apis
    './src/lib/**/*.{html,js,jsx}', // Include all files in src/lib
    './src/**/*.{html,js,jsx}', // Include all files in src
    './public/index.html', // Include the main HTML file
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        galgo: ['Galgo Condensed', 'sans-serif'],
        hind: ['Hind Siliguri', 'sans-serif'],
      },
      colors: {
        cream: '#E6DCD6',
        'alice-blue': '#E8EFF4',
        'jet':'#3F3D45',
        'indian-red': '#E8505E',
        custom: {
          DEFAULT: '#3F3D45',
          foreground: '#FFFFFF',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
