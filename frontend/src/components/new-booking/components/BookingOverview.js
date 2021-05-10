import PriceCalculation from "./PriceCalculation"
import React, {useEffect, useState} from 'react';
import {Divider} from "primereact/divider";

export default function BookingOverview(props) {

    const activities = props.activites
    const activityStates = props.activityStates;

    const [act, setAct] = useState([])
    let listActivity = []

    useEffect( () => {
        activityStates.forEach(state => {
            if(state.activity.name) {
                listActivity.push(
                    <div className="p-m-2 p-d-flex p-justify-between">
                        <div className="p-text-left">
                            {state.activity.name.name}
                        </div>
                        <div className="p-text-right ">
                            +{state.activity.name.price}:-
                        </div>
                    </div>
                )
            }
        });
        if(activityStates.length > 0 && activityStates[0].activity.name){
            listActivity.push(<Divider/>)
        }
        setAct(listActivity)
    }, [activityStates]);


    return (
        <div className="p-m-3">
            {act}
            <PriceCalculation activityStates={activityStates}/>
        </div>
    )
}