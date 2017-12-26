/**
 * Created by cecilia on 2017/11/3.
 */
import fetch from 'utils/fetch';

export function fetchCloudEquipHistoryList(query) {
    return fetch({
        url: '/api/cloudEquipHistroy/page',
        method: 'post',
        data: JSON.stringify(query)
    });

}

export function delCloudEquipHistory(id) {
    return fetch({
        url: '/api/cloudEquipHistroy/del/'+id,
        method: 'get'
    });

}