import React, { useState } from 'react';
import './BalanceComponent.scss';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { Icon } from '@material-ui/core';
import './AddTransaction.scss';




function AddTransaction(props) {
    const { onIncomeClick, onExpenseClick } = props;
    const actions = [
        { icon: <Icon className="speed-actions-i">trending_up</Icon>, name: 'Income', onClick: onIncomeClick },
        { icon: <Icon className="speed-actions-e">trending_down</Icon>, name: 'Expenses', onExpenseClick },
    ];
    const [open, setOpen] = useState(false);
    // const [type, setType] = useState(0);
    return (

        <SpeedDial
            ariaLabel="SpeedDial example"
            className="speed-dial"
            hidden={false}
            icon={<SpeedDialIcon />}
            onClick={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            open={open}
            direction={'right'}
        >
            {actions.map(action => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.onClick}
                />
            ))}
        </SpeedDial>)

}

export default AddTransaction;