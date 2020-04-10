import config from '../config/index'
import HttpRequest from './axios'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.pro
export default new HttpRequest(baseUrl)
