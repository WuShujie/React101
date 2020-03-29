import axios from 'axios'

// create axios instance
const http = axios.create({
    xsrfCookieName: 'xsrf-token'
})

// add request interceptor
http.interceptors.request.use(function(config){
    // do something before request
    return config
}, function(error){
    // do something when request error
    return Promise.reject(error)
})

// add response intercepter
http.interceptors.response.use(function(response){
    // do something when response success
    console.log('response data', response.data)
    
    return response
}, function(error){
    return Promise.reject(error)
})

export default http