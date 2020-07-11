import axios from 'axios'
import { unaxioserr } from '@/err/unaxios'
import store from '../store'
const Canceltoken = axios.CancelToken
class HttpRequest {
  constructor (baseURL) {
    this.baseURL = baseURL
    this.pading = {}
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

  // 创建实例 核心
  request (options) {
    const intercens = axios.create()
    // assign方法进行合并，gitInaxiosconfig为配置，options为传入内容
    const newoptions = Object.assign(this.gitInaxiosconfig(), options)
    this.interceptors(intercens) // 定义请求拦截器
    // 接收配置返回数据（intercens（newoptions））
    return intercens(newoptions)
  }

  // 拦截重复请求
  removepadding (key, isrequest = false) {
    if (this.pading[key] && isrequest === true) {
      this.pading[key]('取消重复请求')
    }
    delete this.pading[key]
  }

  // 添加拦截器
  interceptors (intercens) {
    // 添加请求拦截器
    intercens.interceptors.request.use((res) => {
      // eslint-disable-next-line prefer-const
      let key = res.url
      const arrs = ['public', 'login', 'getCaptcha']// 公共路径 不需要待token
      let rsd = true
      arrs.map((item) => {
        if (key.indexOf(item) !== -1) {
          rsd = false
        }
      })
      if (rsd) {
        const token = store.state.token
        console.log('token', token)
        res.headers.Authorization = 'Bearer ' + token
      }
      this.removepadding(key, true)
      res.cancelToken = new Canceltoken((c) => {
        this.pading[key] = c
      })
      return res
    }, (err) => {
    // 对请求错误做些什么
      unaxioserr(err)
      return Promise.reject(err)
    })
    // 添加响应拦截器
    intercens.interceptors.response.use((res) => {
      // eslint-disable-next-line prefer-const
      let key = res.url
      this.removepadding(key)
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
    let options = {}
    options = Object.assign({
      method: 'get',
      url: url,
      params: config
    })
    return this.request(options)
  }

  post (url, options) {
    console.log('post', url, options)
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
