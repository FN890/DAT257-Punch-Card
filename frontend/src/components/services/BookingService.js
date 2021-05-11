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
     * GET request to get JSON of wheter a booking has been paid.
     */
    isPaid(id) {
        return axios.get(`/api/v1/booking/${id}`).then(resp => resp.data);
    }

    getPriceCalculation(preBookings) {
        return axios.post(`/api/v1/booking/pre`, preBookings).then(resp => resp.data);
    }

    /**
     * PUT request to edit already existing booking
     */
    putPayment(id, paid) {
       return axios.put(`/api/v1/booking/${id}?paid=${paid}`).then(resp => resp.data);
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

        console.log(groupSize)
        console.log(description)
        console.log(responsible)
        console.log(paid)
        console.log(price)
        console.log(customer)
        console.log(reservations)

        return axios.post(`/api/v1/booking/`, {
            "groupSize": groupSize,
            "description": description,
            "responsible": responsible,
            "paid": paid,
            "price": price,
            "customer": customer,
            "reservations": reservations
        })
    }

}
