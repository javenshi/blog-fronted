import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '../store';
import tokenStore from 'store2';
// import router from '../router';

// 创建axios实例
const service = axios.create({
  baseURL: "http://192.168.210.117:8899", // api的base_url
  timeout: 5000                  // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    // config.headers['X-Token'] = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // config.headers.Authorization = store.getters.token;
    config.headers.Authorization = tokenStore.local('Admin-Token') || tokenStore.session('Admin-Token');
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
  }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  //response => response,
   response => {
       this.$message({
           message:  response.data.returnMsg,
           type: response.data.returnCode == 200 ? 'success' : 'warning',
           duration: 3000
       });

   },
  error => {
    console.log('err' + error);// for debug
    /*Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });*/
    if (error.response.status === 401) {
      MessageBox.alert('用户授权错误，请重新登录！', '授权错误', {
        confirmButtonText: '确定',
        callback: action => {
          store.dispatch('FedLogOut').then(() => {
            location.reload();// 为了重新实例化vue-router对象 避免bug
          });
        }
      });
    }
    return Promise.reject(error).catch(error);
  }
)

export default service;
