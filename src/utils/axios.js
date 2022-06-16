import axios from 'axios'
// http request 拦截
axios.interceptors.request.use(
  config => {
    config.baseURL = process.env.SERVERURL
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// http response 拦截
axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)
export default axios
