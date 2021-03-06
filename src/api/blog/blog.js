import fetch from 'utils/fetch';
import md5 from 'md5';
export function saveB(query) {
    return fetch({
        url: '/api/blog/insert',
        method: 'post',
        data:JSON.stringify(query)
    });
}
export function deleteBlog(query) {
    return fetch({
        url: '/api/blog/deleteBlog/'+query,
        method: 'post'
    });
}
export function saveComents(query) {
    return fetch({
        url: '/api/blog/saveComents',
        method: 'post',
        data:JSON.stringify(query)
    });
}
export function saveNa(query) {
    return fetch({
        url: '/api/notice/saveNotice',
        method: 'post',
        data:JSON.stringify(query)
    });
}
export function selectBlogsPage(query) {
    return fetch({
        url: '/api/blog/page',
        method: 'post',
        data:JSON.stringify(query)
    });
}
export function getTopAndDown(query) {
    return fetch({
        url: '/api/blog/getTopAndDown/'+query,
        method: 'post'
    });
}
export function getBlogsById(query,ip) {
    return fetch({
        url: '/api/blog/getBlogsById/'+ip,
        method: 'post',
        data:query
    });
}
export function passBlog(query,id) {
    return fetch({
        url: '/api/blog/passBlog/'+id,
        method: 'post',
        data:query
    });
}
export function getComentsList(query,size) {

    return fetch({
        url: '/api/blog/getComentsList/'+size,
        method: 'post',
        data:JSON.stringify(query)
    });
}
export function getNoticeList() {

    return fetch({
        url: '/api/notice/getNoticeList',
        method: 'post'
    });
}
export function seletcClassifyName() {

    return fetch({
        url: '/api/blog/seletcClassifyName',
        method: 'post'
    });
}
export function insertClassName(query) {

    return fetch({
        url: '/api/blog/insertClassName',
        method: 'post',
        data:query
    });
}