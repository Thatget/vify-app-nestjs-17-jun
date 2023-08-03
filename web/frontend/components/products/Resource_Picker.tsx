import {ResourcePicker} from "@shopify/app-bridge-react";
import {useEffect, useState} from "react";
import '../../css/style.css'
import Box from "@mui/material/Box";
import { useAppQuery, useAuthenticatedFetch } from "../../hooks";
import ProductSelect from "../../types/ProductSelect";
import Product from "types/Product";
import { ButtonGroup, Button, Divider } from "@shopify/polaris";

export default function Resource_Picker(props: any) {
    const fetch = useAuthenticatedFetch();
    const [open, setOpen] = useState(false);
    const [initialSelectionIds, setInitialSelectionIds] = useState<ProductSelect[]>([]);
    const [newList, setNewList] = useState([])

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
        return [];
      }
    };
    useEffect(() => {
      if (open) {
        fetchProducts()
      }
    }, [open])
    
    const handleSelection = (resources: any) => {
      const productList = resources.selection.map(selectedProduct => {
        let parts = selectedProduct.id.split("/");
        let variants = selectedProduct.variants
          .map((variant: { id: any; title: any; }) => ({ id: variant.id.split("/")[variant.id.split("/").length - 1], title: variant.title }))
        let currentProduct: Product = {
          id: parts[parts.length - 1],
          variants: variants,
          productDescription: selectedProduct.descriptionHtml,
          imageURL: selectedProduct.images[0]?.originalSrc || null,
          title: selectedProduct.title,
        }
        return currentProduct;
      })
      setNewList(productList);
      setOpen(false)
    }

    const handleSave = async () => {
      await fetch("/api/products/insert",
      {
          method: "Post",
          body: JSON.stringify(newList),
          headers: {"Content-Type": "application/json"}
      }
    )
    setNewList([]);
    alert("Okay, data has saved")
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
          {newList.length > 0 && 
          <>
            <ButtonGroup>
              <Button destructive onClick={() => setNewList([])} >UnChange</Button>
              <Button primary onClick={() => handleSave()} >Save</Button>
            </ButtonGroup>
            <br />
            <Divider borderWidth="2" borderColor="border-critical-subdued" />
          </>}
        </>
    )
}