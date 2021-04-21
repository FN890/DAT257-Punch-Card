import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import 'primeflex/primeflex.css';

export default function CustomerInfo() {

    const [responsible, setResponsible] = useState('');
    const [customer, setCustomer] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [numberOfStudent, setNumberOfStudent] = useState('');

    useEffect(() => {
        setPhone(null);
        setNumberOfStudent(null);
    }, []);

    return (
        <div className="p-grid p-dir-col">
            <div className="p-col-0 p-mx-5">
                <div className="p-d-flex p-mx-2">
                    <h1>Skapa ny bokning</h1>
                </div>
            </div>
            <div className="p-col-1 p-mx-5 p-mb-3">
                <span className="p-float-label">
                    <InputText id="name" value={responsible} onChange={(e) => setResponsible(e.target.value)} />
                    <label htmlFor="name">Ansvarig</label>
                </span>
            </div>
            <div className="p-col-1 p-mx-5 p-mb-3">
                <span className="p-float-label">
                    <InputText id="name" value={customer} onChange={(e) => setCustomer(e.target.value)} />
                    <label htmlFor="name">Kundnamn</label>
                </span>
            </div>
            <div className="p-col-1 p-mx-5 p-mb-3">
                <span className="p-float-label">
                    <InputMask mask="9999-99 99 99" id="inputPhone" value={phone} onChange={(e) => setPhone(e.value)} useGrouping={false} format={false} />
                    <label htmlFor="inputPhone">Telefon</label>
                </span>
            </div>
            <div className="p-col-1 p-mx-5 p-mb-3">
                <span className="p-float-label">
                    <InputNumber id="inputGroupSize" value={numberOfStudent} onChange={(e) => setNumberOfStudent(e.value)} min={0} max={100} />
                    <label htmlFor="inputGroupSize">Gruppstorlek</label>
                </span>
            </div>
            <div className="p-col-1 p-mx-5">
                <span className="p-float-label">
                    <InputTextarea id="textarea" value={notes} onChange={(e) => setNotes(e.value)} rows={3} autoResize />
                    <label htmlFor="textarea">Anteckningar</label>
                </span>
            </div>
        </div>
    )
}