import axios from 'axios'
import {getConfig} from './headers'

export default {
    async upload(file, password) {
    
        let formData = new FormData()
      
        formData.set('file', file)
      
        return await axios.post(`uploadResume`, formData, getConfig(
            'multipart/form-data',
            password
        ))
    },
    async dl(id, fileName, password) {
        return await axios({
            url: `downloadResume/${id}/${fileName}`,
            method: 'GET',
            responseType: 'blob',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'decryption-token': password,
            }})
    },
}