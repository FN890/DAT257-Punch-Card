import axios from "axios";

export default class AllBookingsService {

    getAllBookings() {

        return axios.get('/api/v1/booking').then(resp => {
            console.log(resp.data)
            return resp.data
        });}

}