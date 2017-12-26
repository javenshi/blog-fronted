import fetch from 'utils/fetch';

export function loginByEmail(username, password, rememberMe) {
  const data = {
    username,
    password,
    rememberMe
  };
  return fetch({
    url: '/api/authenticate',
    // url: '/login/loginbyemail',
    method: 'post',
    data
  });
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  });
}

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}
export function getAuthority() {
  console.log("获得用户权限：")
  //return "['权限！！！']"
  return fetch({
    url: '/api/sUser/authorities/',
    method: 'get'
  });
}
export function restPWD(qurey) {
  return fetch({
    url: '/api/sUser/restPWD',
    method:'post',
    data: JSON.stringify(qurey)
  });
}


