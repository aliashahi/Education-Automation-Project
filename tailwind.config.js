module.exports = {
  mode: 'jit',
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: 'media', // or 'media' or 'class'
  important: true,
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
          750: '#0e7e8d',
          700: '#248277',
          600: '#358f80',
          500: '#469d89',
          400: '#56ab91',
          300: '#67b99a',
          200: '#88d4ab',
          100: '#99e2b4',
        },
        item: {
          primary: {
            1: '#ffc700',
            2: '#009ef7',
            3: '#f1416c',
            4: '#50cd89',
          },
          accent: {
            1: '#fff8dd',
            2: '#f1faff',
            3: '#fff5f8',
            4: '#e3fff1',
          },
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
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
