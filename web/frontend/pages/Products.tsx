import { type ReactElement, useCallback } from 'react'
import ProductSelector from '../components/Products/ProductSelector'
import { useAuthenticatedFetch } from '../hooks'
// import type Product from '../types/Product'
import React from 'react'
import { AlphaCard, Layout, Page, Text } from '@shopify/polaris'
import { StoreContext, actions } from '../store'
// import { defaultConfigSetting } from 'components/Setting/ConfigSetting'
import type QuoteEntity from 'types/QuoteEntity'
import SaveSetting from '../components/Setting/SaveSetting'

type SettingX = Record<string, string | number | boolean>

export default function Products (): ReactElement | null {
  const { state, dispatch } = React.useContext(StoreContext)

  console.log('state products', state)
  console.log('state.setting - products', state.setting)
  console.log('state.currentSetting products', state.currentSetting)

  // const localConfigSetting = ({ ...defaultConfigSetting, ...state.setting, ...state.currentSetting })
  const fetch = useAuthenticatedFetch()
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
  // const fetch = useAuthenticatedFetch()
  // const fetchProduct = useCallback(async () => {
  //   try {
  //     const response = await fetch(`/api/products?page=${1}`, { method: 'GET' })
  //     const data = await response.json()
  //     if (data !== undefined) {
  //       console.log('Data products', data)
  //     }
  //   } catch (error) {
  //     console.log('failed to load products from Database')
  //   }
  // }, [])
  // React.useEffect(() => {
  //   fetchProduct()
  // }, [])
  // const {
  //   data,
  //   refetch: refetchQuote,
  //   isLoading: isLoadingQuote,
  //   isRefetching: isRefetchingQuote
  // } = useAppQuery<Product[]>({
  //   url: '/api/products',
  //   reactQueryOptions: {
  //     onSuccess: () => {}
  //   }
  // })
  const selectProducts = (
    <>
        <Text variant="headingSm" as="h6">
          <b>Products Quotes Setting: </b>
        </Text>
        <br />
        <ProductSelector />
    </>
  )

  return (
    <>
    <Page fullWidth>
    <SaveSetting fetchQuoteEntity={fetchQuoteEntity} />
      <Layout sectioned>
        <AlphaCard>
          <br/>
          {selectProducts}
      </AlphaCard>
      </Layout>
    </Page>
    </>
  )
}
