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
import BookingOverview from "./components/BookingOverView";

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

    /**
     * Adds an activity component to new booking.
     */
    const addActivity = () => {
        activities.push(<Activity activityInfo={activityInfo} removeActivity={(index) => removeActivity(index)} index={activities.length} reservations={reservations}
            onActivityStateChanged={addActivityState} />);
        setState(state + 1);
        countActivity++;
        //Method to add price for this activity to total price.
        //
    }

    /**
    * Removes an activity component from new booking.
    */
    const removeActivity = (index) => {
        if (countActivity > 1) {
            delete activities[index]
            removeActivityState(index);
            setState(state - 1)
            countActivity--;
        }
    }

    /**
     * Adds an activity state to activityStates.
     * @param {*} index 
     * @param {*} activityState 
     */
    const addActivityState = (index, activityState) => {
        removeActivityState(index);
        activityStates.push({ "index": index, "activityState": activityState })
    }

    /**
     * Removes an activity state from activityStates.
     * @param {*} index 
     */
    const removeActivityState = (index) => {
        let i;
        for (i = 0; i < activityStates.length; i++) {
            if (activityStates[i].index == index) {
                activityStates.splice(i, 1);
                break;
            }
        }
    }

    /**
     * Adds info to bookingInfo.
     * @param {*} info 
     */
    const addInfo = (info) => {
        bookingInfo = info;
        console.log(bookingInfo);
    }

    /**
     * Collects the relevant data and sends a POST request with BookingService.
     */
    const createBookingPressed = () => {
        let reservations = []
        let i;
        for (i = 0; i < activityStates.length; i++) {
            reservations.push(activityStates[i].activityState);
        }
        bookingService.postBooking(bookingInfo.groupSize, bookingInfo.description, bookingInfo.responsible,
            false, 1500, { "phoneNr": bookingInfo.customerPhone, "name": bookingInfo.customerName }, reservations);
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
            </div>
            <div className="p-shadow-5 p-m-3">
                <div><BookingOverview/></div>
            </div>
        </div>
    )
}

