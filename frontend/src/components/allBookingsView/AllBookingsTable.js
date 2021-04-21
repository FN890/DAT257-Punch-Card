import React, {useState, useEffect} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import AllBookingsService from "./AllBookingsService";

export default function AllBookingsTable() {
    const [booking, setBookings] = useState([]);
    const allBookingsService = new AllBookingsService();

    useEffect(() => {
        allBookingsService.getAllBookings().then(data => setBookings(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="card">
                <DataTable value={booking}>
                    <Column field="id" header="boknings-Id"></Column>
                    <Column field="groupSize" header="Antal personer"></Column>



                </DataTable>
            </div>
        </div>
    );
}
