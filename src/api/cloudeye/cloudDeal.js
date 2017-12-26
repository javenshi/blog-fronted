import fetch from 'utils/fetch';


export function getCloudDealPage(query) {
    return fetch({
        url: '/api/cloudDeal/page',
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function getAllDepart(query) {
    return fetch({
        url: '/api/cloudDeal/getAllDepart/'+query,
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function deleteDepartById(query) {
    return fetch({
        url: '/api/cloudDeal/deleteDepartById/'+query,
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function deleteCloudDealById(id) {
    return fetch({
        url: '/api/cloudDeal/' + id,
        method: 'delete'
    });
}
export function getDealInfoById(id) {
    return fetch({
        url: '/api/cloudDeal/' + id,
        method: 'get'
    });
}

export function updateInfo(query) {
    return fetch({
        url: '/api/cloudDeal',
        method: 'put',
        data: JSON.stringify(query)
    });
}