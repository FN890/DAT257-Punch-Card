import axios from "axios";

export default class ActivityService {

    getActivities() {
        return axios.get('/api/v1/activity').then(resp => {
            return resp.data
        });
    }

    getActiveActivities() {
        return axios.get('/api/v1/activity/active').then(resp => {
            return resp.data
        });
    }

    async addActivity(name, price, maxSize, isDaily, faq) {
        try {
            const resp = await axios.post('api/v1/activity',
                {
                    "name": name,
                    "price": price,
                    "maxSize": maxSize,
                    "isDaily": isDaily,
                    "faq": faq
                })
            console.log(resp);
        } catch (err) {
            console.log(err);
        }

    }

    deleteActivity(name) {
        return axios.delete(`/api/v1/activity/name/${name}`)
    }


}