import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:3000/',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const data = JSON.parse(localStorage.getItem(process.env.LOCALSTORAGE))
    // do something before request is sent
    if (data) {
      // let each request carry token
      config.headers['x-access-token'] = data.accessToken
    }
    return config
  },
  error => {
    // do something with request error
    console.log('ERRO NO REQUEST.JS', error) // for debug
    return Promise.reject(error)
  }
)

export default service
