import * as React from 'react'
import { useContext } from 'react'
import ConfigSetting from './ConfigSetting'
import FormSetting from './FormSetting'
import { StoreContext } from '../../store'
import ThanksFormSetting from './ThanksFormSetting'

export const hover: object = {
  '&.Mui-selected': {
    backgroundColor: '#2979ff'
  },
  ':hover': {
    backgroundColor: '#2979ff'
  }
}

const SettingComponentSet = (): JSX.Element => {
  const { state } = useContext(StoreContext)
  return (
    <>
      {(Boolean(state.settingTab.includes('configSetting'))) && <ConfigSetting/>}
      {(Boolean(state.settingTab.includes('formSetting'))) && <FormSetting/>}
      {(Boolean(state.settingTab.includes('thanksSetting'))) && <ThanksFormSetting/>}
    </>
  )
}

export default SettingComponentSet
