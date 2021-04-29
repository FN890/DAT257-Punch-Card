import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import 'primeflex/primeflex.css';

export default function BookingInfo(props) {

    /**
     * Method for sending the latest info to the parent component.
     */
    const onInfoChanged = props.onInfoChanged;

    const [responsible, setResponsible] = useState('');
    const [customer, setCustomer] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [numberOfStudent, setNumberOfStudent] = useState(0);

    useEffect(() => {
        onInfoChanged({ "groupSize": numberOfStudent, "description": "TEST", "responsible": responsible, "customerName": customer, "customerPhone": phone });
    });

    return (
        <div>
            <div className="p-d-flex p-mx-5 p-mb-3">
                <h2>Information</h2>
            </div>
            <div className="p-d-flex p-mx-5 p-mb-5">
                <span className="p-float-label">
                    <InputText id="name" value={responsible} onChange={(e) => setResponsible(e.target.value)} />
                    <label htmlFor="name">Ansvarig</label>
                </span>
            </div>
            <div className="p-d-flex p-mx-5 p-mb-5">
                <span className="p-float-label">
                    <InputText id="name" value={customer} onChange={(e) => setCustomer(e.target.value)} />
                    <label htmlFor="name">Kundnamn</label>
                </span>
            </div>
            <div className="p-d-flex p-mx-5 p-mb-5">
                <span className="p-float-label">
                    <InputMask mask="9999-99 99 99" id="inputPhone" value={phone} onChange={(e) => setPhone(e.value)} useGrouping={false} format={false} />
                    <label htmlFor="inputPhone">Telefon</label>
                </span>
            </div>
            <div className="p-d-flex p-mx-5 p-mb-5">
                <span className="p-float-label">
                    <InputNumber id="inputGroupSize" value={numberOfStudent} onChange={(e) => setNumberOfStudent(e.value)} min={0} max={100} />
                    <label htmlFor="inputGroupSize">Gruppstorlek</label>
                </span>
            </div>
            <div className="p-d-flex p-mx-5 p-mb-5">
                <span className="p-float-label">
                    <InputTextarea id="textarea" value={notes} onChange={(e) => setNotes(e.value)} rows={3} autoResize />
                    <label htmlFor="textarea">Anteckningar</label>
                </span>
            </div>
        </div>
    )
}