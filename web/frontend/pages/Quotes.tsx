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
import {Button, Frame, Page, Toast} from '@shopify/polaris';
import {LegacyCard} from '@shopify/polaris'

interface QuoteData {
    quotes: Quote[];
}

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
    const removeQuote = async (ids: number[]) => {
        try {
            await fetch('/api/quote/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ids),
            });
        } catch (error) {
        } finally {
            refetchQuote()
        }
    }
    React.useEffect(() => {
        const preQuote = data?.quotes || [];
        const updatedQuote = preQuote.map(q => {
            const parsedProduct = JSON.parse(q.product);
            console.log("parsedProduct", parsedProduct)
            return {...q, product: parsedProduct};
        });
        setQuote(updatedQuote);
    }, [data]);
    const [active, setActive] = React.useState(false);

    const toggleActive = React.useCallback(() => setActive((active) => !active), []);

    const toastMarkup = active ? (
        <Toast content="Message sent" onDismiss={toggleActive}/>
    ) : null;
    return (
        <Page>
            {/*<LegacyCard title="" sectioned>*/}
            <QuoteTable quotes={quotes} removeQuote={removeQuote}/>
            {/* </Box> */}
            {/* </Container> */}
            {/*{toastMarkup}*/}
            {/*</LegacyCard>*/}
        </Page>
    );
};
