import axios from "axios";
import React, {useState, useEffect} from 'react';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import ActivityService from '../services/ActivityService';
import './ActivityTable.css';
import {useCookies} from "react-cookie";

/**
 * Creates a table with all the available activities
 * @returns {JSX.Element}
 * @constructor
 */
export default function ActivityTable() {
    const [activity, setActivity] = useState([]);
    const [multiSortMeta, setMultiSortMeta] = useState([{field: 'category', order: -1}]);
    const activityService = new ActivityService();
    const [cookies, setCookie, removeCookie] = useCookies(['JWT']);

    const formatCurrency = (value) => {
        return value.toLocaleString('sv-SE', {style: 'currency', currency: 'SEK'});
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }
    /**
     * Calls once on initiation to get all the activities from the database
     */
    useEffect(() => {
        activityService.getActiveActivities(cookies.JWT).then(data => setActivity(data.data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const header = (
        <div className="table-header">
            Priser för aktiviteter
        </div>
    );
    let footer = `Det finns totalt ${activity ? activity.length : 0} aktiviteter tillagda.`;
        return (
            <div className="p-shadow-3 p-m-5">
                <DataTable style={{ width: '100%' }} scrollable scrollWidth="300px" value={activity} header={header} footer={footer}>
                    <Column  headerStyle={{ width: '150px' }} field="name" header="Aktivitetens namn" sortable></Column>
                    <Column headerStyle={{ width: '150px' }} field="price" header="Pris" body={priceBodyTemplate} sortable></Column>
                    <Column headerStyle={{ width: '150px' }} field="maxSize" header="Max antal" sortable></Column>
                </DataTable>
            </div>
        );


}