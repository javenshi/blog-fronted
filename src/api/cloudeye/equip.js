import fetch from 'utils/fetch';


export function getAll(query) {
    return fetch({
        url: '/api/cloudequip/page',
        method: 'post',
         data: JSON.stringify(query)
    });
}
export function findOneById(query) {
    return fetch({
        url: '/api/cloudequip/'+query,
        method: 'get',
        data: JSON.stringify(query)
    });
}
export function updateById(entity) {
    return fetch({
        url: '/api/cloudequip',
        method: 'put',
        data: JSON.stringify(entity)
    });
}
export function deleteById(query) {
    return fetch({
        url: '/api/cloudequip/'+query,
        method: 'delete',
        data: JSON.stringify(query)
    });
}
export function addOneEqu(query) {
    return fetch({
        url: '/api/cloudequip',
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function upload(query) {
    return fetch({
        url: '/api/cloudequip/upload',
        method: 'post',
        data: JSON.stringify(query)
    });
}