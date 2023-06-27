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
    const { data } = useAppQuery({
      url: "/api/setting",
        reactQueryOptions: {
          onSuccess: () => {
            // setIsLoading(false);
            // setSetting(data);
          }
        },
      });
    // const data = fetch('/api/setting', {method: 'POST'});
    console.log(currentSetting)
  }

  return (
    <div>
      <Card>
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
          <Switch checked={currentSetting?.hide_by_now ? currentSetting?.hide_by_now : false} name='hide_by_now' onChange={handleChangeSetting} />
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '5px'}}>
          <span>Hide Request To Quote</span>
          <Switch checked={currentSetting?.hide_request_to_quote ? currentSetting?.hide_request_to_quote : false} name='hide_request_to_quote' onChange={handleChangeSetting} />
        </div>
      </Card>
      <Card>
        <Button fullWidth onClick={() => submitSetting()}>Save</Button>
      </Card>
    </div>
  )
}

export default SettingComponentSet
