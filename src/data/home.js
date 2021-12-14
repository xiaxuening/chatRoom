import accessInterface from './request'
export function userInfoInterfacer(reqArgs) {
    return accessInterface({url: '/sys/user/info', method: 'get'})
    .then(data => data)
}
export function sendRoomMsgInterfacer(reqArgs) {
  return accessInterface({url: 'music/musicroommsg/sendRoomMsg', method: 'post', reqArgs})
  .then(data => data)
}
export function initRoomInterfacer(reqArgs) {
  return accessInterface({url: '/music/musicroom/initRoom', method: 'get', reqArgs})
  .then(data => data)
}
export function getRoomMsgListInterfacer(reqArgs) {
  return accessInterface({url: '/music/musicroommsg/getRoomMsgList', method: 'post', reqArgs})
  .then(data => data)
}
export function getRoomUserListInterfacer(reqArgs) {
  return accessInterface({url: `/music/musicroom/getUsers/${reqArgs}`, method: 'get'})
  .then(data => data)
}
// export function getRoomUserListInterfacer(reqArgs) {
//   return accessInterface({url: `/music/musicroom/getUsers/${reqArgs}`, method: 'get'})
//   .then(data => data)
// }