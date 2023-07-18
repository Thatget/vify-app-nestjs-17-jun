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

const FormSettingPreview = () => {
    const {state, dispatch} = useContext(StoreContext)
    const localFormSetting = {...defaultFormSetting, ...state.setting, ...state.currentSetting}
    // const testData = state.currentSetting.hide_price || false;
    const formSettingPreview = (
        <>
            <Card sx={{display: 'flex'}}>
                <CardMedia
                    component="img"
                    sx={{height: 180, width: 180}}
                    image="assets/product-card.jpg.avif"
                    alt=""
                />
                <Typography variant="body1" sx={{m: 1}}>Product Title</Typography>
            </Card>

            <Box sx={{flexWrap: 'wrap', width: '100%'}}>
                <FormControl sx={{width: '100%'}}>
                    <Typography variant="body2" sx={{m: 1}}>{localFormSetting.form_title}</Typography>
                    <Box sx={{
                        display: 'flex', width: '100%', my: 1,
                        mr: 1.3, alignItems: 'center'
                    }}>
                        <Typography variant="body1" sx={{}}>Name</Typography>
                        <TextField
                            id="name_preview"
                            value={localFormSetting.name_title}
                            placeholder={localFormSetting.name_placeholder}
                            autoComplete="off"
                            sx={{width: '30ch', mr: 0, ml: 'auto'}}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex', width: '100%', my: 1,
                        mr: 1.3, alignItems: 'center'
                    }}>
                        <Typography variant="body1" sx={{}}>Email</Typography>
                        <TextField
                            id="email_preview"
                            value={localFormSetting.email_title}
                            placeholder={localFormSetting.email_placeholder}
                            autoComplete="off"
                            sx={{width: '30ch', mr: 0, ml: 'auto'}}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        my: 1,
                        mr: 1.3,
                        alignContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography variant="body1" sx={{}}>Message</Typography>
                        <TextField
                            id="message_title"
                            value={localFormSetting.message_title}
                            placeholder={localFormSetting.massage_placeholder}
                            autoComplete="off"
                            sx={{width: '30ch', mr: 0, ml: 'auto'}}
                        />
                    </Box>

                    <Button style={{backgroundColor: "#212121"}} variant="contained"
                            sx={{mx: 1, mb: 0, mt: 0.5, width: '100%', height: 40}}>
                        <Typography variant="body2">{localFormSetting.submit_button_text}</Typography>
                    </Button>

                </FormControl>
            </Box>
        </>

    )

    return (
        <>
            <Box sx={{mt: 2}}>
                {formSettingPreview}
            </Box>
        </>
    )
}

export default FormSettingPreview
