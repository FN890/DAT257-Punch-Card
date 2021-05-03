import React, {useState, useEffect, useRef} from 'react';
import { useParams } from 'react-router';
import 'primeflex/primeflex.css';
import './IndividualBooking.css';
import { Button } from 'primereact/button';
import BookingService from '../services/BookingService';
import Reservation from './components/Reservation';
import { Dialog } from 'primereact/dialog';
import {useHistory} from 'react-router-dom';


export default function IndividualBooking() {
    const { id } = useParams();
    const [booking, setBooking] = useState({});
    const [reservations, setReservations] = useState([]);
    const [customer, setCustomer] = useState({})
    const [deleteBookingDialog, setDeleteBookingDialog] = useState(false);
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
    }

    const deleteBookingDialogFooter = (
        <React.Fragment>
            <Button label="Nej" icon="pi pi-times" className="p-button-text" onClick={hideDeleteBookingDialog} />
            <Button label="Ja" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    return(
    <div className="p-grid p-jc-center">
        <div className="p-shadow-5 p-m-3 p-col-12" style={{width: "60%"}}>
            <div className="p-grid p-jc-center" style={{margin: "30pt 0 0 0"}}>
                <div className="p-card p-col-6" style={{width: "150pt", margin: "0 30pt"}}>
                    <div className="p-m-2 p-text-left">
                        <b>Kund:</b> {customer.name}
                    </div>
                    <div className="p-m-2 p-text-left">
                        <b>Mobil:</b> {customer.phoneNr}
                    </div>
                </div>
                <div className="p-card p-col-6" style={{width: "150pt", margin: "0 30pt"}}>
                    <div className="p-m-2 p-text-left">
                        <b>Boknings-id:</b> {booking.id}
                    </div>
                    <div className="p-m-2 p-text-left">
                        <b>Ansvarig:</b> {booking.responsible}
                    </div>
                </div>
            </div>
            <div className="p-grid p-jc-center" style={{margin: "30pt 0 0 0"}}>
            <div className="p-col-6" style={{width: "150pt", margin: "0 30pt"}}>
                    <div className="p-m-2 p-text-center">
                        <b>Beskrivning:</b> {booking.description}
                    </div>
                </div>
            <div className="p-col-6" style={{width: "150pt", margin: "0 30pt"}}>
                    <div className="p-text-center p-col-12">
                        <b>Pris:</b> {booking.price}
                    </div>
                    <div className="p-text-center p-col-12">
                        <b>Betald:</b> {booking.paid ? "Ja" : "Nej"}
                    </div>
                </div>
            </div>
        </div>
        <div className="p-shadow-5 p-m-3 p-col-12" style={{width: "60%"}}>
            {reservations}
        </div>
        <div className="p-m-3 p-grid" style={{width: "40%"}}>
            <Button label="Redigera" icon="pi pi-pencil" className="p-button-info p-col p-shadow-5" style={{margin: "0 30pt 0 0"}}/>
            <Button label="Ta bort" icon="pi pi-minus" className="p-button-danger p-col p-shadow-5" onClick={() => confirmDeleteBooking()}/>
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