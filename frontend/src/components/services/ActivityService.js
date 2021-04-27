import axios from "axios";

export default class ActivityService {

    getActivities() {
        return axios.get('/api/v1/activity').then(resp => {
            return resp.data
        });
    }

    addActivity(name, price, maxSize) {
        axios.post('api/v1/activity',
            {
                "name": name,
                "price": price,
                "maxSize": maxSize
            })
    }

}