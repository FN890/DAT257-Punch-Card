import axios from "axios";

export default class ActivityService {

    getActivities() {
        return axios.get('/api/v1/activity').then(resp => {
            return resp.data
        });
    }

    getActiveActivities() {
        return axios.get('/api/v1/activity/active').then(resp => {
            console.log(resp.data)
            return resp.data
        });
    }

    async addActivity(name, price, hprice, dprice, perprice, maxSize, isDaily, faq) {
        try {
            const resp = await axios.post('api/v1/activity',
                {
                    "name": name,
                    "price": price,
                    "hourlyPrice": hprice,
                    "dailyPrice": dprice,
                    "pricePerPerson": perprice, 
                    "maxSize": maxSize,
                    "isDaily": isDaily,
                    "faq": faq
                })
            console.log(resp);
        } catch (err) {
            console.log(err);
        }

    }

    deleteActivity(id) {
        return axios.delete(`/api/v1/activity/name/${id}`)
    }


}