import React, { useContext } from 'react'
import { StoreContext } from '../../store'

const ConfigSettingPreview = () => {
  const [state] = useContext(StoreContext);
  const testData = state.currentSetting.hide_price || false;
  return (
    <div>
      data:
      {testData && 'OK'}
    </div>
  )
}

export default ConfigSettingPreview
