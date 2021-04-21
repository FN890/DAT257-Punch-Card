import React, {useState, useEffect, useRef} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import AllBookingsService from "./AllBookingsService";
import {Toast} from 'primereact/toast';

export default function AllBookingsTable() {
    const [booking, setBookings] = useState([]);
    const allBookingsService = new AllBookingsService();

    useEffect(() => {
        allBookingsService.getAllBookings().then(data => setBookings(data));
    }, []);


    for (let i = 0; i < booking.length; i++) {
        booking[i].startTime = booking[i].startTime.replaceAll('T', ' ');
        booking[i].endTime = booking[i].endTime.replaceAll('T', ' ');
        booking[i].startTime = booking[i].startTime.slice(0, 16)
        booking[i].endTime = booking[i].endTime.slice(0, 16)
    }
    const toast = useRef(null);

    const onRowSelect = (event) => {
        toast.current.show({
            severity: 'warn',
            summary: 'Bokning vald',
            detail: 'place holder event will change to selected booking '+ event.data.responsible,
            life: 3000
        });
    }

    const [selectedBooking, setSelectedBooking] = useState(null);

    return (
        <div className="p-shadow-5 p-m-5">


            <Toast ref={toast} />

            <div className="card">
                <DataTable value={booking} selection={selectedBooking}
                           onSelectionChange={e => setSelectedBooking(e.value)} selectionMode="single" dataKey="id"
                           onRowSelect={onRowSelect}>
                    <Column field="responsible" header="Namn"></Column>
                    <Column field="customer.phoneNr" header="Telefon"></Column>
                    <Column field="id" header="Boknings-Id"></Column>
                    <Column field="groupSize" header="Antal personer"></Column>
                    <Column field="startTime" header="Start datum "></Column>
                    <Column field="endTime" header="Slut datum"></Column>
                    <Column field="description" header="Övrigt"></Column>
                </DataTable>
            </div>
        </div>
    );
}


