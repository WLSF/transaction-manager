import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import './TableComponent.scss';
import { Dialog, DialogTitle, Icon, Grid, DialogContent, TextField, DialogContentText, FormControl, DialogActions, Button, Tooltip, Checkbox, Card, IconButton, Typography, Collapse, TablePagination, TableFooter, FormControlLabel, InputLabel, Select, Input, MenuItem, Fab } from '@material-ui/core';
import moment from 'moment';
import { add, getById, edit } from '../../util/HttpConnector'
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import { BalanceComponent } from './BalanceComponent';

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
                    <TableFooter style={{ float: "right" }}>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="span"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{
                                    'aria-label': 'Previous Page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'Next Page',
                                }}
                                onChangePage={(event, page) => {
                                    setPage(page);
                                    console.log(page);
                                    console.log(event);
                                }}
                                onChangeRowsPerPage={(event) => {
                                    console.log(event.target.value);
                                    setRowsPerPage(Number(event.target.value));

                                }}
                            />
                        </TableRow>



                    </TableFooter>

                </Table>

            </Paper>



            {/* DIALOG */}
            <Dialog
                open={open}
                aria-labelledby="form-dialog-title"
                className="dialog-expenses"
            >
                <DialogTitle id="form-dialog-title">Insert Transaction</DialogTitle>
                <DialogContent>

                    <div className="input-content">


                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Icon>border_color</Icon>
                            </Grid>
                            <Grid item>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="Transaction Description"
                                    type="text"
                                    value={object.description}
                                    onChange={(event) => {
                                        setDescription(event.target.value);
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <Icon>date_range</Icon>
                            </Grid>
                            <Grid item>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DatePicker value={dateValue} disablePast={true} format={"DD/MM/YYYY"} onChange={(event) => { setDateValue(moment(event._d).format('YYYY-MM-DD').toString()) }} />
                                </MuiPickersUtilsProvider>

                            </Grid>
                        </Grid>

                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Icon>local_atm</Icon>
                            </Grid>
                            <Grid item>
                                <TextField

                                    margin="dense"
                                    id="name"
                                    label="Transaction Value"
                                    type="number"
                                    value={value}
                                    onChange={(event) => {
                                        setValue(event.target.value);
                                    }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <Icon>money_off</Icon>
                            </Grid>
                            <Grid item>
                                <TextField
                                    margin="dense"
                                    id="tax"
                                    label="Transaction Tax"
                                    type="number"
                                    value={tax}
                                    onChange={(event: any) => {
                                        setTax(event.target.value);
                                    }}
                                    fullWidth
                                />

                            </Grid>
                        </Grid>

                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Icon>insert_chart</Icon>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <InputLabel htmlFor="age-helper">Transaction Type</InputLabel>
                                    <Select
                                        value={type}
                                        style={{ width: "182px" }}
                                        onChange={(event) => {
                                            setType(event.target.value);
                                        }}

                                        input={<Input name="transaction-type"

                                            id="age-helper" />}
                                    >
                                        <MenuItem value={0}>Credit</MenuItem>
                                        <MenuItem value={1}>Debit</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Icon>money_off</Icon>
                            </Grid>
                            <Grid item>

                                <FormControlLabel style={{ alignItems: "flex-end" }}
                                    control={<Checkbox
                                        checked={isPaid}
                                        onChange={(event) => { event.target.checked === true ? setIsPaid(true) : setIsPaid(false) }}
                                        color="primary"
                                        value={isPaid}
                                    />}
                                    label="Is Paid?"
                                />

                            </Grid>
                        </Grid>


                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item>
                                <Icon>dns</Icon>
                            </Grid>
                            <Grid item>
                                <FormControl>
                                    <InputLabel htmlFor="cat-helper">Category</InputLabel>
                                    <Select
                                        value={category}
                                        style={{ width: "202px" }}
                                        onChange={(event) => {
                                            setCategory(event.target.value);
                                        }}

                                        input={<Input name="category-type"

                                            id="cat-helper" />}
                                    >
                                        {categories && categories.map((el: any) => (
                                            <MenuItem value={el.id}> {el.description}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>


                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(!open)} color="primary">
                        Cancel
                     </Button>

                    <Button onClick={async () => {
                        let func;
                        object.description = description;
                        object.type = type;
                        object.tax = tax;
                        object.value = value;
                        object.dateValue = dateValue;
                        object.isPaid = isPaid;
                        func = await add(object);
                        setRows([func, ...rows]);
                        console.log(JSON.stringify(object));

                    }} color="primary">
                        Insert
                     </Button>
                </DialogActions>
            </Dialog>

        </>

    );
}

export default TableComponent;