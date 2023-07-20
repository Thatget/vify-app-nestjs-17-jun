import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import Resource_Picker from "./Resource_Picker";
import Divider from "@mui/material/Divider";
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button'
import {useAuthenticatedFetch} from "../../hooks";
import {makeStyles} from "@mui/material/styles";
import Typography from "@mui/material/Typography";


export default function SelectedProductsList() {
    const fetch = useAuthenticatedFetch()
    const [deselect, setDeselect] = React.useState([])
    const [show, setShow] = React.useState(false)
    const getSelectedProducts = (productsResource_Picker: any) => {
        setSelectedProducts(productsResource_Picker)
        setShow(true)
    }
    const [selectedProducts, setSelectedProducts] = React.useState([])
    const handleRemove = (id: string) => {
        const newList = selectedProducts.filter((item) => item.id !== id)
        setSelectedProducts(newList)
    }
    const handleClick = (chosenProduct: any): void => {
        setDeselect(null)
        deselect.push(chosenProduct)
        setDeselect(deselect)
    }
    console.log(selectedProducts);
    const handleSave = () => {
      const productIds = selectedProducts.map(selectedProduct => {
        selectedProduct.variants.map(variant => {
          variant.id;
        })
      })
        fetch("/api/products/insert",
            {
                method: "Post",
                body: JSON.stringify(selectedProducts),
                headers: {"Content-Type": "application/json"}
            }
        ).then((data: Response): void => {
            console.log("data from handleSelection", data)
        });
        alert("Okay, data has saved")
    }

    // const useStyles = makeStyles({
    //     listItem: {
    //         fontSize: '0.7rem'
    //     }
    // })
    // const classes = useStyles()

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{width: '100%'}}>
                <Resource_Picker chosenProducts={deselect} parentCallback={getSelectedProducts}/>
            </Box>
            <Box sx={{width: '100%'}}>
                <List dense sx={{width: '100%', maxWidth: 1000, bgcolor: 'background.paper'}}>

                    {selectedProducts.map((product) => {
                        const labelId = `checkbox-list-secondary-label-${product.id}`;
                        return (
                            <ListItem
                                key={product.id}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete"
                                                onClick={() => {
                                                    handleClick({product})
                                                    handleRemove(product.id)
                                                }
                                                }>
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
                                            src={`${product.images[0].originalSrc}`}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText id={labelId}   primary={<Typography variant="body1">{`${product.title}`}</Typography>}/>
                                </ListItem>
                            </ListItem>
                        );
                    })}
                </List>
                {show && <Divider variant="middle" sx={{ bgcolor: "#1a237e",height:2 }}/>}
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