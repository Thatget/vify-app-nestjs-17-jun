import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useNavigate } from '@shopify/app-bridge-react'
import { Layout, LegacyCard, Link, Page } from '@shopify/polaris'
import { useEffect, type ReactElement } from 'react'
import { useAuthenticatedFetch } from '../hooks'

export default function Analysis (): ReactElement | null {
  const fetch = useAuthenticatedFetch()
  const navigate = useNavigate()
  useEffect(() => {
    void fetch('/api/store', { method: 'Get' }).then((data: Response): void => {
      const res = new Promise<Response>((resolve, reject) => {
        resolve(data.json())
      })
      void res.then((value: Response) => {
      })
    })
  }, [])

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
        {/* <LegacyCard>{themes}</LegacyCard>
        <br/> */}
        <LegacyCard>{otherSetting}</LegacyCard>
      </Layout>
    </Page>
  )
};
