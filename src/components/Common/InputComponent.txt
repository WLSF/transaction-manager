import React from 'react';
import { InputProps } from 'antd/lib/input';
import { Input } from "antd";

export class InputComponent extends React.Component<InputProps & { error: boolean }>{
    constructor(props: any) {
        super(props);
    }

    public render() {
        const props = {
            ...this.props,
            error: undefined
        };
        if (!this.props.error) {
            return <Input {...props} />
        }
        return <Input {...props} style={{ borderColor: "#E2B0B0", ...this.props.style }} />
    }
}