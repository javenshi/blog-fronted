import fetch from 'utils/fetch';

export function fetchManagerList(query) {
  return fetch({
    url: '/api/sUser/' + query,
    method: 'get'
  });
}
