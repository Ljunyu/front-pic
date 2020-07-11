import axios from '../util/requst'

/**
 *读取文章列表接口的参数
 * @param {obj} options
 */
const getlist = (options) => {
  return axios.post('/public/getlist', {
    ...options
  })
}
/**
 *读取文章列表接口的参数
 * @param {obj} options
 */
const setHands = (options) => {
  return axios.get('/setHands', options)
}

/**
 *更新评论
 * @param {obj} options
 */
const updatacommont = (options) => {
  return axios.post('/updatacommont', {
    ...options
  })
}
/**
 *设置最佳答案
 * @param {obj} options
 */
const setBest = (options) => {
  return axios.get('/setBest', options)
}
/**
 *温馨提醒
 * @param {} options
 */
const gettips = (options) => {
  return axios.get('/public/gettips')
}
/**
 *温馨提醒
 * @param {} options
 */
const getdetil = (options) => {
  return axios.get('/public/detail', { id: options.id })
}
/**
 *本周热议
 * @param {} options
 */
const topweek = (options) => {
  return axios.get('/public/topweek')
}
/**
 *友情连接
 * @param {} options
 */
const getlinks = (options) => {
  return axios.get('/public/getlinks')
}
/**
 *文章评论接口
 * @param {} options
 */
const getcomments = (options) => {
  return axios.get('/public/getcomments', options)
}
/**
 *提交帖子留言
 * @param {} options
 */
const addcomments = (options) => {
  return axios.post('/addcomments', options)
}

/**
 *图片上传
 * @param {} options
 */
const uploade = (options) => axios.post('/upload', options)
const addpost = (options) => axios.post('/add', options)
export {
  getlist,
  gettips,
  getlinks,
  uploade,
  topweek,
  addpost,
  getdetil,
  getcomments,
  addcomments,
  updatacommont,
  setBest,
  setHands
}
