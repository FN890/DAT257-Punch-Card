import { ScrollPanel } from 'primereact/scrollpanel';
import CustomerInfo from "./components/CustomerInfo"
import FinishButtonGroup from "./components/FinishButtonGroup"
import ActivitiesButtonGroup from './components/ActivitesButtonGroup';
import Activity from "./components/Activity";
import Activities from "./components/Activities"
import React, { useState, useEffect } from 'react';
import 'primeflex/primeflex.css';
import ActivityService from "../services/ActivityService";

var activities = [];
var activityNames = [];

export default function NewBooking() {

    const activityService = new ActivityService();
    const [state, setState] = useState('');

    const addActivity = () => {
        activities.push(<Activity activityNames={activityNames}/>);
        setState(state + 1);
    }

    const removeActivity = () => {

    }

    useEffect(() => {
        activityNames = [];
        activityService.getActivities().then(function (availableActivities) {
            availableActivities.forEach(activity => {
                let activityName = { "name": activity.name }
                activityNames.push(activityName);
            })
        })
        if (activities.length === 0) {
            addActivity();
        }
        console.log(activityNames);
    }, []);

    return (
        <div className="p-d-flex p-flex-column p-flex-md-row p-ai-start p-mx-5 p-mb-5">
            <div className="p-shadow-5 p-m-3">
                <div><CustomerInfo /></div>
            </div>
            <div className="p-shadow-5 p-m-3">
                <div><ActivitiesButtonGroup onAddActivity={addActivity} onRemoveActivity={removeActivity} /></div>
                <div><Activities activities={activities} /></div>
                <div><FinishButtonGroup /></div>
            </div>
        </div>
    )
}

