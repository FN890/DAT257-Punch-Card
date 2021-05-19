import axios from 'axios';

export default class BookingService {

    /**
     * GET request to get JSON of all bookings
     */
    getAllBookings() {
        return axios.get('/api/v1/booking').then(resp => resp.data);
    }

    /**
     * GET request to get JSON of all not archived bookings
     */
    getNotArchivedBookings() {
        return axios.get('/api/v1/booking/notarchived').then(resp => resp.data);
    }


    /**
     * GET request to get JSON of specific booking.
     */
    getIndividualBooking(id, token) {

        return axios.get(`/api/v1/booking/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(resp => resp.data);
    }

    /**
     * GET request to get JSON of wheter a booking has been paid.
     */
    putBooking(id) {
        return axios.get(`/api/v1/booking/${id}`).then(resp => resp.data);
    }

    getPriceCalculation(preBookings) {
        return axios.post(`/api/v1/booking/pre`, preBookings).then(resp => resp.data);
    }

    /**
     * PUT request to edit already existing booking
     */
    updateBooking(id, description, responsible, paid, price, customer) {
        return axios.put(`/api/v1/booking/${id}`, {
            "description": description,
            "responsible": responsible,
            "paid": paid,
            "price": price,
            "customer": customer
        });
    }

    /**
     * DELETE request to delete specific booking.
     * @param {*} id
     */

    deleteBooking(id) {
        axios.delete(`/api/v1/booking/${id}`,).then(resp => resp.data);
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
