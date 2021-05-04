import React from "react";
import ActivityTable from './ActivityTable';

export default function Prices(props) {
    return (
        <div>
            <ActivityTable activities={props.activities}/>
        </div>
    )
}