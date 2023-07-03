import { Button, Label } from '@shopify/polaris'
import React, { useContext } from 'react'
import { StoreContext } from '../../store'
import { useAuthenticatedFetch } from '../../hooks'

const SaveSetting = () => {
  const [state, dispatch] = useContext(StoreContext);  

  const setting = state.setting;
  const currentSetting = state.currentSetting;

  const fetch = useAuthenticatedFetch();
  const updateSetting = () => {
    const dataPost: Object[] = [];
    let changeName = false;
    let defaultName = {name: 'name', label: setting.name_title || "", value: setting.name_placeholder || ''};
    Object.entries(currentSetting).map(([key, value]) => {
      switch (key) {
        case 'name_title':
          if (value !== setting.name_title) {
            defaultName = {...defaultName, label: value};
            changeName = true;
          }
          break;
        case 'name_placeholder':
          if (value !== setting.name_placeholder) {
            defaultName = {...defaultName, value: value};
            changeName = true;
          }
          break;
      
        default:
          if (value !== setting[key]) {
            dataPost.push({ name: key, value});
          }
          break;
      }
    })
    if (changeName) {
      dataPost.push(defaultName);
    }

    const data = fetch("/api/quote-entity", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataPost)
    })
  }
  const saveAble = (Object.entries(state.currentSetting).length === 0)
  return (
    <div style={{color: '#bf0711', marginTop: '10px', marginBottom: '20px'}}>
    <Button disabled={saveAble} fullWidth monochrome outline onClick={updateSetting}>
      Save
    </Button>
  </div>
  )
}

export default SaveSetting
