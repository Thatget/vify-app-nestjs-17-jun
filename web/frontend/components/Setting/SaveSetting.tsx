import { Button, Label } from '@shopify/polaris'
import React, { useContext } from 'react'
import { StoreContext } from '../../store'
import { useAuthenticatedFetch } from '../../hooks'

const SaveSetting = () => {
  const {state, dispatch} = useContext(StoreContext);  

  const setting = state.setting;
  const currentSetting = state.currentSetting;

  const fetch = useAuthenticatedFetch();
  const updateSetting = () => {
    const dataPost: Object[] = [];
    let changeName = false;
    let changeEmail = false;
    let changeMessage = false;
    let defaultName = {name: 'name', label: setting.name_title || "", value: setting.name_placeholder || ''};
    let defaultEmail = {name: 'email', label: setting.email_title || "", value: setting.email_placeholder || ''};
    let defaultMessage = {name: 'message', label: setting.message_title || "", value: setting.message_placeholder || ''};
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
        case 'email_title':
          if (value !== setting.email_title) {
            defaultEmail = {...defaultEmail, label: value};
            changeEmail = true;
          }
          break;
        case 'email_placeholder':
          if (value !== setting.email_placeholder) {
            defaultEmail = {...defaultEmail, value: value};
            changeEmail = true;
          }
          break;
        case 'message_title':
          if (value !== setting.message_title) {
            defaultMessage = {...defaultMessage, label: value};
            changeMessage = true;
            }
          break;
        case 'message_placeholder':
          if (value !== setting.message_placeholder) {
            defaultMessage = {...defaultMessage, value: value};
            changeMessage = true;
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
    if (changeEmail) {
      dataPost.push(defaultEmail);
    }
    if (changeMessage) {
      dataPost.push(defaultMessage);
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
