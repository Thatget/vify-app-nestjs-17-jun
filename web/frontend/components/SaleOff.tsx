import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from "@mui/material/CardMedia"
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Willdesk =(
    <React.Fragment>
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        <a href="#">Willdesk</a> boosts sales and efficiency by streamlining customer service through its effective helpdesk solution
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        A powerful, all-in-one eCommerce customer service tool, trusted by over 30000+brands
                    </Typography>
                </CardContent>
            </Grid>
            <Grid item xs={4}>
                <CardMedia
                    component="img"
                    height="240"
                    image="./assets/50.jpeg"
                    alt="green iguana"
                />
            </Grid>
        </Grid>
    </React.Fragment>
)
export default function SaleOff(){
    return (
        <>
            <React.Fragment>
                <CssBaseline/>
                <br/>
                <Container>
                    <Box sx={{minWidth: 275}}>
                        <Card variant="outlined">{Willdesk}</Card>
                    </Box>
                </Container>
            </React.Fragment>
        </>
    );

}

