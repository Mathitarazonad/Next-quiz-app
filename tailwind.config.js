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
      },
      animation: {
        'coin-shine': 'shine .3s linear both',
        'coin-pulse': 'coin-pulse .3s linear both',
        'star-grow': 'grow .5s ease-in both'
      },
      keyframes: {
        shine: {
          '0%': { left: '-30px' },
          '100%': { left: '55px', opacity: '0.2' }
        },
        'coin-pulse': {
          '0% 100%': { transform: 'scale(100%)' },
          '50%': { transform: 'scale(105%)' }
        },
        grow: {
          '0%': { transform: 'scale(0%)' },
          '100%': { transform: 'scale(100%)' }
        }
      }
    }
  }
}
