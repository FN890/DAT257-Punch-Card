import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import React, { useState, useEffect } from 'react';

export default function FinishButtonGroup(props) {

    /**
     * Method used for notifying parent component that create booking button has been clicked.
     */
    const onCreateBookingPressed = props.onCreateBookingPressed;

    return (
        <div className="p-d-flex p-jc-end p-m-3">
            <Button label="Avbryt" className="p-button-danger p-button-text p-mr-2" />
            <Button label="Skapa bokning" className="p-button-raised" onClick={onCreateBookingPressed} />
        </div>
    )
}