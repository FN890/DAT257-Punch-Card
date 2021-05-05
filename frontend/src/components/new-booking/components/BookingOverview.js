import PriceCalculation from "./PriceCalculation"
import React, {useEffect} from 'react';

export default function BookingOverview(props) {

    const activities = props.activites

    useEffect( () => {

    }, [])


    return (
       <PriceCalculation activities={activities}/>
    )
}