import fetch from 'utils/fetch';
export function fetchStationList() {
    return fetch({
        url: '/api/station',
        method: 'get'
    });
}

export function fetchStationListByStationId(id) {
    return fetch({
        url: '/api/oilPrice',
        method: 'delete',
        data: JSON.stringify(id)
    });
}

export function deleteById(ids) {
    return fetch({
        url: '/api/oilPrice',
        method: 'delete',
        data: JSON.stringify(ids)
    });
}
export function insert(oilPrice) {
    return fetch({
        url: '/api/oilPrice',
        method: 'post',
        data: JSON.stringify(oilPrice)
    });
}

export function update(oilPrice) {
    return fetch({
        url: '/api/oilPrice',
        method: 'put',
        data: JSON.stringify(oilPrice)
    });
}