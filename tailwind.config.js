// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        cartridge: ['Cartridge'],
      },
      fontSize: {
        front: '10rem',
      },
      colors: {
        grass: '#63c74d',
        logoGreen: '#255827',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
