import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import ActivityService from '../services/ActivityService';
import './ActivityTable.css';


export default function ActivityTable()  {
    const [activity, setActivity] = useState([]);
    const [multiSortMeta, setMultiSortMeta] = useState([{ field: 'category', order: -1 }]);
    const activityService = new ActivityService();

    const formatCurrency = (value) => {
        return value.toLocaleString('sv-SE', {style: 'currency', currency: 'SEK'});
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }

    useEffect(() => {
        activityService.getActivities().then(data => setActivity(data));
        }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const header = (
        <div className="table-header">
            Priser för aktiviteter
        </div>
    );
    const footer = `Det finns totalt ${activity ? activity.length : 0} aktiviteter tillagda.`;

    return (
            <div className="p-shadow-5 p-m-5">
                <DataTable value={activity} header={header} footer={footer}>
                    <Column field="name" header="Aktivitetens namn" sortable></Column>
                    <Column field="price" header="Pris"  body={priceBodyTemplate} sortable></Column>
                    <Column field="maxSize" header="Max antal" sortable></Column>
                </DataTable>
            </div>
    );

}