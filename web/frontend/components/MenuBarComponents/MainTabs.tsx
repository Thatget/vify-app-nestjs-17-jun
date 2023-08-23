import { LegacyCard, Tabs } from '@shopify/polaris'
import React, { useState, useCallback, type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'

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

function MainTabs (): ReactElement | null {
  const [selected, setSelected] = useState(0)
  const history = useNavigate()
  const handleCloseNavMenu = (href: string): void => {
    history(href)
  }

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => {
      setSelected(selectedTabIndex)
      switch (selectedTabIndex) {
        case 0:
          handleCloseNavMenu(pages[0].href)
          break
        case 1:
          handleCloseNavMenu(pages[1].href)
          break
        case 2:
          handleCloseNavMenu(pages[2].href)
          break
        default:
          break
      }
    },
    []
  )

  const tabs = [
    {
      id: 'all-customers-content-1',
      content: <Typography variant="body2">Getting Started</Typography>,
      accessibilityLabel: 'Getting Started',
      panelID: 'all-customers-content-1'
    },
    {
      id: 'quoteMenu',
      content: <Typography variant="body2">Quotes</Typography>,
      panelID: 'quoteMenu'
    },
    {
      id: 'settingMenu',
      content: <Typography variant="body2">Setting</Typography>,
      panelID: 'settingMenu'
    }
  ]

  return (
    <div style={{ position: 'sticky', top: '0' }}>
      <LegacyCard>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        </Tabs>

      </LegacyCard>
    </div>
  )
}

export default MainTabs
