import { ScrollPanel } from 'primereact/scrollpanel';
import CustomerInfo from "./components/CustomerInfo"
import FinishButtonGroup from "./components/FinishButtonGroup"
import ActivitiesButtonGroup from './components/ActivitesButtonGroup';
import Activity from "./components/Activity";
import Activities from "./components/Activities"
import React, { useState, useEffect } from 'react';
import 'primeflex/primeflex.css';

var activites = [];

export default function NewBooking() {

    const [state, setState] = useState('');
    const onAddClicked = () => {
        activites.push(<Activity />)
        setState(state + 1);
    }
    const onRemoveClicked = () => {
        RemoveActivity();
    }

    useEffect(() => {
        if (activites.length === 0) {
            activites.push(<Activity />)
            setState(state + 1);
        }
    }, []);

    return (
        <div className="p-d-flex p-flex-column p-flex-md-row p-ai-start p-mx-5 p-mb-5">
            <div className="p-shadow-5 p-m-3">
                <div><CustomerInfo /></div>
            </div>
            <div className="p-shadow-5 p-m-3">
                <div><ActivitiesButtonGroup onAddActivity={onAddClicked} onRemoveActivity={onRemoveClicked} /></div>
                <div><Activities activites={activites} /></div>
                <div><FinishButtonGroup /></div>
            </div>
        </div>
    )
}

function RemoveActivity() {
    console.log("Remove");
}

