import accessInterface from './request'
export function userInfoInterfacer(reqArgs) {
    return accessInterface({url: '/sys/user/info', method: 'get'})
}
export function sendRoomMsgInterfacer(reqArgs) {
  return accessInterface({url: 'music/musicroommsg/sendRoomMsg', method: 'post', reqArgs})
}
export function initRoomInterfacer(reqArgs) {
  return accessInterface({url: '/music/musicroom/initRoom', method: 'get', reqArgs})
}
export function getRoomMsgListInterfacer(reqArgs) {
  return accessInterface({url: '/music/musicroommsg/getRoomMsgList', method: 'post', reqArgs})
}
export function getRoomUserListInterfacer(reqArgs) {
  return accessInterface({url: `/music/musicroom/getUsers/${reqArgs}`, method: 'get'})
}
export function searchSongInterfacer(reqArgs) {
  return accessInterface({url: '/music/api/song/search', reqArgs})
}
export function addSongInterfacer(reqArgs) {
  return accessInterface({url: '/music/api/song/addSong', reqArgs})
}
export function passSongInterfacer(roomId) {
  return accessInterface({url: `/music/api/song/passSong/${roomId}`, method: 'get'})
}