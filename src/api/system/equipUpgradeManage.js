import fetch from 'utils/fetch';

export function fetchEquipUpgradeList(query) {
  return fetch({
    url: '/api/upgradeManage/equipUpgrade/page',
    method: 'post',
    data: JSON.stringify(query)
  });
}

export function createEquipManage(query) {
    return fetch({
        url: '/api/upgradeManage/equipUpgrade/add',
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function updateEquipManage(entity) {
    return fetch({
        url: '/api/upgradeManage/equipUpgrade/update',
        method: 'PUT',
        data: JSON.stringify(entity)
    });
}
export function deleteEquipManage(ids) {
    return fetch({
        url: '/api/upgradeManage/equipUpgrade/delete',
        method: 'post',
        data: JSON.stringify(ids)
    });
}
export function fetchPortableUpgradeList(query) {
    console.log("参数嗷嗷嗷嗷",JSON.stringify(query));
    return fetch({
        url: '/api/upgradeManage/portableUpgrade/page',
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function createPortableEquipManage(query) {
    return fetch({
        url: '/api/upgradeManage/portableUpgrade/add',
        method: 'post',
        data: JSON.stringify(query)
    });
}
export function updatePortableEquipManage(entity) {
    return fetch({
        url: '/api/upgradeManage/portableUpgrade/update',
        method: 'PUT',
        data: JSON.stringify(entity)
    });
}
export function deletePortableEquipManage(ids) {
    return fetch({
        url: '/api/upgradeManage/portableUpgrade/delete',
        method: 'post',
        data: JSON.stringify(ids)
    });
}

