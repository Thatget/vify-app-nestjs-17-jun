/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { type ReactElement, useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { useAuthenticatedFetch } from '../../hooks'
import type ProductSelect from '../../types/ProductSelect'
import type Product from 'types/Product'
import { Button, ContextualSaveBar, Divider, Loading, Toast } from '@shopify/polaris'

interface ResourcePickerProp {
  handleUpdateProduct: () => void
}

export default function ResourcePicker ({ handleUpdateProduct }: ResourcePickerProp): ReactElement | null {
  const fetch = useAuthenticatedFetch()
  const [open, setOpen] = useState(false)
  const [initialSelectionIds, setInitialSelectionIds] = useState<ProductSelect[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [active, setActive] = useState(false)
  const toggleActive = useCallback(() => {
    setActive((active) => !active)
  }, [])
  const toastMarkup = active
    ? (
      <Toast content="Save Successfully" onDismiss={toggleActive}/>
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
      }
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

  const handleSave = async (deleteList: ProductSelect[], newList: any[]): Promise<void> => {
    const deleeteIds = deleteList.map(list => (list.id.split('/')[list.id.split('/').length - 1]))
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
        body: JSON.stringify(newList),
        headers: { 'Content-Type': 'application/json' }
      }
    )
    handleUpdateProduct()
  }

  const handleSelection = async (resources: any): Promise<void> => {
    const selection = (resources !== undefined) ? resources.selection : []
    const newOrUpdate = []
    const deleteProducts = initialSelectionIds.filter(initSelect => {
      if (selection !== undefined) {
        selection.find((item: { id: string }) => item.id === initSelect.id)
      }
    })
    if (selection !== null) {
      selection.map(select => {
        let checkUpdate = false
        const initId = initialSelectionIds.find(item => item.id === select.id)
        if (initId != null) {
          if (initId.variants.length !== select.variants.length) {
            checkUpdate = true
            setActive(true)
          } else {
            for (let i = 0; i < initId.variants.length; i++) {
              const element = initId.variants[i]
              if (select.variants !== undefined) {
                select.variants.find(variant => variant.id === element.id)
                checkUpdate = true
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

      await handleSave(deleteProducts, productList)
      setOpen(false)
    }
  }

  return (
        <>
        <Divider />
        <br/>
            <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end"
            >
                <Button onClick={() => {
                  setOpen(true)
                }}
                >Add Products</Button>
            </Box>
            <ResourcePicker
                resourceType={'Product'}
                open={open}
                onCancel={() => { setOpen(false) }}
                onSelection={(resources) => { handleSelection(resources) }}
                selectMultiple={true}
                initialSelectionIds={initialSelectionIds}
            />
            { active &&
        <ContextualSaveBar
          alignContentFlush
          message="Unsaved changes"
          saveAction={
            {
              onAction: () => {
                handleSelection()
                toggleActive()
              },
              loading: false
            }
          }
          discardAction={{
            onAction: () => {
              handleSelection()
            }
          }}
        />}
        </>
  )
}
