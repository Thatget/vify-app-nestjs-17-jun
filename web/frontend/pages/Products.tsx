import {
  Card,
  CardBody
} from '@material-tailwind/react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { type ReactElement, useEffect } from 'react'
import ProductSelector from '../components/Products/ProductSelector'
import { useAppQuery } from '../hooks'
import type Product from '../types/Product'
import React from 'react'
import { AlphaCard, Layout, LegacyCard, Page } from '@shopify/polaris'

export default function Products (): ReactElement | null {
  const {
    data,
    refetch: refetchQuote,
    isLoading: isLoadingQuote,
    isRefetching: isRefetchingQuote
  } = useAppQuery<Product[]>({
    url: '/api/products',
    reactQueryOptions: {
      onSuccess: () => {}
    }
  })
  const selectProducts = (
    <>
      <CardBody>
        <Typography variant="body1">
          <b>Products Quotes Setting: </b>
        </Typography>
        <br />
        <ProductSelector />
      </CardBody>
    </>
  )

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
    <Page>
      <Layout sectioned>
        <AlphaCard>
          <br/>
      <Container>
        <Card>{selectProducts}</Card>
      </Container>
      </AlphaCard>
      </Layout>
    </Page>
    </>
  )
}
