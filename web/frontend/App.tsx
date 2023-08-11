import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './pages/Products'
import Quotes from './pages/Quotes'
import Setting from './pages/Setting'
import GettingStarted from './pages/GettingStarted'
import { AppBridgeProvider, PolarisProvider, QueryProvider } from './components'
import NotFound from './pages/NotFound'
import ContextProvider from './store/ContextProvider'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { blue, grey } from '@mui/material/colors'
import MainTabs from './components/MenuBarComponents/MainTabs'
import { TopBar, Frame } from '@shopify/polaris'
import React from 'react'

export interface IApplicationProps {
}

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
  const topBarMarkup = (
    <TopBar
      showNavigationToggle
    />
  )

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline/>
              <ContextProvider>
                {/* <LegacyCard> */}
                {/* <Frame */}
                {/*  topBar={topBarMarkup} */}
                {/* > */}

                <MainTabs/>
                {/* <LegacyCard.Section> */}
                <Routes>
                  <Route path="/" element={<GettingStarted/>}/>
                  <Route path="GettingStarted" element={<GettingStarted/>}/>
                  <Route path="Quotes" element={<Quotes/>}/>
                  <Route path="Products" element={<Products/>}/>
                  <Route path="Setting" element={<Setting/>}/>
                  <Route path="*" element={<NotFound/>}/>
                </Routes>
                {/* </Frame> */}
                {/* </LegacyCard.Section> */}
                {/* </LegacyCard> */}
              </ContextProvider>
            </ThemeProvider>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  )
}
export default App
