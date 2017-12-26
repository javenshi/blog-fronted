import fetch from 'utils/fetch';

export function addMemberToOrganization(query) {
    console.log("添加addMemberToOrganization：")
    console.log(JSON.stringify(query))
    return fetch({
        url: '/api/sUser/page',
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function hasDepartList() {
    return fetch({
        url: '/api/depart/getAllDepart',
        method: 'get',
        //data: JSON.stringify(query)
    });
}
export function createDepart(depaet) {
    return fetch({
        url: '/api/depart/addDepart',
        method: 'post',
        data: JSON.stringify(depaet)
    });
}
export function getDepartById(id) {
    return fetch({
        url: '/api/depart/getAllDepartById?departId='+id,
        method: 'get',
        //data: JSON.stringify(depaet)
    });
}
export function getParentDepartById(id) {
    return fetch({
        url: '/api/depart/getParentDepartById?parentId='+id,
        method: 'get',
        //data: JSON.stringify(depaet)
    });
}
export function updateDepart(depart) {
    return fetch({
        url: '/api/depart/updateDepart',
        method: 'post',
        data: JSON.stringify(depart)
    });
}
export function deleteDepart(id) {
    return fetch({
        url: '/api/depart/deleteDepart/'+id,
        method: 'delete',
        //data: JSON.stringify(depart)
    });
}
//这是 根据 组织结构 id 获取 该组织 用户 的 接口
export function getUserById(id) {
    return fetch({
        url: '/api/depart/getUserById?departId='+id,
        method: 'get',
        //data: JSON.stringify(depart)
    });
}
export function addUserToDepart(id,userIds) {
    return fetch({
        url: '/api/depart/addDepartUsers/'+id,
        method: 'PUT',
        data: JSON.stringify(userIds)
    });
}
export function deleteUserToDepart(id,userIds) {
    return fetch({
        url: '/api/depart/deleteDepartUsers/'+id,
        method: 'delete',
        data: JSON.stringify(userIds)
    });
}

export function getRoleById(id) {
    return fetch({
        url: '/api/depart/getRoleById?departId=' + id,
        method: 'get',
        //data: JSON.stringify(depaet)
    });
}
export function updateRole(departId,ids) {
    return fetch({
        url: '/api/depart/updateRole/' + departId,
        method: 'post',
        data: JSON.stringify(ids)
    });
}