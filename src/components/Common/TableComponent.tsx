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
import { InputComponent } from './InputComponent';
import { InputComponentType } from './InputComponentType';

function TableComponent(props) {
    const [rows, setRows] = useState([]);
    const [balance, setBalance] = useState(0);
    const [tax, setTaxes] = useState(0);
    useEffect(() => {
        if (rows.length > 0) {
            let newValue = 0;
            let newTaxes = 0;
            rows.map((el: any) => {
                newValue += el.value;
                newTaxes += el.tax;
            });
            setBalance(newValue);
            setTaxes(newTaxes);
        }
    }, [rows]
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
                                <TableCell align="right">{row.value}</TableCell>
                                <TableCell align="right">{row.tax}</TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <div className="balance" style={{ maxWidth: "350px", border: "1px solid red" }}> Total:
                <span className="total-balance">{balance}</span>
                <span className="tax-balance">{tax}</span>
                <BalanceSeparator />
                <span className="total-balance"> {balance - tax}</span>
                {/* <InputComponentType name="balance-check"
                    type="password"
                    placeholder="Check security code"
                    formWrapper={props.form}
                    rules={[
                        { required: true, message: "Please, check security code" },
                    ]} /> */}
            </div>
        </>

    );
}

export default TableComponent;