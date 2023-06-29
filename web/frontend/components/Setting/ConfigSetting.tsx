import { Switch } from '@mui/material'
import { Button, Divider, Text, VerticalStack} from '@shopify/polaris'
import React, { useEffect, useState } from 'react'

type ConfigSetting = {
  hide_price: boolean;
  hide_buy_now: boolean;
  show_request_for_quote: boolean;
}
type Props = {
  configSetting: ConfigSetting
}

const defaultConfigSetting = { hide_price: false, hide_buy_now: false, show_request_for_quote: false };

const ConfigSetting = (props: Props) => {
  const [localConfigSetting, setLocalConfigSetting] = useState<ConfigSetting>(defaultConfigSetting);
  useEffect(() => {
    setLocalConfigSetting({...props.configSetting})
  }, [props.configSetting])
  
  const handleChangeConfig = (configKey: string) => {
    let curruntLocalConfigSetting = {...defaultConfigSetting};
    switch (configKey) {
      case 'hide_price':
        curruntLocalConfigSetting = {...localConfigSetting, hide_price: !localConfigSetting.hide_price};
        break;
      case 'hide_buy_now':
        curruntLocalConfigSetting = {...localConfigSetting, hide_buy_now: !localConfigSetting.hide_buy_now};
        break;
      case 'show_request_for_quote':
        curruntLocalConfigSetting = {...localConfigSetting, hide_buy_now: !localConfigSetting.hide_buy_now};
        break;
      default:
        break;
    }
    setLocalConfigSetting({...curruntLocalConfigSetting})
  }
  return (
    <VerticalStack gap="2">
      <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
        onClick={() => handleChangeConfig('hide_price')}>
        <Text as='h2'>Hide Price</Text>
        <Switch checked={localConfigSetting.hide_price} name='hide_price' />
      </div>
      <Divider borderColor="border-inverse" />
      <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }} onClick={() => handleChangeConfig('hide_buy_now')}>
        <Text as='h2'>Hide Buy Now</Text>
        <Switch checked={localConfigSetting.hide_buy_now} name='hide_buy_now' />
      </div>
      <Divider borderColor="border-inverse" />
      <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }} onClick={() => handleChangeConfig('show_request_for_quote')}>
        <Text as='h2'>Show Request For Quote</Text>
        <Switch checked={localConfigSetting.show_request_for_quote} name='show_request_for_quote' />
      </div>
    </VerticalStack>
  )
}

export default ConfigSetting