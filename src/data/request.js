
import axios from 'axios'
import { ElMessage } from 'element-plus'
axios.defaults.timeout = 10e3
export default function ({
  url,
  method = 'post',
  reqArgs = {},
  errmsg = '接口异常',
  headers = {},
  downFile = false,
  timeout
}) {
  const foo = '_';
  let params = {[foo]: Date.now()}

  if ('get' === method) {
    params = ({...params, ...reqArgs})
    reqArgs = null
  }

  const payload = {
    url: `/admin${url}`,
    method,
    params,
    headers,
    data: reqArgs
  }

  if (timeout !== undefined) {
    payload.timeout = timeout
  }
  return axios(payload)
    .then(res => {
      const data = res.data
      if (downFile) {
        return data
      }
      // 接口返回失败消息
      if (
          (data.status && 200 !== data.status && !data.success)
          || (data.code && data.code !== 0)
      ) {
        if ('has no auth' === data.message) {
            window.location.href = '/page/error'
        }
          return Promise.reject(data.message)
      }
      return data
    })
    .catch(err => {
      ElMessage.error(err ? err : errmsg)
    });
}
