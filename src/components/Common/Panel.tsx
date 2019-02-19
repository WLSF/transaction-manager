import { HTMLAttributes } from "react";
import "./Panel.scss";
import React from 'react';

export default class Panel extends React.Component<HTMLAttributes<HTMLParagraphElement>>{
    public render() {
        const defaultStyle = {
            minWidth: "100%",
            borderRadius: "8px",
            backgroundColor: "#fff",
            ...this.props.style
        };

        return (
            <div style={defaultStyle} className="panel">
                {this.props.children}</div>
        );

    }
}