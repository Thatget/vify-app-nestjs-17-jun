import { Collapsible, LegacyCard, Listbox, Text, ResourceItem, ResourceList, Button } from '@shopify/polaris'
import React, { type ReactElement } from 'react'
import type Product from 'types/Product'
import type Variant from 'types/Variant'
import Avatar from '@mui/material/Avatar'
import imageNotFound from '../../assets/imageNotFound.png'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
// import Variant from 'types/Variant';

function VariantRows (props: { variant: Variant, key: number, isShowVariant: boolean }): ReactElement | null {
  const { variant, isShowVariant } = props
  // const [open, setOpen] = React.useState(props.isShowVariant)
  const [checked, setChecked] = React.useState(false)
  const handleChange = React.useCallback(
    (newChecked: boolean) => { setChecked(newChecked) }
    , [])
  // const variantID = (variant !== undefined)? `checkbox-list-secondary-label-${variant.id}`
  const variantID = `checkbox-list-secondary-label-${variant.id}`
  return (
    <>
      <div style={{ marginLeft: '60px' }}>
                      <Collapsible
                      id={variantID}
                      open={isShowVariant}
                      transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
                      expandOnPrint
                      >
                        <Listbox accessibilityLabel='Variant List' >
                        <Listbox.Option value={variantID} >
                        <Checkbox
                          label= {`${(variant.title !== null) ? variant.title : 'Default Variant Title'}`}
                          checked={checked}
                          onChange={handleChange}
                          />
                          </Listbox.Option>
                      </Listbox>
                      </Collapsible>
                    </div>
    </>
  )
}

export default function ProductList (props: { visibleProduct: Product[] }): ReactElement {
  const { visibleProduct } = props
  const resourceName = {
    singular: 'Product',
    plural: 'Products'
  }
  const itemList = []
  visibleProduct.map(result => {
    const temp = {
      variants: result.variants,
      id: result.id,
      title: result.title,
      url: '#',
      imageURL: result.imageURL,
      description: result.productDescription
    }
    itemList.push(temp)
  })

  return (
  <>
  <LegacyCard>
    <ResourceList
    items = { itemList }
    renderItem={function (item): React.ReactNode {
      const { variants, id, title, url, imageURL, description } = item
      const media = <Avatar
              alt={''}
              src={`${(imageURL !== null) ? imageURL : imageNotFound}`}
            />
      const shortcutActions = latestOrderUrl
        ? [
            {
              content: 'Show Variants',
              accessibilityLabel: `View ${title}'s variants`,
              url: '#'
            }
          ]
        : undefined

      return (
        <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View Details for ${title}`}
        >
          <Text variant="bodyMd" fontWeight="bold" as="h3" >
            {title}
          </Text>
          <div>{description}</div>

          <IconButton edge="end" aria-label="delete" onClick={() => {
            // setDeleteList(preSet => [...preSet, product.id])

          }}>
      <DeleteIcon/>
    </IconButton>
          {variants.map(variant => (
                        <VariantRows key={variant.id} variant={variant} isShowVariant={true} />
          )
          )}
        </ResourceItem>
      )
      // throw new Error('Function not implemented.')
    }}
    resourceName={resourceName}
    alternateTool={<Button>Add Products</Button>}
    />
  </LegacyCard>

</>
  )
}
