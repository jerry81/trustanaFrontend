import axios from 'axios'
import {getConfig} from './headers'

export default {
    async generateToken(request) {
        return await axios.post('/ex2/generateToken', request, getConfig())
    },
    async setSensitiveData(request) {
        return await axios.post(`/ex2/sensitiveData`, request, getConfig())
    },
    async getSensitiveData(token) {
        return await axios.get(`/ex2/sensitiveData/${token}`, getConfig())
    },
}