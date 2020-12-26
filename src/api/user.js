import axios from 'axios'
import {getConfig} from './headers'

export default {
    async findAll() {
        return await axios.get('/user/findAll', getConfig())
    },
    async edit(user) {
        return await axios.put(`user/${user._id}`, user, getConfig())
    },
    async create(user) {
        return await axios.post(`user`, user, getConfig())
    },
    async upload(file) {
    
        let formData = new FormData()
      
        formData.set('file', file)
      
        return await axios.post(`uploadResume`, formData, getConfig(
            'multipart/form-data',
        ))
    },
    async dl(id, fileName) {
        return await axios({
            url: `downloadResume/${id}/${fileName}`,
            method: 'GET',
            responseType: 'blob',
            headers: {
              'Access-Control-Allow-Origin': '*',
            }})
/*         return await axios.get(`downloadResume/${id}/${fileName}`, getConfig(
            'multipart/form-data',
        )) */
    },
}