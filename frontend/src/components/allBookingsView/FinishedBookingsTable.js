import React, {useState, useEffect} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import BookingService from "../services/BookingService";
import {useHistory} from "react-router-dom";
import {Button} from 'primereact/button';
import {ToggleButton} from 'primereact/togglebutton';
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";

export default function FinishedBookingsTable() {
    const [booking, setBookings] = useState([]);
    const bookingService = new BookingService();
    const [globalFilter, setGlobalFilter] = useState(null);


    useEffect(() => {

        bookingService.getAllBookings().then(data => {
            setBookings(data)

        });
    }, []);

    const renderHeader = (globalFilterKey) => {
        return (
            <div className="p-d-flex">

                <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)}
                               placeholder="Sök efter gammal bokning"/>
                </span>
            </div>
        );
    }

    const actionTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-user-edit" className="p-button-rounded p-button-success p-mr-2"
                        onClick={() => onClickButton(rowData)}/>
                <ToggleButton onLabel="Betalt" offLabel="Ej betalt" onIcon="pi pi-check" offIcon="pi pi-times"
                              checked={rowData.paid} onChange={() => onClickPaid(rowData)}/>
            </React.Fragment>
        );
    }
    let footer = `Det finns totalt ${booking ? booking.length : 0} bokningar.`;
    return (
        <div className="p-shadow-3 p-m-5">
            <header>Gamla bokningar    </header>
            <DataTable footer={footer} value={booking} scrollable scrollWidth="300px" style={{width: '100%'}}
                        dataKey="id"
                       header={renderHeader(globalFilter)} globalFilter={globalFilter}>
                <Column field="customer.name" header="Namn" headerStyle={{width: '110px'}} sortable></Column>
                <Column field="customer.phoneNr" header="Telefon" headerStyle={{width: '140px'}}></Column>
                <Column field="id" header="Boknings-Id" headerStyle={{width: '100px'}} sortable></Column>
                <Column field="groupSize" header="Antal personer" headerStyle={{width: '100px'}} sortable></Column>
                {/*<Column field="startTime" header="Start datum " headerStyle={{ width: '160px' }} sortable></Column>
                    <Column field="endTime" header="Slut datum" headerStyle={{ width: '160px' }} sortable></Column> */}
                <Column field="description" header="Övrigt" headerStyle={{width: '300px'}}></Column>
                <Column field="responsible" header="Ansvarig" headerStyle={{width: '160px'}} sortable></Column>
                <Column headerStyle={{width: '200px'}} body={actionTemplate}></Column>
            </DataTable>
        </div>


    )
}