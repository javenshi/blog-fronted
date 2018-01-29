import fetch from 'utils/fetch';
import md5 from 'md5';

export function getAllCarousel() {
    return fetch({
        url: '/api/admin/getAllCarousel',
        method: 'post'
    });
}
export function getRankIng() {
    return fetch({
        url: '/api/proposal/getRankIng',
        method: 'post'
    });
}
export function deleteCarousel(id) {
    return fetch({
        url: '/api/admin/deleteCarousel/'+id,
        method: 'delete'
    });
}
