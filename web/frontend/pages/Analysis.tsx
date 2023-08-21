import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useNavigate } from '@shopify/app-bridge-react'
import { IndexTable, Layout, LegacyCard, Link, Page } from '@shopify/polaris'
import { useEffect, type ReactElement, useCallback, useState } from 'react'
import { useAuthenticatedFetch } from '../hooks'

export default function Analysis (): ReactElement | null {
  const fetch = useAuthenticatedFetch()
  const navigate = useNavigate()
  const [topProduct, setTopProduct] = useState([])

  const fetchTopProducts = useCallback( async() => {
    try {
    const response = await fetch('/api/quote-analysis/products', { method: 'Get' })
    const topProducts = await response.json();
    const rowMarkup = topProducts.data.map(
      (
        {productId, productTitle, productImage, variantId, variantTitle, count},
        index,
      ) => (
        <IndexTable.Row
          id={variantId}
          key={variantId}
          position={index}
        >
          <IndexTable.Cell>
              {productTitle}
          </IndexTable.Cell>
          <IndexTable.Cell>{variantTitle}</IndexTable.Cell>
          <IndexTable.Cell>{count}</IndexTable.Cell>
        </IndexTable.Row>
      ),
    );
    setTopProduct((preTop)  => [rowMarkup])
    } catch(error) {
      
    }
  }, [])

  useEffect(() => {
    fetchTopProducts()
  }, [])

  const selectProducts = (
    <>
      <CardContent>
        <Typography variant="body1" component="div">
          <b> Step 1: Select products</b>
        </Typography>
        <br/>
        <Typography variant="body1">
          Click <Link onClick={() => {
          navigate('/Setting')
        }}>Add products</Link> to browser your products , select some to
          show quote button
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </>
  )

  return (
    <Page>
      <Layout sectioned>
        <LegacyCard>{selectProducts}</LegacyCard>
        <br/>
        <LegacyCard>
          <IndexTable
            // onSelectionChange={handleSelectionChange}
            headings={[
              { title: 'Product' },
              { title: 'Variant' },
              { title: 'Count' },
            ]} itemCount={1}          >
            {topProduct}
          </IndexTable>
        </LegacyCard>
      </Layout>
    </Page>
  )
};
