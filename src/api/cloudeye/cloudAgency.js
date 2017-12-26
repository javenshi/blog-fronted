/**
 * Created by lewie on 2017/11/2.
 */
import fetch from 'utils/fetch';

export function fetchCloudAgencyList(query) {
    return fetch({
        url: '/api/cloudAgency/page',
        method: 'post',
        data: JSON.stringify(query)
    });
}

export function getCloudAgencyList(query) {
    return fetch({
        url: '/api/cloudAgency/getCloudAgencyList',
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function getUserList(query) {
    return fetch({
        url: '/api/cloudAgency/getUserList',
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function getEquipList(query) {
    return fetch({
        url: '/api/cloudAgency/getEquipList',
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function getEquipByUser(query) {
    return fetch({
        url: '/api/cloudAgency/getEquipByUser',
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function getUserByEquip(query) {
    return fetch({
        url: '/api/cloudAgency/getUserByEquip',
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function saveCloudAgency(entity) {
    let curMethod = 'post';
    if (entity.id) {
        curMethod = 'put';
    }
    return fetch({
        url: '/api/cloudAgency/save',
        method: curMethod,
        data: JSON.stringify(entity)
    });

}

export function getCloudAgency(id) {
    return fetch({
        url: '/api/cloudAgency/'+id,
        method: 'get'
    });
}

export function delCloudAgency(id) {
    return fetch({
        url: '/api/cloudAgency/del/'+id,
        method: 'get'
    });
}