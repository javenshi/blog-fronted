import fetch from 'utils/fetch';
import md5 from 'md5';

export function selectPage() {
    return fetch({
        url: '/api/ui/selectPage',
        method: 'post'

    });
}

export function getUIById(query,ip) {
    return fetch({
        url: '/api/ui/getUIById/'+ip,
        method: 'post',
        data:query
    });
}

export function insert(query) {

    return fetch({
        url: '/api/ui/insert',
        method: 'post',
        data:JSON.stringify(query)
    });
}