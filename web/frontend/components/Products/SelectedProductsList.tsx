import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { useAuthenticatedFetch } from '../../hooks'
import Typography from '@mui/material/Typography'
import type Product from '../../types/Product'
import Resource_Picker from './Resource_Picker'
import { Button, ButtonGroup, Pagination, Spinner } from '@shopify/polaris'

export default function SelectedProductsList () {
  const fetch = useAuthenticatedFetch()
  const [isLoading, setIsLoading] = React.useState(true)
  const [selectedProducts, setSelectedProducts] = React.useState([])
  const [deleteList, setDeleteList] = React.useState<number[]>([])
  const [visibleProduct, setVisibleProduct] = React.useState<Product[]>([])
  const [page, setPage] = React.useState<number>(0)
  const [count, setCount] = React.useState<number>(0)
  const getSelectedProducts = (productsResource_Picker: any) => {
    setSelectedProducts(productsResource_Picker)
  }
  const fetchData = React.useCallback(async (page: number) => {
    try {
      const response = await fetch(`/api/products?page=${page}`, { method: 'GET' })
      const data = await response.json()
      setVisibleProduct(data.products || [])
      setCount(data.count || 0)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [])

  React.useEffect(() => {
    setIsLoading(true)
    fetchData(page)
  }, [page])
  React.useEffect(() => {
    const subSet = new Set(deleteList)
    let resultArray = []
    if (visibleProduct) {
      resultArray = visibleProduct.filter((item) => !subSet.has(item.id))
    }
    setVisibleProduct(resultArray)
  }, [deleteList])

  const handleRemove = async (ids: number[]) => {
    try {
      await fetch('/api/products/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ids)
      })
      setDeleteList([])
      setPage(0)
    } catch (error) {

    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        {/* <ProductPicker /> */}
        <Resource_Picker parentCallback={getSelectedProducts}/>
      </Box>
      <Box sx={{ width: '100%' }}>
        {isLoading
          ? <div style={{ marginLeft: '50%' }}>
            <Spinner/>
          </div>
          : <List dense sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
            {visibleProduct && visibleProduct.length > 0 && visibleProduct.map((product) => {
              const labelId = `checkbox-list-secondary-label-${product.id}`
              return (
                <ListItem
                  key={product.id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => {
                      setDeleteList(preSet => [...preSet, product.id])
                    }}>
                      <DeleteIcon/>
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        alt={''}
                        src={`${product.imageURL || ''}`}
                      />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={<Typography
                      variant="body1">{`${product.title}`}</Typography>}/>
                  </ListItem>
                </ListItem>
              )
            })}
          </List>
        }
        <Divider variant="middle" sx={{ bgcolor: '#1a237e', height: 2 }}/>
        <br/>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          sx={{ width: '100%' }}
        >
          <Pagination
            label="Results"
            hasPrevious={page !== 0}
            onPrevious={() => {
              setPage((prePage) => prePage - 1)
            }}
            hasNext={(page + 1) * 10 < count}
            onNext={() => {
              setPage((prePage) => prePage + 1)
            }}
          />
          {deleteList.length > 0 && <>
              <ButtonGroup>
                  <Button destructive onClick={() => {
                    setDeleteList([])
                  }}>UnChange</Button>
                  <Button primary onClick={async () => {
                    await handleRemove(deleteList)
                  }}>Save</Button>
              </ButtonGroup>
          </>}
        </Box>
      </Box>
    </Box>
  )
}