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
import { Dialog, DialogTitle, DialogContent, TextField, DialogContentText, NativeSelect, FormControl, DialogActions, Button, CardContent, CardActions, Card, IconButton, Typography, Collapse, withStyles, TablePagination, TableFooter, Divider } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
export interface IObject {
    description: string, value: number, type: number, tax: number
}

function TableComponent(props) {

    const [expanded, setExpand] = useState(false);
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [taxes, setTaxes] = useState(0);
    const [tax, setTax] = useState(0);

    const [object] = useState({
        description, value, type, tax
    })

    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState<IObject[]>([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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

    const [isActive, setIsActive] = useState(false);
    const [paidIcon, setPaidIcon] = useState('aspect_ratio');

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
                                    <Icon className="box is-paid-icon" id="paid"
                                    onMouseEnter={() => {
                                         setPaidIcon('done_all') 
                                    }}
                                    onMouseLeave={() => {
                                         setPaidIcon('aspect_ratio');
                                    }}
                                    >
                                    {paidIcon}</Icon>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                    <TableFooter>
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

            <Card className="balance-details" >
                <CardContent>
                    <div className="balance" style={{ maxWidth: "350px" }}> Total:
                  <span className="total-balance">

                            {new Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(balance)}</span>

                    </div>
                </CardContent>
                <CardActions>
                    <Button color="inherit" className="button-include" onClick={() => setOpen(true)}>Include</Button>
                    <Button
                        className={(expanded === true) ? "expandOpen" : "expand"}
                        onClick={() => setExpand(!expanded)}
                        aria-expanded={expanded}
                        aria-label="Show more"
                    >
                        Expand
                    </Button>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
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
                            setTax(event.target.value);
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

        </>

    );
}

export default TableComponent;