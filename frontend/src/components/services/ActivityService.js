import axios from "axios";

export default class ActivityService {

    getActivities(token) {
        return axios.get('/api/v1/activity', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    getActiveActivities(token) {
        return axios.get('/api/v1/activity/active', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    addActivity(name, price, hprice, dprice, perprice, maxSize, isDaily, faq, token) {
        return axios.post('api/v1/activity',
            {
                "name": name,
                "price": price,
                "hourlyPrice": hprice,
                "dailyPrice": dprice,
                "pricePerPerson": perprice,
                "maxSize": maxSize,
                "isDaily": isDaily,
                "faq": faq
            }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }

    deleteActivity(id, token) {
        return axios.delete(`/api/v1/activity/name/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }


}