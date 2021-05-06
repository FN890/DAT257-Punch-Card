import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'
import { v4 as uuidv4 } from 'uuid';

let hourly = false;
let isRemoved = false;

export default function Activity(props) {

    const activityInfo = props.activityInfo;
    const id = props.id;
    const reservations = props.reservations;

    /**
     * Method for sending the latest activity state to the parent component.
     */
    const onActivityStateChanged = props.onActivityStateChanged;

    const [activity, setActivity] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focused, setFocused] = useState(null);
    const [update, setUpdate] = useState(0);
    const [unDates, setUnDates] = useState([]);
    const [unTimes, setUnTimes] = useState([]);

    const startDateId = uuidv4();
    const endDateId = uuidv4();

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
                    while (startDate < endDate) {
                        unavailableDates.push(new Date(startDate))
                        startDate.setDate(startDate.getDate() + 1)
                    }
                } else {
                    unavailableTimes.push(new Date(reservation.startTime))
                    unavailableTimes.push(new Date(reservation.endTime))
                }
            } else {
            }

        })

        setUnDates(unavailableDates)
        setUnTimes(unavailableTimes)
        setUpdate(update + 1)
    }
    const filterPassedTime = time => {
        let startTime = null;
        let endTime = null;
        const selectedDate = new Date(time);
        for (let i = 0; i < unTimes.length - 1; i += 2) {
            startTime = new Date(unTimes[i]);
            endTime = new Date(unTimes[i + 1]);
            if (selectedDate.getTime() >= startTime.getTime() && selectedDate.getTime() <= endTime.getTime()) {
                return false;
            }
        }
        return true;
    }

    const filterBlockedDates = day => {
        return unDates.some((unavailableDay) => moment(unavailableDay).isSame(day, 'day'));
    }

    const handleRemove = () => {
        isRemoved = true;
        props.removeActivity(id)
        setUpdate(update + 1)
    }

    const getDateSelect = () => {
        if (activity === "") {
            return (
                <DateRangePicker
                    startDate={startDate}
                    startDateId={startDateId}
                    endDate={endDate}
                    endDateId={endDateId}
                    onDatesChange={({ startDate, endDate }) => {
                        setStartDate(startDate);
                        setEndDate(endDate);
                    }}
                    readOnly={true}
                    focusedInput={focused}
                    onFocusChange={focusedInput => {
                        setFocused(focusedInput);
                    }}
                    numberOfMonths={1}
                    disabled
                />
            )
        } else if (hourly === false) {
            return (
                <DateRangePicker
                    startDate={startDate}
                    startDateId={startDateId}
                    endDate={endDate}
                    endDateId={endDateId}
                    onDatesChange={({ startDate, endDate }) => {
                        setStartDate(startDate);
                        setEndDate(endDate);
                    }}
                    focusedInput={focused}
                    readOnly={true}
                    onFocusChange={focusedInput => {
                        setFocused(focusedInput);
                    }}
                    numberOfMonths={1}
                    isDayBlocked={filterBlockedDates}
                />
            )
        } else if (hourly === true) {
            return (
                <DateRangePicker
                    startDate={startDate}
                    startDateId={startDateId}
                    endDate={endDate}
                    endDateId={endDateId}
                    onDatesChange={({ startDate, endDate }) => {
                        setStartDate(startDate);
                        setEndDate(endDate);
                    }}
                    focusedInput={focused}
                    readOnly={true}
                    onFocusChange={focusedInput => {
                        setFocused(focusedInput);
                    }}
                    numberOfMonths={1}
                />
            )
        }
    }

    const ActivtyComponent = () => {
        if (isRemoved) {
            return (
                <div>
                </div>
            )
        } else {
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
    }

    useEffect(() => {
        isRemoved = false;
        if (activity != null) {
            let state = { "startTime": startDate, "endTime": endDate, "activity": { "name": activity.name } };
            onActivityStateChanged(id, state);
        }
    });

    return (
        <ActivtyComponent />
    )

}