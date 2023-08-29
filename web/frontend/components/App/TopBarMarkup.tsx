/* eslint-disable @typescript-eslint/no-floating-promises */
import HomeIcon from '@mui/icons-material/Home'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import TableViewIcon from '@mui/icons-material/TableView'
import Button from '@mui/material/Button'
import {
  TopBar
} from '@shopify/polaris'
import { useAuthenticatedFetch } from '../../hooks'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext, actions } from '../../store'
import Typography from '@mui/material/Typography'

const pages = [
  {
    title: 'Getting Started',
    href: '/gettingStarted'
  },
  {
    title: 'Products',
    href: '/products'
  },
  {
    title: 'Quotes',
    href: '/quotes'
  },
  {
    title: 'Setting',
    href: '/setting'
  },
  {
    title: 'Analysis',
    href: '/analysis'
  }
]

export const TopBarMarkup = () => {
  const fetch = useAuthenticatedFetch()
  const { state, dispatch } = useContext(StoreContext)
  const history = useNavigate()
  const handleCloseNavMenu = (href: string): void => {
    history(href)
  }
  const [isSecondaryMenuOpen, setIsSecondaryMenuOpen] = useState(false)
  const toggleIsSecondaryMenuOpen = useCallback((page: number) => {
    switch (page) {
      case 0:
        handleCloseNavMenu(pages[0].href)
        break
      case 1:
        handleCloseNavMenu(pages[1].href)
        break
      case 2:
        handleCloseNavMenu(pages[2].href)
        break
      case 3:
        handleCloseNavMenu(pages[3].href)
        break
      default:
        break
    }
  }, [])
  const fetchStoreInfo = useCallback(async () => {
    try {
      const response = await fetch('/api/store', { method: 'Get' })
      const { data } = await response.json()
      return data
    } catch (error) {
      return null
    }
  }, [])

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const newData = await fetchStoreInfo()
      dispatch(actions.setStoreInfo(newData))
    }
    fetchData()
  }, [])

  const MenuMarkup = (
    <div style={{ display: 'flex' }}>
      <TopBar.Menu
        activatorContent={
          <Button variant ="text" startIcon={<HomeIcon />}>
              <Typography variant='body2'>Dashboard</Typography>
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
          <Button variant="text" startIcon={<SettingsSuggestIcon />}>
            Products
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
          <Button variant="text" startIcon={<TableViewIcon />}>
            Quotes
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
      <TopBar.Menu
        activatorContent={
          <Button variant="text" startIcon={<SettingsSuggestIcon />}>
            Setting
          </Button>
        }
        open={isSecondaryMenuOpen}
        onOpen={() => {
          toggleIsSecondaryMenuOpen(3)
        }}
        onClose={() => {
          toggleIsSecondaryMenuOpen(3)
        }}
        actions={[
          {
            items: [{ content: 'Community forums' }]
          }
        ]}
      />

      {/* <TopBar.Menu
        activatorContent={
          <Button variant="text" startIcon={<SettingsSuggestIcon />}>
            Analysis
          </Button>
        }
        open={isSecondaryMenuOpen}
        onOpen={() => {
          toggleIsSecondaryMenuOpen(3)
        }}
        onClose={() => {
          toggleIsSecondaryMenuOpen(3)  
        }}
        actions={[
          {
            items: [{ content: 'Community forums' }]
          }
        ]}
      /> */}
    </div>
  )
  return (
    <TopBar
      showNavigationToggle
      secondaryMenu={MenuMarkup}
      // onNavigationToggle={toggleMobileNavigationActive}
    />
  )
}
