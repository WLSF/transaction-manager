import React from 'react';
import './BalanceSeparator.scss';

export interface IBalanceSeparator {
    style?: React.CSSProperties;
}

export class BalanceSeparator extends React.Component<IBalanceSeparator> {

    public render() {
        return (
            <hr className="separator" style={{ borderTop: "rgba(33,25,71,0.1) solid 2px", ...this.props.style }} />
        );
    }
}
