import React, { useContext } from 'react'
import { StoreContext } from '../../store'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { defaultFormSetting } from './FormSetting'

const ThanksPagePreview = () => {
  const { state, dispatch } = useContext(StoreContext)
  const localFormSetting = { ...defaultFormSetting, ...state.setting, ...state.currentSetting }
  return (
    <>
      <Card sx={{ display: 'flex', m: 0.5, width: '100%' }}>
        <CardMedia
          component="img"
          sx={{ width: 200, m: 1 }}
          image="assets/thankyou.jpg"
          alt=""
        />
        <div style={{ margin: 0.5 }}>
          <Typography variant="body1" sx={{ m: 1 }}>{localFormSetting.thank_title}</Typography>
          <Typography variant="body2" sx={{ m: 1 }}>{localFormSetting.thank_content}</Typography>
        </div>
      </Card>
      <Button style={{ backgroundColor: '#212121' }} variant="contained"
              sx={{ ml: 0.4, mt: 2, width: '100%' }}>
        <Typography variant="body2">{localFormSetting.shopping_button}</Typography>
      </Button>
    </>
  )
}

export default ThanksPagePreview
