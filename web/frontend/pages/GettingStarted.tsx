import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useNavigate } from '@shopify/app-bridge-react'
import { Layout, LegacyCard, Link, Page } from '@shopify/polaris'
import { useEffect, type ReactElement, useContext } from 'react'
import React from 'react'
import { StoreContext } from '../store'

export default function GettingStarted (): ReactElement | null {
  const { state, dispatch } = useContext(StoreContext)
  const navigate = useNavigate()
  const myshopifyDomain = state.store.myshopifyDomain
  const substring = myshopifyDomain.substring(0,myshopifyDomain.length - 14)
  const url = `https://admin.shopify.com/store/${substring}/themes/current/editor`

  const selectProducts = (
    <>
      <CardContent>
        <Typography variant="body1" component="div">
          <b> Step 1: Select products</b>
        </Typography>
        <br/>
        <Typography variant="body1">
          Click <Link onClick={() => {
          navigate('/Setting')
        }}>Add products</Link> to browser your products , select some to
          show quote button 1.0
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </>
  )

  const themes = (
    <>
      <CardContent>
        <Typography variant="body1" component="div">
          <b>Step 2: For Online Store 2.0 themes </b>
        </Typography>
        <br/>
        <Typography variant="body1">
          Customize your Current theme and add a block to your target page <br/>
          Select <b>Simple Quote</b> when you find it available <br/>
          <Link url={url}> Go to Theme Editor </Link>
        </Typography>
      </CardContent>
    </>
  )
  const otherSetting = (
    <>
      <CardContent>
        <Typography variant="body1" component="div">
          <b>Other settings</b>
        </Typography>
        <br/>
        <Typography variant="body1">
         If you want to change the notification mailbox , go Email Settings.
        </Typography>
        <Typography variant="body1">
          If you want to hid prices or customize the style of the quote button, go <Link onClick={() => {
          navigate('/Setting')
        }}>General
          Settings</Link>
        </Typography>
        <Typography variant="body1">
          If you want to customize contact form or do some translation, go <Link onClick={() => {
          navigate('/Setting')
        }}>General Settings</Link>
        </Typography>
      </CardContent>
    </>
  )

  return (
    <Page fullWidth>
      <Layout sectioned>
        <LegacyCard>{selectProducts}</LegacyCard>
        <br/>
        <LegacyCard>{themes}</LegacyCard>
        <br/>
        <LegacyCard>{otherSetting}</LegacyCard>
      </Layout>
    </Page>
  )
};
