import React from 'react'
import { Grid, Page } from '@shopify/polaris'
import SettingComponentSet from '../components/Setting/SettingComponentSet'
import SettingComponentPrevew from '../components/Setting/SettingComponentPrevew'

const Setting = () => {
  return (
    <Page fullWidth>
      <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
          <SettingComponentSet />
        </Grid.Cell>
        <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
          <SettingComponentPrevew />
        </Grid.Cell>
      </Grid>
    </Page>
  )
}

export default Setting
