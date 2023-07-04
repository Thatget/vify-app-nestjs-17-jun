import React, { useContext } from 'react'
import ConfigSettingPreview from './ConfigSettingPreview'
import { StoreContext } from '../../store'
import FormSettingPreview from './FormSettingPreview';

const PreviewComponent = () => {
  return <div>Component B</div>;
};

const SettingComponentPrevew = () => {
  const {state} = useContext(StoreContext);
  const tab = state.settingTab || 'configSetting';
  if (tab === 'configSetting') {
    return <ConfigSettingPreview />;
  } else if (tab === 'formField') {
    return <FormSettingPreview />;
  }
}

export default SettingComponentPrevew
