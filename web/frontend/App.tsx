
import CssBaseline from '@mui/material/CssBaseline'
import { blue, grey } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import {
  AppProvider,
  Frame,
  Toast,
} from '@shopify/polaris'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  AppBridgeProvider,
  PolarisProvider,
  QueryProvider
} from './components'
import GettingStarted from './pages/GettingStarted'
import NotFound from './pages/NotFound'
import Products from './pages/Products'
import Quotes from './pages/Quotes'
import Setting from './pages/Setting'
import ContextProvider from './store/ContextProvider'
import './css/app.css'
import vifyLogoImg from './assets/vifylog.png'
import Analysis from './pages/Analysis'
export interface IApplicationProps {}
import { TopBarMarkup } from './components/App/TopBarMarkup'

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

  const skipToContentRef = useRef<HTMLAnchorElement>(null)
  const [toastActive, setToastActive] = useState(false)

  const toggleToastActive = useCallback(() => {
    setToastActive((toastActive) => !toastActive)
  }, [])

  const toastMarkup = toastActive
    ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
      )
    : null

  const logo = {
    width: 40,
    topBarSource: vifyLogoImg,
    contextualSaveBarSource: vifyLogoImg ,
    url: '#',
    accessibilityLabel: 'Vify Quotes'
  }
  return (
    <PolarisProvider>
      <AppBridgeProvider>
        <QueryProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ContextProvider>
              {/* <LegacyCard> */}
              <AppProvider
                i18n={{
                  Polaris: {
                    Avatar: {
                      label: 'Avatar',
                      labelWithInitials: 'Avatar with initials {initials}'
                    },
                    ContextualSaveBar: {
                      save: 'Save',
                      discard: 'Discard'
                    },
                    TextField: {
                      characterCount: '{count} characters'
                    },
                    TopBar: {
                      toggleMenuLabel: 'Toggle menu',

                      SearchField: {
                        clearButtonLabel: 'Clear',
                        search: 'Search'
                      }
                    },
                    Modal: {
                      iFrameTitle: 'body markup'
                    },
                    Frame: {
                      skipToContent: 'Skip to content',
                      navigationLabel: 'Navigation',
                      Navigation: {
                        closeMobileNavigationLabel: 'Close navigation'
                      }
                    }
                  }
                }}
              >
                <Frame
                  logo={logo}
                  topBar={<TopBarMarkup />}
                  skipToContentTarget={skipToContentRef}
                >
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
                </Frame>
              </AppProvider>
            </ContextProvider>
          </ThemeProvider>
        </QueryProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  )
}
export default App
