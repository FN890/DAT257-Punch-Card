import axios from "axios";
import {useCookies} from "react-cookie";


export default class ActivityService {


    getActivities(token) {

        return axios.get('/api/v1/activity', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(resp => {
            return resp.data
        });
    }

    getActiveActivities(token) {
        return axios.get('/api/v1/activity/active', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(resp => {
            return resp.data
        });
    }

    async addActivity(name, price, hprice, dprice, perprice, maxSize, isDaily, faq, token) {
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
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
        } catch (err) {
            console.log(err);
        }

    }

    deleteActivity(id, token) {
        return axios.delete(`/api/v1/activity/name/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }


}