import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow
// so only in production use Lazy Loading




/* blog */
const Blog = _import('blog/index');
const write = _import('blog/write');
const read = _import('blog/read');
const userCenter = _import('blog/userCenter');
const updateBlogs = _import('blog/updateBlogs');
const leav = _import('blog/leav');
const wLogin = _import('login/login');
const qLogin = _import('login/qqLogin');

const Admin = _import('admin/index');


/* error page */
const Err404 = _import('error/404');



Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * redirect : if redirect:noredirect will not redirct in the levelbar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 **/

export const constantRouterMap = [
    { meta: { role: [""] }, path: '/', name: '首页', component: Blog, hidden: true },
    { meta: { role: [""] }, path: '/blog/read', name: '读博客', component: read, hidden: true },
    { meta: { role: [""] }, path: '/blog/write', name: '写博客', component: write, hidden: true },
    { meta: { role: [""] }, path: '/admin/index', name: '后台管理', component: Admin, hidden: true },
    { meta: { role: [""] }, path: '/blog/userCenter', name: '个人中心', component: userCenter, hidden: true },
    { meta: { role: [""] }, path: '/blog/updateBlogs', name: '编辑博客', component: updateBlogs, hidden: true },
    { meta: { role: [""] }, path: '/blog/leav', name: '留言', component: leav, hidden: true },
    { meta: { role: [""] }, path: '/login' , name: '微博登录', component: wLogin, hidden: true },
    { meta: { role: [""] }, path: '/qqLogin' , name: 'QQ登录', component: qLogin, hidden: true },
    { path: '*', component: Err404, hidden: true, meta: { role: [""] } }

]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
