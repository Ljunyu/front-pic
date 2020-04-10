import axios from 'axios'
import { unaxioserr } from '@/err/unaxios'
class HttpRequest {
  constructor (baseURL) {
    console.log(this.baseURL)
    this.baseURL = baseURL
  }
  // 获取或者定义axios配置,比如生产还是开发环境
  gitInaxiosconfig () {
    const configs = {
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      timeout: 10000
    }
    return configs
  }
  // 创建实例
  request (options) {
    const intercens = axios.create()
    // assign方法进行合并，gitInaxiosconfig为配置，options为传入内容
    const newoptions = Object.assign(this.gitInaxiosconfig(), options)
    this.interceptors(intercens) // 先将请求拦截
    return intercens(newoptions)
  }
  // 添加拦截器
  interceptors (intercens) {
    // 添加请求拦截器
    intercens.interceptors.request.use((res) => {
    // 在发送请求之前做些什么
      return res
    }, (err) => {
    // 对请求错误做些什么
      unaxioserr(err)
      return Promise.reject(err)
    })
    // 添加响应拦截器
    intercens.interceptors.response.use((res) => {
    // 对响应数据做点什么
      if (res.status === 200) {
        return Promise.resolve(res.data)
      }
    }, (err) => {
    // 对响应错误做点什么
      unaxioserr(err)
      return Promise.reject(err)
    }
    )
  }
  // 添加get请求
  get (url, config) {
    console.log('get:', url, config)
    const options = Object.assign({
      method: 'get',
      url: url,
      params: config.params
    })
    return this.request(options)
  }

  post (url, options) {
    console.log(url, options)
    const config = {
      method: 'post',
      url: url,
      data: options
    }
    console.log(config)
    return this.request(config)
  }
}
export default HttpRequest
