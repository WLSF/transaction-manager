import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import './TableComponent.scss';
import { BalanceSeparator } from './BalanceSeparator';
import { Dialog, DialogTitle, DialogContent, TextField, DialogContentText, FormControl, DialogActions, Button, CardContent, Card, IconButton, Typography, Collapse, TablePagination, TableFooter, CardHeader, InputLabel, Select, Input, MenuItem } from '@material-ui/core';
import moment from 'moment';
import { add } from '../../util/HttpConnector'


export interface IObject {
    description: string, value: string, type: string, tax: string
}

function TableComponent(props) {

    const [expanded, setExpand] = useState(false);
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [taxes, setTaxes] = useState(0);
    const [tax, setTax] = useState('');

    const [object] = useState({
        description, value, type, tax
    })

    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState<IObject[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [today, setToday] = useState('')
    useEffect(() => {
        setToday(moment().format('MMMM Do YYYY'));
    }, [today]);


    const [balance, setBalance] = useState(0);
    useEffect(() => {
        if (rows.length > 0) {
            let newValue: number = 0;
            let newTaxes: number = 0;
            rows.map((el: any) => {
                newValue = newValue + Number(el.value);
                newTaxes = newTaxes + Number(el.tax);
            });
            setBalance(newValue);
            setTaxes(newTaxes);

        }
    }, [rows.length]
    );
    //usually used as didMount && didUpdate
    useEffect(() => {
        axios.get(`http://localhost:3131/transactions`)
            .then(res => {
                setRows(res.data);
            });
    }, [balance]
    );

    return (
        <>
            <Paper className="table-paper" >
                <Table style={{ height: "200px" }} >
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Value</TableCell>
                            <TableCell align="right">Tax</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: any) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.description}
                                </TableCell>
                                <TableCell align="right">
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(row.value)}
                                </TableCell>
                                <TableCell align="right">{new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(row.tax)}</TableCell>
                                <TableCell align="right">
                                    {row.type == 1 &&
                                        ("Débito") || ("Crédito")
                                    }
                                </TableCell>
                                <TableCell>
                                    <button className="trigger"><span>
                                    </span>
                                    </button>

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
                <Card className="balance-details" >
                    <CardHeader
                        action={
                            <>
                                <Button color="inherit" className="button-include" onClick={() => setOpen(true)}>Include</Button>
                                <IconButton>
                                    <Button
                                        className={(expanded === true) ? "expandOpen" : "expand"}
                                        onClick={() => setExpand(!expanded)}
                                        aria-expanded={expanded}
                                        aria-label="Show more"
                                    >
                                        Expand
                    </Button>
                                </IconButton>
                            </>}
                        title="Total Amount"
                        subheader={!expanded ? today : ''
                        }
                    />
                    <CardContent>
                        <span className="total-balance">

                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(balance)}</span>
                        <Typography variant="caption">
                            Total Amount without taxes
                                </Typography>
                    </CardContent>

                    <Collapse in={expanded} className="collapse-card" timeout="auto" unmountOnExit>
                        <CardContent>
                            <div className="balance" style={{ maxWidth: "350px" }}>
                                <span className="tax-balance">{new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(taxes)}</span>
                                <BalanceSeparator />
                                <span className="total-balance">  {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format((balance - taxes))}</span>
                            </div>


                        </CardContent>
                    </Collapse>
                </Card>


            </Paper>

            <Dialog
                open={open}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Insert Transaction</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Transaction Details
      </DialogContentText>
                    <div className="input-content">
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Transaction Description"
                            type="text"
                            value={description}
                            onChange={(event) => {
                                setDescription(event.target.value);
                            }}
                            fullWidth
                        />
                        <TextField
                            autoFocus
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

                        <TextField
                            autoFocus
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

                        <FormControl>
                            <InputLabel htmlFor="age-helper">Age</InputLabel>
                            <Select
                                value={type}
                                style={{ width: "452px" }}
                                onChange={(event) => {
                                    setType(event.target.value);
                                }}
                                input={<Input name="age" id="age-helper" />}
                            >

                                <MenuItem value={0}>Credit</MenuItem>
                                <MenuItem value={1}>Debit</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(!open)} color="primary">
                        Cancel
                     </Button>

                    //ON SUBMIT CLEAR FORM
                    <Button onClick={async () => {
                        object.description = description;
                        object.type = type;
                        object.tax = tax;
                        object.value = value;
                        let numb = await add(object, rows);
                        setRows([numb, ...rows]);
                        console.log(numb)
                    }} color="primary">
                        Insert
      </Button>
                </DialogActions>
            </Dialog>

        </>

    );
}

export default TableComponent;