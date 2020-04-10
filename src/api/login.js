import axios from '../util/requst'
/**
 *获取验证码接口
 * @param  sid
 */
const getCode = (sid) => {
  return axios.get('/getCaptcha', {
    params: {
      sid: sid
    }
  })
}
/**
 *找回密码接口
 * @param {*} option
 */
const forget = () => {
  return axios.post('/forget', {

  })
}
/**
 *登录接口
 * @param {*} option
 */
const login = (option) => {
  console.log(option)
  return axios.post('/login/login', {
    ...option
  })
}

const gitcs = (option) => {
  console.log(13)
  return axios.post('/login/cs', {
    ...option
  })
}

// 注册接口
const redylogin = (options) => {
  return axios.post('/login/redylogin', {
    ...options
  })
}
export { getCode, forget, login, gitcs, redylogin }
