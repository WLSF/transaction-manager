import * as React from "react";
import FormItem, { FormItemProps } from 'antd/lib/form/FormItem';
import "./FormItemComponent.scss";

export class FormItemComponent extends React.Component<FormItemProps> {

    public render() {
        return (
            <FormItem colon={false} {...this.props}
                className={`pbr-form-item ${this.props.className || ""}`}>
                {this.props.children}
            </FormItem>
        );
    }
}