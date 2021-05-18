import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import svLocale from '@fullcalendar/core/locales/sv';
import { Dialog } from 'primereact/dialog';
import styles from './Calendar.css';
import React, { useState, useEffect } from 'react';
import BookingService from "../services/BookingService";
import {Divider} from "primereact/divider";
import {Button} from "primereact/button";
import {useHistory} from "react-router-dom";

export default function Calendar() {

    const [bookings, setBookings] = useState([]);
    const [allData, setAllData] = useState([]);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [header, setHeader] = useState("");
    const [dialogBody, setDialogBody] = useState("");
    const bookingService = new BookingService();
    const history = useHistory();

    const hideDialog = () => {
        if(displayDialog === true) {
            setDisplayDialog(false)
        }
    }

    /**
     * Calls once on initiation and fills bookings array with data from BookingService.js
     */
    useEffect(() => {
        bookingService.getNotArchivedBookings().then(function (bookingsArray) {
            console.log(bookingsArray)
            setAllData(bookingsArray)
            let calendarEvents = []
            bookingsArray.forEach(booking => {
                let indvidualBooking = {
                    "id" : booking.id,
                    "title" : booking.description,
                    "start" : booking.startTime,
                    "end" : booking.endTime,
                    "backgroundColor" : intToRGB(hashCode(booking.responsible)),
                    "borderColor" : intToRGB(hashCode(booking.responsible))
                }
                calendarEvents.push(indvidualBooking)
            })
            setBookings(calendarEvents)
        })
    },[]);// eslint-disable-line react-hooks/exhaustive-deps

    const fillDialog = (bookingId) => {
        let booking = allData.find(booking => booking.id == bookingId)
        setHeader(booking.description)

        const activites = []
        booking.reservations.forEach(reservation => {
            activites.push(
                <div className="p-m-2 p-d-flex p-justify-between">
                    <div className="p-text-left">
                        <b>{reservation.activity.name}</b>
                    </div>
                    <div className="p-text-right ">
                        {new Intl.DateTimeFormat(svLocale.code, {
                            month: "long",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                        }).format(new Date(reservation.startTime))}
                        <i className="pi pi-arrow-right p-mx-3"/>
                        {new Intl.DateTimeFormat(svLocale.code, {
                            month: "long",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                        }).format(new Date(reservation.endTime))}
                    </div>
                </div>
            )
            if(reservation !== booking.reservations[booking.reservations.length-1]) {
                activites.push(<Divider/>)
            }
        })

        setDialogBody(
            <div>
                <div className="p-grid p-justify-even ">
                    <div className="p-card">
                        <div className="p-m-2 p-text-left">
                            <b>Kund:</b> {booking.customer.name}
                        </div>
                        <div className="p-m-2 p-text-left">
                            <b>Mobil:</b> {booking.customer.phoneNr}
                        </div>
                        <div className="p-m-2 p-text-left">
                            <b>E-post:</b> {booking.customer.email}
                        </div>
                    </div>
                    <div className="p-card box1">
                        <div className="p-m-2 p-text-left">
                            <b>Boknings-id:</b> {booking.id}
                        </div>
                        <div className="p-m-2 p-text-left">
                            <b>Ansvarig:</b> {booking.responsible}
                        </div>
                    </div>
                </div>

                <div className="p-grid p-my-3 p-justify-even">
                    <div className="p-card p-p-2 activity-card" >
                        {activites}
                    </div>
                </div>
                <div className="p-grid p-justify-center" style={{marginTop:"5%"}}>
                    <Button icon="pi pi-arrow-right" iconPos="right" label="Gå till bokning" onClick={() => history.push("/allabokningar/" + booking.id)}/>
                </div>
            </div>
        )
    }


    function hashCode(str) {
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
    const dialogStyle = {
        width: "70%",
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
                            fillDialog(bookingEvent.event.id)
                        }
                    }>
                </FullCalendar>
                <Dialog className="dialog" header={header} visible={displayDialog} modal onHide={() => hideDialog()} baseZIndex={1000}>
                    {dialogBody}
                </Dialog>
            </div>
        </div>
    );


}


