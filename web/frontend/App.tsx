
import HomeIcon from '@mui/icons-material/Home'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import TableViewIcon from '@mui/icons-material/TableView'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import { blue, grey } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import {
  AppProvider,
  FormLayout,
  Frame,
  Modal,
  Navigation,
  TextField,
  Toast,
  TopBar
} from '@shopify/polaris'
import {
  AnalyticsTableMinor,
  ArrowLeftMinor,
  ConversationMinor,
  HomeMajor,
  SettingsMajor
} from '@shopify/polaris-icons'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
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
  const pages = [
    {
      title: 'Getting Started',
      href: '/GettingStarted'
    },
    {
      title: 'Quotes',
      href: '/Quotes'
    },
    {
      title: 'Setting',
      href: '/Setting'
    }
  ]
  const history = useNavigate()
  const skipToContentRef = useRef<HTMLAnchorElement>(null)
  const [toastActive, setToastActive] = useState(false)
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false)
  const [modalActive, setModalActive] = useState(false)
  const [show, setShow] = useState(true)
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false)
  useEffect(() => {
    const topbarContent: HTMLElement = document.querySelector(
      '.Polaris-TopBar__Contents'
    )
    // topbarContent.style.justifyContent = 'flex-start'
    const searchMenu: HTMLElement = document.querySelector(
      '.Polaris-TopBar__SearchField'
    )
    // searchMenu.style.display = 'none'
    const logoDisplay: HTMLElement = document.querySelector(
      '.Polaris-TopBar__LogoDisplayControl'
    )
    logoDisplay.style.flex = 'unset'
  }, [])
  const handleCloseNavMenu = (href: string): void => {
    history(href)
    console.log('close')
  }

  const [supportSubject, setSupportSubject] = useState('')
  const [supportMessage, setSupportMessage] = useState('')
  const handleSubjectChange = useCallback((value: string) => {
    setSupportSubject(value)
  }, [])
  const handleMessageChange = useCallback((value: string) => {
    setSupportMessage(value)
  }, [])

  const toggleToastActive = useCallback(() => {
    setToastActive((toastActive) => !toastActive)
  }, [])

  const toggleMobileNavigationActive = useCallback(() => {
    setMobileNavigationActive(
      (mobileNavigationActive) => !mobileNavigationActive
    )
  }, [])
  const toggleIsLoading = useCallback((page: number) => {
    switch (page) {
      case 0:
        console.log('Case 0')
        handleCloseNavMenu(pages[0].href)
        setShow(true)
        break
      case 1:
        handleCloseNavMenu(pages[1].href)
        setShow(false)
        break
      case 2:
        handleCloseNavMenu(pages[2].href)
        setShow(false)
        break
      default:
        break
    }
  }, [])
  const toggleModalActive = useCallback(() => {
    setModalActive((modalActive) => !modalActive)
  }, [])

  const setShowModal = useCallback((childData: boolean) => {
    setModalActive(childData)
  }, [])

  const toggleIsSecondaryMenuOpen = useCallback((page: number) => {
    console.log('toggleIsLoading')
    switch (page) {
      case 0:
        console.log('Case 0')
        setShow(true)
        handleCloseNavMenu(pages[0].href)
        break
      case 1:
        setShow(false)
        handleCloseNavMenu(pages[1].href)
        break
      case 2:
        setShow(false)
        handleCloseNavMenu(pages[2].href)
        break
      default:
        break
    }
  }, [])

  const toastMarkup = toastActive
    ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
      )
    : null

  const MenuMarkup = (
    <div style={{ display: 'flex' }}>
      <TopBar.Menu
        activatorContent={
          <Button variant="text" startIcon={<HomeIcon />}>
            <Typography variant="body2" sx={{ display: 'flex' }}>
              Dashboard
            </Typography>
          </Button>
        }
        open={isSecondaryMenuOpen}
        onOpen={() => {
          toggleIsSecondaryMenuOpen(0)
        }}
        onClose={() => {
          toggleIsSecondaryMenuOpen(0)
        }}
        actions={[
          {
            items: [{ content: 'Community forums' }]
          }
        ]}
      />
      <TopBar.Menu
        activatorContent={
          <Button variant="text" startIcon={<TableViewIcon />}>
            Quotes
          </Button>
        }
        open={isSecondaryMenuOpen}
        onOpen={() => {
          toggleIsSecondaryMenuOpen(1)
        }}
        onClose={() => {
          toggleIsSecondaryMenuOpen(1)
        }}
        actions={[
          {
            items: [{ content: 'Community forums' }]
          }
        ]}
      />
      <TopBar.Menu
        activatorContent={
          <Button variant="text" startIcon={<SettingsSuggestIcon />}>
            Setting
          </Button>
        }
        open={isSecondaryMenuOpen}
        onOpen={() => {
          toggleIsSecondaryMenuOpen(2)
        }}
        onClose={() => {
          toggleIsSecondaryMenuOpen(2)
        }}
        actions={[
          {
            items: [{ content: 'Community forums' }]
          }
        ]}
      />
    </div>
  )

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      secondaryMenu={MenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  )

  const navigationMarkup = false && (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: 'Hide Navigation',
            icon: ArrowLeftMinor,
            onClick: () => {
              setShow(false)
            }
          }
        ]}
      />
      <Navigation.Section
        separator
        // title="Vify Quotes App"
        items={[
          {
            label: 'Getting Started',
            icon: HomeMajor,
            onClick: () => {
              toggleIsLoading(0)
            }
          },
          {
            label: 'Setting',
            icon: SettingsMajor,
            onClick: () => {
              toggleIsLoading(2)
            }
          },
          {
            label: 'Quotes',
            icon: AnalyticsTableMinor,
            onClick: () => {
              toggleIsLoading(1)
            }
          }
        ]}
        action={{
          icon: ConversationMinor,
          accessibilityLabel: 'Contact support',
          onClick: toggleModalActive
        }}
      />
    </Navigation>
  )

  const modalMarkup = (
    <Modal
      open={modalActive}
      onClose={toggleModalActive}
      title="Contact support"
      primaryAction={{
        content: 'Send',
        onAction: toggleModalActive
      }}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Subject"
            value={supportSubject}
            onChange={handleSubjectChange}
            autoComplete="off"
          />
          <TextField
            label="Message"
            value={supportMessage}
            onChange={handleMessageChange}
            autoComplete="off"
            multiline
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  )

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
                  topBar={topBarMarkup}
                  // navigation={navigationMarkup}
                  // showMobileNavigation={mobileNavigationActive}
                  // onNavigationDismiss={toggleMobileNavigationActive}
                  skipToContentTarget={skipToContentRef}
                >
                  {toastMarkup}
                  {/* {modalMarkup} */}
                  <Routes>
                  <Route
                      path="/"
                      element={
                        <GettingStarted
                          showModalSupport={(modalActive) => { setShowModal(modalActive) }
                          }
                        />
                      }
                    />
                    <Route
                      path="GettingStarted"
                      element={
                        <GettingStarted
                          showModalSupport={(modalActive) => { setShowModal(modalActive) }
                          }
                        />
                      }
                    />
                    <Route path="Quotes" element={<Quotes />} />
                    <Route path="Products" element={<Products />} />
                    <Route path="Setting" element={<Setting />} />
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
