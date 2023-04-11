/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Poppins',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
      },
    },
    screens: {
      'sm': {'min': '10px', 'max': '768px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '768px', 'max': '768px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '768px', 'max': '1024px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1024px', 'max': '1234px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      sm: '200px',
      md: '768px',
      lg: '1024px',
      xl: '1234px',
    },
    extend: {
      colors: {
        primary: '#101828',
        secondary: '#7F56D9',
        backgroundColorPrimary: '#101624',
        backgroundColorSecondary: '#1d2939',
        backgroundColorLogin: '#040a25',

      },
      boxShadow: {
        1: '0px 4px 30px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
