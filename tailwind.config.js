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
        'semi-dark-violet': '#554769'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    }
  }
}
