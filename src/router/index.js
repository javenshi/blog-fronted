import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow
// so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout';

/* blog */
const Blog = _import('blog/index');
const write = _import('blog/write');

const Admin = _import('admin/index');
/* login */
const Login = _import('login/index');
const authRedirect = _import('login/authredirect');
const sendPWD = _import('login/sendpwd');
const reset = _import('login/reset');

/* dashboard */
const dashboard = _import('dashboard/index');

/* Introduction */
const Introduction = _import('introduction/index');

/* components */
const componentsIndex = _import('components/index');
const Tinymce = _import('components/tinymce');
const Markdown = _import('components/markdown');
const JsonEditor = _import('components/jsoneditor');
const DndList = _import('components/dndlist');
const AvatarUpload = _import('components/avatarUpload');
const Dropzone = _import('components/dropzone');
const Sticky = _import('components/sticky');
const SplitPane = _import('components/splitpane');
const CountTo = _import('components/countTo');
const Mixin = _import('components/mixin');


/* charts */
const chartIndex = _import('charts/index');
const KeyboardChart = _import('charts/keyboard');
const KeyboardChart2 = _import('charts/keyboard2');
const LineMarker = _import('charts/line');
const MixChart = _import('charts/mixchart');

/* error page */
const Err404 = _import('error/404');
const Err401 = _import('error/401');


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
    { meta: { role: [""] }, path: '/admin/index', name: '后台管理', component: Admin, hidden: true },
    { path: '*', component: Err404, hidden: true, meta: { role: [""] } }

]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});
