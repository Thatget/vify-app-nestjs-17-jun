import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AllProducts from "./products/AllProducts"
import SelectedProductsList from "./products/SelectedProductsList";
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider';
import Typography from "@mui/material/Typography";

export default function ProductSelector() {
    const [value,setValue] = React.useState('');
    const [openAllProducts,setOpenAllProducts] = React.useState(false)
    const [openSelectProducts, setOpenSelectProducts] = React.useState(false)

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        if(event.target.value === 'AllProducts') {
            setOpenSelectProducts(false)
            setOpenAllProducts(true)
        } else{
            setOpenSelectProducts(true)
            setOpenAllProducts(false)
        }
    }
    return (
        <Box sx={{ width: '100%'}}>
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">{<Typography variant="body1">Apply quotes to</Typography>} </FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={handleRadioChange}
            >
                <FormControlLabel value="AllProducts" control={<Radio />} label={<Typography variant="body1">All Products</Typography>} />
                <FormControlLabel value="SelectProducts" control={<Radio />} label={<Typography variant="body1">Select Products</Typography>} />

            </RadioGroup>
            {/*<Divider variant="middle" light={true} />*/}
            <br/>
        </FormControl>
            {openSelectProducts && <Divider variant="middle" sx={{ bgcolor: "#1a237e", height:2 }}/>}
            <br/>
            {/*{openSelectProducts && <hr/>}*/}
            {openAllProducts && <AllProducts />}
            {openSelectProducts && <SelectedProductsList />}
        </Box>
    );
}