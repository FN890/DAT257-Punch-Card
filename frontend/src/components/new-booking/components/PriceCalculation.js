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
            const aState = state.activityState;
            if (aState.startTime && aState.endTime && aState.activity.name) {
                preBookings.push({
                    startTime: aState.startTime,
                    endTime: aState.endTime,
                    activityName: aState.activity.name
                });
            }
        });

        if (preBookings.length !== 0) {
            bookingService.getPriceCalculation(preBookings).then(resp => {
                console.log(resp);
                setPrice(resp.price);
            });
        }
        

    }, [JSON.stringify(props.activityStates)]);

     
    return (
        <div className="p-d-flex">
            <div className="p-mr-2">Totalt Pris:</div>
            <div>{price}</div>
        </div>
    )
}