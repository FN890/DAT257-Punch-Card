import axios from "axios";


export default class LoginService {


    async getToken(name, password) {
        const data = {
            "username": name,
            "password": password
        }
        return axios.post('/api/v1/admin/login', data)
    }

    async createAccount(name, password,token) {
        const data = {
            "username": name,
            "password": password
        }
        console.log(data)
        return axios.post('/api/v1/admin/create', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }


}