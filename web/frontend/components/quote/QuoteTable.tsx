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
import { useAuthenticatedFetch } from '../../hooks';
import QuoteDelete from './QuoteDelete';
import { Link } from '@shopify/polaris';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string | any },
  b: { [key in Key]: number | string | any },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface PropQuoteTable {
  quotes: Quote[],
  removeQuote: (id: number[]) => void,
}

interface StatusLabel {
  [key: number]: string;
}

const stautsLabel: StatusLabel = {
  0: 'unread',
  1: 'read',
  2: 'denied',
  3: 'approve',
}

export default function QuoteTable({quotes, removeQuote}: PropQuoteTable) {
  const fetch = useAuthenticatedFetch()
  const [rows, setRows] = React.useState<Quote[]>([]);
  React.useEffect(() => {
    setRows(quotes)
  }, [quotes])
  const [view, setView] = React.useState<{quote?: Quote; active: boolean}>({quote: null, active: false})
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Quote>('id');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [deleteQuote, setDeleteQuote] = React.useState<{type: string, ids: number[]}>({ type: '', ids: []});

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Quote,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, rows],
  );

  const handleView = (id: number) => {
    const quote:Quote = rows.find(quote => quote.id === id);
    if (quote.status === 0) {
      try {
        fetch(`/api/quote/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({status: 1}),
        });
      } catch (error) {
      }
      setRows(preRows => {
        return preRows.map(row => {
          if (row.id === quote.id) {
            row.status = 1;
          }
          return row;
        })
      })
    }
    setView({quote , active: true});
  }

  const deleteSelected = () => {
    setDeleteQuote({ type: 'selected', ids: [ ...selected ] })
  }

  const deleteInView = () => {
    setDeleteQuote({ type: 'clicked', ids: [ view.quote.id ] })
    setView({active: false, quote: null})
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} deleteSelected={deleteSelected} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={'small'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  console.log(row.product.selected_product.image)
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <td>
                        <div style={{display: 'flex'}}>
                          <div style={{height: '90px', width: '150px'}}>
                            <img src={row.product.selected_product.image || ''} style={{height: '100%'}} alt={row.product.selected_product.title ||''} />
                          </div>
                          <div>
                            <div>{row.product.selected_product.title ||''}</div>
                            <div>{row.product.selected_variant.title ||''}</div>
                            <div>{row.product.selected_variant.price ||''}</div>
                          </div>
                        </div>
                      </td>
                      <TableCell>{row.message}</TableCell>
                      <TableCell align="right">{stautsLabel[row.status] || 'undetected' }</TableCell>
                      <TableCell align="right">
                        <Link onClick={() => handleView(row.id)}>View |</Link>
                        <Tooltip title="Delete" onClick={() => setDeleteQuote({ type: 'clicked', ids: [ row.id]})}>
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      { view.active && <QuoteDetail view={view} deleteInView={deleteInView} /> }
      { ((deleteQuote.type === 'selected') || (deleteQuote.type === 'clicked')) && <QuoteDelete deleteQuote={deleteQuote} removeQuote={removeQuote} /> }
    </>
  );
}
