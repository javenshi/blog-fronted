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

/* error log */
const ErrorLog = _import('errlog/index');

/* excel */
const ExcelDownload = _import('excel/index');

/* theme  */
const Theme = _import('theme/index');

/* example*/
const TableLayout = _import('example/table/index');
const DynamicTable = _import('example/table/dynamictable');
const Table = _import('example/table/table');
const DragTable = _import('example/table/dragTable');
const InlineEditTable = _import('example/table/inlineEditTable');

const Form = _import('example/form');
const Tab = _import('example/tab/index');

/* permission */
const Permission = _import('permission/index');

//用户管理
const SUser = _import('system/SUser');
//角色管理
const SRole = _import('system/SRole');
//菜单管理
const SMenu = _import('system/SMenu');

//组织架构
const SOrganization = _import('system/SOrganization');
//数据字典
const SDictionary = _import('system/SDictionary');

//租户管理
const cloudUser = _import('cloudeye/clouduser/index');
const cloudUserEdit = _import('cloudeye/clouduser/edit');

//设备管理
const cloudEqueip = _import('cloudeye/cloudequip/index');
const cloudEqueipEdit = _import('cloudeye/cloudequip/edit');
const cloudEqueipLeading = _import('cloudeye/cloudequip/leading');
const cloudEqueipLeadAgency = _import('cloudeye/cloudequip/leadAgency');

//历史记录
const cloudEqueipHistroy = _import('cloudeye/cloudequiphistroy/index');

//代理商管理
const cloudAgency = _import('cloudeye/cloudagency/index');
const cloudAgencyEdit = _import('cloudeye/cloudagency/edit');
const cloudAgencyLeading = _import('cloudeye/cloudagency/leading');
const cloudAgencyEquipList = _import('cloudeye/cloudagency/equiplist');
const cloudAgencyLeadList = _import('cloudeye/cloudagency/leadList');

//日志管理
const cloudLog = _import('cloudeye/cloudlog/index');
const cloudSchema = _import('cloudeye/cloudschema/index');

//设备报修管理
const cloudRepairs = _import('cloudeye/cloudrepairs/index');
const cloudRepairsEdit=_import('cloudeye/cloudrepairs/edit');
//计费管理
const cloudDeal = _import('cloudeye/clouddeal/index');
const cloudDealEdit = _import('cloudeye/clouddeal/edit');
const cloudDealAdd = _import('cloudeye/clouddeal/add');

//章盾设备升级管理
const equipUpgradeManage = _import('system/upgradeManage/equipUpgrade');
//信印设备升级管理
const portableEquipUpgradeManage = _import('system/upgradeManage/portableEquipUpgrade');



Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * redirect : if redirect:noredirect will not redirct in the levelbar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 **/

export const constantRouterMap = [
    { meta: { role: [""] }, path: '/', component: Blog, hidden: true },
    { meta: { role: [""] }, path: '/write', component: write, hidden: true },

    {
        meta: { role: [""] },
        path: '/index',
        component: Layout,
        redirect: '/cloudeye/clouduser/index',
        name: '首页',
        hidden: true
    },
    { meta: { role: [""] }, path: '/login', component: Login, hidden: true },

    { meta: { role: [""] }, path: '/authredirect', component: authRedirect, hidden: true },
    { meta: { role: [""] }, path: '/sendpwd', component: sendPWD, hidden: true },
    { meta: { role: [""] }, path: '/reset', component: reset, hidden: true },
    { meta: { role: [""] }, path: '/404', component: Err404, hidden: true },
    { meta: { role: [""] }, path: '/401', component: Err401, hidden: true }

]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});

