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
import { useAppQuery } from '../hooks';
import Product from '../types/Product';

export default function Products() {
    const {
      data,
      refetch: refetchQuote,
      isLoading: isLoadingQuote,
      isRefetching: isRefetchingQuote,
  } = useAppQuery<Product[]>({
      url: "/api/products",
      reactQueryOptions: {
          onSuccess: () => {
          }
      },
  });
    const selectProducts = (
        <>
          <CardBody>
              <Typography variant="body1">
                <b>Products Quotes Setting: </b>
              </Typography>
              <br/>
              <ProductSelector/>
          </CardBody>
        </>
    );

    useEffect(() => {
      console.log(data);
    }, [data])

    return (
        <>
          <br/>
          <Container>
              {/*<Box sx={{minWidth: 275}}>*/}
              <Card>{selectProducts}</Card>
              {/*</Box>*/}
              <br/>
          </Container>
        </>
    );

};
