import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ProductSelector from "../components/ProductSelector";
import {useAuthenticatedFetch} from "../hooks/useAuthenticatedFetch";
import {useEffect} from "react";

export default function Products() {
    const fetch = useAuthenticatedFetch()
    console.log("fetch",fetch)
    const selectProducts = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    Products
                </Typography>
                <br/>
                <ProductSelector />
            </CardContent>
        </React.Fragment>
    );

    useEffect(() => {
        fetch("/api/products","GET").then((data: Response): void => {
            console.log("data",data)
            const res:Promise<Response> = new Promise((resolve, reject) => {
                resolve(data.json())
            })
            res.then((value: Response) => console.log("value:",value))
            // const response = data.json()
            // console.log("response", response)
            // response.then(
            //     function (value) {}
            // )
        });
    },[])

    return (
        <>
            <React.Fragment>
                <CssBaseline/>
                <br/>
                <Container>
                    <Box sx={{minWidth: 275}}>
                        <Card variant="outlined">{selectProducts}</Card>
                    </Box>
                    <br/>
                </Container>
            </React.Fragment>
        </>
    );

};
