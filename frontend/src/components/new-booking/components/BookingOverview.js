import PriceCalculation from "./PriceCalculation"
import React, {useEffect} from 'react';

export default function BookingOverview(props) {

    const activities = props.activites
    const activityStates = props.activityStates;

    useEffect( () => {

    }, []);


    return (
       <PriceCalculation activityStates={activityStates}/>
    )
}