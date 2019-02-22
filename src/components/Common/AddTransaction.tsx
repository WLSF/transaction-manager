import React, { useState } from 'react';
import './BalanceComponent.scss';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { Icon } from '@material-ui/core';

export interface IProps {
    event?: any
    open: boolean
}
const actions = [
    { icon: <Icon>star</Icon>, name: 'Copy' },
    { icon: <Icon>star</Icon>, name: 'Save' },
    { icon: <Icon>star</Icon>, name: 'Print' },
    { icon: <Icon>star</Icon>, name: 'Share' },
    { icon: <Icon>star</Icon>, name: 'Delete' },
];



export class AddTransaction extends React.Component<IProps> {

    public render() {
        const [setOpen] = useState(this.props.open);
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
                direction={'up'}
            >
                {/* {actions.map(action => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => setOpen(true)}
                    />
                ))} */}
            </SpeedDial>)
    }
}