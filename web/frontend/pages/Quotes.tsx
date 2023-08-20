import * as React from 'react'
import { type ReactElement, useCallback, useEffect, useState } from 'react'
import QuoteTable from '../components/Quote/QuoteTable'
import { useAuthenticatedFetch } from '../hooks'
import type Quote from '../types/Quote'
import { Page, Toast, Layout, TextField } from '@shopify/polaris'
import type ParsedQuote from '../types/ParsedQuote'
import useDebounce from '../hooks/useDebounce'

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
  const [textSearch, setTextSearch] = useState<string>('');
  const debouncedSearchTerm = useDebounce(textSearch, 500)
  const toggleActive = useCallback(() => {
    setActive((active) => !active)
  }, [])
  const toastMarkup = active
    ? (
      <Toast content="Deleted Successfully" onDismiss={toggleActive}/>
      )
    : null

  const fetchData = useCallback(async (skip: number, text?: string) => {
    try {
      const encodedSearchText = encodeURIComponent(text);
      const response = await fetch(`/api/quote?skip=${skip}&textSearch=${encodedSearchText}`, { method: 'GET' })
      const temp = await response.json()
      setData(temp)
      setCount((temp.count !== undefined) ? temp.count : 0)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [])

  const handleSearch = useCallback((newValue: string) => {
    setSkip(0)
    setTextSearch(newValue)
  }, []);

  React.useEffect(() => {
    void fetchData(skip, debouncedSearchTerm).then(r => {})
  }, [skip, debouncedSearchTerm])
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
    setQuote(preQuote)
  }, [data])
  return (
    <Page>
      <Layout sectioned>
        <>
          <TextField
            label="Search"
            value={textSearch}
            onChange={handleSearch}
            autoComplete="off"
          />
        </>
        <QuoteTable quotes={quotes} removeQuote={removeQuote} setSkip={setSkip} skip={skip} count={count}
                    isLoading={isLoading}/>
        {toastMarkup}
      </Layout>
    </Page>
  )
};
