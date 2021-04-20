import CustomerInfo from "./components/CustomerInfo"
import 'primeflex/primeflex.css';
import React, { useState } from 'react';

import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button'

export default function NewBooking() {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <div>
            <div className="card">
                <div className="p-fluid p-formgrid p-grid p-m-5">
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <InputText id="inputtext" value={name} onChange={(e) => setName(e.target.value)} />
                            <label htmlFor="inputtext">Namn</label>
                        </span>
                    </div>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <InputMask id="inputmask" value={phone} onChange={(e) => setPhone(e.value)} mask="9999-99 99 99" />
                            <label htmlFor="inputmask">Telefon</label>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

