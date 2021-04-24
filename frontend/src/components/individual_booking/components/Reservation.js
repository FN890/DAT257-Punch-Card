import svLocale from '@fullcalendar/core/locales/sv';


export default function Reservation(props) {
    const reservation = props.reservation;

    return(
        <div className="p-m-2 p-d-flex p-justify-between">
                    <div className="p-text-left">
                        <b>{reservation.activity.name}</b>
                    </div>
                    <div className="p-text-right ">
                        {new Intl.DateTimeFormat(svLocale.code, {
                            month: "long",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                        }).format(new Date(reservation.startTime))}
                        <i className="pi pi-arrow-right p-mx-3"/>
                        {new Intl.DateTimeFormat(svLocale.code, {
                            month: "long",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                        }).format(new Date(reservation.endTime))}
                    </div>
                </div>
    );
}