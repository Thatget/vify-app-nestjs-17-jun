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
    const [initialSelectionIds, setInitialSelectionIds] = useState<ProductSelect[]>([]);
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/product_picked', { method: 'GET' });
        const data = await response.json();
        if (data) {
          const initSelected = data.map((product) => ({ ...product,id: "gid://shopify/Product/" + product.id}))
          setInitialSelectionIds(initSelected)
        }
        return data;
      } catch (error) {
        console.error('Error fetching products: ', error);
        throw error;
      }
    };
    useEffect(() => {
      fetchProducts()
    }, [])
    
    const handleSelection = (resources: any) => {
      console.log(resources.selection)
      props.parentCallback(resources.selection);
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