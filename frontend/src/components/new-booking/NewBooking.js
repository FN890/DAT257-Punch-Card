import BookingInfo from "./components/BookingInfo"
import FinishButtonGroup from "./components/FinishButtonGroup"
import ActivitiesButtonGroup from './components/ActivitesButtonGroup';
import Activity from "./components/Activity";
import React, { useState, useEffect, useRef } from 'react';
import 'primeflex/primeflex.css';
import ActivityService from "../services/ActivityService";
import BookingService from "../services/BookingService";
import BookingOverview from "./components/BookingOverview";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { useCookies } from "react-cookie";

var activityInfo = [];
let reservations = [];

export default function NewBooking() {

    const activityService = new ActivityService();
    const bookingService = new BookingService();
    const [cookies, setCookie, removeCookie] = useCookies(['JWT']);
    const [activityStates, setActivityStates] = useState([]);
    const [bookingInfo, setBookingInfo] = useState({});
    const [price, setPrice] = useState(0);
    const toast = useRef(null);
    const history = useHistory();

    /**
     * Adds an activity component to new booking.
     */
    const addActivity = () => {
        const states = activityStates;
        const id = moment().valueOf();
        states.push({
            "id": id, "startTime": null, "endTime": null,
            "activity": { "name": null }, "activityInfo": activityInfo, "reservations": reservations
        })
        setActivityStates([...states]);
    }

    /**
     * Removes an activity component from new booking.
     */
    const removeActivity = (id) => {
        const states = activityStates.filter(object => object.id !== id);
        setActivityStates(states);
    }

    /**
     * Adds an activity state to activityStates.
     * @param {*} index
     * @param {*} activityState
     */
    const changeActivityState = (state) => {
        const states = activityStates.filter(object => object.id !== state.id);
        new Promise(() => {
            states.push(state);
            states.sort((a, b) => a.id - b.id)
        }).then(setActivityStates(states));
    }

    /**
     * Adds info to bookingInfo.
     * @param {*} info
     */
    const addInfo = (info) => {
        setBookingInfo(info);
    }

    const changePrice = (price) => {
        setPrice(price);
    }

    /**
     * Collects the relevant data and sends a POST request with BookingService.
     */
    const createBookingPressed = async () => {
        let reservations = []
        for (let i = 0; i < activityStates.length; i++) {
            reservations.push({
                "startTime": activityStates[i].startTime,
                "endTime": activityStates[i].endTime,
                "activity": { "name": activityStates[i].activity.name.name }
            });
        }

        const status = await bookingService.postBooking(bookingInfo.groupSize, bookingInfo.description, bookingInfo.responsible,
            bookingInfo.paid, price, {
            "phoneNr": bookingInfo.customerPhone,
            "name": bookingInfo.customerName,
            "email": bookingInfo.email
        }, reservations, cookies.JWT).then((response) => {
        }).catch((error) => {
            displayError(error.response.status, error.response.data.message);
            return error.response.status;
        });

        if (status !== 400 && status !== 500) {
            history.push("/allabokningar");
        }
    }

    const displayError = (code, message) => {
        toast.current.show({ severity: 'error', summary: code + " - Något gick fel!", detail: message, life: 7500 });
    }

    useEffect(() => {
        activityInfo = [];
        activityService.getActiveActivities(cookies.JWT).then(function (availableActivities) {
            availableActivities.data.forEach(activity => {
                activityInfo.push(activity);
            })
        })

        bookingService.getAllBookings(cookies.JWT).then(function (bookings) {
            bookings.data.forEach(booking => {
                booking.reservations.forEach(reservation => {
                    reservations.push(reservation)
                })
            })
        })
    }, []);

    useEffect(() => {
        if (activityStates.length == 0) {
            addActivity();
        }
    }, [activityStates]);


    return (
        <div className="p-d-flex p-flex-column p-flex-md-row p-ai-start p-mx-3 p-mt-3 p-mb-5">
            <Toast ref={toast} />
            <div className="p-shadow-3 p-m-3">
                <div><BookingInfo onInfoChanged={addInfo} /></div>
            </div>
            <div className="p-shadow-3 p-m-3">
                <div><ActivitiesButtonGroup onAddActivity={addActivity} /></div>
                <div>{activityStates.map((state) => <Activity key={state.id} activityState={state}
                    onActivityStateChanged={changeActivityState}
                    onRemoveClicked={removeActivity} />)}</div>
            </div>
            <div className="p-shadow-3 p-m-3">
                <div><BookingOverview activityStates={activityStates} onPriceChange={changePrice} /></div>
                <div><FinishButtonGroup onCreateBookingPressed={createBookingPressed} /></div>
            </div>
        </div>
    )
}

