import fetch from 'utils/fetch';


export function getAll(query) {
    return fetch({
        url: '/api/cloudmaintain/page',
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function updateById(query) {
    return fetch({
        url: '/api/cloudmaintain',
        method: 'put',
        data: JSON.stringify(query)
    });
}
