import React, { type ReactElement, useCallback, useContext, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import { actions, StoreContext } from '../store'
import { useAuthenticatedFetch } from '../hooks'
import SaveSetting from '../components/Setting/SaveSetting'
import FormSetting from '../components/Setting/FormSetting'
import ConfigSetting from '../components/Setting/ConfigSetting'
import ConfigSettingPreview from '../components/Setting/ConfigSettingPreview'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import FormSettingPreview from '../components/Setting/FormSettingPreview'
import ThanksFormSetting from '../components/Setting/ThanksFormSetting'
import ThanksPagePreview from '../components/Setting/ThanksPagePreview'
import type QuoteEntity from '../types/QuoteEntity'
import { Typography } from '@mui/material'
import { CardBody } from '@material-tailwind/react'
import ProductSelector from '../components/Products/ProductSelector'
import { Spinner, Page, Layout } from '@shopify/polaris'

type SettingX = Record<string, string | number | boolean>

const Setting = (): ReactElement | null => {
  const fetch = useAuthenticatedFetch()
  const { dispatch } = useContext(StoreContext)
  const [value, setValue] = React.useState('1')
  const [isLoading, setIsLoading] = useState<boolean>(true)
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
    <Grid
      container
      item
      spacing={1}
      sx={{ mt: 5, mx: 0.2, width: '100%', position: 'fixed', overflow: 'auto' }}
    >
      <Grid item xs={7} sx={{ width: '100%', overflow: 'auto' }}>
        <div style={{
          maxHeight: '80vh',
          overflow: 'auto'
        }}>
          <Card>
            <CardContent>
              <ConfigSetting/>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '20px' }}>
            <CardContent>
              <CardBody>
                <Typography variant="body1">
                  <b>Products Quotes Setting: </b>
                </Typography>
                <br/>
                <ProductSelector/>
              </CardBody>
            </CardContent>
          </Card>
        </div>
      </Grid>
      <Grid item xs={5} sx={{ width: '100%', overflow: 'auto' }}>
        <div style={{ maxHeight: '80vh', overflow: 'auto', width: '95%' }}>
          <Card>
            <CardContent>
              <ConfigSettingPreview/>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </Grid>
  )
  const formSetting = (
    <Grid
      container
      item
      spacing={1}
      sx={{ mt: 5, mx: 0.5, width: '100%', position: 'fixed', overflow: 'auto' }}
    >
      <Grid item xs={7} sx={{ width: '100%', overflow: 'auto' }}>
        <div style={{
          maxHeight: '80vh',
          overflow: 'auto'
        }}>
          <Card>
            <CardContent>
              <FormSetting/>
            </CardContent>
          </Card>
        </div>
      </Grid>
      <Grid item xs={5} sx={{ width: '100%', overflow: 'auto' }}>
        <div style={{ maxHeight: '80vh', overflow: 'auto', width: '95%' }}>
          <Card>
            <CardContent>
              <FormSettingPreview/>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </Grid>
  )
  const thanksSetting = (
    <Grid
      container
      item
      spacing={1}
      sx={{ mt: 5.3, mx: 0.5, width: '100%', position: 'fixed', overflow: 'auto' }}
    >
      <Grid item xs={7} sx={{ width: '100%', overflow: 'auto' }}>
        <div style={{
          maxHeight: '80vh',
          overflow: 'auto'

        }}>
          <Card>
            <CardContent>
              <ThanksFormSetting/>
            </CardContent>
          </Card>
        </div>
      </Grid>
      <Grid item xs={5} sx={{ width: '100%', overflow: 'auto' }}>
        <div style={{ maxHeight: '80vh', overflow: 'auto', width: '95%' }}>
          <Card>
            <CardContent>
              <ThanksPagePreview/>
            </CardContent>
          </Card>
        </div>
      </Grid>
    </Grid>
  )

  return (
    <Page>
      <Layout>
        {isLoading
          ? <div style={{ marginLeft: '50%' }}><Spinner/></div>
          : <TabContext value={value}>
            <Grid container spacing={1} sx={{ width: '100%' }}>
              <Grid
                container
                item
                sx={{
                  m: 1.2,
                  position: 'fixed',
                  justifyContent: 'flex-end',
                  width: '100%',
                  zIndex: 'modal'

                }}
              >
                <Box sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  width: '100%',
                  bgcolor: 'background.paper'
                }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                      textColor="primary"
                      indicatorColor="primary"
                    >
                      <Tab
                        label="General Setting"
                        value="1"/>
                      <Tab label="Form Setting" value="2"/>
                      <Tab label="ThanksPage Setting" value="3"/>
                    </TabList>
                  </Box>
                  <Box sx={{ mr: 2 }}>
                    <SaveSetting fetchQuoteEntity={fetchQuoteEntity}/>
                  </Box>
                </Box>
              </Grid>
              <Box sx={{ width: '100%' }}>
                <TabPanel value="1" sx={{ width: '100%' }}>{configSetting}</TabPanel>
                <TabPanel value="2">{formSetting}</TabPanel>
                <TabPanel value="3">{thanksSetting}</TabPanel>
              </Box>

            </Grid>
          </TabContext>}
      </Layout>
    </Page>
  )
}

export default Setting
