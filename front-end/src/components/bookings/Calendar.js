import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import './Calendar.css'

export default function Calendar(){
    return (
        <div className='calendar'>
            <FullCalendar
                defaultView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                plugins={[dayGridPlugin]}
                events={[
                    {
                        title: 'Sprint 1',
                        start: '2021-04-12',
                        end: '2021-04-16'
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
