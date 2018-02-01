<template>

    <div>
        <div class="console-component-topbar ">
            <div class=" topbar-clearfix" style="display: block; color: #666;">
                <div class="topbar-head topbar-left">

                    <a class="topbar-logo topbar-left">
                        <img style="margin-top: 14px;" src="../../img/logo.png"/>
                    </a>


                </div>
                <div style="margin-left: 30px;" class="topbar-product topbar-left">
                    <div class="topbar-btn" @click="index">
                        首页
                    </div>
                </div>
                <div class="topbar-product topbar-left">
                    <div class="topbar-btn" @click="write">
                        写博客
                    </div>
                </div>
                <div class="topbar-product topbar-left">
                    <div class="topbar-btn  " @click="openResourceDialog">
                        贡献资源
                    </div>
                </div>
                <div class="topbar-product topbar-left">
                    <div class="topbar-btn " @click="leav">
                        留言
                    </div>
                </div>
                <div class="topbar-product topbar-left">
                    <div class="topbar-btn ">
                        <router-link :to="'/admin/index'">后台</router-link>
                    </div>
                </div>
                <div class="aliyun-common-search-container " style="margin-top: 10px;margin-left: 60%;width: 200px;">
                    <input
                            class="aliyun-common-search-input-elem " @keyup.enter="searchBySel" v-model="search"
                            placeholder="全站搜索"
                    >

                    <div @click="searchBySel" class="aliyun-common-search-icon"></div>
                    <div class="aliyun-common-search-outline"></div>

                </div>


                <div class="topbar-info topbar-right topbar-clearfix">
                    <div class=" topbar-user ">
                        <div class="topbar-info-dropdown topbar-info-item">
                            <a class="topbar-info-dropdown-toggle topbar-btn">
                                <span v-if="user.uid==null||user.uid==''" @click="openLoginDialog">登录</span>
                                <div class="topbar-user-info" style="display: block;">
                                    <router-link :to="'/blog/userCenter'"><span v-if="user.uid!=null&&user.uid!=''"
                                                                                v-html="headurl"></span></router-link>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <el-dialog title="传资源" :visible.sync="resourceDialog" align="center">

            <el-form :model="resource" status-icon ref="resour"
                     class="demo-ruleForm">
                <el-form-item label="资源名称:" prop="resouceName" required>
                    <el-input size="small" type="input" v-model="resource.resouceName"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="资源Url:" prop="resouceUrl" required>
                    <el-input size="small" type="input" v-model="resource.resouceUrl"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="资源描述:" prop="context">
                    <el-input type="textarea" v-model="resource.context"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="closeResourceDialog('resour')">取 消</el-button>
                    <el-button @click="saveReso" type="primary">确
                        定
                    </el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
        <el-dialog :visible.sync="loginDialog" align="center">

            <div>
                <img src="../../img/login.png">
            </div>
            <br>
            <br>
            <div style="width: 320px;" v-if="loginOrRigister">
                <el-form :model="loginUser" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                    <el-form-item
                            prop="userName"
                            label="用户名"
                            :rules="[
        { min:2,max:20, message: '用户名长度不规范', trigger: 'blur，change' },
       {  pattern:/^[^ ]+$/, message: '用户名中不能包含空格',trigger: 'blur'},
       {  pattern:/^[^'`/+ - \\ ()（）《》<>~#^$@%&!*,.'' ? <> -]+$/, message: '用户名中不能包含特殊字符',trigger: 'blur'},
       {  pattern:/^[^😃]+$/, message: '用户名中不能包含表情',trigger: 'blur'},
         { required: true, message: '请输入用户名', trigger: 'blur' }
    ]"
                            required>
                        <el-input autoComplete="off"
                                  placeholder="用户名" type="text" v-model="loginUser.userName"></el-input>
                    </el-form-item>
                    <el-form-item style="height: 0px;  position: absolute;
  left: 30px;
  top: -280px;">
                        <el-input type="password" v-model="loginUser.password1"></el-input>
                    </el-form-item>
                    <el-form-item
                            prop="passWord"
                            label="密码"
                            :rules="[
                                 { min:2,max:20, message: '密码长度不规范', trigger: 'blur，change' },
      { required: true, message: '请输入密码', trigger: 'blur' }
      ,
    ]" required
                    >
                        <el-input type="password" autoComplete="off" placeholder="密码"
                                  v-model="loginUser.passWord"></el-input>
                    </el-form-item>


                </el-form>
                <br>
                <img src="../../img/login1.png" class="cursor" @click="login('dynamicValidateForm')">
                <br>
                <br>
                <span style="color: #58B7FF">— —使用第三方登录方式</span><span style="color: red">&nbsp;or&nbsp;</span><span
                    class="cursor" @click="loginOrRigister=false">注册一个</span> <span style="color: #58B7FF">— —</span>
            </div>
            <div style="width: 320px;" v-else>
                <el-form :model="rigitsterForm" ref="rigitsterRules" label-width="100px" class="demo-dynamic">
                    <el-form-item
                            prop="userName"
                            label="用户名"
                            :rules="[
        { min:2,max:20, message: '用户名长度不规范', trigger: 'blur' },
       {  pattern:/^[^ ]+$/, message: '用户名中不能包含空格',trigger: 'blur'},
       {  pattern:/^[^'`/+ - \\ ()（）《》<>~#^$@%&!*,.'' ? <> -]+$/, message: '用户名中不能包含特殊字符',trigger: 'blur'},
       {  pattern:/^[^😃]+$/, message: '用户名中不能包含表情',trigger: 'blur'},
         { required: true, message: '请输入用户名', trigger: 'blur' }
    ]"

                            required>
                        <el-input type="text" v-model="rigitsterForm.userName"
                                  auto-complete="off" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="passWord" label="密码:" :rules="[
        { min:2,max:20, message: '密码长度不规范', trigger: 'blur，change' },
       {  pattern:/^[^ ]+$/, message: '密码中不能包含空格',trigger: 'blur'},
         { required: true, message: '请输入密码', trigger: 'blur' }
    ]" required>
                        <el-input type="password" v-model="rigitsterForm.passWord"
                                  placeholder="密码"></el-input>
                    </el-form-item>

                    <el-form-item prop="email" label="邮箱:" :rules="[
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
         {required: true, message: '请输入邮箱', trigger: 'blur'}
    ]" required>
                        <el-input type="text" v-model="rigitsterForm.email"
                                  placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="code" label="验证码:" :rules="[
                        { min:6,max:6, message: '请输入6位验证码', trigger: 'blur' },
         {required: true, message: '请输入验证码', trigger: 'blur'}

    ]" required>
                        <el-input type="text" style="width: 40%" v-model="rigitsterForm.code"
                                  placeholder="验证码"></el-input>

                        <el-button v-show="!showTime" type="success" v-waves icon="plus"
                                   @click="sendCode">
                            获取验证码
                        </el-button>
                        <el-button v-show="showTime" disabled type="primary"
                        >
                            剩余{{count}}秒
                        </el-button>


                    </el-form-item>

                </el-form>
                <br>
                <img src="../../img/rigister.png" class="cursor" @click="rigster('rigitsterRules')">
                <br>
                <br>
                <span style="color: #58B7FF">— —使用第三方登录方式</span><span style="color: red">&nbsp;or&nbsp;</span><span
                    class="cursor" @click="loginOrRigister=true">去登录</span> <span style="color: #58B7FF">— —</span>
            </div>
            <br>
            <div class="ul">

                <li class="loginLogo qq" @click="openQQ"></li>
                <li class="loginLogo wx"></li>
                <li class="loginLogo wb" @click="openWB"></li>

            </div>


            <br>
            <br>

            <span style=" margin-left: 1%; margin-right: 10%;" @click="qqlogin">微信登录</span>

            <br><br>

        </el-dialog>
    </div>


