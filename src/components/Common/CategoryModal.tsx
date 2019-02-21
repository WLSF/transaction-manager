import React from 'react';
import { Dialog, DialogTitle, DialogContent, Icon, TextField, Grid, MenuItem, FormControlLabel, Checkbox, DialogActions, Button, FormControl, InputLabel, Select, Input } from '@material-ui/core';

export interface ICategory {
    description: string, typeof: string, color: string, icon: string
}

export interface IProps {
    open: boolean;
    style?: React.CSSProperties;
    className?: string;

}

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
                        <Grid item>

                            <FormControlLabel
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





                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(!open)} color="primary">
                    Cancel
                 </Button>

                //ON SUBMIT CLEAR FORM
                <Button onClick={async () => {
                    await add(object, rows);
                }} color="primary">
                    Insert
                 </Button>
            </DialogActions>
        </Dialog>


        return React.createElement(this.props.open, {
            className: `pbr-standard-title ${this.props.className}`, style, id: this.props.id,
        },
            this.props.children);
    }
}