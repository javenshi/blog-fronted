import fetch from 'utils/fetch';
import md5 from 'md5';

export function getCode(query) {
    return fetch({
        url: '/api/blogUser/sendEmail',
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
   console.log(query)
    query.passWord = md5(query.passWord).toUpperCase();

    return fetch({
        url: '/api/blogUser/login',
        method: 'post',
        data:JSON.stringify(query)
    });
}