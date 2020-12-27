import axios from 'axios'
import {getConfig} from './headers'

export default {
    async findAll(password) {
        return await axios.get('/user/findAll', getConfig(null, password))
    },
    async edit(user, password) {
        return await axios.put(`user/${user._id}`, user, getConfig(null, password))
    },
    async create(user, password) {
        return await axios.post(`user`, user, getConfig(null, password))
    },
}