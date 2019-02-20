import React from 'react';
import axios from 'axios';
import { InputProps } from '@material-ui/core/Input';
import { IObject } from '../components/Common/TableComponent';



async function add(object: IObject, rows: IObject[]) {
    const returnable = (await axios.post<IObject>(`http://localhost:3131/transactions`, object)).data;
    return returnable;
}


export { add };



