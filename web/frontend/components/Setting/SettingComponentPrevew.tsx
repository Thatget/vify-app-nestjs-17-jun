import React from 'react'
import Setting from '../../types/Setting'

interface SettingComponentPrevewProps {
  setting: Setting;
}

const SettingComponentPrevew: React.FC<SettingComponentPrevewProps>  = ({setting}) => {
  return (
    <div>
      Preview
    </div>
  )
}

export default SettingComponentPrevew
