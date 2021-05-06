import { useEffect, useState } from 'react';
import BookingService from '../../services/BookingService';

export default function PriceCalculation(props) {

    const activityStates = props.activityStates;
    console.log(activityStates);

    const [price, setPrice] = useState(0);

    const bookingService = new BookingService();

    useEffect(async () => {

        if (activityStates) {
            bookingService.getPriceCalculation(activityStates).then(resp => {
                setPrice(resp.price);
            });
        }
        

    }, []);

     
    return (
        <div className="p-d-flex">
            <div className="p-mr-2">Totalt Pris:</div>
            <div>{price}</div>
        </div>
    )
}