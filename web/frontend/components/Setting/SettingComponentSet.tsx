import React, { useEffect, useState } from 'react'
import { Switch } from '@mui/material'
import { Card } from '@material-ui/core'
import { Button, Listbox } from '@shopify/polaris'
import Setting from '../../types/Setting'

type SettingComponentSetProps = {
  setting: Setting;
  handleSubmit: () => void
}

const SettingComponentSet: React.FC<SettingComponentSetProps> = ({setting, handleSubmit}) => {
  const [currentSetting, setCurrentSetting] = useState<Setting>({});
  useEffect(() => {
    setCurrentSetting({...setting});
  }, [setting])
  
  const submitSetting = () => {
    
  }

  return (
    <div>
      <Card>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '5px'}}>
          <span>Hide Price</span>
          <Switch />
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '5px'}}>
          <span>Hide Add To Cart</span>
          <Switch />
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '5px'}}>
          <span>Hide Buy now</span>
          <Switch />
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '5px'}}>
          <span>Hide Request To Quote</span>
          <Switch />
        </div>
      </Card>
      <Card>
        <Button fullWidth onClick={() => handleSubmit}>Save</Button>
      </Card>
    </div>
  )
}

export default SettingComponentSet
