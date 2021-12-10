import accessInterface from './request'
export function loginInterfacer() {
    return accessInterface({url: '/siteContact/getContactType', method: 'post'})
    .then(data => {


    })
}