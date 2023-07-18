import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CardMedia from "@mui/material/CardMedia"
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";

const AllProductsSelected = (
    <Card sx={{width: '100%'}}>
        <CardBody>
            <Typography gutterBottom variant="h6" component="div">
                The Easy Quotes will apply to All Products
            </Typography>
        </CardBody>
        <CardMedia
            component="img"
            height="180"
            image="./assets/allProducts.png"
            alt="green iguana"
        />
    </Card>
)
export default function AllProducts() {
    const [show, setShow] = React.useState(true)
    const handleSave = () => {
        alert("You have saved your setting")
    }
    return (
        <>
            <React.Fragment>
                <br/>
                <Container>
                    <Box sx={{minWidth: 275}}>
                        <Card>{AllProductsSelected}</Card>
                        <br/>
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            sx={{width: '100%'}}
                        >
                            {show &&
                                <Button
                                    variant="contained"
                                    onClick={() => handleSave()}
                                >Save Your Setting</Button>
                            }
                        </Box>
                    </Box>
                </Container>
            </React.Fragment>
        </>
    );
}

