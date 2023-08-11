import React, { useContext } from 'react'
import ConfigSettingPreview from './ConfigSettingPreview'
import Box from '@mui/material/Box'
import { actions, StoreContext } from '../../store'
import FormSettingPreview from './FormSettingPreview'
import { type payloadObject } from '../../store/actions'
import ThanksPagePreview from './ThanksPagePreview'

const SettingComponentPreview = () => {
  const { state, dispatch } = useContext(StoreContext)
  const setSection = (section: payloadObject) => {
    dispatch(actions.setSettingTab(section))
  }

  return (
    <Box sx={{ mr: 0.5, width: '100%', border: '10px solid red' }}>
      {state.settingTab.includes('configSetting') && <ConfigSettingPreview/>}
      {state.settingTab.includes('formSetting') && <FormSettingPreview/>}
      {state.settingTab.includes('thanksSetting') && <ThanksPagePreview/>}
    </Box>
  )
}
export default SettingComponentPreview
