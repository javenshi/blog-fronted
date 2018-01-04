import fetch from 'utils/fetch';

export function saveResouce(query) {
    return fetch({
        url: '/api/blog/saveResouce',
        method: 'post',
        data:JSON.stringify(query)
    });
}

export function getResouceList(query,size) {

    return fetch({
        url: '/api/blog/getResouceList/'+size,
        method: 'post',
        data:JSON.stringify(query)
    });
}