import { Switch } from '@mui/material'
import { Divider, Text, VerticalStack} from '@shopify/polaris'
import React, { useContext } from 'react'
import { StoreContext, actions } from '../../store'

const defaultConfigSetting = { hide_price: false, hide_buy_now: false, show_request_for_quote: false };

const ConfigSetting = () => {
  const {state, dispatch} = useContext(StoreContext)
  const localConfigSetting = ({ ...defaultConfigSetting, ...state.setting, ...state.currentSetting });

  const handleChangeConfig = (configKey: string) => {
    switch (configKey) {
      case 'hide_price':
        dispatch(actions.setNewSetting({ hide_price: !localConfigSetting.hide_price }))
        break;
      case 'hide_buy_now':
        dispatch(actions.setNewSetting({ hide_buy_now: !localConfigSetting.hide_buy_now}))
        break;
      case 'show_request_for_quote':
        dispatch(actions.setNewSetting({ show_request_for_quote: !localConfigSetting.show_request_for_quote }))
        break;
      default:
        break;
    }
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