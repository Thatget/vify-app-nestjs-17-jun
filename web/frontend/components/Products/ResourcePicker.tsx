/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { useAuthenticatedFetch } from '../../hooks'
import type ProductSelect from '../../types/ProductSelect'
import type Product from 'types/Product'
import { Button, ContextualSaveBar, Loading, Toast, ButtonGroup } from '@shopify/polaris'
import { ResourcePicker } from '@shopify/app-bridge-react'
import { type SelectPayload } from '@shopify/app-bridge/actions/ResourcePicker'

interface ResourcePickerProp {
  handleUpdateProduct: () => Promise<void>
  productList: (selectedItems: Product[]) => void
  showVariants: (show: boolean) => void
  // activeButton: boolean
}

const PickingResource: React.FC<ResourcePickerProp> = (props) => {
  const fetch = useAuthenticatedFetch()
  const [open, setOpen] = useState(false)
  const [initialSelectionIds, setInitialSelectionIds] = useState<ProductSelect[]>([])
  const [updatedList, setUpdatedList] = useState<SelectPayload>()
  const [isLoading, setIsLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [active, setActive] = useState(false)
  const [activeToast, setActiveToast] = useState(false)
  const [activeToastUnchanged, setActiveToastUnchanged] = useState(false)

  const toggleShowVariants = useCallback(() => {
    setShow(show => {
      props.showVariants(!show)
      console.log('set Show again?')
      return !show
    })
  }, [])

  const toggleActiveToast = useCallback(() => {
    setActiveToast((activeToast) => !activeToast)
    setIsLoading((isLoading) => !isLoading)
  }, [])
  const toggleActiveToastUnchanged = useCallback(() => {
    setActiveToastUnchanged((activeToastUnchanged) => !activeToastUnchanged)
  }, [])
  const toastMarkup = activeToast
    ? (
      <Toast content="Save Successfully" onDismiss={toggleActiveToast}/>
      )
    : null
  const toastUnchanged = activeToastUnchanged
    ? (
      <Toast content="Unchanged" onDismiss={toggleActiveToastUnchanged}/>
      )
    : null
  const loadingMarkup = isLoading
    ? (
    <Loading />
      )
    : null

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await fetch('/api/products/product_picked', { method: 'GET' })
      const data = await response.json()
      if (data !== undefined) {
        const initSelected = data.map((product: { id: number, variants: Array<{ id: string, title: string }> }) => {
          const id = 'gid://shopify/Product/' + product.id.toString()
          const variantsArray: Array<{ id: string, title: string }> = (product.variants !== undefined) ? product.variants : []
          const variants = variantsArray.map((variant: { id: string, title: string }) => ({ ...variant, id: 'gid://shopify/ProductVariant/' + variant.id }))
          return { id, variants }
        })
        setInitialSelectionIds(initSelected)
        setUpdatedList(initSelected)
      }
      console.log('data from product_picked', data)
      return data
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    if (open) {
      fetchProducts()
    }
  }, [open])

  const handleSave = useCallback(async (deleteList: ProductSelect[], newList: Product[]): Promise<void> => {
    console.log('handleSave')
    const deleeteIds = deleteList.map(list => (list.id.split('/')[list.id.split('/').length - 1]))
    // if (save) {
    await fetch('/api/products/delete',
      {
        method: 'Post',
        body: JSON.stringify(deleeteIds),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    await fetch('/api/products/insert',
      {
        method: 'Post',
        body: JSON.stringify({
          products: newList
        }),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    console.log('if save, come here')
  }, [])

  const handleSelection = useCallback(async (resources: SelectPayload, isSave: boolean): Promise<void> => {
    console.log('come handle selection')
    const selection = (resources !== undefined) ? resources.selection : []
    console.log('selection', selection)
    const newOrUpdate = []
    console.log('initialSelectionIds', initialSelectionIds)
    const deleteProducts = initialSelectionIds.filter(initSelect => 
      !selection.find((item: { id: string }) => item.id === initSelect.id))
    console.log('deleteProducts', deleteProducts)

    if (selection !== null) {
      selection.map(select => {
        let checkUpdate = false
        const initId = initialSelectionIds.find(item => item.id === select.id)
        if (initId != null) {
          if (initId.variants.length !== select.variants.length) {
            checkUpdate = true
            console.log('setactive')
            setActive(true)
          } else {
            for (let i = 0; i < initId.variants.length; i++) {
              const element = initId.variants[i]
              if (select.variants !== undefined) {
                select.variants.find(variant => variant.id === element.id)
                checkUpdate = true
                console.log('setactive true')
                setActive(true)
                break
              }
            }
          }
          if (checkUpdate) {
            newOrUpdate.push(select)
          }
        } else {
          newOrUpdate.push(select)
          setActive(true)
        }
      })
      const productList = newOrUpdate.map(selectedProduct => {
        const parts = selectedProduct.id.split('/')
        const variants = selectedProduct.variants
          .map((variant: { id: any, title: any }) => ({ id: variant.id.split('/')[variant.id.split('/').length - 1], title: variant.title }))
        const currentProduct: Product = {
          id: parts[parts.length - 1],
          variants,
          productDescription: selectedProduct.descriptionHtml,
          imageURL: (selectedProduct !== undefined) ? selectedProduct.images[0]?.originalSrc : null,
          title: selectedProduct.title
        }
        return currentProduct
      })
      console.log('productList', productList)
      
      if (isSave) {
        await handleSave(deleteProducts, productList)
        props.handleUpdateProduct()
        setActive(false)
      }
      // productList(productList)
      props.productList(productList)
      setOpen(false)
    }
  }, [initialSelectionIds])

  return (
        <>
        <br/>
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
            >
              <ButtonGroup>
              {/* <Button onClick={() => {
                toggleShowVariants()
              }}
                >{!show ? 'Show Variants' : 'Hide Variants'}</Button> */}
                <Button onClick={() => {
                  setOpen(true)
                }} primary
                >Add Products</Button>
                </ButtonGroup>
            </Box>
            <ResourcePicker
                resourceType='Product'
                open={open}
                onCancel={() => { setOpen(false) }}
                onSelection={(resources: SelectPayload) => {
                  handleSelection(resources, false)
                  setUpdatedList(resources)
                  console.log('resources', resources)
                }}
                selectMultiple={true}
                initialSelectionIds={initialSelectionIds}
            />
            { active &&
        <ContextualSaveBar
          alignContentFlush
          message="Save changes"
          saveAction={
            {
              onAction: () => {
                console.log('save - contextualSaveBar')
                handleSelection(updatedList, true)
                toggleActiveToast()
              },
              loading: false
            }
          }
          discardAction={{
            onAction: () => {
              console.log('unchanged')
              toggleActiveToastUnchanged()
              handleSelection(updatedList, true)
            }
          }}
        />}
        {toastMarkup}
        {/* {loadingMarkup} */}
        {toastUnchanged}
        </>
  )
}
export default PickingResource
