import axios from 'axios';

export default class BookingService {

    /**
     * GET request to get JSON of all bookings
     */
    getAllBookings(token) {
        return axios.get('/api/v1/booking', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    /**
     * GET request to get JSON of all not archived bookings
     */
    getNotArchivedBookings(token) {
        return axios.get('/api/v1/booking/notarchived', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }


    /**
     * GET request to get JSON of specific booking.
     */
    getIndividualBooking(id, token) {

        return axios.get(`/api/v1/booking/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    /**
     * GET request to get JSON of wheter a booking has been paid.
     */
    putBooking(id, token) {
        return axios.get(`/api/v1/booking/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    getPriceCalculation(preBookings, token) {
        return axios.post(`/api/v1/booking/pre`, preBookings, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    /**
     * PUT request to edit already existing booking
     */
    updateBooking(id, description, responsible, paid, price, customer, token) {
        return axios.put(`/api/v1/booking/${id}`, {
            "description": description,
            "responsible": responsible,
            "paid": paid,
            "price": price,
            "customer": customer
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

    /**
     * DELETE request to delete specific booking.
     * @param {*} id
     */

    deleteBooking(id, token) {
       return axios.delete(`/api/v1/booking/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
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
    postBooking(groupSize, description, responsible, paid, price, customer, reservations, token) {
        return axios.post(`/api/v1/booking/`, {
            "groupSize": groupSize,
            "description": description,
            "responsible": responsible,
            "paid": paid,
            "price": price,
            "customer": customer,
            "reservations": reservations
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

}
