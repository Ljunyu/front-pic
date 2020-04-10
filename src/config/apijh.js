import config from './index'
import HttpAxios from '../util/axiostest'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.pro
export default new HttpAxios(baseUrl)
