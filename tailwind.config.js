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
        backgroundColorLogin: '#040a25',
        backgroundColorSecondary: '#1d2939',
        buttonColor: '#3eb6a5',
        textColorPrimary: '#FFFFFF',
        textColorSecondary: '#000000',
        textHintColor: '#9da3af',
        errTextColor: '#e14c3c',
       
        bgContainerTable:"#d1faf1",

        // Hovers
        hoverColorHeader:'white',
        hoverColorFooter:'#1d2939',
        hoverColorButton: '#286a62',

        // Footer && Header
        textColorFH:'#9da3af'

      },
      boxShadow: {
        1: '0px 4px 30px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
