import * as React from 'react';
import './Title.scss';

export enum Size {
    h1 = 'h1',
    h2 = 'h2',
    h3 = 'h3',
    h4 = 'h4',
    h5 = 'h5',
    h6 = 'h6'
}

export interface IProps {
    size: Size | string;
    style?: React.CSSProperties;
    preset?: "lighter" | "bolder";
    className?: string;
    id?: string;
}

export default class Title extends React.Component<IProps>{

    public render() {
        let style;
        if (this.props.preset === "lighter") {
            style = { fontWeight: 'lighter', color: '#888888', fontFamily: 'Open sans', ...this.props.style };
        } else if (this.props.preset === "bolder") {
            style = { fontWeight: 'bolder', fontFamily: 'Lato', ...this.props.style };
        } else {
            style = { ...this.props.style };
        }

        return React.createElement(this.props.size, {
            className: `pbr-standard-title ${this.props.className}`, style, id: this.props.id,
        },
            this.props.children);
    }
}
