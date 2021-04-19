import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import './Calendar.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Calendar() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get('/api/v1/booking').then(resp => {
            if(resp.status === 200){
                let parsedData = (resp.data).map(
                    obj => {
                        return{
                            "title" : obj.id,
                            "start" : obj.startTime,
                            "end" : obj.endTime,
                        }
                    }
                )
                setEvents(parsedData)
            }
        });
    },[]);

    return (
        <div>
            <div className="calendar">
                <FullCalendar events={events}
                              defaultView="dayGridMonth"
                              headerToolbar={{
                                  left: 'prev,next,today',
                                  center: 'title',
                                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                              }}
                              plugins={[dayGridPlugin, timeGridPlugin]} />
            </div>
        </div>
    );
}