import React, { useState, useEffect } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var daily = true;

export default function Activity(props) {

    const activityInfo = props.activityInfo;

    const [activity, setActivity] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startDateTime, setStartDateTime] = useState(new Date());

    const setSelectedActivity = (value) => {
        daily = value.daily;
        setActivity(value);
    }

    const getDateSelect = () => {
        if (daily === false) {
            return (
                <>
                    <div className="p-mb-2">
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </div>
                    <div className="p-mb-2">
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                        />
                    </div>
                </>
            )
        } else if (daily === true) {
            return (
                <DatePicker
                    selected={startDateTime}
                    onChange={date => setStartDateTime(date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
            )
        }
    }

    return (
        <div className="p-fluid p-ai-center p-mx-5 p-mb-5">
            <div className="p-d-flex p-my-1 ">
                <span className="p-float-label" style={{ width: '80%' }}>
                    <Dropdown id="dropdown" optionLabel="name" options={activityInfo} value={activity} onChange={(e) => setSelectedActivity(e.value)} />
                    <label htmlFor="dropdown">Aktivitet</label>
                </span>
                <div className="p-ml-auto p-mb-2">
                    <Button className="p-button-raised p-button-danger" icon="pi pi-trash" iconPos="right" />
                </div>
            </div>
            {getDateSelect()}
        </div>

    )

}