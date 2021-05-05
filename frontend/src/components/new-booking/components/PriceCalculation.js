import { useEffect, useState } from 'react';
import BookingService from '../../services/BookingService';

export default function PriceCalculation(props) {

    const activities = props.activities

    const [price, setPrice] = useState(0);

    const bookingService = new BookingService();

    useEffect(() => {

        bookingService.getPriceCalculation(activities).then(data => {
            setPrice(data.price);
        });

    }, []);

    return (
        <div className="p-d-flex">
            <div className="p-mr-2">Totalt Pris</div>
            <div>{price}</div>
        </div>
    )
}