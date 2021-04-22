import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import svLocale from '@fullcalendar/core/locales/sv';
import { Dialog } from 'primereact/dialog';
import './Calendar.css';
import React, { useState, useEffect } from 'react';
import BookingService from "../services/BookingService";


export default function Calendar() {

    const [bookings, setBookings] = useState([]);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [header, setHeader] = useState("");

    const hideDialog = () => {
        if(displayDialog === true) {
            setDisplayDialog(false)
        }
    }

    /**
     * Calls once on initiation and fills bookings array with data from BookingService.js
     */
    useEffect(() => {
        BookingService().then(function (bookingsArray) {
            console.log(bookingsArray)
            let calendarEvents = []
            bookingsArray.forEach(booking => {
                let indvidualBooking = {
                    "id" : booking.id,
                    "title" : booking.description,
                    "start" : booking.startTime,
                    "end" : booking.endTime,
                    "backgroundColor" : intToRGB(hashCode(booking.description)),
                    "borderColor" : intToRGB(hashCode(booking.description))
                }
                calendarEvents.push(indvidualBooking)
            })
            setBookings(calendarEvents)
        })
    },[]);// eslint-disable-line react-hooks/exhaustive-deps

    const fillDialog = (bookingEvent) => {
        setHeader(bookingEvent.title)
    }

    function hashCode(str) { // java String#hashCode
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    }

    function intToRGB(i){
        var c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();
        return "#" + "00000".substring(0, 6 - c.length) + c;
    }

    return (
        <div>
            <div className="calendar">

                <FullCalendar
                    events={bookings}
                    locale={svLocale}
                    contentHeight={"auto"}
                    headerToolbar={{
                        left: 'prev,next,today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    editable={true}
                    eventClick={
                        function (bookingEvent) {
                            setDisplayDialog(true)
                            fillDialog(bookingEvent.event)
                            console.log(bookingEvent.event)
                        }
                    }>
                </FullCalendar>
                <Dialog header={header} visible={displayDialog} style={{width: '50vw'}} modal onHide={() => hideDialog()} baseZIndex={1000}>
                    Content
                </Dialog>
            </div>
        </div>
    );
}


