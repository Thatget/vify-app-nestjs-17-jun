import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import DateRangePickerValue from "../components/DateRangePicker"
import SearchAppBar from "../components/SearchBar";
import QuoteTable from "../components/quote/QuoteTable"
import {useAppQuery, useAuthenticatedFetch} from '../hooks';
import Quote from "../types/Quote";

interface QuoteData { quotes: Quote[]; }

export default function Quotes() {
  const fetch = useAuthenticatedFetch();
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
    const removeQuote = (id: number) => {
      fetch(`/api/quote/id/${id}`,{
        method: "DELETE",
      })
    }
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
              <QuoteTable quotes={quotes} removeQuote={removeQuote}/>
            </Box>
          </Container>
        </>
    );
};
