import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import {
  DataTable,
  Divider,
  Grid,
  HorizontalStack,
  LegacyStack,
  Modal,
  Pagination,
  Text,
  Button,
  type TableData,
  Toast,
  Badge,
  VerticalStack,
  Thumbnail
} from '@shopify/polaris'
import Box from '@mui/material/Box'
import { useAuthenticatedFetch } from '../../hooks'
import defaultImg from '../../assets/default.jpg'
import Quote from 'types/Quote'
import { Sort } from 'pages/Quotes'

interface IPropQuoteTable {
  quotes: Quote[]
  removeQuote: (id: number) => Promise<boolean>
  setSkip: any
  count: number
  skip: number
  isLoading: boolean
  handleSortBy: (sort: Sort)=> void;
}

interface IButtonHolderProps {
  label?: string
  height?: string
  width?: string
  childAlign: 'start' | 'center' | 'end'
  copiedValue: string
}

const QuoteTable: React.FC<IPropQuoteTable> = (props) => {
  const fetch = useAuthenticatedFetch()
  const [active, setActive] = useState(false)
  const [toastActive, setToastActive] = useState<boolean>(false)
  const [status, setStatus] = useState<number>(1)
  const [index, setIndex] = useState<number>(1)
  const [propModal, setPropModal] = useState<Quote>(props.quotes[0])
  const [quotesTables, setQuoteTables] = useState<Quote[]>(props.quotes)
  const [rows, setRows] = React.useState<TableData[][]>([])
  const handleSort = useCallback(
    (index: number, direction: 'ascending' | 'descending') => {
      const sortBy = ['id','name','email', 'created_time', 'product','message', 'status'][index];
      const type = direction === 'ascending' ? 'DESC' : 'ASC';
      const sort: Sort = { sortBy, type }
      if (direction)
      props.handleSortBy(sort)
    }, []);
  let activator: JSX.Element
  let countIndex: number
  React.useEffect(() => {
    setQuoteTables(props.quotes)
  }, [props.quotes])

  const toggleModal = useCallback(async (quote: Quote, status: number) => {
    setActive((active) => !active)
    setPropModal(quote)
    await updateStatus(quote.id, 1)
    setStatus(status)
  }, [])
  const deleteQuoteModal = useCallback((quote: Quote, status: number) => {
    setActive((active) => !active)
    setPropModal(quote)
    setStatus(status)
  }, [])
  const toggleActive = useCallback(() => {
    setToastActive((active) => !active)
  }, [])
  const toastMarkup = toastActive
    ? (
    <Toast content="Copied Successfully" onDismiss={toggleActive} />
      )
    : null
  const copyToClipboard = (value: string): void => {
    void navigator.clipboard.writeText(value)
  }
  const Buttonholder: React.FC<IButtonHolderProps> = (props) => {
    const {
      label = '',
      height = 'auto',
      width = 'auto',
      childAlign,
      copiedValue = ''
    } = props
    return (
      <div
        style={{
          background: '',
          height,
          width
        }}
      >
        <HorizontalStack gap="4" align={childAlign}>
          <div
            style={{
              color: 'var(--p-color-text-interactive)'
            }}
          >
            <Button
              onClick={() => {
                toggleActive()
                copyToClipboard(copiedValue)
              }}
            >
              {label}
            </Button>
          </div>
        </HorizontalStack>
      </div>
    )
  }
  useEffect(() => {
    const temp: JSX.Element[][] = []
    countIndex = index
    quotesTables.map((quote: Quote) => {
      const tempColumn: JSX.Element[] = []
      tempColumn[0] = <>{countIndex.toString()}</>
      tempColumn[1] = <>{truncateRowValue(quote.name)}</>
      tempColumn[2] = <>{quote.email}</>
      tempColumn[3] = <>{quote.created_at}</>
      tempColumn[4] = (
        <div style={{}}>
          <Thumbnail
            source={(quote.product.selected_product !== undefined) ? quote.product.selected_product.image : defaultImg}
            alt={quote.product.selected_product ? quote.product.selected_product.title : ''} />
          <p> {truncateRowValue(quote.product.selected_product ? quote.product.selected_product.title : '')} </p>
        </div>
      )
      tempColumn[5] = <>{truncateRowValue(quote.message)}</>
      if (propModal !== undefined) {
        if (propModal.id === quote.id) {
          quote.status = 1
        }
      }
      if (quote.status === 0) {
        tempColumn[6] = (
          <div style={{ color: '#bf0711' }}>
            <Badge status="critical">Unread</Badge>
          </div>
        )
      } else {
        tempColumn[6] = <Badge status="success">Read</Badge>
      }
      activator = tempColumn[7] = (
        <Button
          onClick={() => {
            toggleModal(quote,1)
          }}
          size="slim"
        >
          View
        </Button>
      )
      temp.push(tempColumn)
      countIndex = countIndex + 1
    })
    setRows(temp)
  }, [quotesTables, propModal, status, props.isLoading])

  const updateStatus = useCallback(
    async (id: number, status: number): Promise<boolean> => {
      try {
        await fetch(`/api/quote/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        })
      } catch (error) {
        console.log('error', error)
      }
      return true
    },
    []
  )
  const label = <>{props.skip/5 + 1}/{Math.ceil(props.count/5)}</>
  return (
    <>
      <DataTable
        columnContentTypes={['text', 'text', 'text', 'text', 'text', 'text', 'text', 'text']}
        headings={['No', 'Name', 'Email', 'Time', 'Product', 'Message', 'Status', 'Action']}
        rows={rows}
        footerContent={`Showing ${rows.length} of ${rows.length} results`}
        sortable={[false, true, true, true, true, false, true, false]}
        defaultSortDirection="descending"
        initialSortColumnIndex={3}
        onSort={handleSort}
      />
      <Box padding="4">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 2
          }}
        >
          <Pagination
            label={label}
            hasPrevious={props.skip !== 0}
            onPrevious={() => {
              props.setSkip((preSkip) => preSkip - 5)
              setIndex((prevState) => prevState - 5)
            }}
            hasNext={props.skip + 5 < props.count}
            onNext={() => {
              props.setSkip((prevState) => prevState + 5)
              setIndex((prevState) => prevState + 5)
            }}
          />
        </div>
      </Box>
      {toastMarkup}
      {Boolean(propModal !== undefined) && (
        <div style={{ height: '500px' }}>
          <Modal
            activator={activator}
            open={active}
            onClose={() => {
              toggleModal(propModal, 1)
            }}
            title="View Quote"
            primaryAction={{
              content: 'Close',
              onAction: () => {
                toggleModal(propModal, 1)
              }
            }}
            secondaryActions={[
              {
                content: 'Delete',
                onAction: async () => {
                  await props.removeQuote(propModal.id)
                  deleteQuoteModal(propModal, 1)
                }
              }
            ]}
          >
            <Modal.Section>
              <LegacyStack vertical>
                <LegacyStack.Item>
                  <Text variant="headingLg" as="h5">
                    Product
                  </Text>
                  <Grid>
                    <Grid.Cell
                      columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}
                    >
                      <img
                        src={(propModal.product.selected_product.image !== undefined) ? propModal.product.selected_product.image : defaultImg}
                        alt=""
                        width="80%"
                        height="80%"
                        style={{ borderRadius: '50%' }}
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}
                    >
                      <VerticalStack>
                        <Text as={'h1'}>
                          {(propModal.product.selected_product.title !== undefined) ? propModal.product.selected_product.title : 'Product Title'}
                        </Text>
                        <Text as={'h1'}>
                          {(propModal.product.selected_variant.title !== undefined) ? propModal.product.selected_variant.title : 'Variant Title'}
                        </Text>
                        <Text as={'h1'}>
                          {(propModal.product.selected_variant.id !== undefined) ? propModal.product.selected_variant.id : 'Variant Id'}
                        </Text>
                      </VerticalStack>
                    </Grid.Cell>
                  </Grid>
                </LegacyStack.Item>
                <Divider />
                <LegacyStack.Item>
                  <Grid
                    columns={{ xs: 1, sm: 4, md: 4, lg: 6, xl: 6 }}
                    areas={{
                      xs: ['product', 'sales', 'orders'],
                      sm: [
                        'product product product product',
                        'sales sales orders orders'
                      ],
                      md: ['sales product product orders'],
                      lg: ['product product product product sales orders'],
                      xl: ['product product sales sales orders orders']
                    }}
                  >
                    <Grid.Cell area="product">
                      <VerticalStack>
                        <p>Name</p>
                        <p>{propModal.name}</p>
                      </VerticalStack>
                    </Grid.Cell>
                    <Grid.Cell area="orders">
                      <Buttonholder
                        label="copy"
                        childAlign="end"
                        copiedValue={propModal.name}
                      />
                    </Grid.Cell>
                  </Grid>
                </LegacyStack.Item>
                <Divider />
                <LegacyStack.Item>
                  <Grid
                    columns={{ xs: 1, sm: 4, md: 4, lg: 6, xl: 6 }}
                    areas={{
                      xs: ['product', 'sales', 'orders'],
                      sm: [
                        'product product product product',
                        'sales sales orders orders'
                      ],
                      md: ['sales product product orders'],
                      lg: ['product product product product sales orders'],
                      xl: ['product product sales sales orders orders']
                    }}
                  >
                    <Grid.Cell area="product">
                      <VerticalStack>
                        <p>Email</p>
                        <p>{propModal.email}</p>
                      </VerticalStack>
                    </Grid.Cell>
                    <Grid.Cell area="orders">
                      <Buttonholder
                        label="copy"
                        childAlign="end"
                        copiedValue={propModal.email}
                      />
                    </Grid.Cell>
                  </Grid>
                </LegacyStack.Item>
                <Divider />
                <LegacyStack.Item>
                  <Grid
                    columns={{ xs: 1, sm: 4, md: 4, lg: 6, xl: 6 }}
                    areas={{
                      xs: ['product', 'sales', 'orders'],
                      sm: [
                        'product product product product',
                        'sales sales orders orders'
                      ],
                      md: ['sales product product orders'],
                      lg: ['product product product product sales orders'],
                      xl: ['product product sales sales orders orders']
                    }}
                  >
                    <Grid.Cell area="product">
                      <VerticalStack>
                        <p>Message</p>
                        <p>{propModal.message}</p>
                      </VerticalStack>
                    </Grid.Cell>
                    <Grid.Cell area="orders">
                      <Buttonholder
                        label="copy"
                        childAlign="end"
                        copiedValue={propModal.message}
                      />
                    </Grid.Cell>
                  </Grid>
                </LegacyStack.Item>
              </LegacyStack>
            </Modal.Section>
          </Modal>
        </div>
      )}
    </>
  )
}
export default QuoteTable

function truncateRowValue (quoteColumn: string, count = 8): string {
  let temp: string
  temp = quoteColumn.slice(0, 11)
  temp = temp.length > count ? temp.concat('...') : temp
  return temp
}
