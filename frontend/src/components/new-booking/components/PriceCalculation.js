import { useEffect, useState } from 'react';
import BookingService from '../../services/BookingService';

export default function PriceCalculation(props) {

    const activities = props.activities
    //Caused hook crash
    //const [price, setPrice] = useState(0);

    const bookingService = new BookingService();

    /*useEffect(() => {

        bookingService.getPriceCalculation(activities).then(data => {
            setPrice(data.price);
        });

    }, []);

     */
    //<div>{price}</div>
    return (
        <div className="p-d-flex">
            <div className="p-mr-2">Totalt Pris</div>

        </div>
    )
}