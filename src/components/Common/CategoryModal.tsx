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


export default class CategoryModal extends React.Component<IProps>{
    public render() {
        console.log('oi')
            ; return (
                <Dialog
                    open={this.props.open}
                    aria-labelledby="form-dialog-title"
                    className="dialog-expenses"
                >
                    <DialogTitle id="form-dialog-title">Insert Category</DialogTitle>

                </Dialog>
            )
    }
}