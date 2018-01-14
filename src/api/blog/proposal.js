import fetch from 'utils/fetch';

export function saveP(query) {
    return fetch({
        url: '/api/proposal/insert',
        method: 'post',
        data:JSON.stringify(query)

    });
}

export function getProList(size) {

    return fetch({
        url: '/api/proposal/getProposalList',
        method: 'post',
        data:JSON.stringify(size)
    });
}

export function updatePro(query) {

    return fetch({
        url: '/api/proposal/update',
        method: 'post',
        data:JSON.stringify(query)
    });
}
export function passResourc(query,id) {

    return fetch({
        url: '/api/resource/passResourc/'+id,
        method: 'post',
        data:query
    });
}
export function deletePro0(id) {

    return fetch({
        url: '/api/proposal/delete/'+id,
        method: 'post'
    });
}