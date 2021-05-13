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
import {InputText} from "primereact/inputtext";
import {InputMask} from "primereact/inputmask";

let hourly = false;

export default function Activity(props) {

    const activityState = props.activityState;
    const onActivityStateChanged = props.onActivityStateChanged;
    const onRemoveClicked = props.onRemoveClicked;

    const reservations = activityState.reservations;
    const id = activityState.id;
    const activityInfo = activityState.activityInfo;

    const [activity, setActivity] = useState("");
    const [startDate, setStartDate] = useState(activityState.startTime);
    const [endDate, setEndDate] = useState(activityState.endTime);
    const [startTime, setStartTime] = useState(activityState.sTime);
    const [endTime, setEndTime] = useState(activityState.eTime);
    const [focused, setFocused] = useState(null);
    const [update, setUpdate] = useState(0);
    const [unDates, setUnDates] = useState([]);

    const startDateId = uuidv4();
    const endDateId = uuidv4();

    moment.locale('sv')

    const setSelectedActivity = (value) => {
        hourly = value.hourly;
        setActivity(value);

        let unavailableDates = [];
        reservations.forEach(reservation => {
            if (value.name === reservation.activity.name) {
                if (!hourly) {
                    let startDate = new Date(reservation.startTime)
                    let endDate = new Date(reservation.endTime).setHours(24)
                    while (startDate < endDate) {
                        unavailableDates.push(new Date(startDate))
                        startDate.setDate(startDate.getDate() + 1)
                    }
                }
            }
        })

        setUnDates(unavailableDates)
        setUpdate(update + 1)
    }

    const filterBlockedDates = day => {
        return unDates.some((unavailableDay) => moment(unavailableDay).isSame(day, 'day'));
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
                <span className="p-float-label p-mt-4" >
                    <InputMask id="name" value={startTime} mask="99:99" slotChar="--:--" onChange={function (e) {
                        if(!e.value.toString().includes("-")){
                            return setStartTime(e.value);
                        }
                    }}/>
                    <label  htmlFor="name">Start tid</label>
                </span>
                <span className="p-float-label p-mt-4" >
                    <InputMask id="name" value={endTime} mask="99:99" slotChar="--:--" onChange={function (e) {
                        if(!e.value.toString().includes("-")){
                            return setEndTime(e.value);
                        }
                    }}/>
                    <label htmlFor="name">Slut tid</label>
                </span>
            </div>
        )
    }

    useEffect(() => {
        let state = {
            "id": id, "startTime": startDate, "endTime": endDate, "sTime": startTime, "eTime": endTime,
            "activity": {"name": activity}, "activityInfo": activityInfo, "reservations": reservations
        };
        onActivityStateChanged(state);
    }, [activity, startDate, endDate, startTime, endTime]);

    return (
        <ActivityComponent/>
    )

}