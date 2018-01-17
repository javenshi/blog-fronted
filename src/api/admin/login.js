import fetch from 'utils/fetch';


export function weibo(query) {
    return fetch({
        url: '/api/blogUser/weiboReturn/'+query,
        method: 'post'
    });
}

