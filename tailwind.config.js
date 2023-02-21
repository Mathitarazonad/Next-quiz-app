/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-violet-title': '#553285',
        'semi-dark-violet': '#554769',
        'coin-border': '#AFA54C',
        'coin-background': '#D6CB6D'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        'autofill-without-bg': '0 0 0 40px white inset !important'
      }
    }
  }
}
