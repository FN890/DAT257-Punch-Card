import BookingInfo from "./components/BookingInfo"
import FinishButtonGroup from "./components/FinishButtonGroup"
import ActivitiesButtonGroup from './components/ActivitesButtonGroup';
import Activity from "./components/Activity";
import Activities from "./components/Activities"
import React, { useState, useEffect } from 'react';
import 'primeflex/primeflex.css';
import ActivityService from "../services/ActivityService";
import PriceCalculation from "./components/PriceCalculation";
import BookingService from "../services/BookingService";

var activities = [];
var activityInfo = [];
var activityStates = [];
var bookingInfo;
let countActivity = 0;
let reservations = [];

export default function NewBooking() {

    const activityService = new ActivityService();
    const bookingService = new BookingService();
    const [state, setState] = useState('');

    const addActivity = () => {
        activities.push(<Activity activityInfo={activityInfo} removeActivity={(index) => removeActivity(index)} index={activities.length} reservations={reservations}
            onActivityStateChanged={addActivityState} />);
        setState(state + 1);
        countActivity++;
        //Method to add price for this activity to total price.
        //
    }

    const removeActivity = (index) => {
        if (countActivity > 1) {
            delete activities[index]
            delete activityStates[index]
            setState(state - 1)
            countActivity--;
        }
    }

    const createBookingPressed = () => {
        let reservations = []
        let i;
        for (i = 0; i < activityStates.length; i++) {
            reservations.push(activityStates[i].activityState);
        }
        bookingService.postBooking(bookingInfo.groupSize, bookingInfo.description, bookingInfo.responsible,
            false, 1500, { "phoneNr": bookingInfo.customerPhone, "name": bookingInfo.customerName }, reservations);
    }

    const addActivityState = (index, activityState) => {
        delete activityStates[index];
        activityStates.push({ "index": index, "activityState": activityState })
    }

    const addInfo = (info) => {
        bookingInfo = info;
        console.log(bookingInfo);
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
        }
        )
        if (activities.length === 0) {
            addActivity();
        }

    }, []);

    return (
        <div className="p-d-flex p-flex-column p-flex-md-row p-ai-start p-mx-5 p-mb-5">
            <div className="p-shadow-5 p-m-3">
                <div><BookingInfo onInfoChanged={addInfo} /></div>
            </div>
            <div className="p-shadow-5 p-m-3">
                <div><ActivitiesButtonGroup onAddActivity={addActivity} onRemoveActivity={removeActivity} /></div>
                <div><Activities activities={activities} /></div>
                <div><FinishButtonGroup onCreateBookingPressed={createBookingPressed} /></div>
                <div><PriceCalculation /></div>
            </div>
        </div>
    )
}