export const asyncRouterMap = [

    {
        path: '/cloudeye',
        component: Layout,
        redirect: 'noredirect',
        name: '云平台监控',
        icon: 'zujian',
        meta: { role: ['ROLE_SYSTEM'] },
        children: [
            { path: 'clouduser/index', component: cloudUser, name: '租户管理',meta: { role: ['ROLE_USER'] } },
            { path: 'clouduser/edit', component: cloudUserEdit, name: '编辑租户',meta: { role: ['ROLE_USER']}, hidden: true },
            { path: 'cloudequeip/index', component: cloudEqueip, name: '设备管理',meta: { role: ['ROLE_MENU'] } },
            { path: 'cloudequip/edit', component: cloudEqueipEdit, name: '编辑设备',meta: { role: ['ROLE_USER']}, hidden: true },
            { path: 'cloudequip/leading', component: cloudEqueipLeading, name: '设备导入',meta: { role: ['ROLE_USER']}, hidden: true },
            { path: 'cloudequip/leadAgency', component: cloudEqueipLeadAgency, name: '设备代理商关系导入',meta: { role: ['ROLE_USER']}, hidden: true },
            { path: 'cloudequeiphistroy/index', component: cloudEqueipHistroy, name: '设备历史记录',meta: { role: ['ROLE_MENU'] } },
            { path: 'cloudrepairs/index', component: cloudRepairs, name: '设备报修',meta: { role: ['ROLE_MENU'] } },
            { path: 'cloudrepairs/edit', component: cloudRepairsEdit, name: '导入维修记录',meta: { role: ['ROLE_USER']}, hidden: true },
            { path: 'clouddeal/index', component: cloudDeal, name: '计费管理',meta: { role: ['ROLE_MENU'] } },
            { path: 'clouddeal/edit', component: cloudDealEdit, name: '计费管理编辑',meta: { role: ['ROLE_MENU'] }, hidden: true },
            { path: 'clouddeal/add', component: cloudDealAdd, name: '缴费管理',meta: { role: ['ROLE_MENU'] }, hidden: true },
            { path: 'cloudlog/index', component: cloudLog, name: '日志管理',meta: { role: ['ROLE_MENU'] } },
            { path: 'cloudschema/index', component: cloudSchema, name: '数据库节点',meta: { role: ['ROLE_USER'] } },

        ]
    },
    {
        path: '/cloudeye',
        component: Layout,
        redirect: 'noredirect',
        name: '代理商业务',
        icon: 'quanxian',
        meta: { role: ['ROLE_SYSTEM'] },
        children: [
            { path: 'cloudagency/index', component: cloudAgency, name: '代理商管理', meta: { role: ['ROLE_MENU'] } },
            { path: 'cloudagency/edit', component: cloudAgencyEdit, name: '编辑代理商', meta: { role: ['ROLE_MENU'] }, hidden: true },
            { path: 'cloudagency/equiplist', component: cloudAgencyEquipList, name: '代理商统计', meta: { role: ['ROLE_USER'] } },
            { path: 'cloudagency/equiplist', component: cloudAgencyEquipList, name: '代理商台账', meta: { role: ['ROLE_USER'] } },
            { path: 'cloudagency/leadList', component: cloudAgencyLeadList, name: '代理商设备', meta: { role: ['ROLE_USER'] } },
            { path: 'cloudagency/leading', component: cloudAgencyLeading, name: '设备导入', meta: { role: ['ROLE_USER'] }, hidden: true }
        ]
    },{
        path: '/system',
        component: Layout,
        redirect: 'noredirect',
        name: '升级管理',
        icon: 'zonghe',
        meta: { role: ['ROLE_SYSTEM'] },
        children: [
            { path: 'upgradeManage/equipUpgrade', component: equipUpgradeManage, name: '章盾设备升级管理',meta: { role: ['ROLE_USER'] } },
            { path: 'upgradeManage/portableEquipUpgrade', component: portableEquipUpgradeManage, name: '信印设备升级管理',meta: { role: ['ROLE_USER'] } },
        ]
    },
    {
        path: '/system',
        component: Layout,
        redirect: 'noredirect',
        name: '系统管理',
        icon: 'zonghe',
        meta: { role: ['ROLE_SYSTEM'] },
        children: [
            { path: 'SUser', component: SUser, name: '用户管理', meta: { role: ['ROLE_USER'] }, },
            { path: 'SRole', component: SRole, name: '角色管理', meta: { role: ['ROLE_MENU'] }, },
            { path: 'SMenu', component: SMenu, name: '菜单管理', meta: { role: ['ROLE_ROLE'] }, },
            { path: 'SOrganization', component: SOrganization, name: '组织架构', meta: { role: ['ROLE_DEPART'] }, },
            { path: 'SDictionary', component: SDictionary, name: '数据字典', meta: { role: ['ROLE_DICTIONARY'] }, },
        ]
    },
    { path: '*', redirect: '/404', hidden: true, meta: { role: [""] } }
];