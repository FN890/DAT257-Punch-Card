import React from "react";
import 'primeflex/primeflex.css';
import CreateActivityGroup from "./components/CreateActivityGroup";

export default function Settings() {

    return (
        <div className="p-d-flex p-flex-column p-flex-md-row p-ai-start p-mx-5 p-mb-5">
            <div className="p-shadow-5 p-m-3">
                <div><CreateActivityGroup/></div>
            </div>
            <div className="p-shadow-5 p-m-3">
                <div></div>
            </div>

        </div>
    )
}