import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import ConfigSetting from '../components/Setting/ConfigSetting'
import { CardBody } from '@material-tailwind/react'
import { Typography } from '@mui/material'
import ProductSelector from '../components/Products/ProductSelector'
import ConfigSettingPreview from '../components/Setting/ConfigSettingPreview'
import React, { type ReactElement } from 'react'

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
export default function GeneralSetting (): ReactElement | null {
  return (
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
}
