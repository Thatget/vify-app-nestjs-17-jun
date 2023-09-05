import type Variant from './Variant'

interface ProductWithVariantArray {
  id: number
  productDescription: string
  imageURL: string
  title: string
  variants: Variant
}

export default ProductWithVariantArray
