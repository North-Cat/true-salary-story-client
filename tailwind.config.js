/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.{js,ts,vue}'
  ],
  theme: {
    extend: {
      colors: {
        gray: '#F5F5F8',
        dark: '#D4D4D7',
        black: {
          10: '#2B2B31',
          6: '#2B2B31A8',
          5: '#2B2B3180',
          3: '#2B2B314D',
          1: '#2B2B311A',
        },
        blue: '#366BAB',
        green: '#329063',
        yellow: '#D08B24',
        red: '#BE2C61',
      },
      boxShadow: {
        card: '0px 2px 20px rgba(82, 154, 242, 0.5), 0px 0px 4px rgba(82, 154, 242, 0.3)',
        search: '0px 2px 20px rgba(82, 154, 242, 0.5), 0px 0px 4px rgba(82, 154, 242, 0.3)'
      },
      padding: {
        15: '60px'
      },
      margin: {
        15: '60px'
      }
    },
  },
  plugins: [],
}

