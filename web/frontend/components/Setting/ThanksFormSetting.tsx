import React, {useContext} from "react";
import {actions, StoreContext} from "../../store";
import Box from "@mui/material/Box";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {defaultFormSetting} from "./FormSetting";

export default function ThanksFormSetting(){
    const {state, dispatch} = useContext(StoreContext)
    const localFormSetting = {...defaultFormSetting, ...state.setting, ...state.currentSetting}
    console.log(state.currentSetting)

    const handleChangeField = (value: string, id: string)   => {
        let field = {}
        switch (id) {
            case 'thank_title':
                field = {thank_title: value}
                break;
            case 'thank_content':
                field = {thank_content: value}
                break;
            case 'continue_shopping_button_text':
                field = {continue_shopping_button_text: value}
                break;
            default:
                break;
        }
        console.log("field",field)
        dispatch(actions.setNewSetting({...field}))
    }
    const handleSubmit = () => {
        alert("Submit")
    }

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', width: '100%',height:330}}>
            <ValidatorForm
                onSubmit={() => handleSubmit}
                onError={ (errors: any) => console.log(errors)}
                sx={{ width:'100%'}}
            >

                <TextField
                    id='thank_title'
                    label="ThankYou Page Title"
                    value={localFormSetting.thank_title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChangeField(e.target.value,"thank_title")}
                    autoComplete="off"
                    placeholder="ThankYou Page Title"
                    sx={{m: 1,width:'100%'}}
                />
                <TextField
                    id='thank_content'
                    label="ThankYou Page Content"
                    value={localFormSetting.thank_content}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChangeField(e.target.value,"thank_content")}
                    autoComplete="off"
                    placeholder="ThankYou Page Content"
                    sx={{m: 1,width:'100%'}}
                />
                <TextField
                    id='continue_shopping_button_text'
                    label="Continue Shopping button text"
                    value={localFormSetting.continue_shopping_button_text}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChangeField(e.target.value,"continue_shopping_button_text")}
                    autoComplete="off"
                    placeholder="Continue Shopping button text"
                    sx={{m: 1,width:'100%'}}
                />
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    m: 1,
                }}
                >
                    <Button type="submit" variant="contained" sx={{ mr: 0, ml: 'auto' }} >Save Thanks Page Setting</Button>
                </Box>
            </ValidatorForm>
        </Box>
    )
}