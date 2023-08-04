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
    const [deleteList, setDeleteList] = useState<ProductSelect[]>([])

    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/product_picked', { method: 'GET' });
        const data = await response.json();
        if (data) {
          const initSelected = data.map((product: {id: number, variants: string}) => {
            const id = "gid://shopify/Product/" + product.id;
            const variantsArray = JSON.parse(product.variants) || [];
            const variants = variantsArray.map((variant: { id: string; title: string }) => ({ ...variant, id: "gid://shopify/ProductVariant/" + variant.id }))
            return {id, variants}
            })
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
      const selection = resources.selection || [];
      const newOrUpdate = [];
      const deleteProducts = initialSelectionIds.filter(initSelect => !selection.find(item => item.id === initSelect.id));
      selection.map(select => {
        let checkUpdate = false;
        const initId = initialSelectionIds.find(item => item.id === select.id);
        if (initId) {
          if (initId.variants.length !== select.variants.length) {
            checkUpdate = true;
          } else {
            for (let i = 0; i < initId.variants.length; i++) {
              const element = initId.variants[i];
              if (select.variants.find(variant => variant.id !== element.id)) {
                checkUpdate = true;
                break;
              }
            }
          }
        }
        newOrUpdate.push(select);
      });

      const productList = newOrUpdate.map(selectedProduct => {
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
      setDeleteList(deleteProducts)
      setNewList(productList);
      setOpen(false)
    }

    const handleSave = async () => {
      console.log()
      const deleeteIds = deleteList.map(list => (list.id.split("/")[list.id.split("/").length - 1]));
      await fetch("/api/products/delete",
        {
          method: "Post",
          body: JSON.stringify(deleeteIds),
          headers: {"Content-Type": "application/json"}
        }
      )
      await fetch("/api/products/insert",
      {
          method: "Post",
          body: JSON.stringify(newList),
          headers: {"Content-Type": "application/json"}
      }
    )
    setDeleteList([]);
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
          {(newList.length > 0 || deleteList.length > 0 )&& 
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