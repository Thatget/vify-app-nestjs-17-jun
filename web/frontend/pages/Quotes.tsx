import * as React from 'react'
import { type ReactElement, useCallback, useEffect, useState } from 'react'
import QuoteTable from '../components/Quote/QuoteTable'
import { useAuthenticatedFetch } from '../hooks'
import type Quote from '../types/Quote'
import { Page, Toast, Layout, TextField, AlphaCard, Grid, Icon } from '@shopify/polaris'
import useDebounce from '../hooks/useDebounce'
import { StoreContext } from '../store'
import { formatInTimeZone } from 'date-fns-tz'
import moment from 'moment-timezone';
import {
  SearchMinor
} from '@shopify/polaris-icons';
import DateRangePicker from '../components/widget/DateRangePicker'

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
  const [textSearch, setTextSearch] = useState<string>('');
  const [period, setPeriod] = useState<{since: string, until: string}>(null)
  const debouncedSearchTerm = useDebounce(textSearch, 500)
  const {state} = React.useContext(StoreContext)
  const toggleActive = useCallback(() => {
    setActive((active) => !active)
  }, [])
  const toastMarkup = active
    ? (
      <Toast content="Deleted Successfully" onDismiss={toggleActive}/>
      )
    : null

  const fetchData = useCallback(async (skip: number, text?: string):Promise<[Quote[], number]> => {
    try {
      var url = `/api/quote?skip=${skip}`
      if (text) url += `&textSearch=${encodeURIComponent(text)}`
      if (period) {
        if (period.since) url += `&since=${encodeURIComponent(period.since)}`
        if (period.until) url += `&until=${encodeURIComponent(period.until)}`
      }
      const response = await fetch(url, { method: 'GET' })
      const temp:QuoteData = await response.json()
      const quotes:Quote[] = temp.quotes.map(item => ({
        ...item,
        created_at: moment(item.created_at).tz(state.store?.ianaTimezone||Intl.DateTimeFormat().resolvedOptions().timeZone).format('ddd MMM DD YYYY').toString()
      }))
      const count = (temp.count !== undefined) ? temp.count : 0
      return [quotes, count];
    } catch (error) {
      console.error('Error fetching data:', error)
      return [[], 0];
    }
  }, [])

  const handleSearch = useCallback((newValue: string) => {
    setSkip(0)
    setTextSearch(newValue)
  }, []);

  const handleChangeDateRange = useCallback((dateRange: object) => {
    const since = moment.tz(dateRange.period.since, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)', state.store?.ianaTimezone||Intl.DateTimeFormat().resolvedOptions().timeZone).toISOString();
    console.log(since)
    setPeriod({since: dateRange.period.since, until: dateRange.period.until})
  }, [])

  React.useEffect(() => {
    const fetchQuote = async ():Promise<void> => {
      const [quotes, count] = await fetchData(skip, debouncedSearchTerm)
      setQuote(quotes)
      setCount(count)
    }
    fetchQuote()
  }, [skip, debouncedSearchTerm, period])
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
            <Grid>
              <Grid.Cell columnSpan={{xs: 5, sm: 3, md: 3, lg: 6, xl: 6}}>
                <DateRangePicker onChangeDate={handleChangeDateRange} />
              </Grid.Cell>
              <Grid.Cell columnSpan={{xs: 5, sm: 3, md: 3, lg: 6, xl: 6}}>
                <TextField
                  prefix={<Icon source={SearchMinor} />}
                  labelHidden
                  label="Search"
                  value={textSearch}
                  onChange={handleSearch}
                  autoComplete="off"
                />
              </Grid.Cell>
            </Grid>
            <QuoteTable quotes={quotes} removeQuote={removeQuote} setSkip={setSkip} skip={skip} count={count}
              isLoading={isLoading}/>
          </div>
        </AlphaCard>
        {toastMarkup}
      </Layout>
    </Page>
  )
};
