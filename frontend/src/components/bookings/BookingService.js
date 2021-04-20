import axios from 'axios';

export default function BookingService() {
    /**
     *  Used to restructure json data into a usable format for the calendar
     */
    return axios.get('/api/v1/booking').then(resp => {
        if (resp.status === 200) {
            (resp.data).map(
                obj => {
                    let i;
                    var bookingsArray = [obj.reservations.length]
                    for (i = 0; i < obj.reservations.length; i++) {
                        bookingsArray[i] = {
                            "id" : obj.reservations[i].id,
                            "title": obj.reservations[i].activity.name,
                            "start": obj.reservations[i].startTime,
                            "end": obj.reservations[i].endTime,

                        }
                    }
                    console.log(bookingsArray)
                    return {
                        bookingsArray
                    }
                }
            )


        }
    });
}
