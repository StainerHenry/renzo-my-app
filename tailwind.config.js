/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        '1xl': { 'min': '1200px' },
        '2xl': { 'min': '1700px' },
        '3xl': { 'min': '1440px' },
      },
      colors: {
        'cblue-200': 'rgb(185, 210, 249)',
        'cblue-400': 'rgb(136, 180, 245)',
        'cblue-500': 'rgb(145, 179, 240)',
        'cgray-100': 'rgb(160, 159, 166)',
        'cgray-200': 'rgb(126, 125, 134)',
        'cgray-300': 'rgb(80, 79, 87)',
        'cgray-400': 'rgb(52, 52, 58)',
        'cgray-500': 'rgb(40, 40, 44)',
        'cgray-600': 'rgb(37, 37, 40)',
        'cgray-700': 'rgb(24, 24, 27)',
        'cgray-800': 'rgb(12, 12, 13)',
        'cgray-900': 'rgb(17, 17, 17)',
        'gray-700': 'rgb(55, 65, 81)',
        'neutrals-400': 'rgba(189, 189, 189)',
        'neutrals-500': 'rgba(173, 173, 173)',
        'neutrals-600': 'rgba(117, 117, 117)',
        'neutrals-700': 'rgb(42, 44, 48)',
        'neutrals-800': 'rgb(66, 66, 66)',
        'neutrals-900': 'rgb(50, 50, 50)',
        'neutrals-950': 'rgb(37, 39, 45)',
        'placeholderGray': 'rgb(154, 161, 173)'
      },
      backgroundImage: {
        "banner": "/public/banner-projects.jpg) 50% no-repeat",
        "gradient1": "linear-gradient(2.44deg, #121212 1.98%, #0A0A0A 97.89%)",
        "gradient2": "linear-gradient(180deg,rgba(0,194,255,0),#68c8e6)",
        "gradient4": "linear-gradient(180deg,rgba(0,194,255,0),#6353dd)",
        "gradient5": "linear-gradient(0deg,rgba(50,50,50,.15),rgba(50,50,50,.15))"
      },
      borderWidth: {
        '3': '3px',
      },
      fontSize: {
        "xs": ['.75rem','1rem'],
        "2xs": ['.625rem'],
        "sm": ['.875rem','1.25rem'],
        "2xl": ['1.5rem', '2rem'],
        "3xl": ['1.875rem', '2.25rem'],
      },
      fontFamily: {
        "Rajdhani": "Rajdhani,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif",
        "Adrianna": "adrianna,sans-serif",
      }
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}

