import axios from 'axios';

export default function BookingService(){

    return axios.get('/api/v1/booking').then(resp => {
        if (resp.status === 200) {
            console.log(resp.data)
            let parsedData = (resp.data).map(
                obj => {
                    return {
                        "title": obj.name,
                        "start": obj.startTime,
                        "end": obj.endTime,
                    }
                }
            )
            return parsedData;
        }
    });
}
