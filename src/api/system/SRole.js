import fetch from 'utils/fetch';

//分页查询
export function fetchRoleList(query) {
    console.log("参数：")
    console.log(JSON.stringify(query))
  return fetch({
    //url: '/api/sRole/page',
    url: "/roles/?pageNum="+query.pageNum+"&pageSize="+query.pageSize,
    method: 'post',
    data: JSON.stringify({
        roleName:query.searchKey
    })
  });
}
//新建角色
export function createRole(query) {
    console.log("新建角色:")
    console.log(JSON.stringify(query))
    return fetch({
        //url: '/api/sRole',
        url: '/roles/',
        method: 'post',
        data: JSON.stringify(query)
    });
}
//修改角色
export function updateRole(entity,id) {
    console.log("修改角色:")
    console.log(JSON.stringify(entity))
    return fetch({
        url: '/roles/'+id,
        method: 'PUT',
        data: JSON.stringify(entity)
    });
}
//删除角色
export function deleteRole(ids) {
    console.log("删除角色传入参数：")
    console.log(ids)
    return fetch({
        url: '/roles/',
        method: 'delete',
        data: JSON.stringify(ids)
    });
}
//获取权限树
export function fetchTreeList() {
    return fetch({
        url: '/api/sRole/menuTreeList',
        method: 'get'
    });
}

export function rightControll(query) {
    return fetch({
        url: '/api/sRole/rightControll',
        method: 'post',
        data: JSON.stringify(query)
    });
}
//加载树
export function hasMenuList(query) {
    return fetch({
        url: '/authorities/?roleId='+query,
        method: 'get'
    });
}
//export function hasMenuList(query) {
//    return fetch({
//        url: '/api/sRole/hasMenuList/' + query,
//        method: 'get'
//    });
//}
//数据过滤规则列表
export function getRulesByRoleAndMenu(rid,mid) {
    console.log("canshu:"+rid+","+mid)
    return fetch({
        url: '/filter-data-rules/?rid=' + rid +'&mid='  +mid,
        method: 'get'
    });
}
//export function getRulesByRoleAndMenu(rid,mid) {
//    return fetch({
//        url: '/filter-data-rules/?rid=' + rid +'&mid='  +mid,
//        method: 'get'
//    });
//}
export function updateFilterDataRule(id,formData) {
    console.log("修改 规则，传入参数：")
    console.log(id)
    console.log(JSON.stringify(formData))
    return fetch({
        url: '/filter-data-rules/'+id+"/",
        method: 'put',
        data: JSON.stringify(formData)
    });
}
//添加过滤规则列表
export function createFilterDataRule(formData) {
    console.log("添加规则，传入参数：")
    console.log(JSON.stringify(formData))
    return fetch({
        url: '/filter-data-rules/',
        method: 'post',
        data: JSON.stringify(formData)
    });
}

export function deleteRoleByIds(ids) {
    console.log("删除规则，传入参数：")
    console.log(JSON.stringify(ids))
    return fetch({
        url: '/filter-data-rules/',
        method: 'delete',
        data: JSON.stringify(ids)
    });
}

export function updateRoleMenuRealtionForRule(rid,mid,ids){
    return fetch({
        url: '/filter-data-rules/?rid=' + rid +'&mid='  +mid,
        method: 'update',
        data: JSON.stringify(ids)
    });
}
//添加权限
export function addAuthorities(paramete) {
    return fetch({
        url: '/role-authorities/',
        method: 'post',
        data: JSON.stringify(paramete)
    });
}
//新的添加权限
export function newAddAuthorities(paramete) {
    return fetch({
        url: '/role-authorities/',
        method: 'post',
        data: JSON.stringify(paramete)
    });
}
//删除权限
export function deleteAuthorities(paramete) {
    return fetch({
        url: '/role-authorities/role/'+paramete.roleid+'/menu/'+paramete.authorityId+'/',
        method: 'delete',
        data: JSON.stringify(paramete)
    });
}
//角色界面　获取可用的控件权限
export function getButtonAuthoritiesSelected(roleId,menuId) {
    return fetch({
        url: '/role-authorities/operation/role/'+roleId+'/menu/'+menuId,
        method: 'get',
    });
}
//角色界面　获取可用的控件权限
export function getDateRuleSelected(roleId,menuId) {
    return fetch({
        url: '/role-authorities/data-rule/role/'+roleId+'/menu/'+menuId,
        method: 'get',
    });
}
