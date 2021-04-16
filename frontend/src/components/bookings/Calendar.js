import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import './Calendar.css';
import axios from 'axios';


export default function Calendar() {

    let state = {

    }

    return (
        <div className='calendar'>
            <FullCalendar
                defaultView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                plugins={[dayGridPlugin, timeGridPlugin]}
                events={[
                    {
                        title: 'Sprint 1',
                        start: '2021-04-12',
                        end: '2021-04-17'

                    },
                    {
                        color: 'green',
                        title: 'gym',
                        start: '2021-04-16T12:30:00',
                        end: '2021-04-16T21:30:00',
                    },
                    {
                        //url can be used to link to this specific booking
                        url: 'bookingNr1337',
                        color: 'red',
                        title: 'running',
                        start: '2021-04-16T11:30:00',
                        end: '2021-04-16T21:30:00',
                    },
                    {
                        title: 'Sprint 2',
                        start: '2021-04-19',
                        end: '2021-04-23'
                    }
                ]}
            />
        </div>
    )
}
