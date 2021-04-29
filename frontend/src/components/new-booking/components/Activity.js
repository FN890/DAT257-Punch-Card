import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import sv from "date-fns/locale/sv";

registerLocale("sv", sv);

let daily = true;

export default function Activity(props) {

    const activityInfo = props.activityInfo;

    const index = props.index

    let unavailableDates = [];
    let unavailableTimes = [];
    const reservations = props.reservations;

    const onActivityStateChanged = props.onActivityStateChanged;

    const [activity, setActivity] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startDateTime, setStartDateTime] = useState(new Date());

    const setSelectedActivity = (value) => {
        daily = value.hourly;
        setActivity(value);
        console.log(reservations)

        unavailableDates = [];
        unavailableTimes = []
        reservations.forEach(reservation => {
            if (value.name === reservation.activity.name) {
                if (daily) {
                    let startDate = new Date(reservation.startTime).getDate();
                    console.log(startDate)
                } else {

                }
            }

        })
    }

    const handleRemove = () => {
        props.removeActivity(index)
    }

    const getDateSelect = () => {
        if (activity === null) {
            return (
                <DatePicker
                    selected={startDateTime}
                    onChange={date => setStartDateTime(date)}
                    showTimeSelect
                    dateFormat="d MMMM yyyy HH:mm"
                    disabled
                    locale="sv"
                />
            )
        } else if (daily === false) {
            return (
                <>
                    <div className="p-mb-2">
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            locale="sv"
                            excludeDates={[new Date()]}
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
                            locale="sv"
                            excludeDates={[new Date()]}
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
                    dateFormat="d MMMM yyyy HH:mm"
                    locale="sv"
                />
            )
        }
    }

    useEffect(() => {
        if (activity != null) {
            let state = { "startTime": startDate.toISOString(), "endTime": endDate.toISOString(), "activity": { "name": activity.name } };
            onActivityStateChanged(index, state);
        }
    });

    return (
        <div className="p-fluid p-ai-center p-mx-5 p-mb-5">
            <div className="p-d-flex p-my-1 ">
                <span className="p-float-label" style={{ width: '80%' }}>
                    <Dropdown id="dropdown" optionLabel="name" options={activityInfo} value={activity} onChange={(e) => setSelectedActivity(e.value)} />
                    <label htmlFor="dropdown">Aktivitet</label>
                </span>
                <div className="p-ml-auto p-mb-2">
                    <Button className="p-button-raised p-button-danger" icon="pi pi-trash" iconPos="right" onClick={() => handleRemove()} />
                </div>
            </div>
            {getDateSelect()}
        </div>

    )

}