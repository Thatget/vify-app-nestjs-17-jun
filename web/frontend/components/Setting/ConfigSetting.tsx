import { Switch } from '@mui/material'
import React, { useContext } from 'react'
import { StoreContext, actions } from '../../store'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

export const defaultConfigSetting = {
  hide_price: false,
  hide_buy_now: false,
  hide_add_to_cart: false,
  show_request_for_quote: false,
  all_product: false
}

const ConfigSetting = (): JSX.Element => {
  const { state, dispatch } = useContext(StoreContext)
  const localConfigSetting = ({ ...defaultConfigSetting, ...state.setting, ...state.currentSetting })
  console.log('localConfigSetting', localConfigSetting)
  console.log('state.setting', state.setting)
  console.log('state.currentSetting', state.currentSetting)

  const handleChangeConfig = (configKey: string) => {
    switch (configKey) {
      case 'hide_price':
        dispatch(actions.setNewSetting({ hide_price: Boolean(localConfigSetting.hide_price === false) }))
        break
      case 'hide_buy_now':
        dispatch(actions.setNewSetting({ hide_buy_now: Boolean(localConfigSetting.hide_buy_now === false) }))
        break
      case 'show_request_for_quote':
        dispatch(actions.setNewSetting({ show_request_for_quote: Boolean(localConfigSetting.show_request_for_quote === false) }))
        break
      case 'hide_add_to_cart':
        dispatch(actions.setNewSetting({ hide_add_to_cart: Boolean(localConfigSetting.hide_add_to_cart === false) }))
        break
      default:
        break
    }
  }

  return (
    <>
      <Stack spacing={1} sx={{}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
             onClick={() => {
               handleChangeConfig('hide_price')
             }}>
          <Typography variant="body1" sx={{ ml: 2 }}>Hide Price</Typography>
          <Switch checked={localConfigSetting.hide_price} name='hide_price' sx={{ mr: 2 }}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
             onClick={() => {
               handleChangeConfig('hide_buy_now')
             }}>
          <Typography variant="body1" sx={{ ml: 2 }}>Hide Buy Now</Typography>
          <Switch checked={localConfigSetting.hide_buy_now} name='hide_buy_now' sx={{ mr: 2 }}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
             onClick={() => {
               handleChangeConfig('hide_add_to_cart')
             }}>
          <Typography variant="body1" sx={{ ml: 2 }}>Hide Add To Card</Typography>
          <Switch checked={localConfigSetting.hide_add_to_cart} name='hide_add_to_cart' sx={{ mr: 2 }}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', alignItems: 'center' }}
             onClick={() => {
               handleChangeConfig('show_request_for_quote')
             }}>
          <Typography variant="body1" sx={{ ml: 2 }}>Show Request For Quote</Typography>
          <Switch checked={localConfigSetting.show_request_for_quote} name='show_request_for_quote'
                  sx={{ mr: 2 }}/>
        </div>
      </Stack>
    </>
  )
}

export default ConfigSetting
