import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AllProducts from "./products/AllProducts"
import SelectedProductsList from "./products/SelectedProductsList";
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";
import {StoreContext, actions} from '../store'
import {defaultConfigSetting} from './Setting/ConfigSetting';

export default function ProductSelector() {
    const {state, dispatch} = React.useContext(StoreContext);
    const localConfigSetting = ({...defaultConfigSetting, ...state.setting, ...state.currentSetting});

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === 'AllProducts') {
            dispatch(actions.setNewSetting({all_product: true}));
        } else {
            dispatch(actions.setNewSetting({all_product: false}));
        }
    }

    return (
        // <Box sx={{ width: '100%'}}>
        <>
            <FormControl sx={{width: '100%'}}>
                <FormLabel id="demo-row-radio-buttons-group-label">{<Typography variant="body1">Apply quotes
                    to</Typography>} </FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={localConfigSetting.all_product ? 'AllProducts' : 'SelectProducts'}
                    onChange={handleRadioChange}
                >
                    <FormControlLabel value="AllProducts" control={<Radio/>}
                                      label={<Typography variant="body1">All Products</Typography>}/>
                    <FormControlLabel value="SelectProducts" control={<Radio/>}
                                      label={<Typography variant="body1">Select Products</Typography>}/>

                </RadioGroup>
                {/*<Divider variant="middle" light={true} />*/}
                <br/>
            </FormControl>
            {!localConfigSetting.all_product && <Divider variant="middle" sx={{bgcolor: "#1a237e", height: 0.2}}/>}
            <br/>
            {/*{openSelectProducts && <hr/>}*/}
            {localConfigSetting.all_product ? <AllProducts/> : <SelectedProductsList/>}
        </>
        // </Box>
    );
}