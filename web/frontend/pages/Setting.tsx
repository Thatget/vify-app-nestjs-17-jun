import React, { type ReactElement, useCallback, useContext, useState } from 'react'
import { actions, StoreContext } from '../store'
import { useAuthenticatedFetch } from '../hooks'
import FormSetting from '../components/Setting/FormSetting'
import ConfigSetting from '../components/Setting/ConfigSetting'
import ConfigSettingPreview from '../components/Setting/ConfigSettingPreview'
import FormSettingPreview from '../components/Setting/FormSettingPreview'
import ThanksFormSetting from '../components/Setting/ThanksFormSetting'
import ThanksPagePreview from '../components/Setting/ThanksPagePreview'
import type QuoteEntity from '../types/QuoteEntity'
import ProductSelector from '../components/Products/ProductSelector'
import { Grid, Layout, LegacyCard, Page, Tabs } from '@shopify/polaris'
import { useNavigate } from 'react-router-dom'

type SettingX = Record<string, string | number | boolean>
const pages = [
  {
    title: 'GeneralSetting',
    href: '/Setting/GeneralSetting'
  },
  {
    title: 'FormSetting',
    href: '/FormSetting'
  },
  {
    title: 'ThanksPageSetting',
    href: '/ThanksPageSetting'
  }
]

const Setting = (): ReactElement | null => {
  const fetch = useAuthenticatedFetch()
  const history = useNavigate()
  const { dispatch } = useContext(StoreContext)
  const [value, setValue] = React.useState('1')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selected, setSelected] = useState(0)
  const handleTabChange = useCallback(
    (selectedTabIndex: number) => {
      setSelected(selectedTabIndex)
    },
    []
  )
  const tabs = [
    {
      id: 'all-customers-1',
      content: 'General Setting',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-1'
    },
    {
      id: 'accepts-marketing-1',
      content: 'Form Setting',
      panelID: 'accepts-marketing-content-1'
    },
    {
      id: 'repeat-customers-1',
      content: 'ThanksPage Setting',
      panelID: 'repeat-customers-content-1'
    }
  ]
  const handleCloseNavMenu = (href: string): void => {
    history(href)
    console.log('close')
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string): void => {
    setValue(newValue)
  }
  const fetchQuoteEntity = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/quote-entity', { method: 'GET' })
      const data = await response.json()
      if (data !== undefined) {
        let setting: SettingX = {}
        data.forEach((entity: QuoteEntity) => {
          switch (entity.name) {
            case 'hide_price':
            case 'all_product':
            case 'hide_buy_now':
            case 'show_request_for_quote':
              if (entity.value === '1') setting = { ...setting, [entity.name]: true }
              else setting = { ...setting, [entity.name]: false }
              break
            default:
              setting = { ...setting, [entity.name]: entity.value }
              break
          }
        })
        dispatch(actions.setInitSetting(setting))
      }
    } catch (error) {
    }
    setIsLoading(false)
  }, [])
  React.useEffect(() => {
    void fetchQuoteEntity()
  }, [])

  const configSetting = (
    <div style={{ marginTop: '10px' }}>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 4, lg: 8, xl: 8 }}>
          <div style={{
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <LegacyCard title="General Setting" sectioned>
              <ConfigSetting/>
            </LegacyCard>
            <LegacyCard title="Product Selector" sectioned>
              <ProductSelector/>
            </LegacyCard>
          </div>
        </Grid.Cell>

        <Grid.Cell columnSpan={{ xs: 2, sm: 2, md: 2, lg: 4, xl: 4 }}>
          <div style={{
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <LegacyCard title="" sectioned>
              <ConfigSettingPreview/>
            </LegacyCard>
          </div>
        </Grid.Cell>
      </Grid>
    </div>
  )
  const formSetting = (
    <div style={{ marginTop: '10px' }}>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <div style={{
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <LegacyCard title="General Setting" sectioned>
              <FormSetting/>
            </LegacyCard>
          </div>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <div style={{
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <LegacyCard title="" sectioned>
              <FormSettingPreview/>
            </LegacyCard>
          </div>
        </Grid.Cell>
      </Grid>
    </div>
  )
  const thanksSetting = (
    <div style={{ marginTop: '10px' }}>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <div style={{
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <LegacyCard title="General Setting" sectioned>
              <ThanksFormSetting/>
            </LegacyCard>
          </div>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <div style={{
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <LegacyCard title="" sectioned>
              <ThanksPagePreview/>
            </LegacyCard>
          </div>
        </Grid.Cell>
      </Grid>
    </div>
  )

  return (
    <Page>
      <Layout sectioned>
        {/* <LegacyCard> */}
        <div style={{ position: 'absolute', top: '0' }}>
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            {selected === 0 && configSetting}
            {selected === 1 && formSetting}
            {selected === 2 && thanksSetting}
          </Tabs>
        </div>
        {/* </LegacyCard> */}
      </Layout>
    </Page>
  )
}

export default Setting
