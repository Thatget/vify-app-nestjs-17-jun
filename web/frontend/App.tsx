
import CssBaseline from '@mui/material/CssBaseline'
import { blue, grey } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import {
  Toast
} from '@shopify/polaris'

import React, { useCallback, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  PolarisProvider
} from './components'
import GettingStarted from './pages/GettingStarted'
import NotFound from './pages/NotFound'
import Products from './pages/Products'
import Quotes from './pages/Quotes'
import Setting from './pages/Setting'
import './css/app.css'
import Analysis from './pages/Analysis'
import { NavigationMenu } from '@shopify/app-bridge-react'
export interface IApplicationProps {}

const App: React.FC<IApplicationProps> = (props) => {
  const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(','),
      body1: {
        fontWeight: 'normal',
        fontSize: '0.9rem'
      },
      body2: {
        fontSize: '0.9rem',
        fontWeight: 'bold'
      },
      button: {
        textTransform: 'none',
        fontFamily: 'sans-serif',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '0.9rem'
      }
    },
    palette: {
      secondary: {
        light: grey[300],
        main: blue[300],
        contrastText: blue[300]
      }
    },
    components: {
      MuiListItemButton: {
        defaultProps: {
          disableTouchRipple: true
        }
      },
      MuiCssBaseline: {
        styleOverrides: {
          '@font-face': {
            fontFamily: 'sans-serif'
          },
          button: {
            textTransform: 'none'
          }
        }
      }
    }
  })

  const [toastActive, setToastActive] = useState(false)

  const toggleToastActive = useCallback(() => {
    setToastActive((toastActive) => !toastActive)
  }, [])

  const toastMarkup = toastActive
    ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
      )
    : null
    const pathname = {

    }

  return (
    <PolarisProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          {toastMarkup}
          <Routes>
          <Route
              path="/"
              element={
                <GettingStarted />
              }
            />
            <Route
              path="GettingStarted"
              element={
                <GettingStarted />
              }
            />
            <Route path="Quotes" element={<Quotes />} />
            <Route path="Products" element={<Products />} />
            <Route path="Setting" element={<Setting />} />
            <Route path="analysis" element={<Analysis />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <NavigationMenu navigationLinks={[
            {
              label: 'Dashboard',
              destination: '/gettingStarted'
            },
            {
              label: 'Products',
              destination: '/products'
            },
            {
              label: 'Quotes',
              destination: '/quotes'
            },
            {
              label: 'Setting',
              destination: '/setting'
            }
          ]}
          />
      </ThemeProvider>
    </PolarisProvider>
  )
}
export default App
