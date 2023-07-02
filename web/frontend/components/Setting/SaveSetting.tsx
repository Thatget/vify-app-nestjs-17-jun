import { Button } from '@shopify/polaris'
import React, { useContext } from 'react'
import { StoreContext } from '../../store'
import { useAuthenticatedFetch } from '../../hooks'

const SaveSetting = () => {
  const [state, dispatch] = useContext(StoreContext)
  const currentSetting = state.currentSetting;
  const fetch = useAuthenticatedFetch();
  const updateSetting = () => {
    const data = fetch("/api/products",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentSetting)
    })
  }
  const saveAble = (Object.entries(state.currentSetting).length === 0)
  return (
    <div style={{color: '#bf0711', marginTop: '10px', marginBottom: '20px'}}>
    <Button disabled={saveAble} fullWidth monochrome outline>
      Save
    </Button>
  </div>
  )
}

export default SaveSetting
