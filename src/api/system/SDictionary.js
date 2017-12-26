import fetch from 'utils/fetch';

// 分页查询，返回所有Base字典数据
export function getAllDictionaryList(query) {
    console.log("分页条件查询 所有Type的字典：")
    console.log(JSON.stringify(query))
    return fetch({
        url: '/api/dictionary/basetype/list',
        method: 'post',
        data: JSON.stringify(query)
    });
}

// 分页查询，返回某字典类型下的 子字典列表
export function getDictionaryListByType(query, dicType) {
    console.log("分页条件查询 某Type类型的子字典：")
    console.log(JSON.stringify(query))
    console.log(dicType)
    return fetch({
        url: '/api/dictionary/'+dicType+'/list',
        method: 'get',
        data: JSON.stringify(query)
    });
}

// 新建字典/类型  Example: {"dictType":"WTF","dictTypeName":"西瓜"}
export function createNewDictionary(dictionary) {
    console.log("新建字典/类型：")
    console.log(JSON.stringify(dictionary))
    return fetch({
        url: '/api/dictionary/insert',
        method: 'post',
        data: JSON.stringify(dictionary)
    });
}

// 修改字典  Example: {"id":1,"dictType":"WTF","dictTypeName":"西瓜"}
export function updateDictionary(dictionary) {
    console.log("更新字典：")
    console.log(JSON.stringify(dictionary))
    return fetch({
        url: '/api/dictionary/basetype/update',
        method: 'put',
        data: JSON.stringify(dictionary)
    });
}

// 修改类型  Example: {"id":1,"dictName":"WTF","dictValue":"西瓜"}
export function updateDictionaryChild(dictionary) {
    console.log("更新类型：")
    console.log(JSON.stringify(dictionary))
    return fetch({
        url: '/api/dictionary/update',
        method: 'put',
        data: JSON.stringify(dictionary)
    });
}

// 删除字典  Example: {"id":1}
export function deleteDictionary(dictionary) {
    console.log("删除字典：")
    console.log(JSON.stringify(dictionary))
    return fetch({
        url: '/api/dictionary/basetype/delete',
        method: 'put',
        data: JSON.stringify(dictionary)
    });
}

// 删除类型  Example: 1
export function deleteDictionaryChild(dictionaryId) {
    console.log("删除类型：")
    console.log(JSON.stringify(dictionaryId))
    return fetch({
        url: '/api/dictionary/'+dictionaryId+'/delete',
        method: 'delete',
        data: JSON.stringify(dictionaryId)
    });
}