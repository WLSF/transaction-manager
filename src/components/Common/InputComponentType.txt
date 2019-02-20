import * as React from "react";
import { InputProps } from 'antd/lib/input';
import { Input } from "antd";
import { FormItemProps } from 'antd/lib/form/FormItem';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import "./FormItemComponent.scss";
import { FormItemComponent } from './FormItem';

export interface IPbrInputProps extends InputProps {
    name: string;
    error?: boolean;
    rules?: any[];
    formWrapper?: WrappedFormUtils;
    formItemProps?: FormItemProps;
}

export class InputComponentType extends React.Component<IPbrInputProps> {

    public render() {
        const getFieldDecorator = this.props.formWrapper ? this.props.formWrapper.getFieldDecorator : null;
        const props = { ...this.props };
        const formItemProsp = this.props.formItemProps;
        const value = props.value;

        delete props.formWrapper;
        delete props.formItemProps;
        delete props.value;

        return (
            <FormItemComponent {...formItemProsp} className="pbr-standard-input">
                {getFieldDecorator && getFieldDecorator(props.name, { rules: props.rules, initialValue: value })(
                    <Input {...props} />
                ) || <Input {...props} />}
            </FormItemComponent>
        );
    }
}