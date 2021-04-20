import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import 'primeflex/primeflex.css';

export default function CustomerInfo() {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');

    return (
        <div className="p-grid p-dir-col">
            <div className="p-col-1 p-mx-5">
                <h1>Kundinformation</h1>
            </div>
            <div className="p-col-1 p-mx-5 p-mb-3">
                <span className="p-float-label">
                    <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="name">Namn</label>
                </span>
            </div>
            <div className="p-col-1 p-mx-5 p-mb-3">
                <span className="p-float-label">
                    <InputMask id="inputmask" value={phone} onChange={(e) => setPhone(e.value)} mask="9999-99 99 99" />
                    <label htmlFor="inputmask">Telefon</label>
                </span>
            </div>
            <div className="p-col-1 p-mx-5 p-mb-3">
                <span className="p-float-label">
                    <InputTextarea id="textarea" value={notes} onChange={(e) => setNotes(e.value)} rows={3}/>
                    <label htmlFor="textarea">Anteckningar</label>
                </span>
            </div>
        </div>
    )
}
