import axios from 'axios';

export default function BookingService() {
    /**
     *  GET request to get JSON of all bookings
     */
    return axios.get('/api/v1/booking').then(resp => resp.data);
}
