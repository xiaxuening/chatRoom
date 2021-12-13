import accessInterface from './request'
export function userInfoInterfacer(reqArgs) {
    return accessInterface({url: '/sys/user/info', method: 'get'})
    .then(data => data)
}
export function sendRoomMsgInterfacer(reqArgs) {
    return accessInterface({url: 'music/musicroommsg/sendRoomMsg', method: 'post', reqArgs})
    .then(data => data)
}
// export function getCaptchaInterfacer(reqArgs) {
//     return accessInterface({url: '/auth/captcha', method: 'get', reqArgs, errmsg: '', headers: {responseType: 'blob'}, downFile: true})
//     .then(data => data)
// }