import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import svLocale from '@fullcalendar/core/locales/sv';
import './Calendar.css';
import React, { useState, useEffect } from 'react';
import BookingService from "./BookingService";


export default function Calendar() {

    const [bookings, setBookings] = useState([]);

    /**
     * Calls once on initiation and fills bookings array with data from BookingService.js
     */
    useEffect(() => {
        BookingService().then(data => setBookings(data));
    },[]);

    return (
        <div>
            <div className="calendar">
                <FullCalendar events={bookings}
                              locale={svLocale}
                              defaultView="dayGridMonth"
                              headerToolbar={{
                                  left: 'prev,next,today',
                                  center: 'title',
                                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                              }}
                              plugins={[dayGridPlugin, timeGridPlugin]} />
            </div>
        </div>
    );
}