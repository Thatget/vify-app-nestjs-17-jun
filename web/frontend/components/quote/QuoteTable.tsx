import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import Quote from '../../types/Quote';
import QuoteDetail from './QuoteDetail';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead';
import {useAuthenticatedFetch} from '../../hooks';
import QuoteDelete from './QuoteDelete';
import {
    Link,
    Layout,
    LegacyCard,
    DataTable,
    Page,
    TableData,
    Modal,
    TextContainer,
    LegacyStack,
    HorizontalStack,
    Text,
    Grid,
    Divider
} from '@shopify/polaris';
import {useCallback, useEffect, useState} from "react";
// import quote from "../../types/Quote";
import {ReactElement} from 'react'
import Button from "@mui/material/Button";

interface PropQuoteTable {
    quotes: Quote[],
    removeQuote: (id: number[]) => void,
}


export default function QuoteTable({quotes, removeQuote}: PropQuoteTable) {

    const [active, setActive] = useState(true)
    const [propModal, setPropModal] = useState<Quote>(quotes[0])
    // const toggleModal = (quote) => {
    //     setActive((active) => !active)
    //     console.log("active", active)
    //     setPropModal(quote)
    //     console.log("quote", quote)
    // }
    const toggleModal = useCallback((quote) => {
        setActive((active) => !active)
        console.log("active", active)
        setPropModal(quote)
        console.log("quote", quote)
    }, [quotes])
    const DeleteQuote = useCallback((quote) => {

        console.log("quote", quote)
    }, [quotes])


    const [quotesTables, setQuoteTables] = useState<Quote[]>([])
    const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
        setQuoteTables(quotes)
    }, [quotes])
    const [view, setView] = React.useState<{ quote?: Quote; active: boolean }>({quote: null, active: false})
    const [selected, setSelected] = React.useState<readonly number[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [deleteQuote, setDeleteQuote] = React.useState<{ type: string, ids: number[] }>({type: '', ids: []});
    const rowsTest = [
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="emerald-silk-gown"
            >
                Emerald Silk Gown
            </Link>,
            '$875.00',
            124689,
            140,
            '$121,500.00',
            '$14,250.00',
            '$12,240.00',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="mauve-cashmere-scarf"
            >
                Mauve Cashmere Scarf
            </Link>,
            '$230.00',
            124533,
            83,
            '$19,090.00',
            '$12,240.00',
            '$11,270.00',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="navy-merino-wool"
            >
                Navy Merino Wool Blazer with khaki chinos and yellow belt
            </Link>,
            '$445.00',
            124518,
            32,
            '$14,240.00',
            '$10,241.00',
            '$10,201.00',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="emerald-silk-gown"
            >
                Emerald Silk Gown
            </Link>,
            '$875.00',
            124689,
            140,
            '$121,500.00',
            '$14,240.00',
            '$14,200.10',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="mauve-cashmere-scarf"
            >
                Mauve Cashmere Scarf
            </Link>,
            '$230.00',
            124533,
            83,
            '$19,090.00',
            '$14,300.30',
            '$17,200.00',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="navy-merino-wool"
            >
                Navy Merino Wool Blazer with khaki chinos and yellow belt
            </Link>,
            '$445.00',
            124518,
            32,
            '$14,240.00',
            '$18,770.07',
            '$15,545.00',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="emerald-silk-gown"
            >
                Emerald Silk Gown
            </Link>,
            '$875.00',
            124689,
            140,
            '$121,500.00',
            '$14,240.00',
            '$14,240.00',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="mauve-cashmere-scarf"
            >
                Mauve Cashmere Scarf
            </Link>,
            '$230.00',
            124533,
            83,
            '$19,090.00',
            '$19,290.00',
            '$12,997.00',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="navy-merino-wool"
            >
                Navy Merino Wool Blazer with khaki chinos and yellow belt
            </Link>,
            '$445.00',
            124518,
            32,
            '$14,240.00',
            '$11,211.20',
            '$11,343.50',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="emerald-silk-gown"
            >
                Emerald Silk Gown
            </Link>,
            '$875.00',
            124689,
            140,
            '$121,500.00',
            '$12,430.00',
            '$17,420.00',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="mauve-cashmere-scarf"
            >
                Mauve Cashmere Scarf
            </Link>,
            '$230.00',
            124533,
            83,
            '$19,090.00',
            '$14,790.00',
            '$12,370.00',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="navy-merino-wool"
            >
                Navy Merino Wool Blazer with khaki chinos and yellow belt
            </Link>,
            '$445.00',
            124518,
            32,
            '$14,240.00',
            '$16,241.00',
            '$18,211.00',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="emerald-silk-gown"
            >
                Emerald Silk Gown
            </Link>,
            '$875.00',
            124689,
            140,
            '$121,500.00',
            '$15,111.00',
            '$11,221.00',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="mauve-cashmere-scarf"
            >
                Mauve Cashmere Scarf
            </Link>,
            '$230.00',
            124533,
            83,
            '$19,090.00',
            '$17,880.00',
            '$11,280.00',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="navy-merino-wool"
            >
                Navy Merino Wool Blazer with khaki chinos and yellow belt
            </Link>,
            '$445.00',
            124518,
            32,
            '$14,240.00',
            '$11,111.00',
            '$17,211.00',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="emerald-silk-gown"
            >
                Emerald Silk Gown
            </Link>,
            '$875.00',
            124689,
            140,
            '$121,500.00',
            '$14,240.00',
            '$17,840.00',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="mauve-cashmere-scarf"
            >
                Mauve Cashmere Scarf
            </Link>,
            '$230.00',
            124533,
            83,
            '$19,090.00',
            '$13,238.00',
            '$14,288.00',
        ],
        [
            <Link
                removeUnderline
                url="https://www.example.com"
                key="navy-merino-wool"
            >
                Navy Merino Wool Blazer with khaki chinos and yellow belt
            </Link>,
            '$445.00',
            124518,
            32,
            '$14,240.00',
            '$14,988.00',
            '$14,902.10',
        ],
    ];


    const Placeholder = ({
                             label = '',
                             height = 'auto',
                             width = 'auto',
                             childAlign,
                         }: {
        label?: string;
        height?: string;
        width?: string;
        childAlign: 'start' | 'center' | 'end';
    }) => {
        return (
            <div
                style={{
                    background: '',
                    height: height,
                    width: width,
                }}
            >
                <HorizontalStack gap="4" align={childAlign}>
                    <div
                        style={{
                            color: 'var(--p-color-text-interactive)',
                        }}
                    >
                        <Text as="h2" variant="bodyMd" fontWeight="medium">
                            {label}
                        </Text>
                    </div>
                </HorizontalStack>
            </div>
        );
    };

    const Buttonholder = ({
                              label = '',
                              height = 'auto',
                              width = 'auto',
                              childAlign,
                          }: {
        label?: string;
        height?: string;
        width?: string;
        childAlign: 'start' | 'center' | 'end';
    }) => {
        return (
            <div
                style={{
                    background: '',
                    height: height,
                    width: width,
                }}
            >
                <HorizontalStack gap="4" align={childAlign}>
                    <div
                        style={{
                            color: 'var(--p-color-text-interactive)',
                        }}
                    >
                        <Button primary>Copy</Button>
                    </div>
                </HorizontalStack>
            </div>
        );
    };

    let activator
    useEffect(() => {
        let temp: string[][] = []
        quotesTables.map(quote => {
            let selectedVariant = quote.product.selected_variant as object
            let tempRow: string[] = []
            tempRow[0] = `${quote.name}`.slice(0, 15)
            tempRow[0] = (tempRow[0].length > 12) ? tempRow[0].concat("...") : tempRow[0]
            tempRow[1] = `${quote.email}`.slice(0, 15)
            tempRow[1] = (tempRow[1].length > 12) ? tempRow[1].concat("...") : tempRow[1]
            tempRow[2] = `${quote.created_at}`.slice(0, 15)
            tempRow[2] = (tempRow[2].length > 12) ? tempRow[2].concat("...") : tempRow[2]
            tempRow[3] = `${quote.product.selected_product.title}`.slice(0, 15)
            tempRow[3] = (tempRow[3].length > 12) ? tempRow[3].concat("...") : tempRow[3]
            // tempRow[3] = <img src={quote.product.selected_product.image} alt="" width="40%"
            //                   height="40%"/>
            tempRow[4] = `${quote.message}`.slice(0, 15)
            tempRow[4] = (tempRow[4].length > 12) ? tempRow[4].concat("...") : tempRow[4]
            tempRow[5] = `${quote.status}`.slice(0, 15)
            tempRow[5] = (tempRow[5].length > 12) ? tempRow[5].concat("...") : tempRow[5]
            // tempRow[6] = `${quote.status}`.slice(0, 15)
            // tempRow[6] = (tempRow[6].length > 12) ? tempRow[6].concat("...") : tempRow[6]
            activator = tempRow[6] = <Button onClick={() => {
                console.log(quote);
                toggleModal(quote);
            }}>View</Button>
            temp.push(tempRow)
        })
        setRows(temp)
    }, [quotesTables])
    return (
        // <Page>
        <>
            {/*<EnhancedTableToolbar numSelected={selected.length} deleteSelected={deleteSelected}/>*/}
            <LegacyCard>
                <DataTable columnContentTypes={[
                    'text',
                    'text',
                    'text',
                    'text',
                    'text',
                    'text',
                    'text',
                ]}
                           headings={[
                               'Name',
                               'Email',
                               'Time',
                               'Product',
                               'Message',
                               'Status',
                               'Action'
                           ]}
                           rows={rows}
                    // defaultSortDirection="descending"
                           footerContent={`Showing ${rows.length} of ${rows.length} results`}
                >

                </DataTable>
            </LegacyCard>
            {propModal &&
                <div style={{height: '500px'}}>
                    <Modal
                        activator={activator}
                        open={active}
                        onClose={() => toggleModal(null)}
                        title="View Quote"
                        primaryAction={{
                            content: 'Close',
                            onAction: () => toggleModal(null)
                        }}
                        secondaryActions={[
                            {
                                content: 'Delete',
                                onAction: ''
                            },
                        ]}
                    >
                        <Modal.Section>
                            <LegacyStack vertical>
                                <LegacyStack.Item>
                                    <Text variant="headingLg" as="h5">Product</Text>
                                    <Grid>
                                        <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 3, lg: 3, xl: 3}}>
                                            <img src={propModal.product.selected_product.image} alt="" width="40%"
                                                 height="40%"/>
                                        </Grid.Cell>
                                        <Grid.Cell columnSpan={{xs: 9, sm: 9, md: 9, lg: 9, xl: 9}}>
                                            <TextContainer>
                                                <Text>{propModal.product.selected_product.title}</Text>
                                                <Text>{propModal.product.selected_variant.title}</Text>
                                                <Text>{propModal.product.selected_variant.id}</Text>
                                            </TextContainer>
                                        </Grid.Cell>
                                    </Grid>
                                </LegacyStack.Item>
                                <Divider/>
                                <LegacyStack.Item>
                                    <Grid
                                        columns={{xs: 1, sm: 4, md: 4, lg: 6, xl: 6}}
                                        areas={{
                                            xs: ['product', 'sales', 'orders'],
                                            sm: [
                                                'product product product product',
                                                'sales sales orders orders',
                                            ],
                                            md: ['sales product product orders'],
                                            lg: ['product product product product sales orders'],
                                            xl: ['product product sales sales orders orders'],
                                        }}
                                    >

                                        <Grid.Cell area="sales">
                                            <TextContainer>
                                                <p>
                                                    Name
                                                </p>
                                                <p>{propModal.name}</p>
                                            </TextContainer>
                                        </Grid.Cell>
                                        <Grid.Cell area="orders">
                                            <Buttonholder label="copy" childAlign="end"/>
                                        </Grid.Cell>
                                    </Grid>
                                </LegacyStack.Item>
                                <Divider/>
                                <LegacyStack.Item>
                                    <Grid
                                        columns={{xs: 1, sm: 4, md: 4, lg: 6, xl: 6}}
                                        areas={{
                                            xs: ['product', 'sales', 'orders'],
                                            sm: [
                                                'product product product product',
                                                'sales sales orders orders',
                                            ],
                                            md: ['sales product product orders'],
                                            lg: ['product product product product sales orders'],
                                            xl: ['product product sales sales orders orders'],
                                        }}
                                    >

                                        <Grid.Cell area="sales">
                                            <TextContainer>
                                                <p>
                                                    Email
                                                </p>
                                                <p>{propModal.email}</p>
                                            </TextContainer>
                                        </Grid.Cell>
                                        <Grid.Cell area="orders">
                                            <Buttonholder label="copy" childAlign="end"/>
                                        </Grid.Cell>
                                    </Grid>
                                </LegacyStack.Item>
                                <Divider/>
                                <LegacyStack.Item>
                                    <Grid
                                        columns={{xs: 1, sm: 4, md: 4, lg: 6, xl: 6}}
                                        areas={{
                                            xs: ['product', 'sales', 'orders'],
                                            sm: [
                                                'product product product product',
                                                'sales sales orders orders',
                                            ],
                                            md: ['sales product product orders'],
                                            lg: ['product product product product sales orders'],
                                            xl: ['product product sales sales orders orders'],
                                        }}
                                    >

                                        <Grid.Cell area="sales">
                                            <TextContainer>
                                                <p>
                                                    Message
                                                </p>
                                                <p>{propModal.message}</p>
                                            </TextContainer>
                                        </Grid.Cell>
                                        <Grid.Cell area="orders">
                                            <Buttonholder label="copy" childAlign="end"/>
                                        </Grid.Cell>
                                    </Grid>
                                </LegacyStack.Item>
                            </LegacyStack>
                        </Modal.Section>
                    </Modal>
                </div>}
            {/*<TablePagination*/}
            {/*    rowsPerPageOptions={[5, 10, 25]}*/}
            {/*    component="div"*/}
            {/*    count={rows.length}*/}
            {/*    rowsPerPage={rowsPerPage}*/}
            {/*    page={page}*/}
            {/*    onPageChange={handleChangePage}*/}
            {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
            {/*/>*/}
            {/*{view.active && <QuoteDetail view={view} deleteInView={deleteInView}/>}*/}
            {/*{((deleteQuote.type === 'selected') || (deleteQuote.type === 'clicked')) &&*/}
            {/*    <QuoteDelete deleteQuote={deleteQuote} removeQuote={removeQuote}/>}*/}
        </>
    );
}
// function sortNames(
//     rows:TableData[][],
//     index:number,
//     direction:'ascending' | 'descending'
// ): TableData[][] {
//     return [...rows].sort((rowA:TableData[],rowB:TableData[]):TableData => {
//         const nameA = rowA[index]
//         const nameB = rowB[index]
//         return direction === 'descending' ? nameA:nameB
//     })
// }