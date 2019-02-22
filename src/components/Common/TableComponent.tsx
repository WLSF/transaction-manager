import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import './TableComponent.scss';
import { Icon, Tooltip, TablePagination, TableFooter } from '@material-ui/core';
import moment from 'moment';
import { BalanceComponent } from './BalanceComponent';
import AddTransaction from './AddTransaction';
import TransactionDialog from './TransactionDialog';

export interface IObject {
    id: number, description: string, value: string, type: string, tax: string, dateValue: string, isPaid: boolean
}

export interface ICategory {
    id: number, name: string, type: string
}

function TableComponent(props) {

    const [id] = useState(0);
    const [expanded, setExpand] = useState(false);
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [taxes, setTaxes] = useState(0);
    const [tax, setTax] = useState('');
    const [incomes, setIncomes] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [dateValue, setDateValue] = useState(moment().format('YYYY-MM-DD').toString());
    const [isPaid, setIsPaid] = useState(false);


    const [object] = useState({
        id, description, value, type, tax, dateValue, isPaid
    })
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [category, setCategory] = useState('');

    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState<IObject[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [today, setToday] = useState('');

    useEffect(() => {
        setToday(moment().format('MMMM Do YYYY'));
    }, [today]);


    const [balance, setBalance] = useState(0);
    useEffect(() => {
        if (rows.length > 0) {
            let incomes: number = 0;
            let expenses: number = 0;

            let newValue: number = 0;
            let newTaxes: number = 0;
            rows.map((el: any) => {
                if (el.isPaid === true) {
                    newValue = (el.type === 0 ? (newValue + Number(el.value)) : (newValue - Number(el.value)));
                    newTaxes = newTaxes + Number(el.tax);
                    if (el.type === 0)
                        incomes += Number(el.value);
                    else
                        expenses += Number(el.value)
                }
            });
            setIncomes(incomes);
            setExpenses(expenses);
            setTaxes(newTaxes);

        }
    }, [rows.length, object]
    );
    useEffect(() => {
        axios.get(`http://localhost:3131/transactions`)
            .then(res => {
                setRows(res.data);
            });
    }, [balance]
    );

    useEffect(() => {
        axios.get(`http://localhost:3131/categories`)
            .then(res => {
                setCategories(res.data);
            });
    }, [category]
    );

    return (
        <>
            <BalanceComponent
                expenses={new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(expenses)}
                taxes={
                    new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(taxes)
                }
                income={new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(incomes)}


            />
            <Paper className="table-paper" >
                <Table style={{ height: "200px" }} >
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell align="center">Value</TableCell>
                            <TableCell align="center">Tax</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.map((row: any) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.description}
                                </TableCell>
                                <TableCell align="center" >
                                    <span className={`row-value${row.type}`}>{new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(row.value)}</span>
                                </TableCell>
                                <TableCell align="center">{new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(row.tax)}</TableCell>
                                <TableCell align="center">
                                    {row.type == 1 &&
                                        ("Débito") || ("Crédito")
                                    }
                                </TableCell>

                                <TableCell align="center">
                                    {moment(`${row.dateValue}`).format('DD/MM')}
                                </TableCell>

                                <TableCell align="center">
                                    {row.isPaid === true ?
                                        <Tooltip title="Paid" placement="top-start"><Icon style={{ color: "green" }}>done_all</Icon></Tooltip>
                                        : <Tooltip title="Click to Pay" placement="top-start"><Icon

                                            style={{ color: "red" }}>clear</Icon></Tooltip>}
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <AddTransaction onIncomeClick={() => {}} onExpenseClick={() => {}} />
                        </TableRow>
                    </TableFooter>
                </Table>
                {/* <TransactionDialog type={1} /> */}
            </Paper>
        </>

    );
}

export default TableComponent;