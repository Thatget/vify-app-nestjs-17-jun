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
    return (
        <>
            <Card sx={{display: 'flex', m: 0.5, width: '100%'}}>
                <CardMedia
                    component="img"
                    sx={{width: 200, m: 1}}
                    image="assets/thankyou.jpg"
                    alt=""
                />
                <div style={{margin: 0.5}}>
                    <Typography variant="body1" sx={{m: 1}}>{localFormSetting.thank_title}</Typography>
                    <Typography variant="body2" sx={{m: 1}}>{localFormSetting.thank_content}</Typography>
                </div>
            </Card>
            {/*<Box sx={{flexWrap: 'wrap', width: '100%'}}>*/}
            {/*<FormControl sx={{width: '100%'}}>*/}
            {/*<div>*/}
            <Button style={{backgroundColor: "#212121"}} variant="contained"
                    sx={{ml: 0.4, mt: 2, width: '100%'}}>
                <Typography variant="body2">{localFormSetting.shopping_button}</Typography>
            </Button>
            {/*</div>*/}
            {/*</FormControl>*/}
            {/*</Box>*/}
        </>
    )
}

export default ThanksPagePreview

