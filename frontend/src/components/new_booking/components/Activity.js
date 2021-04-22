import React, { useState, useEffect } from 'react';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';

export default function Activity() {

    const [activity, setActivity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [focused, setFocused] = useState('');

    return (
        <div className="p-d-flex p-flex-wrap p-ai-center p-mx-5 p-mb-5">
            <div className="p-mr-2 p-mb-2 p-mr-5">
                <span className="p-float-label">
                    <Dropdown id="dropdown" value={activity} onChange={(e) => setActivity(e.value)} optionLabel="name" />
                    <label htmlFor="dropdown">Aktivitet</label>
                </span>
            </div>
            <div className="p-mr-2 p-mb-2 p-mr-5">
                <DateRangePicker
                    startDate={startDate}
                    startDateId="start_date_id"
                    endDate={endDate}
                    endDateId="end_date_id"
                    onDatesChange={({ startDate, endDate }) => {
                        setStartDate(startDate);
                        setEndDate(endDate);
                    }}
                    focusedInput={focused}
                    onFocusChange={focusedInput => {
                        setFocused(focusedInput);
                    }}
                    openDirection={'up'}
                />
            </div>
            <div className="p-mr-2 p-mb-2 p-mr-5">
                <Button className="p-button-raised p-button-danger" icon="pi pi-trash" iconPos="right" />
            </div>
        </div>

    )
}