import _default from '@fullcalendar/daygrid';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import BookingService from '../services/BookingService'
import 'primeflex/primeflex.css';
import './IndividualBooking.css';

export default function IndividualBooking() {
    const { id } = useParams();
    const [booking, setBooking] = useState({});

    useEffect(() => {
        new BookingService().getIndividualBooking(id).then(data => setBooking(data));
    });
    

    //TODO: Return invalid id when invalid.

    return(
    <div>
        <div className="p-shadow-5 p-m-5">
        <h1>Bokning #{id}</h1>
            <div>
                <h3 className="form">Beskrivning: </h3>
                <h4 className="value">{booking.description}</h4>
            </div>
            <div>
                <h3 className="form">Starttid: </h3>
                <h4 className="value">{booking.startTime}</h4>
            </div>
            <div>
                <h3 className="form">Sluttid: </h3>
                <h4 className="value">{booking.endTime}</h4>
            </div>
            <div>
                <h3 className="form">Ansvarig: </h3>
                <h4 className="value">{booking.responsible}</h4>
            </div>
            <div>
                <h3 className="form">Grupp storlek: </h3>
                <h4 className="value">{booking.groupSize}</h4>
            </div>
            
            
        </div>
    </div>

    );
}