</template>
<script>
    import tokenStore from 'store2';
    import {saveResouce} from 'api/blog/resouce';
    import {qqLogin} from 'api/admin/login';
    import {getCode, cName, saveUser, login, valUser} from 'api/blog/user';

    export default {
        name: 'topIng',

        data() {

            return {
                user: {
                    id: '', uid: '', userName: '', uSource: '', location: '', description: '',
                    profileUrl: '', gender: '', passWord: '', email: '', integral: '', status: '', createdTime: '',
                },
                loginUser: {
                    userName: '',  passWord: ''
                },
                headurl: '',
                search: '',
                resourceDialog: false,
                resource: {resouceName: '', resouceUrl: '', context: '', status: ''},
                loginDialog: false,


                count: '',
                rigitsterForm: {
                    userName: '',
                    email: '',
                    code: '',
                    passWord: '',
                    checkPassWord: ''
                },
                loginOrRigister: true,
                timer: null,
                showTime: false,
                valCode: '',
                rigitsterRules: {},

            };
        },
        created() {

            if (tokenStore.session('user') != null) {

                this.user = tokenStore.session('user');
                if(this.user.profileUrl !=null&&this.user.profileUrl !=''){
                    this.headurl = '<img class="common-topbar-user-image-wrapper1" src=' + this.user.profileUrl + '>';
                }else{
                    this.headurl = '<img class="common-topbar-user-image-wrapper1" src="favicon.ico">';
                }
            }
        },
        methods: {
            openQQ() {
                window.open("https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101453375&redirect_uri=http://zhixiang.org.cn/%23/qqLogin&state=1");
            },
            openWB() {
                window.open("https://api.weibo.com/oauth2/authorize?client_id=3191489564&response_type=code&redirect_uri=http://zhixiang.org.cn/%23/login");
            },
            qqlogin() {
                qqLogin("1111111").then(response => {
                    if (response.data.returnCode == 400 || response.data.returnCode == 300) {
                        this.$message({
                            message: response.data.returnMsg,
                            type: 'error',
                            duration: 5 * 1000
                        });
                    } else {

                        tokenStore.session.set("user", response.data.returnData);
                        this.$message({
                            message: "登录成功",
                            type: 'success',
                            duration: 5 * 1000
                        });
                    }
                    window.location.href = "/";
                });
            },
            write() {
                if (tokenStore.session('user') != null) {
                    window.location.href = "/#/blog/write";
                } else {
                    this.$message({
                        message: "请先登录后再发表文章",
                        type: 'error',
                        duration: 3 * 1000
                    });

                }
            },
            index() {
                window.location.href = "/#/";
            }, leav() {
                window.location.href = "/#/blog/leav";
            },
            searchBySel() {
                if (this.search != null && this.search != '') {
                    tokenStore.session.set('search', this.search)
                }
                this.$router.push('/');
                window.location.reload();
            },
            saveReso() {
                this.resource.userId = tokenStore.session('user').id;
                this.resource.userName = tokenStore.session('user').userName;
                this.resource.profileUrl = "<img class=\"userLogo\" src=\"" + tokenStore.session('user').profileUrl + "\">";
                saveResouce(this.resource).then(response => {
                    this.$notify({
                        title: response.data.returnCode == 200 ? '成功' : '失败',
                        message: response.data.returnMsg,
                        type: response.data.returnCode == 200 ? 'success' : 'warning',
                        duration: 5000
                    });
                    this.resourceDialog = false;

                });
            },

            openResourceDialog() {
                if (tokenStore.session('user') != null) {
                    this.resourceDialog = true;
                } else {
                    this.$message({
                        message: "请先登录后再上传资源",
                        type: 'error',
                        duration: 3 * 1000
                    });
                }

            }, closeResourceDialog(formName) {
                this.resourceDialog = false;
                this.$refs[formName].resetFields();
            }, openLoginDialog() {
                this.loginDialog = true;
                this.loginOrRigister = true;
                this.loginUser.userName = '';
                this.loginUser.passWord = '';
            },

            sendCode() {
                if (this.rigitsterForm.email.length < 3 || this.rigitsterForm.email.indexOf("@") < 1 || this.rigitsterForm.email.indexOf(".") < 1) {
                    return false;
                }

                getCode(this.rigitsterForm).then(response => {

                    if (response.data.returnCode != 200) {
                        this.$notify({
                            title: response.data.returnCode == 200 ? '成功' : '失败',
                            message: response.data.returnMsg,
                            type: response.data.returnCode == 200 ? 'success' : 'warning',
                            duration: 5000
                        });
                    }
                    this.valCode = response.data.returnData;
                });

                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.showTime = true;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.showTime = false;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            },
            rigster(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var pass=this.rigitsterForm.passWord;
                        saveUser(this.rigitsterForm).then(response => {
                            if(response.data.returnCode != 200){
                                this.rigitsterForm.passWord=pass;
                            } else{
                                this.rigitsterForm=true;
                            }

                            this.$notify({
                                title: response.data.returnCode == 200 ? '成功' : '失败',
                                message: response.data.returnMsg,
                                type: response.data.returnCode == 200 ? 'success' : 'warning',
                                duration: 5000
                            });
                            this.toLogin();
                        });
                    }
                });
            },
            login(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        login(this.loginUser).then(response => {
                            console.log(response.data.returnData)
                            if (response.data.returnCode == 200) {
                                tokenStore.session.set("user", response.data.returnData);
                                window.location.href = "/";

                            }
                            this.loginUser.passWord = '';
                            this.$notify({
                                title: response.data.returnCode == 200 ? '成功' : '失败',
                                message: response.data.returnMsg,
                                type: response.data.returnCode == 200 ? 'success' : 'warning',
                                duration: 5000
                            });

                        });
                    }
                });
            },
        }
    }
</script>
<style>
    .cursor {
        cursor: pointer;
    }

    .ul {
        width: fit-content;
        margin-left: auto;
        margin-right: auto;
    }

    .loginLogo {
        z-index: 3;
        width: 39px;
        height: 39px;
        cursor: pointer;
        background-repeat: no-repeat;
        list-style-type: none;
        float: left;
    }

    .wx {
        background-image: url(../../img/wx.png);
    }

    .wx:hover {
        background-image: url(../../img/wx1.png)
    }

    .topbar-user-info {
        padding: 8px 24px 0 12px;
        height: 50px;

    }

    .common-topbar-user-image-wrapper1 {
        width: 35px;
        height: 35px;
        border-radius: 50%;
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-level1-content.common-topbar-level2-nav ul {
        width: 200px
    }

    .aliyun-common-search-container {
        width: 100%;
        height: 30px;
        background: hsla(0, 0%, 100%, .12);
        position: relative;
        transition: all .3s linear
    }



    .aliyun-common-search-container.active, .aliyun-common-search-container:hover {
        background: #262c30
    }

    .aliyun-common-search-container.active , .aliyun-common-search-container:hover .aliyun-common-search-outline {
        opacity: 1
    }

    .aliyun-common-search-container .aliyun-common-search-outline {
        position: absolute;
        z-index: 1;
        border: 1px solid #00c1de;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition: all .3s linear
    }

    .aliyun-common-search-container input {
        position: relative;
        font-size: 12px;
        z-index: 2;
        box-sizing: border-box;
        padding-left: 12px;
        padding-right: 22px;
        width: 100%;
        height: 100%;
        outline: none;
        background: transparent;
        border: none;
        color: #fff;
        line-height: 26px
    }

    .aliyun-common-search-container input::-webkit-input-placeholder {
        color: #ccc
    }

    .aliyun-common-search-container input:-moz-placeholder, .aliyun-common-search-container input::-moz-placeholder {
        color: #ccc
    }

    .aliyun-common-search-container input:-ms-input-placeholder {
        color: #ccc
    }

    .aliyun-common-search-container .aliyun-common-search-icon {
        display: block;
        position: absolute;
        z-index: 3;
        right: 0;
        top: 0;
        bottom: 0;
        width: 26px;
        height: 26px;
        cursor: pointer;
        background-image: url(https://img.alicdn.com/tfs/TB1fBsneyqAXuNjy1XdXXaYcVXa-28-28.png);
        background-size: 50%;
        background-repeat: no-repeat;
        background-position: 50%
    }

    .aliyun-common-search-container .aliyun-common-search-icon:hover {
        background-image: url(https://img.alicdn.com/tfs/TB1zv90g8DH8KJjy1zeXXXjepXa-28-28.png)
    }

    .aliyun-common-search-container .aliyun-common-search-dropdown .dropdown-list li:last-of-type a {
        padding-bottom: 0
    }

    .console-component-topbar {
        position: relative;
        z-index: 100;
        clear: both;
        height: 50px;
        background: #373d41;
        font-size: 12px;
        min-width: 990px;
    }

    .console-component-topbar .topbar-info-dropdown:hover .topbar-info-dropdown-toggle {
        background: #2a2f32;
    }

    .console-component-topbar .topbar-info-dropdown:hover .topbar-info-dropdown-toggle:hover {
        background: #2a2f32;
    }

    .console-component-topbar .topbar-info-dropdown-toggle {
        -webkit-transition: background 0.2s, color 0.2s;
        transition: background 0.2s, color 0.2s;
    }

    .console-component-topbar .topbar-wrap, .console-component-topbar .topbar-logo, .console-component-topbar .topbar-home, .console-component-topbar .topbar-home-link, .console-component-topbar .topbar-product, .console-component-topbar .topbar-info {
        height: 100%;
    }

    .console-component-topbar .topbar-wrap {
        display: none;
    }

    .console-component-topbar .topbar-left {
        float: left;
    }

    .console-component-topbar .topbar-right {
        float: right;
    }

    .console-component-topbar .topbar-clearfix:before,
    .console-component-topbar .topbar-clearfix:after {
        display: table;
        content: " ";
    }

    .console-component-topbar .topbar-head {
        background: #2a2f32;
        height: 50px;
        position: relative;
        z-index: 3;
    }

    .console-component-topbar .topbar-logo {
        display: block;
        width: 150px;
        font-size: 24px !important;
        color: #FFF;
        text-align: center;
        line-height: 50px;
        margin-right: 1px;
    }

    .console-component-topbar .topbar-logo span {
        line-height: 50px;
    }

    .console-component-topbar .topbar-logo {
        background: #373d41;
    }

    .topbar-product .topbar-btn:hover {
        color: white;
    }

    .console-component-topbar .topbar-btn {
        color: #999;
        font-size: 14px;
        line-height: 50px;
        padding: 0 20px;
        display: inline-block;
        height: 50px;
        cursor: pointer;
    }

    .console-component-topbar .topbar-info {
        background: #2a2f32;
        position: absolute;
        z-index: 3;
        top: 0;
        right: 0;
    }

    .console-component-topbar .topbar-info .topbar-btn {
        padding: 0 10px;
        height: 50px;
        display: block;
        z-index: 2;
        background: #373d41;
        border-right: 1px solid #2a2f32;
    }


</style>