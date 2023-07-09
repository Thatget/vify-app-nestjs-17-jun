import React, {useContext} from 'react'
import {StoreContext} from '../../store'
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card"
import CardMedia from "@mui/material/CardMedia";
import ListItemButton from "@mui/material/ListItemButton";
import {defaultFormSetting} from "./FormSetting";

const ThanksPagePreview = () => {
    const {state, dispatch} = useContext(StoreContext)
    const localFormSetting = {...defaultFormSetting, ...state.setting, ...state.currentSetting}
    // const testData = state.currentSetting.hide_price || false;
    const thanksPreview = (
        <>
            <Card sx={{display: 'flex'}}>
                <CardMedia
                    component="img"
                    sx={{width: 200}}
                    image="assets/thankyou.jpg"
                    alt=""
                />
                <div style={{ margin:1}}>
                    <Typography variant="body1" sx={{m:1}}>{localFormSetting.thank_title}</Typography>
                    <Typography variant="body2" sx={{m:1}}>{localFormSetting.thank_content}</Typography>
                </div>
            </Card>
            <Box sx={{flexWrap: 'wrap', width: '100%'}}>
                <FormControl sx={{width: '100%'}}>
                <div>
                    <Button style={{backgroundColor: "#212121"}} variant="contained" sx={{ml:0.2,mt:2, width: '100%'}}>
                    <Typography variant="body2">{localFormSetting.continue_shopping_button_text}</Typography>
                    </Button>
                </div>
                </FormControl>
            </Box>

        </>

    )

    return (
        <>
            <Box sx={{mt:1,height:320}}>
                {thanksPreview}
            </Box>
        </>
    )
}

export default ThanksPagePreview
