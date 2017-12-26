import { loginByEmail, logout, getInfo,getAuthority } from 'api/login';
import Cookies from 'js-cookie';
import md5 from 'md5';
import tokenStore from 'store2';
import store from '../../store';

const user = {
  state: {
    user: '',
    status: '',
    email: '',
    code: '',
    uid: undefined,
    auth_type: '',
    token: tokenStore.local('Admin-Token') || tokenStore.session('Admin-Token'),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    nroles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_AUTH_TYPE: (state, type) => {
      state.auth_type = type;
    },
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_UID: (state, uid) => {
      state.uid = uid;
    },
    SET_EMAIL: (state, email) => {
      state.email = email;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_NROLES: (state, nroles) => {
      state.nroles = nroles;
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    }
  },

  actions: {
    // 邮箱登录
    LoginByEmail({ commit }, userInfo) {
      const username = userInfo.email.trim();
      const rememberMe = userInfo.rememberMe;
      console.log(md5(userInfo.password).toUpperCase());
      return new Promise((resolve, reject) => {
        loginByEmail(username, md5(userInfo.password).toUpperCase(), userInfo.rememberMe).then(response => {
          Cookies.set('Admin-Token', 'Bearer ' + response.data.id_token);
          rememberMe ? tokenStore.local.set('Admin-Token', 'Bearer ' + response.data.id_token) : tokenStore.session.set('Admin-Token', 'Bearer ' + response.data.id_token);
          // console.log(response);
          console.log(tokenStore.local('Admin-Token') || tokenStore.session('Admin-Token'));
          commit('SET_TOKEN', 'Bearer ' + response.data.id_token);
          commit('SET_EMAIL', username);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 获取用户信息
    GetInfo({ commit, state }) {
      console.log("获取用户信息之前：")
      console.log(store.getters.roles)

      return new Promise((resolve, reject) => {
            getAuthority().then(res => {
            if(res.data.returnCode==200){
        console.log("获userlide得权限")
        commit('SET_NROLES', res.data.returnData);

        getInfo(state.token).then(response => {
          console.log("获用户的详细信息！")
        const data = response.data;
        commit('SET_ROLES', data.role);
        commit('SET_NAME', data.name);
        commit('SET_AVATAR', data.avatar);
        commit('SET_UID', data.uid);
        commit('SET_INTRODUCTION', data.introduction);
        console.log("修改完毕！")

        resolve(response);
      }).catch(error => {
          reject(error);
      });
      }
    })

      });
    },

    // 第三方验证登录
    LoginByThirdparty({ commit, state }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code);
        loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
          commit('SET_TOKEN', response.data.token);
          Cookies.set('Admin-Token', response.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          commit('SET_NROLES', []);
          Cookies.remove('Admin-Token');
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('Admin-Token');
        tokenStore.local.remove('Admin-Token');
        tokenStore.session.remove('Admin-Token');
        resolve();
      });
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        commit('SET_TOKEN', role);
        Cookies.set('Admin-Token', role);
        resolve();
      })
    }
  }
};

export default user;
