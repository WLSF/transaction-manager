import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};






function HeaderComponent(props) {
    const { classes } = props;
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');
    const [value, setValue] = useState('');
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        HI
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        TRANSACTION MANAGER
          </Typography>
                    <Button color="inherit" onClick={() => setOpen(true)}>Login</Button>
                </Toolbar>
            </AppBar>

            {open &&
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
                            id="name"
                            label="Transaction Type"
                            type="text"
                            value={type}
                            onChange={(event) => {
                                setType(event.target.value);
                            }}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(!open)} color="primary">
                            Cancel
      </Button>
                        <Button onClick={() => {
                            setValue(value);
                            setType(type);

                        }} color="primary">
                            Subscribe
      </Button>
                    </DialogActions>
                </Dialog>}

        </div>
    );
}

HeaderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderComponent);