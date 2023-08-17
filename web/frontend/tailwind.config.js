/** @type {(tailwindConfig: object) => object} */
import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
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
  plugins: [],
  corePlugins: {
    preflight: false
  }
})
