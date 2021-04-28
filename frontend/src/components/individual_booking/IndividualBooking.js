import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router';
import 'primeflex/primeflex.css';
import './IndividualBooking.css';
import { Button } from 'primereact/button';
import BookingService from '../services/BookingService';
import Reservation from './components/Reservation';
import { Dialog } from 'primereact/dialog';
import {Redirect, useHistory} from 'react-router-dom';


export default function IndividualBooking() {
    const { id } = useParams();
    const [booking, setBooking] = useState({});
    const [reservations, setReservations] = useState([]);
    const [customer, setCustomer] = useState({})
    const [deleteBookingDialog, setDeleteBookingDialog] = useState(false);
    const [deleteBookingsDialog, setDeleteBookingsDialog] = useState(false);
    const history = useHistory();


    const bookingService = new BookingService();

    useEffect(() => {
        bookingService.getIndividualBooking(id).then(data => {
            setBooking(data);
            setCustomer(data.customer);
            const res = [];
            data.reservations.forEach(r => {
                res.push(
                    <Reservation reservation={r}/>
                );
            });
            setReservations(res);
        });
    }, []);


    const hideDeleteBookingDialog = () => {
        setDeleteBookingDialog(false);
    }
    const confirmDeleteBooking = () => {
        setBooking(booking);
        setDeleteBookingDialog(true);
    }

    const deleteProduct = () => {
        bookingService.deleteBooking(id)
        setDeleteBookingDialog(false);
        history.push("/allabokningar");
        window.location.reload(false);
    }

    const deleteBookingDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteBookingDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    return(
    <div className="p-d-flex p-flex-column p-ai-start p-mx-5 p-mb-5 p-justify-center">
        <div className="p-shadow-5 p-m-3" style={{width: "70%"}}>
            <div className="p-justify-even p-d-flex p-flex-column p-flex-md-row" style={{padding: "5%"}}>
                <div className="p-card p-p-2 p-mb-2 p-mr-2" style={{width:"60%"}}>
                    <div className="p-m-2 p-text-left">
                        <b>Kund:</b> {customer.name}
                    </div>
                    <div className="p-m-2 p-text-left">
                        <b>Mobil:</b> {customer.phoneNr}
                    </div>
                </div>
                <div className="p-card p-p-2 p-mb-2 p-mr-2" style={{width:"60%"}}>
                    <div className="p-m-2 p-text-left">
                        <b>Boknings-id:</b> {booking.id}
                    </div>
                    <div className="p-m-2 p-text-left">
                        <b>Ansvarig:</b> {booking.responsible}
                    </div>
                </div>
            </div>
        </div>
        <div className="p-shadow-5 p-m-3" style={{width: "70%"}}>
            {reservations}
        </div>
        <div className="p-m-3 p-grid" style={{width: "70%"}}>
            <Button label="Redigera" icon="pi pi-pencil" className="p-button-info p-col" />
            <Button label="Ta bort" icon="pi pi-minus" className="p-button-danger p-col" onClick={() => confirmDeleteBooking(id)}/>
        </div>
        <Dialog visible={deleteBookingDialog} style={{ width: '450px' }} header="Bekräfta borttagning" modal footer={deleteBookingDialogFooter} onHide={hideDeleteBookingDialog}>
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                {booking && <span>Är du säker på att du vill ta bort bokningen?</span>}
            </div>
        </Dialog>
    </div>

    );
}