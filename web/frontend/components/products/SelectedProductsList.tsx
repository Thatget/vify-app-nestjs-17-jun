import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from "@mui/material/IconButton";
import {useAppQuery, useAuthenticatedFetch} from "../../hooks";
import Typography from "@mui/material/Typography";
import Product from '../../types/Product';
import Resource_Picker from './Resource_Picker';
import { Button, ButtonGroup } from '@shopify/polaris';


export default function SelectedProductsList() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedProducts, setSelectedProducts] = React.useState([])
    const [deleteList, setDeleteList] = React.useState<number[]>([]);
    const [visibleProduct, setVisibleProduct] = React.useState<Product[]>([]);
    const fetch = useAuthenticatedFetch();
    const getSelectedProducts = (productsResource_Picker: any) => {
        setSelectedProducts(productsResource_Picker)
    }
    const {
      data,
      refetch: refetchProduct,
      isLoading: isLoadingQuote,
      isRefetching: isRefetchingQuote,
    } = useAppQuery<Product[]>({
      url: "/api/products",
      reactQueryOptions: {
        onSuccess: () => {
          setIsLoading(false);
        }
      },
    });

    React.useEffect(() => {
      if(data) {
      setVisibleProduct(data);
      }
    }, [data]);
    React.useEffect(() => {
        const subSet = new Set(deleteList);
        let resultArray = [];
        if (data) {
          resultArray = data.filter((item) => !subSet.has(item.id));
        }
        setVisibleProduct(resultArray);
    }, [deleteList]);

    const handleRemove = async (ids: number[]) => {
      try {
        await fetch(`/api/products/delete`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(ids)
        })
        setDeleteList([])
        refetchProduct()
      } catch (error) {
        
      }
    }
    const handleSave = () => {
      const productList = selectedProducts.map(selectedProduct => {
        let currentProduct: Product = {
          id: 0,
          productDescription: '',
          imageURL: '',
          title: '',
          variants: ''
        };
        let variants = selectedProduct.variants.map((variant: { id: any; title: any; }) => ({ id: variant.id, title: variant.title }))
        currentProduct.variants = variants;
        const parts = selectedProduct.id.split("/");
        currentProduct.id = parts[parts.length - 1];
        currentProduct.title = selectedProduct.title;
        currentProduct.productDescription = selectedProduct.descriptionHtml;
        currentProduct.imageURL = selectedProduct.images[0]?.originalSrc || null;

        return currentProduct;
      })
    }

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{width: '100%'}}>
                {/* <ProductPicker /> */}
                <Resource_Picker parentCallback={getSelectedProducts} />
            </Box>
            <Box sx={{width: '100%'}}>
                <List dense sx={{width: '100%', maxWidth: 1000, bgcolor: 'background.paper'}}>
                {visibleProduct.length > 0 && visibleProduct.map((product) => {
                        const labelId = `checkbox-list-secondary-label-${product.id}`;
                        return (
                            <ListItem
                                key={product.id}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => {setDeleteList(preSet => [...preSet, product.id])}}>
                                        <DeleteIcon/>
                                    </IconButton>
                                }
                                disablePadding
                            >
                                <ListItem
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={''}
                                            src={`${product.imageURL || ''}`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id={labelId} primary={<Typography variant="body1">{`${product.title}`}</Typography>}/>
                                </ListItem>
                            </ListItem>
                        );
                    })}
                </List>
                <Divider variant="middle" sx={{ bgcolor: "#1a237e",height:2 }}/>
                <br/>
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    sx={{width: '100%'}}
                >
                  {/* { deleteList.length > 0 && <Button variant="contained" onClick={() => handleSave()}
                        >Save</Button> } */}
                  { deleteList.length > 0 && <>
                    <ButtonGroup>
                      <Button destructive onClick={() => setDeleteList([])}
                          >UnChange</Button>
                      <Button primary onClick={() => handleRemove(deleteList)}
                          >Save</Button>
                    </ButtonGroup>
                  </> }
                </Box>
            </Box>
        </Box>
    );
}
