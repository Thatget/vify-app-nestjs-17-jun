import React, { ChangeEvent, useEffect, useState } from 'react'
import { Switch } from '@mui/material'
import { Card } from '@material-ui/core'
import { Button, Listbox } from '@shopify/polaris'
import Setting from '../../types/Setting'
import { useAppQuery, useAuthenticatedFetch } from '../../hooks'

type SettingComponentSetProps = {
  setting: Setting;
  handleUpdateSetting: (type: string, value: boolean) => void
}

const SettingComponentSet: React.FC<SettingComponentSetProps> = ({setting, handleUpdateSetting}) => {
  const fetch = useAuthenticatedFetch();
  const [currentSetting, setCurrentSetting] = useState<Setting>({});
  useEffect(() => {
    setCurrentSetting({...setting});
  }, [setting])

  const handleChangeSetting = (event: ChangeEvent<HTMLInputElement>) => {
    handleUpdateSetting(event.target.name, event.target.checked)
  }
  const submitSetting = () => {
    const data = fetch('/api/setting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentSetting),
    });
  }

  return (
    <div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '5px'}}>
          <span>Hide Price</span>
          <Switch checked={currentSetting?.hide_price ? currentSetting?.hide_price: false} name='hide_price' onChange={handleChangeSetting} />
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '5px'}}>
          <span>Hide Add To Cart</span>
          <Switch checked={currentSetting?.hide_add_to_cart ? currentSetting?.hide_add_to_cart : false} name='hide_add_to_cart' onChange={handleChangeSetting} />
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '5px'}}>
          <span>Hide Buy now</span>
          <Switch checked={currentSetting?.hide_buy_now ? currentSetting?.hide_buy_now : false} name='hide_buy_now' onChange={handleChangeSetting} />
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '5px'}}>
          <span>Hide Request To Quote</span>
          <Switch checked={currentSetting?.hide_request_for_quote ? currentSetting?.hide_request_for_quote : false} name='hide_request_for_quote' onChange={handleChangeSetting} />
        </div>
        <Button fullWidth onClick={() => submitSetting()}>Save</Button>
    </div>
  )
}

export default SettingComponentSet
