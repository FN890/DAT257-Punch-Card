import _default from '@fullcalendar/daygrid';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import BookingService from '../services/BookingService'

export default function IndividualBooking() {
    const { id } = useParams();
    const [booking, setBooking] = useState({});

    useEffect(() => {
        new BookingService().getIndividualBooking(id).then(data => setBooking(data));
        console.log(booking);
    });
    
    //TODO: Return invalid id when invalid.

    return(
    <div>
        <h1>Got the id: {id}</h1>
        <h2>Responsible: {booking.responsible}</h2>
    </div>
    );
}