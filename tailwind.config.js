module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#1B2021',
          800: '#1E2325',
          700: '#212529',
          600: '#262A31',
          500: '#2B2F38',
          400: '#33363E',
          300: '#3A3D44',
          200: '#424448',
          100: '#494B4F',
        },
        secondary: {
          900: '#9C9D9F',
          800: '#B1B2B3',
          700: '#BBBCBD',
          600: '#C0C1C2',
          500: '#C5C6C7',
          400: '#CBCBCC',
          300: '#D0D0D1',
          200: '#DADADB',
          100: '#EEEEEE',
        },
        assent: '#f0f0f0'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
