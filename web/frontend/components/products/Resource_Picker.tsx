import {ResourcePicker} from "@shopify/app-bridge-react";
import {useEffect, useState} from "react";
import '../../css/style.css'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";
import ProductSelect from "../../types/ProductSelect";

export default function Resource_Picker(props: any) {
    const fetch = useAuthenticatedFetch();
    const [open, setOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [initialSelectionIds, setInitialSelectionIds] = useState<ProductSelect[]>([]);
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/product_picked', { method: 'GET' });
        const data = await response.json();
        if (data) {
          setInitialSelectionIds(data)
        }
        return data;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    };
    useEffect(() => {
      fetchProducts()
    }, [])
    
    // useEffect(() => {
    //     // selectedProducts.filter(props.chosenProducts)
    //     const newList = selectedProducts.filter((item: any) => item.id !== props.chosenProducts.id)
    //     // setSelectedProducts((current:any) => current.filter((deselect:any) => deselect.id = props.chosenProducs.id))
    //     setSelectedProducts(newList)
    // }, [props.chosenProducts])
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
                <Button onClick={() => {
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
                initialSelectionIds={initialSelectionIds}
            />
        </>

    )
}