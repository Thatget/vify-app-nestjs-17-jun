import React, { useContext, useEffect, useState } from 'react'
import { StoreContext, actions } from '../../store';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {InputLabel} from "@mui/material";
import Box from "@mui/material/Box"

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
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">{<Typography variant="body1">Form Fields</Typography>} </FormLabel>
        <Box sx={{ display: 'flex', flexWrap:'wrap'}}>
          <TextField
          label="Name Title"
          id="name"
          sx={{ m:1, width: '25ch'}}
          >
          </TextField>
        </Box>
        <TextField
          id="name_title"
          label="Name Title"
          value={localFormSetting.name_title}
          onChange={() => handleChangeField}
          autoComplete="off"
        />
        <TextField
          id="name_placeholder"
          label="Name Placeholder"
          value={localFormSetting.name_placeholder}
          onChange={() => handleChangeField}
          autoComplete="off"
        />
        <TextField
          id='email_title'
          label="Email"
          value={localFormSetting.email_title}
          onChange={() => handleChangeField}
          autoComplete="off"
        />
        <TextField
          id='email_placeholder'
          label="Name Placeholder"
          value={localFormSetting.email_placeholder}
          onChange={() => handleChangeField}
          autoComplete="off"
        />

        <FormLabel id="demo-row-radio-buttons-group-label">{<Typography variant="body1">Form Page</Typography>} </FormLabel>

      </LegacyCard.Section>
      <LegacyCard.Section title={"Form title"}>

        <TextField label="Name" onChange={() => {}} autoComplete="off" />
        <TextField
          label="Account email"
          onChange={() => {}}
          autoComplete="off"
        />
      </FormControl>
    </div>
  )
}
export default FormSetting
