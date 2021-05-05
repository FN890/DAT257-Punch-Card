import axios from "axios";
import React, {useState, useEffect} from 'react';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import ActivityService from '../services/ActivityService';
import './ActivityTable.css';

/**
 * Creates a table with all the available activities
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function ActivityTable(props) {
    const [activity, setActivity] = useState([]);
    const [multiSortMeta, setMultiSortMeta] = useState([{field: 'category', order: -1}]);
    const activityService = new ActivityService();

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
        activityService.getActivities().then(data => setActivity(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const header = (
        <div className="table-header">
            Priser för aktiviteter
        </div>
    );
    let footer = `Det finns totalt ${activity ? activity.length : 0} aktiviteter tillagda.`;
    /**
     * used to check if data is passed from a prop or not
     */
    if (props.activities === undefined) {
        return (
            <div className="p-shadow-5 p-m-5">
                <DataTable style={{ width: '100%' }} scrollable scrollWidth="300px" value={activity} header={header} footer={footer}>
                    <Column  headerStyle={{ width: '150px' }} field="name" header="Aktivitetens namn" sortable></Column>
                    <Column headerStyle={{ width: '150px' }} field="price" header="Pris" body={priceBodyTemplate} sortable></Column>
                    <Column headerStyle={{ width: '150px' }} field="maxSize" header="Max antal" sortable></Column>
                </DataTable>
            </div>
        );
    }
    /**
     * This is used if activities is a prop passed down from a parent component
     */
    footer = `Det finns totalt ${activity ? props.activities.length : 0} aktiviteter tillagda.`;
    return (
        <div className="p-shadow-5 p-m-5">
            <DataTable  scrollable scrollWidth="300px" value={props.activities} header={header} footer={footer}>
                <Column headerStyle={{ width: '150px' }} field="name" header="Aktivitetens namn" sortable></Column>
                <Column headerStyle={{ width: '150px' }} field="price" header="Pris" body={priceBodyTemplate} sortable></Column>
                <Column headerStyle={{ width: '150px' }} field="maxSize" header="Max antal" sortable></Column>
            </DataTable>
        </div>
    );

}