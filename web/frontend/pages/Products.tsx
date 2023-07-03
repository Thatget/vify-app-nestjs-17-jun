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
    // @ts-ignore
    const fetch = useAuthenticatedFetch()
    console.log("fetch",fetch)
    // @ts-ignore
    const selectProducts = (
        <React.Fragment>
            <CardContent>
                <Typography variant="body1" >
                    <b>Products Quotes Setting: </b>
                </Typography>
                <br/>
                <ProductSelector />
            </CardContent>
        </React.Fragment>
    );

    useEffect(() => {
        fetch("/api/products",{method:"Get"}).then((data: Response): void => {
            console.log("data",data)
            const res:Promise<Response> = new Promise((resolve, reject) => {
                resolve(data.json())
            })
            res.then((value: Response) => console.log("value:",value))
        });
    },[])

    return (
        <>
            <React.Fragment>
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
