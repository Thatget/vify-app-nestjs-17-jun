import React, { useContext, useEffect, useState } from 'react'
import { LegacyCard, TextField } from '@shopify/polaris'
import { StoreContext, actions } from '../../store';

interface State {
  count: number;
}


type FormSetting = {
  name_title: string;
  name_placeholder: string;
  email_title: string;
  email_placeholder: string;
  message_title: string;
  massage_placeholder: string;
}

const defaultFormSetting = { name_title: '', name_placeholder: '', email_title: '', email_placeholder: '', message_title: '', massage_placeholder: ''};

const FormSetting = () => {
  const {state, dispatch} = useContext(StoreContext)
  const localFormSetting = { ...defaultFormSetting, ...state.setting, ... state.currentSetting }

  const handleChangeField = ( value: string, id: string) => {
    let field = {}
    switch (id) {
      case 'name_title':
        field = {name_title: value}
        break;
      case 'name_placeholder':
        field = {name_placeholder: value}
        break;
      case 'email_title':
        field = {email_title: value}
        break;
      case 'email_placeholder':
        field = {email_placeholder: value}
        break;
      case 'message_title':
        field = {message_title: value}
        break;
      case 'message_placeholder':
        field = {message_placeholder: value}
        break;
      default:
        break;
    }
    dispatch(actions.setNewSetting({...field}))
  }

  return (
    <div>
      <LegacyCard.Section title={"Field Name"}>
        <TextField
          id="name_title"
          label="Name Title"
          value={localFormSetting.name_title}
          onChange={handleChangeField}
          autoComplete="off"
        />
        <TextField
          id="name_placeholder"
          label="Name Placeholder"
          value={localFormSetting.name_placeholder}
          onChange={handleChangeField}
          autoComplete="off"
        />
        <TextField
          id='email_title'
          label="Email"
          value={localFormSetting.email_title}
          onChange={handleChangeField}
          autoComplete="off"
        />
        <TextField
          id='email_placeholder'
          label="Name Placeholder"
          value={localFormSetting.email_placeholder}
          onChange={handleChangeField}
          autoComplete="off"
        />
      </LegacyCard.Section>
      <LegacyCard.Section title={"Form title"}>
        <TextField label="Name" onChange={() => {}} autoComplete="off" />
        <TextField
          label="Account email"
          onChange={() => {}}
          autoComplete="off"
        />
      </LegacyCard.Section>
    </div>
  )
}
export default FormSetting
