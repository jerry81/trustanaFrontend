import axios from 'axios'
import {getConfig} from './headers'

export default {
    async getUsers() {
        return await axios.get('/user/findAll', getConfig())
    },
    async getTest() {
        return await axios.get('/', getConfig())
    }
}