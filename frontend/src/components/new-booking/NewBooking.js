import BookingInfo from "./components/BookingInfo"
import FinishButtonGroup from "./components/FinishButtonGroup"
import ActivitiesButtonGroup from './components/ActivitesButtonGroup';
import Activity from "./components/Activity";
import React, { useState, useEffect } from 'react';
import 'primeflex/primeflex.css';
import ActivityService from "../services/ActivityService";
import BookingService from "../services/BookingService";
import BookingOverview from "./components/BookingOverview";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

var activityInfo = [];
var bookingInfo;
let reservations = [];

export default function NewBooking() {

    const activityService = new ActivityService();
    const bookingService = new BookingService();

    const [activityStates, setActivityStates] = useState([]);

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
        bookingInfo = info;
    }

    /**
     * Collects the relevant data and sends a POST request with BookingService.
     */
    const createBookingPressed = () => {
        let reservations = []
        for (let i = 0; i < activityStates.length; i++) {
            reservations.push({ "startTime": activityStates[i].startTime, "endTime": activityStates[i].endTime, "activity": { "name": activityStates[i].activity.name.name } });
        }
        bookingService.postBooking(bookingInfo.groupSize, bookingInfo.description, bookingInfo.responsible,
            false, 1500, { "phoneNr": bookingInfo.customerPhone, "name": bookingInfo.customerName, "email": bookingInfo.email }, reservations).then(() => {
                // TODO
            });
    }

    useEffect(() => {
        activityInfo = [];
        activityService.getActivities().then(function (availableActivities) {
            availableActivities.forEach(activity => {
                activityInfo.push(activity);
            })
        })

        bookingService.getAllBookings().then(function (bookings) {
            bookings.forEach(booking => {
                booking.reservations.forEach(reservation => {
                    reservations.push(reservation)
                })
            })
        })
    }, []);

    useEffect(() => {
        console.log(activityStates)
    }, [activityStates]);


    return (
        <div className="p-d-flex p-flex-column p-flex-md-row p-ai-start p-mx-5 p-mb-5">
            <div className="p-shadow-5 p-m-3">
                <div><BookingInfo onInfoChanged={addInfo} /></div>
            </div>
            <div className="p-shadow-5 p-m-3">
                <div><ActivitiesButtonGroup onAddActivity={addActivity} /></div>
                <div>{activityStates.map((state) => <Activity key={state.id} activityState={state} onActivityStateChanged={changeActivityState} onRemoveClicked={removeActivity} />)}</div>
            </div>
            <div className="p-shadow-5 p-m-3">
                <div><BookingOverview activityStates={activityStates} /></div>
                <div><FinishButtonGroup onCreateBookingPressed={createBookingPressed} /></div>
            </div>
        </div>
    )
}

