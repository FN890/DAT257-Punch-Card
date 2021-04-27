import React, {useState} from "react";
import 'primeflex/primeflex.css';
import CreateActivityGroup from "./components/CreateActivityGroup";
import Prices from "../prices/Prices";

export default function Settings() {


    return (
        <div className="p-d-flex p-flex-column p-flex-md-row p-ai-start p-mx-5 p-mb-5">
            <div className="p-shadow-5 p-m-3">
                <div><CreateActivityGroup/></div>
            </div>
            <div className="p-m-3">
                <Prices/>
            </div>

        </div>
    )
}