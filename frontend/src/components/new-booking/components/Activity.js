import React, {useState, useEffect} from 'react';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import 'primeflex/primeflex.css';
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment'
import 'moment/locale/sv'
import {v4 as uuidv4} from 'uuid';
import {Calendar} from "primereact/calendar";

let hourly = false;

export default function Activity(props) {

    const activityState = props.activityState;
    const onActivityStateChanged = props.onActivityStateChanged;
    const onRemoveClicked = props.onRemoveClicked;

    const updateUnavailableDates = props.updateUnavailableDates;
    const unavailableDates = props.unAvailableDates

    const reservations = activityState.reservations;
    const id = activityState.id;
    const activityInfo = activityState.activityInfo;

    const [activity, setActivity] = useState("");
    const [startDate, setStartDate] = useState(activityState.startTime);
    const [endDate, setEndDate] = useState(activityState.endTime);
    const [focused, setFocused] = useState(null);
    const [update, setUpdate] = useState(0);
    const [unDates, setUnDates] = useState([]);
    const [unTimes, setUnTimes] = useState([]);

    const startDateId = uuidv4();
    const endDateId = uuidv4();

    moment.locale('sv')

    const setSelectedActivity = (value) => {
        hourly = value.hourly;
        setActivity(value);

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
            }
        })
        if (!hourly) {
            let startDate2 = startDate
            let endDate2 = endDate
            while (startDate2 < endDate2) {
                unavailableDates.push(new Date(startDate2))
                startDate2.setDate(startDate2.getDate() + 1)
            }
        }

        setUnDates(unavailableDates)
        setUnTimes(unavailableTimes)
        setUpdate(update + 1)
        updateUnavailableDates(unavailableDates)
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
        if(unavailableDates !== undefined) {
            return unavailableDates.some((unavailableDay) => moment(unavailableDay).isSame(day, 'day'));
        }else{
            return unDates.some((unavailableDay) => moment(unavailableDay).isSame(day, 'day'));
        }
    }

    const handleRemove = () => {
        onRemoveClicked(activityState.id);
    }

    const addStartDate = (startDate) => {
        setStartDate(startDate)
        setSelectedActivity(activity)
    }

    const addEndDate = (endDate) => {
        setEndDate(endDate)
        setSelectedActivity(activity)
    }

    const getDateSelect = () => {
        if (activity === "") {
            return (
                <DateRangePicker
                    startDate={startDate}
                    startDateId={startDateId}
                    endDate={endDate}
                    endDateId={endDateId}
                    onDatesChange={({startDate, endDate}) => {
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
                    startDatePlaceholderText="Start datum"
                    endDatePlaceholderText="Slut datum"
                    monthFormat="YYYY MMMM"
                    phrases={{closeDatePicker: 'Stäng', clearDates: 'Avbryt'}}
                />
            )
        } else if (hourly === false) {
            return (
                <DateRangePicker
                    startDate={startDate}
                    startDateId={startDateId}
                    endDate={endDate}
                    endDateId={endDateId}
                    onDatesChange={({startDate, endDate}) => {
                        addStartDate(startDate);
                        addEndDate(endDate);
                    }}
                    focusedInput={focused}
                    readOnly={true}
                    onFocusChange={focusedInput => {
                        setFocused(focusedInput);
                    }}
                    numberOfMonths={1}
                    isDayBlocked={filterBlockedDates}
                    startDatePlaceholderText="Start datum"
                    endDatePlaceholderText="Slut datum"
                    monthFormat="YYYY MMMM"
                    phrases={{closeDatePicker: 'Stäng', clearDates: 'Avbryt'}}
                />
            )
        } else if (hourly === true) {
            return (
                <DateRangePicker
                    startDate={startDate}
                    startDateId={startDateId}
                    endDate={endDate}
                    endDateId={endDateId}
                    onDatesChange={({startDate, endDate}) => {
                        addStartDate(startDate);
                        addEndDate(endDate);
                    }}
                    focusedInput={focused}
                    readOnly={true}
                    onFocusChange={focusedInput => {
                        setFocused(focusedInput);
                    }}
                    numberOfMonths={1}
                    startDatePlaceholderText="Start datum"
                    endDatePlaceholderText="Slut datum"
                    monthFormat="YYYY MMMM"
                    phrases={{closeDatePicker: 'Stäng', clearDates: 'Avbryt'}}
                />
            )
        }
    }

    const ActivityComponent = () => {
        return (
            <div className="p-fluid p-ai-center p-mx-5 p-mb-5">
                <div className="p-d-flex p-my-1 ">
                    <span className="p-float-label" style={{width: '80%'}}>
                        <Dropdown id="dropdown" optionLabel="name" options={activityInfo} value={activity}
                                  onChange={(e) => setSelectedActivity(e.value)}/>
                        <label htmlFor="dropdown">Aktivitet</label>
                    </span>
                    <div className="p-ml-auto p-mb-2">
                        <Button className="p-button-raised p-button-danger" icon="pi pi-trash" iconPos="right"
                                onClick={() => handleRemove()}/>
                    </div>
                </div>
                {getDateSelect()}
                <Calendar disabled={activity === ""} placeholder="Start tid" timeOnly showTime hourFormat="24"
                          style={{width: '100%', marginTop: 10}}/>
                <Calendar disabled={activity === ""} placeholder="Slut tid" timeOnly showTime hourFormat="24"
                          style={{width: '100%', marginTop: 10}}/>
            </div>
        )
    }

    useEffect(() => {
        let state = {
            "id": id, "startTime": startDate, "endTime": endDate,
            "activity": {"name": activity}, "activityInfo": activityInfo, "reservations": reservations
        };
        onActivityStateChanged(state);
    }, [activity, startDate, endDate]);

    return (
        <ActivityComponent/>
    )

}