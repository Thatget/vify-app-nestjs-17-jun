import { Text } from '@shopify/polaris'
import React, { type ReactElement } from 'react'

const AllProductsSelected = (
  <div style={{ textAlign: 'center' }}>
            <Text variant="headingLg" as="h5">
                Vify Quotes will apply to All of Your Products
            </Text>
            </div>
)
export default function AllProducts (): ReactElement | null {
  return (
    <>
      <br/>
          {AllProductsSelected}
          <br/>
    </>
  )
}
