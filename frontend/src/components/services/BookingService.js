import axios from 'axios';

export default class BookingService {

    /**
     * GET request to get JSON of all bookings
     */
    getAllBookings() {
        return axios.get('/api/v1/booking').then(resp => resp.data);
    }

    /**
     * GET request to get JSON of specific booking.
     */
    getIndividualBooking(id) {
        return axios.get(`/api/v1/booking/${id}`).then(resp => resp.data);
    }

    /**
     * DELETE request to delete specific booking.
     * @param {*} id 
     */
    deleteBooking(id) {
        axios.delete(`/api/v1/booking/${id}`).then(resp => resp.data);
    }

    /**
     * POST request to create a new booking. 
     * @param {*} groupSize 
     * @param {*} description 
     * @param {*} responsible 
     * @param {*} paid 
     * @param {*} price 
     * @param {*} customer 
     * @param {*} reservations 
     */
    postBooking(groupSize, description, responsible, paid, price, customer, reservations) {
        axios.post(`/api/v1/booking/`, {
            "groupSize": groupSize,
            "description": description,
            "responsible": responsible,
            "paid": paid,
            "price": price,
            "customer": customer,
            "reservations": reservations
        }).then((response) => {
            return response;
        });
    }

}
