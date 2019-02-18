import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PersonList() {
    const data = {
        data: {
            name
        }
    }

    const [persons, setPersons] = useState([data]);
    //usually used as didMount && didUpdate
    useEffect(() => {

        axios.get(`http://localhost:3030/data`)
            .then(res => {
                setPersons(res.data)
            })
    }, [setPersons]
    );

    const [transaction, setTransaction] = useState('');
    useEffect(() => {
        axios.post(`http://localhost:3030/data`, { data })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }, [transaction]
    );
    return (
        <div>
            <input className="input__transaction" value={transaction} onChange={() => {
                setTransaction(transaction);
            }} />

            <ul>
                <li>{persons.map(person => person.data.name)}</li>
            </ul>
        </div>
    )
};

export default PersonList;
