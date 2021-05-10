import { useEffect, useState } from 'react';
import BookingService from '../../services/BookingService';

export default function PriceCalculation(props) {

    const activityStates = props.activityStates;
    console.log(activityStates);

    const [price, setPrice] = useState(0);

    const bookingService = new BookingService();

    useEffect(() => {
        const preBookings = [];
        activityStates.forEach(state => {
            if (state.startTime && state.endTime && state.activity.name.name) {
                preBookings.push({
                    startTime: state.startTime,
                    endTime: state.endTime,
                    activityName: state.activity.name.name
                });
            }
        });

        if (preBookings.length !== 0) {
            bookingService.getPriceCalculation(preBookings).then(resp => {
                console.log(resp);
                setPrice(resp.price);
            });
        }
        

    });

     
    return (
        <div className="p-d-flex">
            <div className="p-mr-2">Totalt Pris:</div>
            <div>{price}</div>
        </div>
    )
}