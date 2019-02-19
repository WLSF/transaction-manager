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
import { Dialog, DialogTitle, DialogContent, TextField, DialogContentText, NativeSelect, FormControl, DialogActions, Button } from '@material-ui/core';

export interface IObject {
    description: string, value: number, type: number, tax: number
}

function TableComponent(props) {

    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [tax, setTaxes] = useState(0);

    const [object, setObject] = useState({
        description, value, type, tax
    })
    const [open, setOpen] = useState(false);

    const [rows, setRows] = useState<IObject[]>([]);

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
            <Paper >
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Value</TableCell>
                            <TableCell align="right">Tax</TableCell>
                            <TableCell align="right">Type</TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <div className="balance" style={{ maxWidth: "350px", border: "1px solid red" }}> Total:
                <span className="total-balance">

                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(balance)}</span>
                <span className="tax-balance">{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(tax)}</span>
                <BalanceSeparator />
                <span className="total-balance">  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format((balance - tax))}</span>

            </div>
            <Dialog
                open={open}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Insert Transaction
      </DialogContentText>
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
                            setTaxes(event.target.value);
                        }}
                        fullWidth
                    />
                    <FormControl >
                        <NativeSelect
                            value={type}
                            name="type"
                            onChange={(event) => {
                                setType(event.target.value);
                            }}
                        >
                            <option value={0}>Credit</option>
                            <option value={1}>Debit</option>
                        </NativeSelect>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(!open)} color="primary">
                        Cancel
      </Button>

                    //ON SUBMIT CLEAR FORM
                    <Button onClick={() => {
                        object.description = description;
                        object.type = type;
                        object.tax = tax;
                        object.value = value;
                        console.log(object);
                        axios.post<IObject>(`http://localhost:3131/transactions`, object)
                            .then(res => {
                                setRows([res.data, ...rows])
                            })

                    }} color="primary">
                        Subscribe
      </Button>
                </DialogActions>
            </Dialog>
            <Button color="inherit" onClick={() => setOpen(true)}>Login</Button>
        </>

    );
}

export default TableComponent;