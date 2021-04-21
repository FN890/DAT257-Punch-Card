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
        activites.push(<Activity/>)
        setState(state + 1);
    }
    const onRemoveClicked = () => {
        RemoveActivity();
    }

    useEffect(() => {

    }, []);

    return (
        <div className="p-shadow-5 p-m-5">
            <div className="p-grid p-dir-col">
                <div className="p-col"><CustomerInfo /></div>
                <div className="p-col"><ActivitiesButtonGroup onAddActivity={onAddClicked} onRemoveActivity={onRemoveClicked} /></div>
                <div className="p-col"><Activities activites={activites}/></div>
                <div className="p-col"><FinishButtonGroup /></div>
            </div>
        </div>
    )
}

function RemoveActivity() {
    console.log("Remove");
}

