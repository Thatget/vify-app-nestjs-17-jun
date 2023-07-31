import React, {useContext} from "react";
import {actions, StoreContext} from "../../store";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {defaultFormSetting} from "./FormSetting";
import {Form} from "@shopify/polaris";

export default function ThanksFormSetting() {
    const {state, dispatch} = useContext(StoreContext)
    const localFormSetting = {...defaultFormSetting, ...state.setting, ...state.currentSetting}
    console.log(state.currentSetting)

    const handleChangeField = (value: string, id: string) => {
        let field = {}
        switch (id) {
            case 'thank_title':
                field = {thank_title: value}
                break;
            case 'thank_content':
                field = {thank_content: value}
                break;
            case 'shopping_button':
                field = {shopping_button: value}
                break;
            default:
                break;
        }
        console.log("field", field)
        dispatch(actions.setNewSetting({...field}))
    }
    const handleSubmit = () => {
        alert("Submit")
    }

    return (
        // <Box sx={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
        <Form
            onSubmit={() => handleSubmit}
            // sx={{width: '100%', m: 0.5}}
        >
            <Typography variant="body2" sx={{mb: 1}}>Thanks Form Setting</Typography>
            <TextField
                id='thank_title'
                label="ThankYou Page Title"
                value={localFormSetting.thank_title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChangeField(e.target.value, "thank_title")}
                autoComplete="off"
                placeholder="ThankYou Page Title"
                sx={{m: 1, width: '100%'}}
            />
            <TextField
                id='thank_content'
                label="ThankYou Page Content"
                value={localFormSetting.thank_content}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChangeField(e.target.value, "thank_content")}
                autoComplete="off"
                placeholder="ThankYou Page Content"
                sx={{m: 1, width: '100%'}}
            />
            <TextField
                id='shopping_button'
                label="Continue Shopping button text"
                value={localFormSetting.shopping_button}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChangeField(e.target.value, "shopping_button")}
                autoComplete="off"
                placeholder="Continue Shopping button text"
                sx={{m: 1, width: '100%'}}
            />
            {/*<Box sx={{*/}
            {/*    display: 'flex',*/}
            {/*    width: '100%',*/}
            {/*    mx: 1,*/}
            {/*}}*/}
            {/*>*/}
            {/*    <Button type="submit" variant="contained" sx={{mr: 0, ml: 'auto'}}>Save Thanks Page Setting</Button>*/}
            {/*</Box>*/}
        </Form>
        // </Box>
    )
}