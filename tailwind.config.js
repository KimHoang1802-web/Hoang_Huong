/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",  "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      container: {
        center: true
      },
      backgroundColor:{
        'login':"url('/src/img/login.svg')"
      },
      colors: {
        brown: {
          50: '#f9f5f3',
          100: '#f4e9e3',
          200: '#e3cfc6',
          300: '#c9aa9f',
          400: '#a7796c',
          500: '#875d4e',
          600: '#6a483c',
          700: '#50362e',
          800: '#392620',
          900: '#231715',
        },
        colors: {
          peach: '#F5F5DC', 
        },
      },
      colors:{
        body: '#EBE8E5',
        feedback: '#F4F1E5',
      },
      backgroundImage: {
        'banner1': "url('/src/img/banner1.jpg')",
        'banner2': "url('/src/img/banner2.jpg')",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate(0)" },
          "100%": { transform: "translate(calc(-100% - 2.5rem))" },
        },
      },
      animation: {
        marquee: "marquee 50s linear infinite",
      },
      backgroundImage: {
        main: "linear-gradient(270.78deg, #c3dafe 4.19%, #e9d8fd 96.11%)",
      },
      width: {
        w: "50",
      },
      height: {
        86: "350px",
      },
      translate: {
        700: "700px",
      },
      lineHeight: {
        16: "64px",
      },
      
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}