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
import BookingOverview from "./components/BookingOverview";
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom";

var activityInfo = [];
var bookingInfo;
let reservations = [];

export default function NewBooking() {

    const activityService = new ActivityService();
    const bookingService = new BookingService();
    const history = useHistory();

    const [state, setState] = useState(0);
    const [activities, setActivities] = useState([]);
    const [activityStates, setActivityStates] = useState([]);

    /**
     * Adds an activity component to new booking.
     */
    const addActivity = () => {
        const id = uuidv4();
        activities.push({
            "id": id, "activity": <Activity
                activityInfo={activityInfo}
                removeActivity={removeActivity}
                reservations={reservations}
                id={id}
                onActivityStateChanged={addActivityState} />
        })
        setActivities(activities);
        setState(state + 1);
        console.log(activities.length);
        console.log(activityStates.length);
    }

    /**
    * Removes an activity component from new booking.
    */
    const removeActivity = (id) => {
        setActivities(activities.filter(activity => activity.id !== id));
        removeActivityState(id);
        console.log(activities.length);
        console.log(activityStates.length);
    }

    /**
     * Adds an activity state to activityStates.
     * @param {*} index 
     * @param {*} activityState 
     */
    const addActivityState = (id, activityState) => {
        removeActivityState(id);
        setActivityStates(activityStates => [...activityStates, activityState]);
    }

    /**
     * Removes an activity state from activityStates.
     * @param {*} index 
     */
    const removeActivityState = (id) => {
        setActivityStates(activityStates.filter(state => state.id !== id));
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
        let i;
        for (i = 0; i < activityStates.length; i++) {
            reservations.push(activityStates[i].activityState);
        }
        bookingService.postBooking(bookingInfo.groupSize, bookingInfo.description, bookingInfo.responsible,
            false, 1500, { "phoneNr": bookingInfo.customerPhone, "name": bookingInfo.customerName, "email": bookingInfo.email }, reservations).then(() => {
                history.push("/allabokningar")
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
        }
        )
    }, []);

    const activityChangedCallback = () => {
        //Send this function to every activity.js
        //When this is called, re-render BookingOverview.js
    }

    //<div><BookingOverview activites={activities} activityStates={activityStates} /></div>

    return (
        <div className="p-d-flex p-flex-column p-flex-md-row p-ai-start p-mx-5 p-mb-5">
            <div className="p-shadow-5 p-m-3">
                <div><BookingInfo onInfoChanged={addInfo} /></div>
            </div>
            <div className="p-shadow-5 p-m-3">
                <div><ActivitiesButtonGroup onAddActivity={addActivity} onRemoveActivity={removeActivity} /></div>
                <div><Activities activities={activities} /></div>
            </div>
            <div className="p-shadow-5 p-m-3">
                <div><FinishButtonGroup onCreateBookingPressed={createBookingPressed} /></div>
            </div>
        </div>
    )
}

