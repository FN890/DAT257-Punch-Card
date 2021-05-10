import PriceCalculation from "./PriceCalculation"
import React, {useEffect} from 'react';
import {Divider} from "primereact/divider";

export default function BookingOverview(props) {

    const activities = props.activites
    const activityStates = props.activityStates;

    useEffect( () => {

    }, []);


    return (
        <div className="p-m-3">
            <PriceCalculation activityStates={activityStates}/>
            <Divider/>
        </div>
    )
}