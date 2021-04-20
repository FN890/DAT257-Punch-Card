import axios from "axios";

export default function getActivities() {
    return axios.get('/api/v1/activity').then(resp => {
        if(resp.status === 200) {
            let parsedData = (resp.data).map(
                obj => {
                    return {
                        "name" : obj.name,
                        "price" : obj.price,
                        "maxSize" : obj.maxSize
                    }
                }
            )
            return parsedData
        }
    });
}