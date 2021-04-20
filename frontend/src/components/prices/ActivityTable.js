import axios from "axios";
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import ActivityService from "./ActivityService";
import getActivities from './ActivityService'


const ActivityTable = () => {
    /**
    const [activity, setActivity] = useState([]);
    const activityService = new ActivityService();

    useEffect(() => {
        activityService.getActivities().then(data => setActivity(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div>
            <div className="card">
                <DataTable value={activity}>
                    <Column field="name" header="Aktivitetens namn"></Column>
                    <Column field="price" header="Pris"></Column>
                </DataTable>
            </div>
        </div>
    );
    */
}