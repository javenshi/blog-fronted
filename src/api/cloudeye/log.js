import fetch from 'utils/fetch';


export function getAll(query) {
    return fetch({
        url: '/api/cloudlog/page',
        method: 'post',
        data: JSON.stringify(query)
    });
}
