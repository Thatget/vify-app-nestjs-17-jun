import * as React from 'react'
import { type ReactElement, useCallback, useState } from 'react'
import QuoteTable from '../components/Quote/QuoteTable'
import { useAuthenticatedFetch } from '../hooks'
import type Quote from '../types/Quote'
import { Page, Toast, Layout, TextField, AlphaCard, Grid, Icon } from '@shopify/polaris'
import useDebounce from '../hooks/useDebounce'
import { StoreContext } from '../store'
import moment from 'moment-timezone'
import {
  SearchMinor
} from '@shopify/polaris-icons'
import DateRangePicker from '../components/widget/DateRangePicker'

interface QuoteData {
  quotes: Quote[]
  count: number
}

interface DateRange {
  title: string
  alias: string
  period: {
    since: Date
    until: Date
  }
}

export interface Sort {
  sortBy: string
  type: 'DESC' | 'ASC'
}

export default function Quotes (): ReactElement | null {
  const today = new Date(new Date().setHours(0, 0, 0, 0))
  const fetch = useAuthenticatedFetch()
  const [isLoading, setIsLoading] = React.useState(true)
  const [quotes, setQuote] = React.useState<Quote[]>([])
  const [skip, setSkip] = React.useState<number>(0)
  const [count, setCount] = React.useState<number>(0)
  const [active, setActive] = useState(false)
  const [textSearch, setTextSearch] = useState<string>('')
  const [range, setRange] = useState<DateRange>({
    title: 'Today',
    alias: 'today',
    period: {
      since: today,
      until: today
    }
  })
  const [sort, setSort] = useState<Sort>({ sortBy: 'created_by', type: 'DESC' })
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

  const fetchData = useCallback(async (skip: number, text?: string, since?: Date, until?: Date, sort?: Sort): Promise<[Quote[], number]> => {
    try {
      let url = `/api/quote?skip=${skip}`
      if (text) url += `&textSearch=${encodeURIComponent(text)}`
      if (sort != null) url += `&sortBy=${encodeURIComponent(sort.sortBy)}&sortType=${encodeURIComponent(sort.type)}`
      if (since != null) url += `&since=${encodeURIComponent(since.toISOString())}`
      if (until != null) url += `&until=${encodeURIComponent(until.toISOString())}`
      const response = await fetch(url, { method: 'GET' })
      const temp: QuoteData = await response.json()
      const quotes: Quote[] = temp.quotes.map(item => ({
        ...item,
        created_at: moment(item.created_at).tz(state.store?.ianaTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone).format('ddd MMM DD YYYY').toString()
      }))
      const count = (temp.count !== undefined) ? temp.count : 0
      return [quotes, count]
    } catch (error) {
      console.error('Error fetching data:', error)
      return [[], 0]
    }
  }, [])

  const handleSort = useCallback((sort: Sort) => { setSort(sort) }, [])

  const handleSearch = useCallback((newValue: string) => {
    setSkip(0)
    setTextSearch(newValue)
  }, [])

  const handleChangeDateRange = useCallback((dateRange: DateRange) => {
    setRange({ ...dateRange })
  }, [])

  React.useEffect(() => {
    const fetchQuote = async (): Promise<void> => {
      const [quotes, count] = await fetchData(skip, debouncedSearchTerm, range.period.since, range.period.until, sort)
      setQuote(quotes)
      setCount(count)
    }
    fetchQuote()
  }, [skip, debouncedSearchTerm, range, sort])
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
    <Page fullWidth>
      <Layout sectioned>
        <AlphaCard>
          <div style={{ padding: '10px', zIndex: '-1' }}>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 5, sm: 3, md: 3, lg: 6, xl: 6 }}>
                <DateRangePicker initDateRange={range} onChangeDate={handleChangeDateRange} />
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 5, sm: 3, md: 3, lg: 6, xl: 6 }}>
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
            <QuoteTable quotes={quotes} removeQuote={removeQuote}
              setSkip={setSkip} skip={skip} count={count}
              isLoading={isLoading} handleSortBy={handleSort}/>
          </div>
        </AlphaCard>
        {toastMarkup}
      </Layout>
    </Page>
  )
};
