/** @type {(tailwindConfig: object) => object} */
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: [
    './**/*.{html,js,jsx,ts,tsx}',
    './components/**/*.{html,js,jsx,ts,tsx}',
    './components/*.{html,js,jsx,ts,tsx}',
    './pages/**/*.{html,js,jsx,ts,tsx}',
    './pages/*.{html,js,jsx,ts,tsx}',
    './*.{html,js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
})
