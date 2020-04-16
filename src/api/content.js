import axios from '../util/requst'

/**
 *读取文章列表接口的参数
 * @param {obj} options
 */
const getlist = (options) => {
  console.log(123)
  return axios.post('/public/getlist', {
    ...options
  })
}
/**
 *温馨提醒
 * @param {} options
 */
const gettips = (options) => {
  return axios.get('/public/gettips')
}
/**
 *本周热议
 * @param {} options
 */
const topweek = (options) => {
  console.log(123)
  return axios.get('/public/topweek')
}
/**
 *友情连接
 * @param {} options
 */
const getlinks = (options) => {
  console.log(123)
  return axios.get('/public/getlinks')
}
export {
  getlist,
  gettips,
  getlinks,
  topweek
}
