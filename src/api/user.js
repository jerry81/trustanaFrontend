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
      }
}