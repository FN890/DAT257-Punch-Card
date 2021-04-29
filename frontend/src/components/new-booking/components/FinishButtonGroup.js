import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';

export default function FinishButtonGroup(props) {

    /**
     * Method used for notifying parent component that create booking button has been clicked.
     */
    const onCreateBookingPressed = props.onCreateBookingPressed;

    return (
        <div className="p-d-flex p-jc-end">
            <div className="p-mr-2 p-mb-3">
                <Button label="Avbryt" className="p-button-danger p-button-text p-mr-2"/>
            </div>
            <div className="p-mr-5 p-mb-3">
                <Button label="Skapa bokning" className="p-button-raised" onClick={onCreateBookingPressed}/>
            </div>
        </div>
    )
}