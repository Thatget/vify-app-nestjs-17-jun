import * as React from 'react'
import Box from '@mui/material/Box'

import { useAuthenticatedFetch } from '../../hooks'
import type Product from '../../types/Product'
import { Pagination, Spinner, ContextualSaveBar } from '@shopify/polaris'
import PickingResource from './ResourcePicker'

import ProductList from './ProductList'

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
  const [active, setActive] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const [productList, setProductList] = React.useState<Product[]>()
  const [state, setState] = React.useState(false)

  const toggleShowVariants = (showVariants): void => {
    setShow(showVariants)
  }
  // const activeButton = React.useCallback((childData: boolean) => {
  //   setActive(childData)
  // }, [])
  const activeButton = (childData: boolean): void => {
    setActive(childData)
  }
  const changeState = (): void => {
    setState(state => !state)
  }
  // const pushDeleteList = React.useCallback((childData: number[]): void => {
  //   console.log('childData',childData)
  //   setDeleteList(childData)
  // }, [])
  const pushDeleteList = (childData: number[]): void => {
    console.log('childData', childData)
    setDeleteList(childData)
  }
  const getProductList = (selectedItems: Product[]): void => {
    setProductList(selectedItems)
    console.log('selectedItems', selectedItems)
    const temp: Product[] = selectedItems.map(product => {
      const convertedVariant = {
        id: product.id,
        imageURL: product.imageURL,
        productDescription: product.productDescription,
        title: product.title,
        variants: JSON.stringify(product.variants)
      }
      return convertedVariant
    })

    setVisibleProduct(temp)
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
    console.log('deleteList', deleteList)
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

  const handleClick = (): void => {
    console.log('Clicked')
  }

  const label = <>{page + 1}/{Math.ceil(count / 10)}</>

  return (

    <>
    {/* <Box sx={{ width: '100%' }}> */}
      <Box sx={{ width: '100%' }}>
        {/* <Divider /> */}
        <PickingResource handleUpdateProduct={getSelectedProducts} productList={getProductList} showVariants={toggleShowVariants}
        active={active} state={state}
        />
      </Box>
      <Box sx={{ width: '100%' }}>
        {isLoading
          ? <div style={{ marginLeft: '50%' }}>
            <Spinner/>
          </div>
          // : undefined
          : <ProductList visibleProduct={visibleProduct} activePicker={activeButton} deleteList={pushDeleteList} state={changeState}/>
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
