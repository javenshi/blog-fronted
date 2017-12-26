import fetch from 'utils/fetch';

export function fetchUserList(query) {
    console.log("搜索用户：")
    console.log(JSON.stringify(query))
  return fetch({
    url: '/api/sUser/page',
    method: 'post',
    data: JSON.stringify(query)
  });
}export function fetchUser(query) {

  return fetch({
    url: '/api/sUser/pageOne',
    method: 'post',
    data: JSON.stringify(query)
  });
}
export function createUser(query) {
    console.log("添加用户：")
    console.log(JSON.stringify(query))
    return fetch({
        url: '/api/sUser',
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function updateUser(entity) {
    return fetch({
        url: '/api/sUser',
        method: 'PUT',
        data: JSON.stringify(entity)
    });
}
export function deleteUser(ids) {
    return fetch({
        url: '/api/sUser/deleteByIds',
        method: 'post',
        data: JSON.stringify(ids)
    });
}
export function availableUser(id) {
    return fetch({
        url: '/api/sUser/'+id+'/available/',
        method: 'PUT',
    });
}
export function unavailableUser(id) {
    return fetch({
        url: '/api/sUser/'+id+'/unavailable/',
        method: 'PUT',
    });
}

export function createTable1() {
    return fetch({
        url: '/api/sUser/createtable',
        method: 'get'
    });
}
