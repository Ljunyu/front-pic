import axios from '../util/requst'

const usersign = () => {
  return axios.get('/user/fav', {
  }, true)
}
const basic = (option) => {
  return axios.post('/user/basic', option)
}
const updatename = (option) => {
  console.log(222, option)
  return axios.post('/user/updatename', option)
}
const changepwd = (option) => {
  return axios.post('/user/pwd', option)
}
const filepic = (option) => {
  return axios.post('/content/upload', option)
}
/**
 *获取用户基本信息
 * @param {} options
 */
const getinfo = () => {
  return axios.get('/user/getinfo')
}
const getMsg = (option) => {
  return axios.get('/user/getMsg', option)
}
const getnum = (option) => {
  return axios.get('/user/getnum', option)
}
const setMsg = (option) => {
  return axios.get('/user/setMsg', option)
}
export {
  usersign,
  basic,
  changepwd,
  filepic,
  updatename,
  getinfo,
  getMsg,
  getnum,
  setMsg
}
