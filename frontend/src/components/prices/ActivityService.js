import axios from "axios";

export default class ActivityService {

    getActivities() {

        return axios.get('/api/v1/activity').then(resp => {
            console.log(resp.data)
            return resp.data
    });}

}