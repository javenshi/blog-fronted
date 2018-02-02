import fetch from 'utils/fetch';
import md5 from 'md5';

export function getCode(query) {
    return fetch({
        url: '/api/blogUser/sendEmail',
        method: 'post',
        data:JSON.stringify(query)
    });
}
export function valUser(query) {
    return fetch({
        url: '/api/blogUser/valUser',
        method: 'post',
        data:JSON.stringify(query)
    });
}
export function updateUser(query) {
    return fetch({
        url: '/api/blogUser/updateUser',
        method: 'post',
        data:JSON.stringify(query)
    });
}

export function cName(query) {
    return fetch({
        url: '/api/blogUser/cheackName/'+query,
        method: 'get'
    });
}
export function saveUser(query) {
    query.passWord = md5(query.passWord).toUpperCase()
    return fetch({
        url: '/api/blogUser/inser',
        method: 'post',
        data:JSON.stringify(query)
    });
}
export function login(query) {
    query.passWord = md5(query.passWord1).toUpperCase();
    return fetch({
        url: '/api/blogUser/login',
        method: 'post',
        data:JSON.stringify(query)
    });
}
export function getUserById(id) {

    return fetch({
        url: '/api/blogUser/getUserById/'+id,
        method: 'post'
    });
}