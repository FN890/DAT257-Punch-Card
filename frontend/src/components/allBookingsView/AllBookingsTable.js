import React, {useState, useEffect} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import BookingService from "../services/BookingService";
import {useHistory} from "react-router-dom";
import {Button} from 'primereact/button';
import {ToggleButton} from 'primereact/togglebutton';
import {InputText} from "primereact/inputtext";
import {Dialog} from "primereact/dialog";
import moment from 'moment'
import {useCookies} from "react-cookie";

/**
 * Creates the table that shows all bookings with customer info
 * @returns {JSX.Element}
 * @constructor
 */

export default function AllBookingsTable() {

    let [booking, setBookings] = useState([]);
    const [finishedBooking, setFinishedBooking] = useState([])
    const [archivedBooking, setArchivedBooking] = useState([])
    const [updateTable, setUpdateTable] = useState()
    const [globalFilter, setGlobalFilter] = useState(null);
    const [inactiveGlobalFilter, setInactiveGlobalFilter] = useState(null)
    const [archivedGlobalFilter, setArchivedGlobalFilter] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['JWT']);
    const [deletePaidDialog, setDeletePaidDialog] = useState(false);

    const history = useHistory();
    const bookingService = new BookingService();
    let data;

    useEffect(() => {
        setUpdateTable(updateTable + 1)
        bookingService.getAllBookings(cookies.JWT).then(data => {
            setBookings(data)

        });
    }, []);


    let nFinished = 0;
    let activeBookings = 0;
    let archivedBookings = 0;
    let active = booking;
    booking = []
    for (let i = 0; i < active.length; i++) {
        if (moment().isAfter(active[i].endTime) && !active[i].archived) {
            finishedBooking[nFinished] = active[i];
            nFinished++;
        } else if (!active[i].archived) {
            booking[activeBookings] = active[i]
            activeBookings++
        } else {
            archivedBooking[archivedBookings] = active[i]
            archivedBookings++
        }
    }

    const onClickButton = (event) => {
        history.push("/allabokningar/" + event.id);
    }

    const hidePaidDialog = () => {
        setDeletePaidDialog(false);
    }
    const confirmPaid = () => {
        setBookings(booking);
        setDeletePaidDialog(true);
    }

    /**
     * Function to handle a payment
     * @param event
     */

    const confirmDeletePayment = (event) => {
        setBookings(booking);
        setDeletePaidDialog(true);
    }

    const onClickPaid = (event) => {
        bookingService.updateBooking(event.id, event.description, event.responsible, !event.paid, event.price, event.customer, cookies.JWT).then(() => {
            bookingService.getAllBookings(cookies.JWT).then(data => {
                setBookings(data)
            })
        })
        setDeletePaidDialog(false);
    }


    const deletePaymentDialogFooter = () => {
        return (
            <React.Fragment>
                <Button label="Nej" icon="pi pi-times" className="p-button-text" onClick={hidePaidDialog}/>
                <Button label="Ja" icon="pi pi-check" className="p-button-text" onClick={(data) => onClickPaid(data)}/>
            </React.Fragment>
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


    const renderHeader = (globalFilterKey, header, setFilter) => {
        return (
            <div className="p-d-flex">
                <span className="p-input-icon-left">
                    <i className="pi pi-search"/>
                    <InputText type="search" onInput={(e) => setFilter(e.target.value)}
                               placeholder="Sök efter bokning"/>
                </span>
                <div className="table-header" style={{marginLeft: "10px", fontSize: "28px"}}>{header}
                </div>

            </div>
        );
    }

    let footerActive = `Det finns totalt aktiva ${booking ? booking.length : 0} bokningar.`;
    let footerInActive = `Det finns totalt äldre ${finishedBooking ? finishedBooking.length : 0} bokningar.`;
    let footerInArchived = `Det finns totalt ${archivedBooking ? archivedBooking.length : 0} avbokningar.`;

    function CreateDataTable(data, footer, header, filter) {
        return (
            <div className="p-shadow-3 p-m-5">
                <DataTable footer={footer} value={data} scrollable scrollWidth="300px" style={{width: '100%'}}
                           dataKey="id"
                           header={header} globalFilter={filter}>
                    <Column field="customer.name" header="Namn" headerStyle={{width: '110px'}} sortable></Column>
                    <Column field="customer.phoneNr" header="Telefon" headerStyle={{width: '140px'}}></Column>
                    <Column field="id" header="Boknings-Id" headerStyle={{width: '100px'}} sortable></Column>
                    <Column field="groupSize" header="Antal personer" headerStyle={{width: '100px'}} sortable></Column>
                    <Column field="description" header="Övrigt" headerStyle={{width: '300px'}}></Column>
                    <Column field="responsible" header="Ansvarig" headerStyle={{width: '160px'}} sortable></Column>
                    <Column headerStyle={{width: '200px'}} body={actionTemplate}></Column>

                </DataTable>
            </div>

        );
    }

    return (
        <div>
            {CreateDataTable(booking, footerActive, renderHeader(globalFilter, "Alla aktiva och framtida bokningar", setGlobalFilter), globalFilter)}
            {CreateDataTable(finishedBooking, footerInActive, renderHeader(inactiveGlobalFilter, "Alla äldre bokningar", setInactiveGlobalFilter), inactiveGlobalFilter)}
            {CreateDataTable(archivedBooking, footerInArchived, renderHeader(archivedGlobalFilter, "Alla arkiverade bokningar", setArchivedGlobalFilter), archivedGlobalFilter)}
            <Dialog visible={deletePaidDialog} style={{width: '450px'}} header="Bekräfta ändring av betalning" modal
                    footer={deletePaymentDialogFooter} onHide={hidePaidDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                    {booking && <span>Är du säker på att du vill ändra betalningen?</span>}
                </div>
            </Dialog>
        </div>

    );
}


