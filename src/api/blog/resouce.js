import fetch from 'utils/fetch';

export function saveResouce(query) {
    return fetch({
        url: '/api/resource/saveResouce',
        method: 'post',
        data:JSON.stringify(query)
    });
}

export function getResouceList(query) {

    return fetch({
        url: '/api/resource/getResouceList',
        method: 'post',
        data:JSON.stringify(query)
    });
}
export function resourceClick(id,ip) {

    return fetch({
        url: '/api/resource/resourceClick/'+ip,
        method: 'post',
        data:id
    });
}
export function selectResourcesPage(query) {

    return fetch({
        url: '/api/resource/getResouceList',
        method: 'post',
        data:JSON.stringify(query)
    });
}
export function updateRes(query) {

    return fetch({
        url: '/api/resource/updateRes',
        method: 'post',
        data:JSON.stringify(query)
    });
}
export function passResourc(query,id) {

    return fetch({
        url: '/api/resource/passResourc/'+id,
        method: 'post',
        data:query
    });
}
export function deleteRe(id) {

    return fetch({
        url: '/api/resource/deleteRe/'+id,
        method: 'post'
    });
}