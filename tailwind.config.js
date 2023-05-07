/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    minHeight: {
      '90': '90%'
    },
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
        //'#044cf4'
        // Theme
        backgroundColorPrimary: '#f4f4f5',
        backgroundColorSecondary: '#FFFFFF',
        backgroundColorThird: '#040a25',
        backgroundColorInput: '#f4f4f5', //
        bgContainerTable:"#d1faf1",
        bgTableHeaderColor: "#b7e7fb",

        // Theme components
        textColorPrimary: '#FFFFFF', // white
        textColorSecondary: '#000000', // black
        textColorThird: '#3349f1', // blue
        textHintColor: '#3349f1',  // light grey
        buttonColor: '#3349f1',   // teal
        
        // utils
        errTextColor: '#e14c3c',

        // Hovers
        hoverColorHeader:'white',
        hoverColorFooter:'#1d2939',
        hoverColorButton: '#3349f1',
        hoverColorButtonSecondary: '#f4f4f5',

        // Footer && Header
        backgroundColorHeaderPrimary: '#3349f1',
        backgroundColorFooterPrimary: '#3349f1',
        textColorFH:'#9da3af'

      },
      boxShadow: {
        1: '0px 4px 30px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
