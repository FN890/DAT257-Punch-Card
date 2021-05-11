import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router';
import 'primeflex/primeflex.css';
import './IndividualBooking.css';
import {Button} from 'primereact/button';
import BookingService from '../services/BookingService';
import Reservation from './components/Reservation';
import {Dialog} from 'primereact/dialog';
import {useHistory} from 'react-router-dom';
import {InputText} from "primereact/inputtext";
import {ToggleButton} from "primereact/togglebutton";


export default function IndividualBooking() {
    const {id} = useParams();
    const [booking, setBooking] = useState({});
    const [reservations, setReservations] = useState([]);
    const [customer, setCustomer] = useState({})
    const [deleteBookingDialog, setDeleteBookingDialog] = useState(false);
    const [saveBookingDialog, setSaveBookingDialog] = useState(false);
    const history = useHistory();
    const [confirmationDialog, setConfirmationDialog] = useState(false);

    const [responsible, setResponsible] = useState('');
    const [isPaid, setPaid] = useState();
    const [price, setPrice] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [disabled, setDisabled] = useState(true);


    const bookingService = new BookingService();

    useEffect(() => {
        bookingService.getIndividualBooking(id).then(data => {
            setBooking(data);
            setCustomer(data.customer.name);
            setResponsible(data.responsible);
            setPaid(data.paid);
            setPrice(data.price);
            setEmail(data.customer.email);
            setPhone(data.customer.phoneNr);
            setDescription(data.description);
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

    const hideSaveBookingDialog = () => {
        setSaveBookingDialog(false);
    }

    const hideConfirmationDialog = () => {
        setConfirmationDialog(false);
    }

    const confirmDeleteBooking = () => {
        setBooking(booking);
        setDeleteBookingDialog(true);
    }

    const confirmSaveBooking = () => {
        setBooking(booking);
        setSaveBookingDialog(true);
    }

    const deleteProduct = () => {
        bookingService.deleteBooking(id)
        setDeleteBookingDialog(false);
        history.push("/allabokningar");
    }

    const updateBooking = () => {
        bookingService.updateBooking(id, description, responsible, isPaid, price, booking.customer);
        setConfirmationDialog(true);
        setSaveBookingDialog(false);
        setDisabled(true);

    }

    const deleteBookingDialogFooter = (
        <React.Fragment>
            <Button label="Nej" icon="pi pi-times" className="p-button-text" onClick={hideDeleteBookingDialog}/>
            <Button label="Ja" icon="pi pi-check" className="p-button-text" onClick={deleteProduct}/>
        </React.Fragment>
    );

    const saveBookingDialogFooter = (
        <React.Fragment>
            <Button label="Nej" icon="pi pi-times" className="p-button-text" onClick={hideSaveBookingDialog}/>
            <Button label="Ja" icon="pi pi-check" className="p-button-text" onClick={() => updateBooking()}/>
        </React.Fragment>
    );

    const confirmationDialogFooter = (
        <React.Fragment>
            <Button label="Okej" icon="pi pi-check" className="p-button-success" onClick={hideConfirmationDialog}/>
        </React.Fragment>
    );

    return (
        <div className="p-grid p-jc-center">
            <div className="p-shadow-5 p-m-3 p-col-12" style={{width: "60%"}}>
                <div className="p-grid p-jc-center" style={{margin: "30pt 0 0 0"}}>
                    <div className="p-card p-col-6" style={{width: "200pt", margin: "0 30pt"}}>
                        <div className="p-m-2 p-text-left">
                            <b>Kundens namn:</b>
                            <InputText style={{margin: "5pt 0 0 0"}} disabled={disabled} value={customer}
                                       onChange={(e) => setCustomer(e.target.value)}/>
                        </div>
                        <div className="p-m-2 p-text-left">
                            <b>Mobil:</b>
                            <InputText style={{margin: "5pt 0 0 0"}} disabled={disabled} value={phone}
                                       onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        <div className="p-m-2 p-text-left">
                            <b>E-mail:</b>
                            <InputText style={{margin: "5pt 0 0 0"}} disabled={disabled} value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="p-card p-col-6" style={{width: "200pt", margin: "0pt 30pt"}}>
                        <div className="p-m-2 p-text-left">
                            <b>Boknings-id:</b> {booking.id}
                        </div>
                        <div className="p-m-2 p-text-left">
                            <b>Ansvarig:</b>
                            <InputText style={{margin: "5pt 0 0 0"}} disabled={disabled} value={responsible}
                                       onChange={(e) => setResponsible(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="p-grid p-jc-center" style={{margin: "30pt 0 0 0"}}>
                    <div className="p-col-6" style={{width: "150pt", margin: "0 30pt"}}>
                        <div className="p-m-2 p-text-center">
                            <b>Beskrivning:</b>
                            <InputText style={{margin: "5pt 0 0 0"}} disabled={disabled} value={description}
                                       onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                    </div>
                    <div className="p-col-6" style={{width: "150pt", margin: "0 30pt"}}>
                        <div className="p-text-center p-col-12">
                            <b>Pris:</b>
                            <InputText style={{margin: "5pt 0 0 0"}} disabled={disabled} value={price}
                                       onChange={(e) => setPrice(e.target.value)}/>
                        </div>
                        <div className="p-text-center p-col-12">
                            <b>Betald:</b>
                            <ToggleButton disabled={disabled} style={{margin: "10pt 0 0 10pt"}} onLabel="Betalat"
                                          offLabel="Ej betalt" onIcon="pi pi-check" offIcon="pi pi-times"
                                          checked={isPaid} onChange={(e) => setPaid(e.target.value)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-shadow-5 p-m-3 p-col-12" style={{width: "60%"}}>
                {reservations}
            </div>
            <div className="p-m-3 p-grid" style={{width: "40%"}}>
                <Button label="Spara" icon="pi pi-check" className="p-button-success p-col p-shadow-5"
                        style={{margin: "0 30pt 0 0"}} onClick={() => confirmSaveBooking()}/>
                <Button label="Redigera" icon="pi pi-pencil" className="p-button-info p-col p-shadow-5"
                        style={{margin: "0 30pt 0 0"}} onClick={() => setDisabled(!disabled)}/>
                <Button label="Ta bort" icon="pi pi-minus" className="p-button-danger p-col p-shadow-5"
                        onClick={() => confirmDeleteBooking()}/>

            </div>
            <div>
            <Dialog visible={deleteBookingDialog} style={{width: '450px'}} header="VARNING! Bekräfta borttagning" modal
                    footer={deleteBookingDialogFooter} onHide={hideDeleteBookingDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                    {booking && <span>Är du säker på att du vill ta bort bokningen?</span>}
                </div>
            </Dialog>
            </div>
            <div>
                <Dialog visible={saveBookingDialog} style={{width: '450px'}} header="Bekräfta ändringar" modal
                        footer={saveBookingDialogFooter} onHide={hideSaveBookingDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                        {booking && <span>Är du säker på att du vill ändra bokningen?</span>}
                    </div>
                </Dialog>
            </div>
            <div>
                <Dialog visible={confirmationDialog} style={{width: '450px'}} header="Information" modal
                        footer={confirmationDialogFooter} onHide={hideConfirmationDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-bell p-mr-3" style={{fontSize: '2rem'}}/>
                        {booking && <span>Bokningen har nu uppdaterats</span>}
                    </div>
                </Dialog>
            </div>

        </div>

    );
}