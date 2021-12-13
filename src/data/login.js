import accessInterface from './request'
export function loginInterfacer(url, reqArgs) {
    return accessInterface({url, method: 'post', reqArgs})
    .then(data => data)
}
export function sendCaptchaInterfacer(reqArgs) {
    return accessInterface({url: '/auth/sendCaptcha', method: 'post', reqArgs})
    .then(data => data)
}
export function getCaptchaInterfacer(reqArgs) {
    return accessInterface({url: '/auth/captcha', method: 'get', reqArgs, errmsg: '', headers: {responseType: 'blob'}, downFile: true})
    .then(data => data)
}