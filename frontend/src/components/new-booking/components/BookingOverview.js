import React, { useEffect, useState, useRef } from 'react';
import { Divider } from "primereact/divider";
import 'primeflex/primeflex.css';
import { InputNumber } from 'primereact/inputnumber';
import BookingService from '../../services/BookingService';

export default function BookingOverview(props) {

    const activityStates = props.activityStates;
    const onPriceChange = props.onPriceChange;

    const [act, setAct] = useState([])
    const [discount, setDiscount] = useState(0);
    const [price, setPrice] = useState(0);

    let listActivity = []

    const getPrice = () => {
        const bookingService = new BookingService();
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
                setPrice(resp.price);
            });
        } else {
            setPrice(0);
        }
    }

    useEffect(() => {
        activityStates.forEach(state => {
            if (state.activity.name) {
                listActivity.push(
                    <div className="p-m-2 p-d-flex p-justify-between">
                        <div className="p-text-left">
                            {state.activity.name.name}
                        </div>
                        <div className="p-text-right ">
                            +{state.activity.name.price}:-
                        </div>
                    </div>
                )
            }
        });
        if (activityStates.length > 0 && activityStates[0].activity.name) {
            listActivity.push(<Divider />)
        }
        getPrice();
        setAct(listActivity)
        onPriceChange((price - discount));
    }, [activityStates, price, discount]);


    const DiscountComponent = () => {
        return (
            <div className="p-my-5">
                <span className="p-float-label">
                    <InputNumber id="inputGroupSize" value={discount} onValueChange={(e) => setDiscount(e.value)} min={0} max={price} />
                    <label htmlFor="inputGroupSize">Rabatt</label>
                </span>
            </div>
        )
    }

    return (
        <div className="p-m-3">
            {act}
            <DiscountComponent />
            <div className="p-d-flex">
                <div className="p-ml-auto p-mr-2">Totalt Pris:</div>
                <div className="p-mr-3">{price - discount}</div>
            </div>
        </div>
    )
}