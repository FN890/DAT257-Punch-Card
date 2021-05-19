import axios from "axios";


export default class LoginService {


    async getToken(name, password) {
        const data = {
            "username": name,
            "password": password
        }

            return axios.post('/api/v1/admin/login', data)

    }


}