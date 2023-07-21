import {ResourcePicker} from "@shopify/app-bridge-react";
import React, {useEffect, useState} from "react";
import '../../css/style.css'
import Button from "@mui/material/Button";
// import {Button} from "@material-tailwind/react"
import Box from "@mui/material/Box";
import {useAuthenticatedFetch} from "../../hooks";

export default function Resource_Picker(props: any) {
    const fetch = useAuthenticatedFetch()
    const [open, setOpen] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState([])
    useEffect(() => {
      alert("Fuck");
        // selectedProducts.filter(props.chosenProducts)
        const newList = selectedProducts.filter((item: any) => item.id !== props.chosenProducts.id)
        // setSelectedProducts((current:any) => current.filter((deselect:any) => deselect.id = props.chosenProducs.id))
        setSelectedProducts(newList)
    }, [props.chosenProducts])
    const handleSelection = (resources: any) => {
        props.parentCallback(resources.selection)
        setSelectedProducts([...resources.selection])

        setOpen(false)
    }
    return (
        <>
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
            >
                <Button variant="contained" onClick={() => {
                    setOpen(true)
                }}
                >Select Products</Button>
            </Box>
            <ResourcePicker
                resourceType={"Product"}
                open={open}
                onCancel={() => setOpen(false)}
                onSelection={(resources) => handleSelection(resources)}
                selectMultiple={true}
                initialSelectionIds={selectedProducts}
            />
        </>

    )
}