import React, { useContext } from 'react'
import { StoreContext } from '../../store'

const FormSettingPreview = () => {
  const {state} = useContext(StoreContext);
  const testData = state.currentSetting.hide_price || false;
  return (
    <div>;alskjdf;laksd</div>
  )
}

export default FormSettingPreview
