import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    ID: string,
    Name: string,
    Email: string,
    Time: string,
    Product: string,
    Message: string,
    Status: string,
    Action: string,
) {
    return { ID, Name, Email, Time, Product, Message, Status, Action };
}

const rows = [
    createData('1', 'Book', 'abc@gmail.com', '19/11/1986','book','Message','Status','Action' ),
    createData('2', 'Book', 'abc@gmail.com', '19/11/1986','book','Message','Status','Action' ),
    createData('3', 'Book', 'abc@gmail.com', '19/11/1986','book','Message','Status','Action' ),
    createData('4', 'Book', 'abc@gmail.com', '19/11/1986','book','Message','Status','Action' ),
    createData('5', 'Book', 'abc@gmail.com', '19/11/1986','book','Message','Status','Action' ),
    createData('6', 'Book', 'abc@gmail.com', '19/11/1986','book','Message','Status','Action' ),
];

export default function QuoteTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="right">Name</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Time</StyledTableCell>
                        <StyledTableCell align="right">Product</StyledTableCell>
                        <StyledTableCell align="right">Message</StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                        <StyledTableCell align="right">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.ID}>
                            <StyledTableCell component="th" scope="row">
                                {row.ID}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.Name}</StyledTableCell>
                            <StyledTableCell align="right">{row.Email}</StyledTableCell>
                            <StyledTableCell align="right">{row.Time}</StyledTableCell>
                            <StyledTableCell align="right">{row.Product}</StyledTableCell>
                            <StyledTableCell align="right">{row.Message}</StyledTableCell>
                            <StyledTableCell align="right">{row.Status}</StyledTableCell>
                            <StyledTableCell align="right">{row.Action}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}