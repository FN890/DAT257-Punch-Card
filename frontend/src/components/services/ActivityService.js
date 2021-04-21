import axios from "axios";

export default class ActivityService {

    getActivities() {

        return axios.get('/api/v1/activity').then(resp => {
            return resp.data
        });
    }

}