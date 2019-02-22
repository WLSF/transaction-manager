import React from 'react';
import './BalanceComponent.scss';
import { Icon, Fab, Typography } from '@material-ui/core'
import AddTransaction from './AddTransaction';

export interface IBalanceSeparator {
    style?: React.CSSProperties;
    expenses?: any,
    income?: any,
    taxes?: any
}

export class BalanceComponent extends React.Component<IBalanceSeparator> {

    public render() {
        return (
            <>
                <div className="cards-info">
                    <div className="card-total expenses">
                        <div className="card-icon-border">
                            <Icon className="icon">trending_down</Icon>
                        </div>
                        <div className="card-content">
                            <div className="card-description">Expenses</div>
                            <div className="card-value">{this.props.expenses}</div>
                        </div>
                    </div>
                    <div className="card-total incomes">
                        <div className="card-icon-border">
                            <Icon className="icon">trending_up</Icon>
                        </div>
                        <div className="card-content">
                            <div className="card-description">Incomes</div>
                            <div className="card-value">{this.props.income}</div>
                        </div>
                    </div>
                    <div className="card-total taxes">
                        <div className="card-icon-border">
                            <Icon className="icon">money_off</Icon>
                        </div>
                        <div className="card-content">
                            <div className="card-description">Taxes</div>
                            <div className="card-value">{this.props.taxes}</div>
                        </div>
                    </div>

                    <div className="card-total add">
                        <div className="card-content">
                            <div className="card-description"><Typography variant="caption">
                                Add new transaction</Typography></div>

                            <AddTransaction />
                        </div>
                    </div>
                </div>



            </>
        );
    }
}
{/*  */ }