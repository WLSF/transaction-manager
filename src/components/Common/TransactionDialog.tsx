import React, { useState } from 'react';
import { add } from '../../util/HttpConnector';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { Dialog, DialogTitle, Icon, Grid, DialogContent, TextField, FormControl, DialogActions, Button, Checkbox, FormControlLabel, InputLabel, Select, Input, MenuItem } from '@material-ui/core';

interface ICategory {
  id: number, name: string, type: string
};

export interface ITransaction {
  id: number,
  description: string,
  value: string,
  type: string,
  tax: string,
  dateValue: string,
  isPaid: boolean
};

const TransactionDialog = props => {
  const [id] = useState(0);
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [tax, setTax] = useState('');
  const [dateValue, setDateValue] = useState(moment().format('YYYY-MM-DD').toString());
  const [isPaid, setIsPaid] = useState(false);
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [transaction] = useState({
      id, description, value, type, tax, dateValue, isPaid
  });
  const [categories] = useState<ICategory[]>([]);
  const [rows, setRows] = useState<ITransaction[]>([]);

  setType(props.type);

  return (
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
                            value={transaction.description}
                            onChange={event => setDescription(event.target.value)}
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
                              onChange={event => setType(event.target.value)}
                              input={<Input name="transaction-type" id="age-helper" />}
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
                                onChange={event => setCategory(event.target.value)}

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
                transaction.description = description;
                transaction.type = type;
                transaction.tax = tax;
                transaction.value = value;
                transaction.dateValue = dateValue;
                transaction.isPaid = isPaid;
                func = await add(transaction);
                setRows([func, ...rows]);
                console.log(JSON.stringify(transaction));

            }} color="primary">
                Insert
              </Button>
        </DialogActions>
    </Dialog>
  );
};

export default TransactionDialog;