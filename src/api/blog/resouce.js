import fetch from 'utils/fetch';

export function saveResouce(query) {
    return fetch({
        url: '/api/resource/saveResouce',
        method: 'post',
        data:JSON.stringify(query)
    });
}

export function getResouceList(query,size) {

    return fetch({
        url: '/api/resource/getResouceList/'+size,
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