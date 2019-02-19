import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableComponent from '../Common/TableComponent'
import Wallet from '../Wallet/Wallet';
function PersonList() {
    const data = {
        id: 88,
        name: ''
    }

    const [transaction, setTransaction] = useState('');
    let objects: any[] = [];
    // const [setObjects] = useState(objects);

    //usually used as didMount && didUpdate
    useEffect(() => {

        axios.get(`http://localhost:3131/`)
            .then(res => {
                objects.push(res.data);
                // console.log(objects);
            })
    }, [objects]
    );

    return (
        <div>

            <TableComponent />

            <ul>
                <li>{objects.map(data => data.data.name)}</li>
            </ul>

            <input type="text" value={transaction}
                onChange={(event) => {
                    setTransaction(event.target.value);
                }} />
            <button type="submit" onClick={() => {
                data.name = transaction
                axios.post(`http://localhost:3131/posts`, data)
                    .then(res => {
                        console.log(objects);
                    })
            }}>ENIAR</button>
            <Wallet />
        </div>
    )
};

export default PersonList;
