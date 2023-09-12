import React from 'react'
import Index from "./index.tsx";
// import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';


const App = () => {
  // const theme = createTheme({
  //   typography: {
  //     fontFamily: [
  //       '-apple-system',
  //       'BlinkMacSystemFont',
  //       '"Segoe UI"',
  //       'Roboto',
  //       '"Helvetica Neue"',
  //       'Arial',
  //       'sans-serif',
  //       '"Apple Color Emoji"',
  //       '"Segoe UI Emoji"',
  //       '"Segoe UI Symbol"'
  //     ].join(','),
  //     body1: {
  //       fontWeight: 'normal',
  //       fontSize: '0.9rem'
  //     },
  //     body2: {
  //       fontSize: '0.9rem',
  //       fontWeight: 'bold'
  //     },
  //     button: {
  //       textTransform: 'none',
  //       fontFamily: 'sans-serif',
  //       fontStyle: 'normal',
  //       fontWeight: 'bold',
  //       fontSize: '0.9rem'
  //     }
  //   },
  //   palette: {
  //     secondary: {
  //       light: grey[300],
  //       main: blue[300],
  //       contrastText: blue[300]
  //     }
  //   },
  //   components: {
  //     MuiListItemButton: {
  //       defaultProps: {
  //         disableTouchRipple: true
  //       }
  //     },
  //     MuiCssBaseline: {
  //       styleOverrides: {
  //         '@font-face': {
  //           fontFamily: 'sans-serif'
  //         },
  //         button: {
  //           textTransform: 'none'
  //         }
  //       }
  //     }
  //   }
  // })
  return (
    <React.StrictMode>
       {/* <ThemeProvider theme={theme}> */}
        {/* <CssBaseline /> */}
      <Index/>
      {/* </ThemeProvider> */}
    </React.StrictMode>
  )
}
export default App
