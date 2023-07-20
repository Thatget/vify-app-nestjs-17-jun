import React, {ChangeEvent, useContext, useEffect, useState} from 'react'
import {StoreContext, actions} from '../../store';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {InputLabel} from "@mui/material";
import Box from "@mui/material/Box"
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'
import Button from "@mui/material/Button";

export const thank_page_content: string = "We've received your request. We are going to reply to you within 24 hours"
export const defaultFormSetting = {
    form_title: '',
    name: '',
    name_placeholder: '',
    email_title: '',
    email_placeholder: '',
    message_title: '',
    massage_placeholder: '',
    thank_title: 'Thank you for your quote',
    thank_content: thank_page_content,
    shopping_button: 'Continue Shopping',
    submit_button_text: 'Submit',
};

const FormSetting = () => {
    const {state, dispatch} = useContext(StoreContext)
    const localFormSetting = {...defaultFormSetting, ...state.setting, ...state.currentSetting}
    console.log(state.currentSetting);

    const handleChangeField = (value: string, id: string) => {
        let field = {}
        switch (id) {
            case 'name':
                field = {name: value}
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
                console.log(field)
                break;
            // case 'thank_title':
            //     field = {thank_title: value}
            //     break;
            // case 'thank_content':
            //     field = {thank_content: value}
            //     break;
            case 'submit_button_text':
                field = {submit_button_text: value}
                break;
            case 'form_title':
                field = {form_title: value}
                break;
            // case 'shopping_button':
            //     field={shopping_button:value}

            default:
                break;
        }
        // console.log("field", field)
        dispatch(actions.setNewSetting({...field}))
    }
    const handleSubmit = (data: any) => {
        data = state.currentSetting
        console.log("data from From submit", data)
        alert("Submit")
        console.log("submitted")
    }

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
            <Typography variant="body2" sx={{m: 0.5}}>Form Setting</Typography>
            <ValidatorForm
                onSubmit={handleSubmit}
                onError={(errors: any) => console.log(errors)}
                style={{width: '100%'}}
            >
                <TextField
                    id="name_placeholder"
                    label="Name Placeholder"
                    value={localFormSetting.name_placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChangeField(e.target.value, "name_placeholder")}
                    autoComplete="off"
                    sx={{m: 1, width: '100%'}}
                />
                <TextValidator
                    name="name"
                    label="Name Title"
                    value={localFormSetting.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChangeField(e.target.value, "name")}
                    autoComplete="off"
                    validators={['required']}
                    errorMessages={['You must enter a name']}
                    sx={{m: 1, width: '100%'}}
                />
                <TextField
                    id='email_placeholder'
                    label="Email Placeholder"
                    value={localFormSetting.email_placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChangeField(e.target.value, "email_placeholder")}
                    autoComplete="off"
                    sx={{m: 1, width: '100%'}}
                />

                <TextValidator
                    name='email_title'
                    label="Email"
                    value={localFormSetting.email_title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChangeField(e.target.value, "email_title")}
                    autoComplete="off"
                    sx={{m: 1, width: '100%'}}
                />
                <TextField
                    id='message_placeholder'
                    label="Message Placeholder"
                    value={localFormSetting.message_placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChangeField(e.target.value, "message_placeholder")}
                    autoComplete="off"
                    sx={{m: 1, width: '100%'}}
                />

                <TextValidator
                    name='message_title'
                    label="Message"
                    value={localFormSetting.message_title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChangeField(e.target.value, "message_title")}
                    autoComplete="off"
                    sx={{m: 1, width: '100%'}}
                />

                <Typography variant="body2" sx={{my: 1.2, ml: 2}}>Form Page</Typography>
                <TextField
                    id='form_title'
                    label="Form Title"
                    value={localFormSetting.form_title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChangeField(e.target.value, "form_title")}
                    autoComplete="off"
                    // placeholder="Request for a quote"
                    sx={{m: 1, width: '100%'}}
                />
                <TextField
                    id='submit_button_text'
                    label="Submit Button Text"
                    value={localFormSetting.submit_button_text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChangeField(e.target.value, "submit_button_text")}
                    autoComplete="off"
                    sx={{m: 1, width: '100%'}}
                />
                {/*<Box sx={{*/}
                {/*    display: 'flex',*/}
                {/*    width: '100%',*/}
                {/*    mr: 1, ml: 1*/}
                {/*}}*/}
                {/*>*/}
                {/*    <Button type="submit" variant="contained" sx={{mr: 0, ml: 'auto'}}>Save Form*/}
                {/*        Setting</Button>*/}
                {/*</Box>*/}
            </ValidatorForm>
        </Box>
    )
}
export default FormSetting
