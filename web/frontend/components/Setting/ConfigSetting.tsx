import { Switch } from '@mui/material'
import { Button, Divider, Text, VerticalStack} from '@shopify/polaris'
import React from 'react'

type Props = {
  configSetting: {
    hide_price: boolean;
    hide_buy_now: boolean;
    show_request_for_quote: boolean;
  }
}

const ConfigSetting = (props: Props) => {
  const handleChangeConfig = (configKey: string) => {

  }
  return (
    <VerticalStack gap="2">
      <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }} onClick={() => handleChangeConfig('hide_price')}>
        <Text as='h2'>Hide Price</Text>
        <Switch checked={props.configSetting?.hide_price ? props.configSetting?.hide_price: false} name='hide_price' />
      </div>
      <Divider borderColor="border-inverse" />
      <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }} onClick={() => handleChangeConfig('hide_buy_now')}>
        <Text as='h2'>Hide Buy Now</Text>
        <Switch checked={props.configSetting?.hide_buy_now ? props.configSetting?.hide_buy_now: false} name='hide_buy_now' />
      </div>
      <Divider borderColor="border-inverse" />
      <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }} onClick={() => handleChangeConfig('show_request_for_quote')}>
        <Text as='h2'>Show Request For Quote</Text>
        <Switch checked={props.configSetting?.show_request_for_quote ? props.configSetting?.show_request_for_quote: false} name='show_request_for_quote' />
      </div>
    </VerticalStack>
  )
}

export default ConfigSetting