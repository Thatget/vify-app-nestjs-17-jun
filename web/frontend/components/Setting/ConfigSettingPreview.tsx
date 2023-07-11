// import React, { useContext } from 'react'
import * as React from 'react';
// import { StoreContext } from '../../store'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {StoreContext} from '../../store';
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import ListItemButton from "@mui/material/ListItemButton";

const ConfigSettingPreview = () => {
    // const [state] = useContext(StoreContext);
    // const testData = state.currentSetting.hide_price || false;
    const colors = [
        {label: 'red',},
        {label: 'blue'},
        {label: 'green'}
    ]
    const sizes = [
        {label: '6',},
        {label: '7'},
        {label: '8'},
        {label: '9'},
        {label: '10'},
    ]
    const test = (
        <>
            <Box sx={{flexWrap: 'wrap', width: '100%'}}>
                {/*<FormControl sx={{width: '100%'}}>*/}
                    <div>
                        <img src="assets/product-card.jpg.avif" alt="" width="100%" height="100%"/>
                    </div>
                    <div>
                        <Box sx={{display: 'flex', mt: 1}}>
                            <Typography variant="body2" color="red" sx={{m: 1, fontSize: '1.5rem'}}>$69.06</Typography>
                            <Typography variant="body2" color="black"
                                        sx={{m: 1, fontSize: '1.5rem'}}>$86.31</Typography>
                            <Button variant="contained" style={{backgroundColor: "red"}} size="small">SALE</Button>
                        </Box>
                    </div>
                    <div>
                        <Box sx={{display: 'flex',ml:1}}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-color"
                                options={colors}
                                sx={{width: '100%', m: 0.5}}
                                renderInput={(params) => <TextField {...params} label="Color"/>}
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box-color"
                                options={sizes}
                                sx={{width: '100%', m: 0.5}}
                                renderInput={(params) => <TextField {...params} label="Size"/>}
                            />
                        </Box>
                    </div>
                    <div>
                        <Button style={{backgroundColor:"#212121"}} variant="contained" sx={{m: 0.5, width: '100%'}}>Add To Cart</Button>
                    </div>
                    <div>
                        <Button style={{backgroundColor:"#212121"}} variant="contained" sx={{m: 0.5, width: '100%'}}>Buy It Now</Button>
                    </div>
                    <div>
                        <Button style={{backgroundColor:"#212121"}} variant="contained" sx={{m: 0.5, width: '100%'}}>Request For Quote</Button>
                    </div>
                {/*</FormControl>*/}
            </Box>
        </>
    );

    const {state} = React.useContext(StoreContext);
    // const testData = state.currentSetting.hide_price || false;
    return (
        <>
            <Box sx={{ }}>
                {test}
            </Box>
        </>
    )
}

export default ConfigSettingPreview
