import axios from 'axios'

class httpAxios {
  constructor (basurl) {
    this.basurl = basurl
  }

  peizhi () {
    const confit = {
      baseURL: this.basurl,
      timeout: 1000,
      headers: { 'X-Custom-Header': 'foobar' }
    }
    return confit
  }

  request (option) {
    const instance = axios.create(this.confit)
    const newinstance = Object.assign(option, this.peizhi)
    this.interceptors(instance)
    return instance(newinstance)
  }

  interceptors (instance) {
    instance.Interceptors.request.use((res) => {

    })
    instance.Interceptors.response.use((res) => {
      if (res.status === 200) {
        return Promise.resolve(res.data)
      }
    }, (err) => {
      console.log(err)
    })
  }

  post (url, option) {
    const config = {
      data: option,
      url: url,
      method: 'post'
    }
    return this.request(config)
  }

  get (url, config) {
    const option = {
      method: 'get',
      url: url,
      params: config
    }
    return this.request(option)
  }
}
export default httpAxios
