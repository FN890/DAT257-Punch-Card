import React, {useState, useEffect, useRef} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import BookingService from "../services/BookingService";
import {useHistory, useLocation} from "react-router-dom";
import {Button} from 'primereact/button';
import ActivityService from "../services/ActivityService";
import {ScrollPanel} from "primereact/scrollpanel";
import {InputText} from "primereact/inputtext";


/**
 * Creates the table that shows all bookings with customer info
 * @returns {JSX.Element}
 * @constructor
 */
export default function AllBookingsTable() {
    const [booking, setBookings] = useState([]);
    const [updateTable, setUpdateTable] = useState()
    const [globalFilter, setGlobalFilter] = useState(null);

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
                <Button icon="pi pi-user-edit" className="p-button-rounded p-button-success p-mr-2"
                        onClick={() => onRowSelect}/>
            </React.Fragment>
        );
    }

    const renderHeader = (globalFilterKey) => {
        return (
            <span className="p-input-icon-left p-d-flex">
                <i className="pi pi-search" />
                <InputText type="sök" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Sök efter bokning" />
            </span>
        );
    }

    return (
        <div className="p-shadow-2 p-m-5">
                <DataTable value={booking} scrollable  scrollWidth="300px" style={{ width: '100%' }} selection={selectedBooking}
                           onSelectionChange={e => setSelectedBooking(e.value)} selectionMode="single" dataKey="id"
                           onRowSelect={onRowSelect} globalFilter={globalFilter} header={renderHeader(globalFilter)}>
                    <Column field="customer.name" header="Namn" headerStyle={{ width: '110px' }} sortable></Column>
                    <Column field="customer.phoneNr" header="Telefon" headerStyle={{ width: '120px' }}></Column>
                    <Column field="id" header="Boknings-Id" headerStyle={{ width: '150px' }} sortable></Column>
                    <Column field="groupSize" header="Antal personer" headerStyle={{ width: '170px' }} sortable></Column>
                    <Column field="startTime" header="Start datum " headerStyle={{ width: '160px' }} sortable></Column>
                    <Column field="endTime" header="Slut datum" headerStyle={{ width: '160px' }} sortable></Column>
                    <Column field="description" header="Övrigt" headerStyle={{ width: '300px' }}></Column>
                    <Column field="responsible" header="Ansvarig" headerStyle={{ width: '160px' }} sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
        </div>
    );
}


