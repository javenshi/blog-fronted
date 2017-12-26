import valueAddedApi from 'utils/fetch';

export function fetchList(query) {
  return valueAddedApi({
    url: '/api/valueadded/adminpage',
    method: 'post',
    data: JSON.stringify(query)
  });
}

export function fetchPv(pv) {
  return valueAddedApi({
    url: '/api/article_table/pv',
    method: 'get',
    params: { pv }
  });
}

export function valueAddedCreate(pv) {
  console.log(JSON.stringify(pv));
  return valueAddedApi({
    url: '/api/valueadded',
    method: 'post',
    data: JSON.stringify(pv)
  });
}

export function valueAddedUpdate(pv) {
  return valueAddedApi({
    url: '/api/valueadded',
    method: 'put',
    data: JSON.stringify(pv)
  });
}

export function valueAddedDelete(id) {
  return valueAddedApi({
    url: '/api/valueadded/' + id,
    method: 'delete'
  });
}

export function valueAddedDeleteMore(ids) {
  console.log(ids);
  console.log(JSON.stringify(ids));
  return valueAddedApi({
    url: '/api/valueadded/',
    method: 'delete',
    data: JSON.stringify(ids)
  });
}

export function valueAddedPassMore(ids) {
  console.log(ids);
  console.log(JSON.stringify(ids));
  return valueAddedApi({
    url: '/api/valueadded/pass',
    method: 'put',
    data: JSON.stringify(ids)
  });
}

export function valueAddedCheckFail(pv) {
  return valueAddedApi({
    url: '/api/valueadded/fail',
    method: 'put',
    data: JSON.stringify(pv)
  });
}