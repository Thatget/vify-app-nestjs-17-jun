import * as React from 'react'
import { type ReactElement, useCallback, useEffect, useState } from 'react'
import QuoteTable from '../components/Quote/QuoteTable'
import { useAuthenticatedFetch } from '../hooks'
import type Quote from '../types/Quote'
import { Page, Toast, Layout } from '@shopify/polaris'
import type ParsedQuote from '../types/ParsedQuote'

interface QuoteData {
  quotes: Quote[]
  count: number
}

export default function Quotes (): ReactElement | null {
  const fetch = useAuthenticatedFetch()
  const [isLoading, setIsLoading] = React.useState(true)
  const [quotes, setQuote] = React.useState<ParsedQuote[]>([])
  const [skip, setSkip] = React.useState<number>(0)
  const [count, setCount] = React.useState<number>(0)
  const [data, setData] = useState<QuoteData>()
  const [active, setActive] = useState(false)
  const toggleActive = useCallback(() => {
    setActive((active) => !active)
  }, [])
  const toastMarkup = active
    ? (
      <Toast content="Deleted Successfully" onDismiss={toggleActive}/>
      )
    : null

  const fetchData = useCallback(async (skip: number) => {
    try {
      const response = await fetch(`/api/quote?skip=${skip}`, { method: 'GET' })
      const temp = await response.json()
      setData(temp)
      console.log('Data', temp)
      setCount((temp.count !== undefined) ? temp.count : 0)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [])
  React.useEffect(() => {
    // setIsLoading(true)
    void fetchData(skip).then(r => {
    })
  }, [skip])
  const removeQuote = async (id: number): Promise<boolean> => {
    try {
      await fetch('/api/quote/deleteEach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
    } catch (error) {
    } finally {
      toggleActive()
      setIsLoading(true)
      await fetchData(skip)
    }
    return true
  }
  useEffect(() => {
    const preQuote = (data !== undefined) ? data.quotes : []
    const updatedQuote = preQuote.map(q => {
      const parsedProduct = JSON.parse(q.product)
      console.log('parsedProduct', parsedProduct)
      const parsedQuote: ParsedQuote = { ...q, product: parsedProduct }
      return parsedQuote
    })
    setQuote(updatedQuote)
  }, [data])
  return (
    <Page>
      <Layout sectioned>
        <QuoteTable quotes={quotes} removeQuote={removeQuote} setSkip={setSkip} skip={skip} count={count}
                    isLoading={isLoading}/>
        {toastMarkup}
      </Layout>
    </Page>
  )
};
