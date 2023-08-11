import * as React from 'react'
import { type ReactElement, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useAuthenticatedFetch } from '../hooks'
import { Layout, LegacyCard, Link, Page } from '@shopify/polaris'
import { useNavigate } from '@shopify/app-bridge-react'

export default function GettingStarted (): ReactElement | null {
  const fetch = useAuthenticatedFetch()
  const navigate = useNavigate()
  useEffect(() => {
    void fetch('/api/store', { method: 'Get' }).then((data: Response): void => {
      console.log('data', data)
      const res = new Promise<Response>((resolve, reject) => {
        resolve(data.json())
      })
      res.then((value: Response) => {
        console.log('value:', value)
      })
    })
  }, [])
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }))
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
          show quote button
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </>
  )

  const enableApp = (
    <>
      <CardContent>
        <Typography variant="body1" component="div">
          <b>Step 2: Enable App</b>
        </Typography>
        <br/>
        <Typography variant="body1">
          Click <Link onClick={() => {
          navigate('/Setting')
        }}>Enable </Link> to make App functional
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
          <b>Step 3: For Online Store 2.0 themes </b>
        </Typography>
        <br/>
        <Typography variant="body1">
          Customize your Current theme and add a block to your target page <br/>
          Select <b>Simple Quote</b> when you find it available <br/>
          Click <Link onClick={() => {
          navigate('/Setting')
        }}>Enable </Link> to make App functional <br/>
          <Link onClick={() => {
            navigate('/Setting')
          }}>Contact us </Link> if the button does not show <br/>
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
        {/* <Typography variant="body1"> */}
        {/*  If you want to change the notification mailbox , go Email Settings. */}
        {/* </Typography> */}
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
    <Page>
      <Layout sectioned>
        <LegacyCard>{selectProducts}</LegacyCard>
        <br/>
        <LegacyCard>{enableApp}</LegacyCard>
        <br/>
        <LegacyCard>{themes}</LegacyCard>
        <br/>
        <LegacyCard>{otherSetting}</LegacyCard>
      </Layout>
    </Page>
  )
};
