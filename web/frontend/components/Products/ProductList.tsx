/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
  Collapsible,
  Listbox,
  Text,
  ResourceItem,
  ResourceList,
  Button,
  Checkbox,
  type ResourceListProps,
  ButtonGroup,
  Grid,
  Tooltip
} from '@shopify/polaris'
import React, { type ReactElement } from 'react'
import type Product from 'types/Product'
import type Variant from 'types/Variant'
import Avatar from '@mui/material/Avatar'
import imageNotFound from '../../assets/imageNotFound.png'
import '../../css/productlist.css'
import DeleteIcon from '@mui/icons-material/Delete'
// import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";

interface Item {
  variants: Variant[]
  id: string
  title: string
  url: string
  imageURL: string
  description: string
  latestOrderUrl: string
}

export default function ProductList (props: {
  visibleProduct: Product[]
  activePicker: (childData: boolean) => void
  state: () => void
  deleteList: (deleteItems: number[]) => void
}): ReactElement {
  const { visibleProduct, activePicker, deleteList } = props
  const [selectedItems, setSelectedItems] = React.useState<
  ResourceListProps['selectedItems']
  >([])
  const [isShowVariant, setShowVariant] = React.useState(-1)
  const [isShow, setIsShow] = React.useState(true)
  const toggleIsShow = React.useCallback(() => {
    setIsShow(isShow => !isShow)
  }, [])
  const toggleShowVariant = React.useCallback((id) => {
    console.log('toggle')
    setShowVariant(id)
  }, [])
  const resourceName = {
    singular: 'product',
    plural: 'products'
  }
  const promotedBulkActions = [
    {
      content: 'Delete Products',
      onAction: () => {
        const temp = []
        if (selectedItems.length > 0) {
          for (let i = 0; i < selectedItems.length; i++) {
            temp.push(parseInt(selectedItems[i]))
          }
          deleteList(temp)
        }
      }
    }
  ]
  const bulkActions = [
    {
      content: 'Edit Product',
      onAction: () => {
        console.log('Edit product')
      }
    }
  ]
  const itemList = []
  visibleProduct.map((result) => {
    const temp = {
      variants: JSON.parse(result.variants),
      id: result.id.toString(),
      title: result.title,
      url: '#',
      imageURL: result.imageURL,
      description: result.productDescription,
      latestOrderUrl: '#'
    }
    itemList.push(temp)
  })
  const items = itemList
  // const items = [
  //   {
  //     variants: [],
  //     id: '101',
  //     title: 'abc',
  //     url: '#',
  //     imageURL: '',
  //     description: 'abc',
  //     latestOrderUrl: '#'
  //   },
  //   {
  //     variants: [],
  //     id: '102',
  //     title: 'abc',
  //     url: '#',
  //     imageURL: '',
  //     description: 'abc',
  //     latestOrderUrl: '#'
  //   },
  //   {
  //     variants: [],
  //     id: '103',
  //     title: 'abc',
  //     url: '#',
  //     imageURL: '',
  //     description: 'abc',
  //     latestOrderUrl: '#'
  //   }
  // ]

  return (
    <>
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        showHeader
        headerContent={`Showing ${items.length} products`}
        promotedBulkActions={promotedBulkActions}
        // bulkActions={bulkActions}
        alternateTool={
          // <ButtonGroup>
          //   <Button
          //     onClick={() => {
          //       toggleShowVariant()
          //     }}
          //   >
          //     {!isShowVariant ? 'Show All Variants' : 'Hide All Variants'}
          //   </Button>
            <Button
              onClick={() => {
                activePicker(true)
                props.state()
                console.log('togglePicker')
              }}
              primary
            >
              Add Products
            </Button>
          // </ButtonGroup>
        }
      />
    </>
  )

  function renderItem (item: Item): ReactElement | null {
    const { variants, id, title, url, imageURL, description, latestOrderUrl } =
      item
    const media = (
      <Avatar
        alt={''}
        src={`${imageURL !== null ? imageURL : imageNotFound}`}
      />
    )
    const shortcutActions =
      latestOrderUrl !== undefined
        ? [
            {
              content: 'Show Variants',
              accessibilityLabel: `View ${title}'s variants`,
              url: latestOrderUrl
            }
          ]
        : undefined

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        onClick={() => {
          toggleShowVariant(id)
          toggleIsShow()
        }}
        accessibilityLabel={`View Details for ${title}`}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          {/* <Tooltip dismissOnMouseOut content={((isShowVariant.toString() === id) && isShow) ? 'Click to hide variants' : 'Click to show Variants'} > */}
          <Text variant="bodyMd" fontWeight="medium" as="h3">
            {title}
          </Text>
          {/* </Tooltip> */}
          <br />
        </div>
        {/* <br/> */}
        <div style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Collapsible
            id={id.toString()}
            open={isShow}
            transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
            expandOnPrint
            >
          {variants.map((variant, index) => (
            <VariantRows
              key={variant.id}
              variant={variant}
            />
          ))}
           </Collapsible>
        </div>
      </ResourceItem>
    )
  }
}

function VariantRows (props: {
  variant: Variant
  key: number
}): ReactElement | null {
  const { variant } = props
  const variantID = `checkbox-list-secondary-label-${variant.id}`
  return (
    <>
        <Listbox accessibilityLabel="Variant List">
            <Listbox.Option value={variantID}>
        <div style={{ marginLeft: '30px' }}>
        {variant.title}
        </div>
            </Listbox.Option>
          </Listbox>
    </>
  )
}
