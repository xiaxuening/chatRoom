
import axios from 'axios'
import { ElMessage } from 'element-plus'
const qs = require('qs')
axios.defaults.timeout = 10e3
axios.interceptors.request.use((config) => {
  if (config.url === '/auth/oauth/token') {
    config.headers.Authorization = 'Basic aHk6aHk='
    config.headers['content-type'] = 'application/x-www-form-urlencoded'
    config.data = qs.stringify(config.data)
  } else {
    const Authorization = localStorage.getItem('user_token') ? `Bearer ${localStorage.getItem('user_token')}` : ''
    config.headers.Authorization = Authorization
  }
  // 在发送请求之前做些什么
  return config;
  }, function (error) {
    // 对请求错误做些什么
    // ElMessage.error(msg ? msg : '接口异常')
    return Promise.reject(error)
  }
);
export default function ({
  url,
  method = 'post',
  reqArgs = {},
  errmsg = '接口异常',
  headers = {},
  downFile = false,
  timeout
}) {
  const foo = '_t';
  let params = {[foo]: Date.now()}
  if ('get' === method) {
    params = ({...params, ...reqArgs})
    reqArgs = null
  }

  const payload = {
    url,
    method,
    params,
    headers,
    data: reqArgs
  }

  if (timeout !== undefined) {
    payload.timeout = timeout
  }
  return axios(payload)
    .then((res) => {
      const {data, code, msg} = res.data
      console.log(code);
      if (downFile) {
        return res.data
      }
      if (code === 401) {
        return Promise.resolve(401)
      }
      // 接口返回失败消息
      if (code !== 0) {
        ElMessage.error(msg ? msg : '接口异常')
        return
      }
      if (code === 500) {
         ElMessage.error(msg ? msg : '接口异常')
         return Promise.resolve(false)
      }
      // return Promise.resolve(res.data ? res.data : data ? data : true)
      return Promise.resolve(data ? data : res.data ? res.data : true)
    })
    .catch(err => {
      console.log(err);
      ElMessage.error('接口异常')
    });
}
