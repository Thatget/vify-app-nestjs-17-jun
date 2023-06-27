import { Card } from '@material-ui/core'
import React from 'react'
import Setting from '../../types/Setting'

interface SettingComponentPrevewProps {
  setting: Setting;
}

const SettingComponentPrevew: React.FC<SettingComponentPrevewProps>  = ({setting}) => {
  return (
    <div>
      <Card>
        Preview
      </Card>
    </div>
  )
}

export default SettingComponentPrevew
