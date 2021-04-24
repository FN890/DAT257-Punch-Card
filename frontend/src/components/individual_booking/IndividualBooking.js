import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import 'primeflex/primeflex.css';
import './IndividualBooking.css';
import { Button } from 'primereact/button';

import BookingService from '../services/BookingService';
import Reservation from './components/Reservation';

export default function IndividualBooking() {
    const { id } = useParams();
    const [booking, setBooking] = useState({});
    const [reservations, setReservations] = useState([]);
    const [customer, setCustomer] = useState({})

    const bookingService = new BookingService();

    useEffect(() => {
        bookingService.getIndividualBooking(id).then(data => {
            setBooking(data);
            setCustomer(data.customer);
            const res = [];
            data.reservations.forEach(r => {
                res.push(
                    <Reservation reservation={r}/>
                );
            });
            setReservations(res);
        });
    });

    return(
    <div className="p-d-flex p-flex-column p-ai-start p-mx-5 p-mb-5 p-justify-center">
        <div className="p-shadow-5 p-m-3" style={{width: "70%"}}>
            <div className="p-justify-even p-d-flex p-flex-column p-flex-md-row" style={{padding: "5%"}}>
                <div className="p-card p-p-2 p-mb-2 p-mr-2" style={{width:"60%"}}>
                    <div className="p-m-2 p-text-left">
                        <b>Kund:</b> {customer.name}
                    </div>
                    <div className="p-m-2 p-text-left">
                        <b>Mobil:</b> {customer.phoneNr}
                    </div>
                </div>
                <div className="p-card p-p-2 p-mb-2 p-mr-2" style={{width:"60%"}}>
                    <div className="p-m-2 p-text-left">
                        <b>Boknings-id:</b> {booking.id}
                    </div>
                    <div className="p-m-2 p-text-left">
                        <b>Ansvarig:</b> {booking.responsible}
                    </div>
                </div>
            </div>
        </div>
        <div className="p-shadow-5 p-m-3" style={{width: "70%"}}>
            {reservations}
        </div>
        <div className="p-m-3 p-grid" style={{width: "70%"}}>
            <Button label="Redigera" icon="pi pi-pencil" className="p-button-info p-col" />
            <Button label="Ta bort" icon="pi pi-minus" className="p-button-danger p-col" />
        </div>
    </div>

    );
}