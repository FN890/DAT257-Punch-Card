import React, {useState} from "react";
import 'primeflex/primeflex.css';
import CreateActivityGroup from "./components/CreateActivityGroup";
import Prices from "../prices/Prices";

export default function Settings() {


    return (
            <div className="p-shadow-5 p-m-3">
                <div><CreateActivityGroup/></div>
            </div>
    )
}