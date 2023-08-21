import { Grid, Layout, LegacyCard, Page, Tabs } from '@shopify/polaris'
import React, { useCallback, useContext, useState, type ReactElement } from 'react'
import ProductSelector from '../components/Products/ProductSelector'
import ConfigSetting from '../components/Setting/ConfigSetting'
import ConfigSettingPreview from '../components/Setting/ConfigSettingPreview'
import FormSetting from '../components/Setting/FormSetting'
import FormSettingPreview from '../components/Setting/FormSettingPreview'
import ThanksFormSetting from '../components/Setting/ThanksFormSetting'
import ThanksPagePreview from '../components/Setting/ThanksPagePreview'
import { useAuthenticatedFetch } from '../hooks'
import { StoreContext, actions } from '../store'
import type QuoteEntity from '../types/QuoteEntity'
import SaveSetting from '../components/Setting/SaveSetting'

type SettingX = Record<string, string | number | boolean>

const Setting = (): ReactElement | null => {
  const fetch = useAuthenticatedFetch()
  const { dispatch } = useContext(StoreContext)
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

  const fetchQuoteEntity = useCallback(async () => {
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
            case 'hide_add_to_cart':
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
      <SaveSetting fetchQuoteEntity={fetchQuoteEntity} />
      <Layout sectioned>
        <div style={{ position: 'absolute', top: '0', left: '0.2' }}>
          <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
            {selected === 0 && configSetting}
            {selected === 1 && formSetting}
            {selected === 2 && thanksSetting}
          </Tabs>
        </div>
      </Layout>
    </Page>
  )
}

export default Setting
