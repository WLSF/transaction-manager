import React from 'react';
import axios from 'axios';
import { IObject } from '../components/Common/TableComponent';



async function add(object: IObject) {
    const returnable = (await axios.post<IObject>(`http://localhost:3131/transactions`, object)).data;
    return returnable;
}

async function edit(object: IObject) {
    const returnable = (await axios.put<IObject>(`http://localhost:3131/transactions`, object)).data;
    return returnable;
}

async function get() {
    const returnable = (await axios.get<IObject>(`http://localhost:3131/transactions`)).data;
    return returnable;
}

async function getById(object: IObject) {
    const returnable = (await axios.get<IObject>(`http://localhost:3131/transactions/?id=${object.id}`)).data;
    return returnable;
}




export { add, getById, get, edit };



