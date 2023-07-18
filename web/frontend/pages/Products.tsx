import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ProductSelector from "../components/ProductSelector";
import {useAuthenticatedFetch} from "../hooks/useAuthenticatedFetch";
import {useEffect} from "react";
import {makeStyles} from "@mui/styles";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";

export default function Products() {
    const fetch = useAuthenticatedFetch()
    const selectProducts = (
        <React.Fragment>
            <CardBody>
                <Typography variant="body1">
                    <b>Products Quotes Setting: </b>
                </Typography>
                <br/>
                <ProductSelector/>
            </CardBody>
        </React.Fragment>
    );

    useEffect(() => {
        fetch("/api/products", {method: "Get"}).then((data: Response): void => {
            console.log("data", data)
            const res: Promise<Response> = new Promise((resolve, reject) => {
                resolve(data.json())
            })
            res.then((value: Response) => console.log("value:", value))
        });
    }, [])

    return (
        <>
            <React.Fragment>
                <br/>
                <Container>
                    {/*<Box sx={{minWidth: 275}}>*/}
                    <Card variant="outlined">{selectProducts}</Card>
                    {/*</Box>*/}
                    <br/>
                </Container>
            </React.Fragment>
        </>
    );

};
