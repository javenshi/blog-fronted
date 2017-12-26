import fetch from 'utils/fetch';

export function fetchMenuList(query) {
  return fetch({
    url: '/api/sMenu/page',
    method: 'post',
    data: JSON.stringify(query)
  });
}
//创建菜单
export function createMenu(query) {
    console.log("创建菜单")
    console.log(JSON.stringify(query))
    return fetch({
        url: '/authorities/',
        //url: '/api/sMenu',
        method: 'post',
        data: JSON.stringify(query)
    });
}
//修改 菜单
export function updateMenu(entity,id) {
    console.log("修改参数")
    console.log(JSON.stringify(entity))
    return fetch({
        url: '/authorities/'+id+'/',
        //url: '/api/sMenu',
        method: 'PUT',
        data: JSON.stringify(entity)
    });
}
//删除 菜单
export function deleteMenu(id,authType) {
    return fetch({
        //url: '/api/sMenu/deleteByIds',
        url: '/authorities/'+id+'/'+authType,
        method: 'delete',
        //method: 'post',
        //data: JSON.stringify(ids)
    });
}
//加载树
export function hasMenuList(query) {
    return fetch({
        url: '/authorities/?roleId='+query,
        method: 'get'
    });
}
//通过id查找菜单
export function getMenuById(id) {
    return fetch({
        //url: '/api/sMenu/deleteByIds',
        url: '/authorities/'+id+'/',
        method: 'get',
        //method: 'post',
        //data: JSON.stringify(ids)
    });
}
//新的菜单接口 2017-9-28
//添加菜单
export function newAddMenu(query) {
    return fetch({
        url: '/authorities/',
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function getRightButton(id) {
    return fetch({
        url: '/authorities-operation/'+id,
        method: 'get',
        //data: JSON.stringify(query)
    });
}
export function getRightRule(id) {
    return fetch({
        url: '/authorities-datarule/'+id,
        method: 'get',
        //data: JSON.stringify(query)
    });
}