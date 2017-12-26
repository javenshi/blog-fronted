import fetch from 'utils/fetch';

export function fetchCloudUserList(query) {
    return fetch({
        url: '/api/clouduser/page',
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function getCompanCode() {
    return fetch({
        url: '/api/clouduser/getCode',
        method: 'post'
    });
}
export function saveCloudUser(entity) {
    let curMethod = 'post';
    if (entity.id) {
        curMethod = 'put';
    }
    return fetch({
        url: '/api/clouduser',
        method: curMethod,
        data: JSON.stringify(entity)
    });

}

export function getCloudUser(id) {
    return fetch({
        url: '/api/clouduser/' + id,
        method: 'get'
    });
}
export function validateCode(code) {
    return fetch({
        url: '/api/clouduser/validateCode/' + code,
        method: 'post'
    });
}
export function UserStart(code) {
    return fetch({
        url: '/api/clouduser/UserStart/' + code,
        method: 'post'
    });
}
export function UserEnd(code) {
    return fetch({
        url: '/api/clouduser/UserEnd/' + code,
        method: 'post'
    });
}