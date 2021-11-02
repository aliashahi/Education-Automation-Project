module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#0d47a1',
          800: '#1565c0',
          700: '#1976d2',
          600: '#1e88e5',
          500: '#2196f3',
          400: '#42a5f5',
          300: '#64b5f6',
          200: '#90caf9',
          100: '#bbdefb',
        },
        secondary: {
          900: '#036666',
          800: '#14746f',
          700: '#248277',
          600: '#358f80',
          500: '#469d89',
          400: '#56ab91',
          300: '#67b99a',
          200: '#88d4ab',
          100: '#99e2b4',
        },
        item: {
          1: '#ff595e',
          2: '#ffca3a',
          3: '#8ac926',
          4: '#1982c4',
          5: '#6a4c93'
        },
        assent: '#ede7e3'
      }
    },
  },
  variants: {
    extend: {
    },
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: [require("@tailwindcss/forms")],
};
