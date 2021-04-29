import CustomerInfo from "./components/CustomerInfo"
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
let countActivity = 0;
let reservations = [];

export default function NewBooking() {

    const activityService = new ActivityService();
    const bookingService = new BookingService();
    const [state, setState] = useState('');

    const addActivity = () => {
        activities.push(<Activity activityInfo={activityInfo}  removeActivity={ (index) => removeActivity(index) } index={activities.length} reservations={reservations}/>);
        setState(state + 1);
        countActivity++;
        //Method to add price for this activity to total price.
        //
    }

    const removeActivity = (index) => {
        if(countActivity > 1) {
            delete activities[index]
            setState(state - 1)
            countActivity--;
        }
    }

    useEffect(() => {
        activityInfo = [];
        activityService.getActivities().then(function (availableActivities) {
            availableActivities.forEach(activity => {
                activityInfo.push(activity);
            })
        })

        bookingService.getAllBookings().then(function (bookings){
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
                <div><CustomerInfo /></div>
            </div>
            <div className="p-shadow-5 p-m-3">
                <div><ActivitiesButtonGroup onAddActivity={addActivity} onRemoveActivity={removeActivity} /></div>
                <div><Activities activities={activities}/></div>
                <div><FinishButtonGroup /></div>
                <div><PriceCalculation /></div>
            </div>
        </div>
    )
}

