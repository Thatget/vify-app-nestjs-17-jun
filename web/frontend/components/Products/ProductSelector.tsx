import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import AllProducts from './AllProducts'
import SelectedProductsList from './SelectedProductsList'
import Typography from '@mui/material/Typography'
import { StoreContext, actions } from '../../store'
import { defaultConfigSetting } from '../Setting/ConfigSetting'
import { useState } from 'react'
import { ContextualSaveBar } from '@shopify/polaris'

export default function ProductSelector (): React.ReactElement | null {
  const { state, dispatch } = React.useContext(StoreContext)
  const [active, setActive] = useState(false)
  const localConfigSetting = ({ ...defaultConfigSetting, ...state.setting, ...state.currentSetting })
  const [select, setSelect] = useState(localConfigSetting.all_product)
  console.log('localConfigSetting ProductSelector', localConfigSetting)
  console.log('state ProductSelector', state)
  console.log('state.setting - ProductSelector', state.setting)
  console.log('state.currentSetting ProductSelector', state.currentSetting)

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('localConfigSetting.all_product', localConfigSetting.all_product)
    console.log('localConfigSetting', localConfigSetting)

    if (event.target.value === 'AllProducts') {
      dispatch(actions.setNewSetting({ all_product: true }))
      setSelect(true)
      console.log('save select All')
      console.log('state.currentSetting', state.currentSetting)
      console.log('state.setting', state.setting)
      setActive(true)
    } else {
      // dispatch(actions.setNewSetting({ all_product: Boolean(localConfigSetting.all_product === false) }))
      dispatch(actions.setNewSetting({ all_product: false }))
      setSelect(false)
      console.log('save select products')
      console.log('state.currentSetting', state.currentSetting)
      console.log('state.setting', state.setting)
    }
  }
  const handleSave = (): void => {
    console.log('handle Save')
    dispatch(actions.setNewSetting({ all_product: true }))
    setActive(false)
  }

  return (
    <>
      <FormControl sx={{ width: '100%' }}>
        <FormLabel id="demo-row-radio-buttons-group-label">{<Typography variant="body1">Apply quotes
          to</Typography>} </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={(localConfigSetting.all_product === true) ? 'AllProducts' : 'SelectProducts'}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="AllProducts" control={<Radio/>}
                            label={<Typography variant="body1">All Products</Typography>}/>
          <FormControlLabel value="SelectProducts" control={<Radio/>}
                            label={<Typography variant="body1">Select Products</Typography>}/>

        </RadioGroup>
        <br/>
      </FormControl>
      <br/>
      {localConfigSetting.all_product === true ? <AllProducts/> : <SelectedProductsList/>}

    </>
  )
}
