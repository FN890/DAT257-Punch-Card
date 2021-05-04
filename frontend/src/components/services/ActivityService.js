import axios from "axios";

export default class ActivityService {

    getActivities() {
        return axios.get('/api/v1/activity').then(resp => {
            return resp.data
        });
    }

   async addActivity(name, price, maxSize, isDaily) {
        try {
            const resp = await axios.post('api/v1/activity',
                {
                    "name": name,
                    "price": price,
                    "maxSize": maxSize,
                    "isDaily": isDaily
                })
            console.log(resp);
        }
            catch (err){
                console.log(err);
            }

        }



}