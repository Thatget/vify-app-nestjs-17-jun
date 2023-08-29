import * as React from 'react'
import { type ReactElement, useCallback, useEffect, useState } from 'react'
import QuoteTable from '../components/Quote/QuoteTable'
import { useAuthenticatedFetch } from '../hooks'
import type Quote from '../types/Quote'
import { Page, Toast, Layout, TextField, AlphaCard } from '@shopify/polaris'
import useDebounce from '../hooks/useDebounce'
import { StoreContext } from '../store'
import { formatInTimeZone } from 'date-fns-tz'

interface QuoteData {
  quotes: Quote[]
  count: number
}

export default function Quotes (): ReactElement | null {
  const fetch = useAuthenticatedFetch()
  const [isLoading, setIsLoading] = React.useState(true)
  const [quotes, setQuote] = React.useState<Quote[]>([])
  const [skip, setSkip] = React.useState<number>(0)
  const [count, setCount] = React.useState<number>(0)
  const [active, setActive] = useState(false)
  const [textSearch, setTextSearch] = useState<string>('')
  const debouncedSearchTerm = useDebounce(textSearch, 500)
  const { state } = React.useContext(StoreContext)
  const toggleActive = useCallback(() => {
    setActive((active) => !active)
  }, [])
  const toastMarkup = active
    ? (
      <Toast content="Deleted Successfully" onDismiss={toggleActive}/>
      )
    : null

  const fetchData = useCallback(async (skip: number, text?: string): Promise<[Quote[], number]> => {
    try {
      const encodedSearchText = encodeURIComponent(text)
      const response = await fetch(`/api/quote?skip=${skip}&textSearch=${encodedSearchText}`, { method: 'GET' })
      const temp: QuoteData = await response.json()
      const quotes: Quote[] = temp.quotes.map(item => ({
        ...item,
        created_at: formatInTimeZone(item.created_at, state.store?.ianaTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone, 'yyyy-MM-dd HH:mm:ss zzz')
      }))
      const count = (temp.count !== undefined) ? temp.count : 0
      return [quotes, count]
    } catch (error) {
      console.error('Error fetching data:', error)
      return [[], 0]
    }
  }, [])

  const handleSearch = useCallback((newValue: string) => {
    setSkip(0)
    setTextSearch(newValue)
  }, [])

  React.useEffect(() => {
    const fetchQuote = async (): Promise<void> => {
      const [quotes, count] = await fetchData(skip, debouncedSearchTerm)
      setQuote(quotes)
      setCount(count)
    }
    fetchQuote()
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

  return (
    <Page>
      <Layout sectioned>
        <AlphaCard>
          <div style={{ padding: '10px', zIndex: '-1' }}>
            <TextField
              label="Search"
              value={textSearch}
              onChange={handleSearch}
              autoComplete="off"
            />

            <QuoteTable quotes={quotes} removeQuote={removeQuote} setSkip={setSkip} skip={skip} count={count}
              isLoading={isLoading}/>
          </div>
        </AlphaCard>
        {toastMarkup}
      </Layout>
    </Page>
  )
};
