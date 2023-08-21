interface Quote {
  selected_product: any
  id: number
  name: string
  product: {
    selected_product: {
      id: number
      title: string
      image: string
    }
    selected_variant: {
      id: number
      title: string
      price: number
    }
  }
  email: string
  message: string
  status: number
  created_at: Date
}

export default Quote
