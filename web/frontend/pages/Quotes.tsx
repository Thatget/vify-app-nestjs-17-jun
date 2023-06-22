import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DateRangePickerValue from "../components/DateRangePicker"
import SearchAppBar from "../components/SearchBar";
import QuoteTable from "../components/QuoteTable"

export default function Quotes() {
    const QuoteList = (
        <React.Fragment>
            <CardContent>
                <Typography variant="h5" component="div">
                    Step 1: Select products
                </Typography>
                <br/>
                <Typography variant="body2">
                    Click Add products to browser your products , select some to show quote button
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add Products</Button>
            </CardActions>
        </React.Fragment>
    );

    return (
        <>
            <React.Fragment>
                <CssBaseline/>
                <br/>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <DateRangePickerValue />
                        </Grid>
                        <Grid item xs={6}>
                            <SearchAppBar />
                        </Grid>
                    </Grid>
                    <br/>
                    <Box sx={{minWidth: 275}}>
                        <QuoteTable />
                    </Box>
                </Container>
            </React.Fragment>
        </>
    );

};
