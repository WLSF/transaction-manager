import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import './HeaderComponent.scss';
import TableComponent from './TableComponent';
import Icon from '@material-ui/core/Icon';

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

    return (
        <div className="header-component">
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <Icon>credit_card</Icon>
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        TRANSACTION MANAGER
                    </Typography>

                </Toolbar>
            </AppBar>

            <TableComponent />
        </div>
    );
}

export default withStyles(styles)(HeaderComponent);