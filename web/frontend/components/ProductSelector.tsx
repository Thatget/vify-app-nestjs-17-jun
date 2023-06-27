import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AllProducts from "./products/AllProducts"
import SelectedProductsList from "./products/SelectedProductsList";

export default function ProductSelector() {
    const [value,setValue] = React.useState('');
    const [openAllProducts,setOpenAllProducts] = React.useState(false)
    const [openSelectProducts, setOpenSelectProducts] = React.useState(false)

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setValue((event.target as HTMLInputElement).value);
        event.preventDefault()
        console.log("value",value)
        if(value === 'AllProducts') {
            setOpenSelectProducts(false)
            setOpenAllProducts(true)
            console.log("Openselec",openSelectProducts,openAllProducts)
        } else{
            setOpenSelectProducts(true)
            setOpenAllProducts(false)
        }
    }
    const handleSubmit = (event: React.FormEvent<HTMLInputElement>) =>{
        event.preventDefault();
        if(value === "AllProducts") {
            setOpenSelectProducts(true)
        } else{
            setOpenSelectProducts(true)
        }
    }
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Apply to: </FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={handleRadioChange}
            >
                <FormControlLabel value="AllProducts" control={<Radio />} label="All Products" />
                <FormControlLabel value="SelectProducts" control={<Radio />} label="Select Products" />
                {openAllProducts && <SelectedProductsList />}
                {openSelectProducts && <AllProducts />}
            </RadioGroup>
        </FormControl>
    );
}