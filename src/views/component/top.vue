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
                    <div class="topbar-btn" @click="write" >
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


                <div  class="topbar-info topbar-right topbar-clearfix">
                    <div class=" topbar-user ">
                        <div class="topbar-info-dropdown topbar-info-item">
                            <a class="topbar-info-dropdown-toggle topbar-btn">
                                <span  v-if="user.uid==null||user.uid==''" @click="openLoginDialog"  >登录</span>
                                <div class="topbar-user-info" style="display: block;">
                                    <router-link :to="'/blog/userCenter'"><span v-if="user.uid!=null&&user.uid!=''" v-html="headurl"></span> </router-link>
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
            <span>---请选择快捷登录方式---</span>
            <br>
            <br>
            <br>
            <a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101453375&redirect_uri=http://zhixiang.org.cn/%23/qqLogin&state=1"> <img style="margin-right: 10%; "  width="10%" height="10%"src="../../img/qq.png"></a>
            <img style=" margin-right: 10%;" width="10%" height="10%" src="../../img/wexin.png">
            <a href="https://api.weibo.com/oauth2/authorize?client_id=3191489564&response_type=code&redirect_uri=http://zhixiang.org.cn/%23/login"> <img src="../../img/weibo.png" width="10%" height="10%"></a>
            <br>
            <br>
            <span style=" margin-right: 10%;">QQ登录</span>
            <span style=" margin-left: 1%; margin-right: 10%;" @click="qqlogin">微信登录</span>
            <span style=" margin-left: 1%;">微博登录</span>
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
                user:{
                   id:'', uid:'', userName:'', uSource:'', location:'', description:'',
                    profileUrl:'', gender:'', passWord:'', email:'', integral:'', status:'', createdTime:'',
                },
                headurl:'',
                search: '',
                resourceDialog: false,
                resource: {resouceName: '', resouceUrl: '', context: '', status: ''},
                loginDialog: false,

                loginForm: {userName: '', passWord: ''},
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
                rigitsterRules: {

                },
                loginRules: {

                },
            };
        }, created() {
            console.log(tokenStore.session('user'))
            if(tokenStore.session('user')!=null){
                this.user = tokenStore.session('user');
                this.headurl='<img class="common-topbar-user-image-wrapper1" src='+this.user.profileUrl+'>';
            }
        },
        methods: {
            qqlogin(){
                qqLogin("1111111").then(response => {
                    if (response.data.returnCode == 400||response.data.returnCode == 300) {
                        this.$message({
                            message: response.data.returnMsg,
                            type: 'error',
                            duration: 5 * 1000
                        });
                    }else{

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
            write(){
                if(tokenStore.session('user')!=null){
                    window.location.href = "/#/blog/write";
                }else{
                    this.$message({
                        message: "请先登录后再发表文章",
                        type: 'error',
                        duration: 3 * 1000
                    });

                }
            },
            index(){
                    window.location.href = "/#/";
            }, leav(){
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
                this.resource.profileUrl ="<img class=\"userLogo\" src=\""+tokenStore.session('user').profileUrl+"\">";
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
                if(tokenStore.session('user')!=null){
                    this.resourceDialog = true;
                }else{
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
            }, closeLoginDialog(formName) {
                this.loginDialog = false;
                this.$refs[formName].resetFields();
            }, toRigister() {
                this.loginOrRigister = false;
            }, toLogin() {
                this.loginOrRigister = true;
            },

            cheackName() {
                if (this.rigitsterForm.userName.length < 3) {
                    return false;
                }
                cName(this.rigitsterForm.userName).then(response => {
                    if (response.data.returnCode != 200) {
                        this.cna = true;
                    } else {
                        this.cna = false;
                    }

                });
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
                        saveUser(this.rigitsterForm).then(response => {
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

                        login(this.loginForm).then(response => {
                            if (response.data.returnCode == 200) {
                                this.UNAME = response.data.returnData.userName;
                                tokenStore.session.set('User', response.data.returnData)
                                this.loginDialog = false;
                                return false;
                            }
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

    .aliyun-common-search-container:after {
        content: "";
        width: 1px;
        height: 16px;
        position: absolute;
        background: hsla(0, 0%, 100%, .15);
        right: 26px
    }

    .aliyun-common-search-container.active, .aliyun-common-search-container:hover {
        background: #262c30
    }

    .aliyun-common-search-container.active .aliyun-common-search-outline, .aliyun-common-search-container:hover .aliyun-common-search-outline {
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