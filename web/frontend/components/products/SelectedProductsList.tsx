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
import Button from '@mui/material/Button'
import {useAppQuery, useAuthenticatedFetch} from "../../hooks";
import Typography from "@mui/material/Typography";
import Product from '../../types/Product';
import Resource_Picker from './Resource_Picker';


export default function SelectedProductsList() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [selectedProductList, setSelectedProductList] = React.useState<Product[]>([]);
    const fetch = useAuthenticatedFetch();
    const [show, setShow] = React.useState(true)
    const getSelectedProducts = (productsResource_Picker: any) => {
        setSelectedProducts(productsResource_Picker)
        setShow(true)
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
        if (data) {
            setSelectedProductList(data);
        }
    }, [data]);

    const [selectedProducts, setSelectedProducts] = React.useState([])
    const handleRemove = async (id: string) => {
        await fetch(`/api/products/${id}`, {
            method: "DELETE"
        })
        refetchProduct()
        const newList = selectedProducts.filter((item) => item.id !== id)
        setSelectedProducts(newList)
    }
    const handleSave = () => {
        const productList = selectedProducts.map(selectedProduct => {
            let currentProduct: Product = {
                id: '',
                productDescription: '',
                imageURL: '',
                title: '',
                variants: ''
            };
            let variants = selectedProduct.variants.map((variant: { id: any; title: any; }) => ({
                id: variant.id,
                title: variant.title
            }))
            currentProduct.variants = variants;
            const parts = selectedProduct.id.split("/");
            currentProduct.id = parts[parts.length - 1];
            currentProduct.title = selectedProduct.title;
            currentProduct.productDescription = selectedProduct.descriptionHtml;
            currentProduct.imageURL = selectedProduct.images[0]?.originalSrc || null;

            return currentProduct;
        })
        console.log(productList)
        fetch("/api/products/insert",
            {
                method: "Post",
                body: JSON.stringify(productList),
                headers: {"Content-Type": "application/json"}
            }
        ).then((data: Response): void => {
            console.log("data from handleSelection", data)
        });
        alert("Okay, data has saved")
    }

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{width: '100%'}}>
                {/* <ProductPicker /> */}
                <Resource_Picker parentCallback={getSelectedProducts}/>
            </Box>
            <Box sx={{width: '100%'}}>
                <List dense sx={{width: '100%', maxWidth: 1000, bgcolor: 'background.paper'}}>
                    {selectedProductList && selectedProductList.map((product) => {
                        const labelId = `checkbox-list-secondary-label-${product.id}`;
                        return (
                            <ListItem
                                key={product.id}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => {
                                        handleRemove(product.id)
                                    }}>
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
                                    <ListItemText id={labelId} primary={<Typography
                                        variant="body1">{`${product.title}`}</Typography>}/>
                                </ListItem>
                            </ListItem>
                        );
                    })}
                </List>
                {show && <Divider variant="middle" sx={{bgcolor: "#1a237e", height: 0.2}}/>}
                <br/>
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="flex-end"
                    sx={{width: '100%'}}
                >
                    {show &&
                        <Button variant="contained" onClick={() => handleSave()}
                        >Save</Button>
                    }
                </Box>
            </Box>
        </Box>
    );
}
