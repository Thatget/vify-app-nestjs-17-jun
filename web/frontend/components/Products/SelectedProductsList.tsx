import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'
import { useAuthenticatedFetch } from '../../hooks'
import Typography from '@mui/material/Typography'
import type Product from '../../types/Product'
import type Variant from '../../types/Variant'
import { Pagination, Spinner, Divider, ContextualSaveBar, Listbox, ResourceList, IndexTable, Text, Collapsible } from '@shopify/polaris'
import PickingResource from './ResourcePicker'
import imageNotFound from '../../assets/imageNotFound.png'

interface responseProduct {
  products: object[]
}

export default function SelectedProductsList (): React.ReactElement | null {
  const fetch = useAuthenticatedFetch()
  const [isLoading, setIsLoading] = React.useState(true)
  const [currentProducts, setCurrentProduct] = React.useState<Product[]>([])
  const [deleteList, setDeleteList] = React.useState<number[]>([])
  const [visibleProduct, setVisibleProduct] = React.useState<Product[]>([])
  const [page, setPage] = React.useState<number>(0)
  const [count, setCount] = React.useState<number>(0)
  const [open, setOpen] = React.useState(true)
  const [show, setShow] = React.useState(false)
  const [productList, setProductList] = React.useState<Product[]>()
  // const handleClick = React.useCallback(() => {
  //   console.log('handleClick')
  //   setShow(show => !show)
  //   console.log('show', show)
  // }, [show])
  const toggleShowVariants = (showVariants): void => {
    setShow(showVariants)
  }

  const getProductList = (selectedItems: Product[]): void => {
    setProductList(selectedItems)
    console.log('selectedItems', selectedItems)
    setVisibleProduct(selectedItems)
  }

  const fetchData = React.useCallback(async (page: number) => {
    try {
      const response = await fetch(`/api/products?page=${page}`, { method: 'GET' })
      const data: responseProduct = await response.json()
      console.log('data reload', data)

      setCurrentProduct(data.products || [])
      setVisibleProduct(data.products || [])
      setCount(data.count || 0)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [])

  React.useEffect(() => {
    setIsLoading(true)
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData(page)
    console.log('visibleProduct', visibleProduct)
  }, [page])

  const getSelectedProducts = async (): Promise<void> => {
    if (page === 0) {
      await fetchData(0)
    }
    setPage(0)
  }
  React.useEffect(() => {
    console.log('delete')
    const subSet = new Set(deleteList)
    let resultArray = []
    if (currentProducts !== undefined) {
      resultArray = currentProducts.filter((item) => !subSet.has(item.id))
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
      setIsLoading(true)
      await fetchData(0)
    } catch (error) {
    }
  }

  const label = <>{page + 1}/{Math.ceil(count / 10)}</>
  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <Divider />
        <PickingResource handleUpdateProduct={getSelectedProducts} productList={getProductList} showVariants={toggleShowVariants}
        // activeButton={show}
        />
      </Box>
      <Box sx={{ width: '100%' }}>
        {isLoading
          ? <div style={{ marginLeft: '50%' }}>
            <Spinner/>
          </div>
          : <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>

            {(visibleProduct !== undefined) && visibleProduct.length > 0 && visibleProduct.map((product: Product) => {
              const labelId = `checkbox-list-secondary-label-${product.id}`
              return (
                <>

                <ListItem
                  key={product.id}
                  secondaryAction={
                    <>
                    <IconButton edge="end" aria-label="delete" onClick={() => {
                      setDeleteList(preSet => [...preSet, product.id])
                    }}>
                      <DeleteIcon/>
                    </IconButton>
                    {/* <IconButton edge="end" aria-label="delete" onClick={() => {
                      handleClick()
                    }}> */}
                      {/* {show ? <ExpandLess /> : <ExpandMore />} */}
                    {/* </IconButton> */}

                    </>
                  }
                  disablePadding
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        alt={''}
                        src={`${(product.imageURL !== null) ? product.imageURL : imageNotFound}`}
                      />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={<Typography
                      variant="body1">{`${(product.title !== null) ? product.title : 'Default Product Title'}`}</Typography>}/>
                  </ListItem>
                </ListItem>
                {JSON.parse(product.variants).map((variant: Variant) => {
                  const variantID = `checkbox-list-secondary-label-${variant.id}`
                  return (
                    <>
                    <div style={{ marginLeft: '60px' }}>
                      <Collapsible
                      id={variantID}
                      open={show}
                      transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                      expandOnPrint
                      >
                        <Listbox accessibilityLabel='Variant List' >
                        <Listbox.Option value={variantID} >{`${(variant.title !== null) ? variant.title : 'Default Variant Title'}`}</Listbox.Option>
                        {/* <Listbox.Loading accessibilityLabel='Loading' /> */}
                      </Listbox>
                      </Collapsible>
                    </div>
                    </>
                  )
                })}
                <br/>
                <Divider/>
                </>
              )
            })}

          </List>
        }
        <br/>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ width: '100%' }}
        >
          <Pagination
            label={label}
            hasPrevious={page !== 0}
            onPrevious={() => {
              setPage((prePage) => prePage - 1)
            }}
            hasNext={(page + 1) * 10 < count}
            onNext={() => {
              setPage((prePage) => prePage + 1)
            }}
          />
        </Box>
      </Box>
    </Box>
    {deleteList.length > 0 &&
          <ContextualSaveBar
          alignContentFlush
          message="Save changes"
          saveAction={{
            onAction: () => {
              handleRemove(deleteList)
            }
          }
          }
          discardAction={{
            onAction: () => {
              setDeleteList([])
            }
          }}
        />}
    </>
  )
}
