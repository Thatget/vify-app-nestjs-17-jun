import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import {
  DataTable,
  Divider,
  Grid,
  HorizontalStack,
  AlphaCard,
  LegacyStack,
  Modal,
  Pagination,
  Text,
  TextContainer,
  Button,
  type TableData,
  Toast,
  Badge
} from '@shopify/polaris'
import type ParsedQuote from '../../types/ParsedQuote'
import Box from '@mui/material/Box'
import { useAuthenticatedFetch } from '../../hooks'

interface IPropQuoteTable {
  quotes: ParsedQuote[]
  removeQuote: (id: number) => Promise<boolean>
  setSkip: any
  count: number
  skip: number
  isLoading: boolean
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
  const [propModal, setPropModal] = useState<ParsedQuote>(props.quotes[0])
  const [quotesTables, setQuoteTables] = useState<ParsedQuote[]>(props.quotes)
  const [rows, setRows] = React.useState<TableData[][]>([])
  let activator: JSX.Element
  let countIndex: number
  React.useEffect(() => {
    setQuoteTables(props.quotes)
  }, [props.quotes])

  const toggleModal = useCallback(async (quote: ParsedQuote, status: number) => {
    setActive((active) => !active)
    console.log('active', active)
    setPropModal(quote)
    console.log('propsModal', quote)
    await updateStatus(quote.id, 1)
    setStatus(status)
  }, [])
  const deleteQuoteModal = useCallback((quote: ParsedQuote, status: number) => {
    setActive((active) => !active)
    console.log('active', active)
    setPropModal(quote)
    console.log('propsModal', quote)
    setStatus(status)
  }, [])
  const toggleActive = useCallback(() => {
    console.log('toggleActive')
    setToastActive((active) => !active)
  }, [])
  const toastMarkup = toastActive
    ? (
    <Toast content="Copied Successfully" onDismiss={toggleActive} />
      )
    : null
  const copyToClipboard = (value: string): void => {
    console.log('CopyToClipBoard')
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
    const temp: string[][] = []
    countIndex = index
    quotesTables.map((quote: ParsedQuote) => {
      const tempColumn: string[] = []
      tempColumn[0] = countIndex.toString()
      tempColumn[1] = truncateRowValue(quote.name)
      tempColumn[2] = truncateRowValue(quote.email)
      tempColumn[3] = truncateRowValue(quote.created_at.toString())
      tempColumn[4] = (
        <div style={{}}>
          <img
            src={(quote.product.selected_product.image.length > 0) ? quote.product.selected_product.image : ''}
            alt=""
            width="40%"
            height="40%"
            style={{ borderRadius: '50%' }}
          />
          <p> {truncateRowValue(quote.product.selected_product.title)} </p>
        </div>
      )
      tempColumn[5] = truncateRowValue(quote.message)
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
            console.log(quote)
            toggleModal(quote)
          }}
          size="slim"
        >
          View
        </Button>
      )
      temp.push(tempColumn)
      countIndex = countIndex + 1
      console.log('index', countIndex)
      console.log('props.skip', props.skip)
      console.log('props.count', props.count)
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
  return (
    <>
      <AlphaCard>
        <div style={{ padding: '10px', zIndex: '-1' }}>
          <DataTable
            columnContentTypes={[
              'text',
              'text',
              'text',
              'text',
              'text',
              'text',
              'text',
              'text'
            ]}
            headings={[
              'No',
              'Name',
              'Email',
              'Time',
              'Product',
              'Message',
              'Status',
              'Action'
            ]}
            rows={rows}
            footerContent={`Showing ${rows.length} of ${rows.length} results`}
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
                label="Result"
                hasPrevious={props.skip !== 0}
                onPrevious={() => {
                  props.setSkip((preSkip) => preSkip - 5)
                  setIndex((prevState) => prevState - 5)
                  console.log('props.skip', props.skip)
                }}
                hasNext={props.skip + 5 < props.count}
                onNext={() => {
                  props.setSkip((prevState) => prevState + 5)
                  setIndex((prevState) => prevState + 5)
                  console.log('props.skip', props.skip)
                }}
              />
            </div>
          </Box>
        </div>
      </AlphaCard>
      {toastMarkup}
      {propModal && (
        <div style={{ height: '500px' }}>
          <Modal
            activator={activator}
            open={active}
            // onClose={() => {
            //   toggleModal(null)
            // }}
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
                        src={propModal.product.selected_product.image || ''}
                        alt=""
                        width="40%"
                        height="40%"
                        style={{ borderRadius: '50%' }}
                      />
                    </Grid.Cell>
                    <Grid.Cell
                      columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3, xl: 3 }}
                    >
                      <TextContainer>
                        <Text>
                          {propModal.product.selected_product.title || ''}
                        </Text>
                        <Text>
                          {propModal.product.selected_variant.title || ''}
                        </Text>
                        <Text>
                          {propModal.product.selected_variant.id || ''}
                        </Text>
                      </TextContainer>
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
                    <Grid.Cell area="sales">
                      <TextContainer>
                        <p>Name</p>
                        <p>{propModal.name}</p>
                      </TextContainer>
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
                    <Grid.Cell area="sales">
                      <TextContainer>
                        <p>Email</p>
                        <p>{propModal.email}</p>
                      </TextContainer>
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
                    <Grid.Cell area="sales">
                      <TextContainer>
                        <p>Message</p>
                        <p>{propModal.message}</p>
                      </TextContainer>
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

function truncateRowValue (quoteColumn: string): string {
  let temp: string
  temp = quoteColumn.slice(0, 11)
  temp = temp.length > 8 ? temp.concat('...') : temp
  return temp
}
