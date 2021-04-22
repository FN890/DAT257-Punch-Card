import React from 'react';
import { useParams } from 'react-router';
import BookingService from '../services/BookingService'

export default function IndividualBooking() {
    const { id } = useParams();


    return(
    <div>
        <h1>Got the id: {id}</h1>
    </div>
    );
}