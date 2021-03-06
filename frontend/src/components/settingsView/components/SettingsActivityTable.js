import React, {useState, useEffect} from 'react';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import ActivityService from "../../services/ActivityService";
import './SettingsActivityTable.css';
import {Button} from "primereact/button";
import {ToggleButton} from "primereact/togglebutton";
import {useCookies} from "react-cookie";

/**
 * Creates a table with all the available activities
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function SettingsActivityTable(props) {
    const [multiSortMeta, setMultiSortMeta] = useState([{field: 'category', order: -1}]);
    const activityService = new ActivityService();
    const [cookies, setCookie, removeCookie] = useCookies(['JWT']);
    const onDelete = (id) => {
        props.onClickDeleteButton(id)
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('sv-SE', {style: 'currency', currency: 'SEK'});
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }
    const header = (
        <div className="table-header">
            Priser för aktiviteter
        </div>
    );
    const actionTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button className="p-button-raised p-button-danger" icon="pi pi-trash" iconPos="right"
                        onClick={() => onDelete(rowData.id)}/>
            </React.Fragment>
        );
    }

    let footer = `Det finns totalt ${props.activities ? props.activities.length : 0} aktiviteter tillagda.`;
    /**
     * props.activities is passed down from
     * parent and updates when
     */
    return (
        <div className="p-shadow-3 p-m-5">
            <DataTable scrollable scrollWidth="300px" value={props.activities} header={header} footer={footer}>
                <Column headerStyle={{width: '150px'}} field="name" header="Aktivitetens namn" sortable></Column>
                <Column headerStyle={{width: '150px'}} field="price" header="Pris" body={priceBodyTemplate}
                        sortable></Column>
                <Column headerStyle={{width: '150px'}} field="maxSize" header="Max antal" sortable></Column>
                <Column headerStyle={{width: '200px'}} body={actionTemplate}></Column>
            </DataTable>
        </div>
    );

}