import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import svLocale from '@fullcalendar/core/locales/sv';
import './Calendar.css';
import React, { useState, useEffect } from 'react';
import BookingService from "./BookingService";


export default function Calendar() {

    const [bookings, setBookings] = useState([]);

    /*
    Should be requested from api instead of hardcoded
     */
    const colors = {
        "Stuga" : "#008800",
        "Badtunna" : "#ff0000",
        "VattenSkidor" : "#0000ff",
        "Annat" : "#778899"
    }

    /**
     * Calls once on initiation and fills bookings array with data from BookingService.js
     */
    useEffect(() => {
        BookingService().then(function (bookingsArray) {
            (bookingsArray).map(
                obj => {
                    console.log(obj)
                    let i;
                    let bookingsArray = [obj.reservations.length + 1];

                    bookingsArray[obj.reservations.length] = {
                        "id": obj.id,
                        "title": obj.description,
                        "start": obj.startTime,
                        "end": obj.endTime,
                        "backgroundColor": colors.Annat ,
                        "borderColor": colors.Annat,
                    }
                    for (i = 0; i < obj.reservations.length; i++) {
                        let activity = obj.reservations[i].activity.name
                        bookingsArray[i] = {
                            "id": obj.reservations[i].id,
                            "title": activity,
                            "start": obj.reservations[i].startTime,
                            "end": obj.reservations[i].endTime,
                            "backgroundColor": (activity==="Stuga") ? colors.Stuga : (activity==="Badtunna") ? colors.Badtunna : (activity==="VattenSkidor") ? colors.VattenSkidor : colors.Annat,
                            "borderColor": (activity==="Stuga") ? colors.Stuga : (activity==="Badtunna") ? colors.Badtunna : (activity==="VattenSkidor") ? colors.VattenSkidor : colors.Annat,
                        }
                    }
                    console.log(bookingsArray)
                    setBookings(bookingsArray)
                }
            )
        })
    },[]);

    return (
        <div>
            <div className="calendar">

                <FullCalendar
                    events={bookings}
                    locale={svLocale}
                    defaultView="dayGridMonth"
                    headerToolbar={{
                        left: 'prev,next,today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    editable={true}
                    eventClick={
                        function (bookingEvent) {
                            alert(bookingEvent.event.title)
                        }
                    }>

                </FullCalendar>
            </div>
        </div>
    );
}


