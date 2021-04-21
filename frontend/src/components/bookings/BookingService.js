import axios from 'axios';

export default function BookingService() {
    /**
     *  Used to restructure json data into a usable format for the calendar
     */
    return axios.get('/api/v1/booking').then(resp => resp.data);
}
