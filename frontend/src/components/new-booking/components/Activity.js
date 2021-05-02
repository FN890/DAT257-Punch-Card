import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import sv from "date-fns/locale/sv";

registerLocale("sv", sv);

let hourly = false;

export default function Activity(props) {

    const activityInfo = props.activityInfo;

    const index = props.index

    const reservations = props.reservations;
   
    /**
     * Method for sending the latest activity state to the parent component.
     */
    const onActivityStateChanged = props.onActivityStateChanged;

    const [activity, setActivity] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [update, setUpdate] = useState(0);
    const [unDates, setUnDates] = useState([]);
    const [unTimes, setUnTimes] = useState([]);

    const setSelectedActivity = (value) => {
        hourly = value.hourly;
        setActivity(value);
        //console.log(reservations)

        let unavailableDates = [];
        let unavailableTimes = []
        reservations.forEach(reservation => {
            if (value.name === reservation.activity.name) {
                if (!hourly) {
                    let startDate = new Date(reservation.startTime)
                    let endDate = new Date(reservation.endTime).setHours(24)
                    while (startDate < endDate){
                        unavailableDates.push(new Date(startDate))
                        startDate.setDate(startDate.getDate() + 1)
                    }
                } else {
                    /*
                    let startTime = new Date(reservation.startTime)
                    let endTime = new Date(reservation.endTime)
                    console.log(startTime)
                    console.log(endTime)
                    while (startTime < endTime){
                        unavailableTimes.push(new Date(startTime))
                        startTime.setDate(startTime.getMinutes() + 30)
                    }
                    console.log(unavailableDates)

                     */
                }
            }else {
                //console.log(value.name + " !== " + reservation.activity.name)
            }

        })

        setUnDates(unavailableDates)
        //setUnTimes(unavailableTimes)
        setUpdate(update + 1)
    }

    const handleRemove = () => {
        props.removeActivity(index)
    }

    const getDateSelect = () => {
        if (activity === "") {
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
        } else if (hourly === false) {
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
                            excludeDates={unDates}
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
                            excludeDates={unDates}
                        />
                    </div>
                </>
            )
        } else if (hourly === true) {
            return (
                <DatePicker
                    selected={startDateTime}
                    onChange={date => setStartDateTime(date)}
                    showTimeSelect
                    dateFormat="d MMMM yyyy HH:mm"
                    locale="sv"
                    excludeTimes={unTimes}
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