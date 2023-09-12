import { type ReactElement, useContext } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { StoreContext } from '../../store'
import Button from '@mui/material/Button'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { defaultConfigSetting } from './ConfigSetting'
// import productCard from '../../assets/product-card.jpg.avif'
import sampleProduct from '../../assets/sampleProduct05.png'
import React from 'react'

const ConfigSettingPreview = (): ReactElement | null => {
  const { state } = useContext(StoreContext)
  const localConfigSetting = ({ ...defaultConfigSetting, ...state.setting, ...state.currentSetting })
  const colors = [
    { label: 'red' },
    { label: 'blue' },
    { label: 'green' }
  ]
  const sizes = [
    { label: '6' },
    { label: '7' },
    { label: '8' },
    { label: '9' },
    { label: '10' }
  ]
  const test = (
    <>
      <Box sx={{ flexWrap: 'wrap', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={sampleProduct} alt="" width="100%" height="60%" style={{ borderRadius: '10px' }}/>
        </div>
        <div>
          {Boolean(localConfigSetting.hide_price === false) &&
              <Box sx={{ display: 'flex', mt: 1, justifyContent: 'center' }}>
                  <Typography variant="body2" color="red" sx={{ m: 1, fontSize: '1.5rem' }}>$69.06</Typography>
                  <Typography variant="body2" color="black"
                              sx={{ m: 1, fontSize: '1.5rem' }}>$86.31</Typography>
                  <Button variant="contained" style={{ backgroundColor: 'red' }} size="small">SALE</Button>
              </Box>}
        </div>
        <div>
          <Box sx={{ display: 'flex', ml: 1 }}>
            <Autocomplete
              disablePortal
              id="combo-box-color"
              options={colors}
              sx={{ width: '100%', m: 0.5 }}
              renderInput={(params) => <TextField {...params} label="Color"/>}
            />
            <Autocomplete
              disablePortal
              id="combo-box-color"
              options={sizes}
              sx={{ width: '100%', m: 0.5 }}
              renderInput={(params) => <TextField {...params} label="Size"/>}
            />
          </Box>
        </div>
        <div>
          {Boolean(localConfigSetting.hide_add_to_cart === false) &&
              <Button style={{ backgroundColor: '#212121' }} variant="contained" sx={{ m: 0.5, width: '100%' }}>Add To
                  Cart</Button>}
        </div>
        <div>
          {Boolean(localConfigSetting.hide_buy_now === false) &&
              <Button style={{ backgroundColor: '#212121' }} variant="contained" sx={{ m: 0.5, width: '100%' }}>Buy
                  It
                  Now</Button>}
        </div>
        <div>
          {Boolean(localConfigSetting.show_request_for_quote === true) &&
              <Button style={{ backgroundColor: '#212121' }} variant="contained" sx={{ m: 0.5, width: '100%' }}>Request
                  For Quote</Button>}
        </div>
      </Box>
    </>
  )
  return (
    <>
      <div className="container">
        {test}
      </div>
    </>
  )
}

export default ConfigSettingPreview
