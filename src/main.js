// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';


import * as filters from './filters'; // 全局vue filter
import Multiselect from 'vue-multiselect'; // 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'; // 多选框组件css

import VeeValidate from 'vee-validate'; //vue表单验证插件
import contactIng from 'views/component/contact';
import noticeIng from 'views/component/notice';
import topIng from 'views/component/top';

const config = {
    fieldsBagName: 'validafield',
};
Vue.use(VeeValidate, config)
Vue.use(contactIng)
Vue.use(noticeIng)
Vue.use(topIng)
    /*Validator.updateDictionary({
        zh_CN: {
            messages
        }
    });
    // const config = {
    //     errorBagName: 'errors', // change if property conflicts.
    //     delay: 0,
    //     locale: 'zh_CN',
    //     messages: null,
    //     strict: true
    // };
    // Vue.use(VeeValidate,config);*/
// register globally
Vue.component('multiselect', Multiselect);
Vue.use(ElementUI);
Vue.use(contactIng);

Vue.config.productionTip = false;

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

function contains(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;

}
// permissiom judge
/*
function hasPermission(roles, permissionRoles, nroles) {
    console.log("获得权限!!!!!!!!")
    console.log(roles)
    console.log(permissionRoles)
    console.log(!permissionRoles)
    console.log(nroles)
        //console.log(nroles.some(role => permissionRoles.indexOf(role) >= 0))
    if (nroles.indexOf('admin') >= 0) return true; // admin权限 直接通过
    if (!permissionRoles) return true;
    if (permissionRoles[0] == "") return true;
    return nroles.some(role => permissionRoles.indexOf(role) >= 0)
*/

    //console.log("权限：")
    //console.log(roles)
    //console.log(permissionRoles)
    //console.log(roles.indexOf('admin'))
    //console.log(roles.some(role => permissionRoles.indexOf(role) >= 0))
    //if (roles.indexOf('admin') >= 0) return true; // admin权限 直接通过
    //if (!permissionRoles) return true;
    //return roles.some(role => permissionRoles.indexOf(role) >= 0)
//}

// register global progress.
const whiteList = ['/login', '/authredirect', '/reset', '/sendpwd', '/index']; // 不重定向白名单
/*router.beforeEach((to, from, next) => {
    NProgress.start(); // 开启Progress
    if (store.getters.token) { // 判断是否有token
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
                store.dispatch('GetInfo').then(res => { // 拉取user_info

                    const roles = res.data.role;
                    store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
                        router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                        next(to.path); // hack方法 确保addRoutes已完成
                    })
                }).catch(err => {
                    console.log(err);
                });
            } else {
                // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
                if (hasPermission(store.getters.roles, to.meta.role, store.getters.nroles)) {
                    next(); //
                } else {
                    next({ path: '/dashboard', query: { noGoBack: true } });
                }
                // 可删 ↑
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next()
            //next('/login'); // 否则全部重定向到登录页
           // NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        }
    }
});*/


/*router.afterEach(() => {
    NProgress.done(); // 结束Progress
});*/

// window.onunhandledrejection = e => {
//     console.log('unhandled', e.reason, e.promise);
//     e.preventDefault()
// };

// 生产环境错误日志


// window.onerror = function (msg, url, lineNo, columnNo, error) {
//     console.log('window')
// };
//
// console.error = (function (origin) {
//     return function (errorlog) {
//         // handler();//基于业务的日志记录及数据报错
//         console.log('console'+errorlog)
//         origin.call(console, errorlog);
//     }
// })(console.error);

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})