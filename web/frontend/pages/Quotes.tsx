import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import DateRangePickerValue from "../components/DateRangePicker"
import SearchAppBar from "../components/SearchBar";
import QuoteTable from "../components/QuoteTable"
import {useAppQuery} from '../hooks';
import Quote from "../types/Quote";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";

interface QuoteData { quotes: Quote[]; }

export default function Quotes() {
    const [isLoading, setIsLoading] = React.useState(true)
    const [quotes, setQuote] = React.useState<Quote[]>([])
    const {
        data,
        refetch: refetchQuote,
        isLoading: isLoadingQuote,
        isRefetching: isRefetchingQuote,
    } = useAppQuery<QuoteData>({
        url: "/api/quote",
        reactQueryOptions: {
            onSuccess: () => {
              setIsLoading(false);
            }
        },
    });
    React.useEffect(() => {
      setQuote(data?.quotes || []);
    }, [data]);
    return (
        <>
          <br/>
          <Container>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                  <DateRangePickerValue/>
                </Grid>
                <Grid item xs={6}>
                  <SearchAppBar/>
                </Grid>
            </Grid>
            <br/>
            <Box sx={{minWidth: 275}}>
              <QuoteTable quotes={quotes}/>
            </Box>
          </Container>
        </>
    );
};
