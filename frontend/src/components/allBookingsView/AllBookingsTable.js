import React, {useState, useEffect, useRef} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import BookingService from "../services/BookingService";
import {useHistory, useLocation} from "react-router-dom";
import { Button } from 'primereact/button';
import ActivityService from "../services/ActivityService";


/**
 * Creates the table that shows all bookings with customer info
 * @returns {JSX.Element}
 * @constructor
 */
export default function AllBookingsTable() {
    const [booking, setBookings] = useState([]);
    const [updateTable, setUpdateTable] = useState()

    useEffect(() => {
        setUpdateTable(updateTable + 1)
        new BookingService().getAllBookings().then(data => setBookings(data));
    }, []);


    for (let i = 0; i < booking.length; i++) {
        booking[i].startTime = booking[i].startTime.replaceAll('T', ' ');
        booking[i].endTime = booking[i].endTime.replaceAll('T', ' ');
        booking[i].startTime = booking[i].startTime.slice(0, 16)
        booking[i].endTime = booking[i].endTime.slice(0, 16)
    }

    const history = useHistory();

    const onRowSelect = (event) => {
        history.push("/allabokningar/" + event.data.id);
    }

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [multiSortMeta, setMultiSortMeta] = useState([{field: 'category', order: -1}]);

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-user-edit" className="p-button-rounded p-button-success p-mr-2" onClick={() => onRowSelect} />
            </React.Fragment>
        );
    }

    return (
        <div className="p-shadow-5 p-m-5">

            <DataTable value={booking} selection={selectedBooking}
                       onSelectionChange={e => setSelectedBooking(e.value)} selectionMode="single" dataKey="id"
                       onRowSelect={onRowSelect}>
                <Column field="customer.name" header="Namn" sortable></Column>
                <Column field="customer.phoneNr" header="Telefon"></Column>
                <Column field="id" header="Boknings-Id" sortable></Column>
                <Column field="groupSize" header="Antal personer" sortable></Column>
                <Column field="startTime" header="Start datum " sortable></Column>
                <Column field="endTime" header="Slut datum" sortable></Column>
                <Column field="description" header="Övrigt"></Column>
                <Column field="responsible" header="Skapad av" sortable></Column>
                <Column body={actionBodyTemplate}></Column>
            </DataTable>
        </div>
    );
}


