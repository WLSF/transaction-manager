import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Icon, TextField, Grid, MenuItem, FormControlLabel, Checkbox, DialogActions, Button, FormControl, InputLabel, Select, Input } from '@material-ui/core';

export interface ICategory {
    description: string, type: string, color: string, icon: string
}

export interface IProps {
    open: boolean;
    style?: React.CSSProperties;
    className?: string;

}

const [open, setOpen] = useState(false);
const [color, setColor] = useState('');
const [type, setType] = useState('');
const [icon, setIcon] = useState('');
const [value, setValue] = useState('');
const [description, setDescription] = useState('');

export default class CategoryModal extends React.Component<IProps>{


    public render() {
        <Dialog
            open={open}
            aria-labelledby="form-dialog-title"
            className="dialog-expenses"
        >
            <DialogTitle id="form-dialog-title">Insert Category</DialogTitle>
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
                                label="Catedory Description"
                                type="text"
                                value={description}
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
                                value={type}
                                onChange={(event: any) => {
                                    setType(event.target.value);
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
                            {/* //TODO: transaction / income */}
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

                    </Grid>





                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(!open)} color="primary">
                    Cancel
                 </Button>


                <Button onClick={async () => {
                    // await add(object, rows);
                }} color="primary">
                    Insert
                 </Button>
            </DialogActions>
        </Dialog>

    }
}