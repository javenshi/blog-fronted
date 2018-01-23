<template>

    <div>
        <div class="console-component-topbar ">
            <div class=" topbar-clearfix" style="display: block; color: #666;">
                <div class="topbar-head topbar-left">

                    <a
                            class="topbar-btn topbar-logo topbar-left">
                        <img style="margin-top: 14px;" src="../../img/logo.png"/>
                    </a>


                </div>
                <div style="margin-left: 30px;" class="topbar-product topbar-left">
                    <div class="topbar-btn  topbar-product-btn">

                        <router-link :to="'/'"><span style="color: #999;" class="ng-binding"><a href="" target="_blank"
                                                                                                class="topbar-home-link  ">首页</a></span>
                        </router-link>

                    </div>
                </div>
                <div class="topbar-product topbar-left">
                    <div class="topbar-btn  topbar-product-btn">

                       <span style="color: #999;" class="ng-binding"><a @click="write" target="_blank"class="topbar-home-link  ">写博客</a></span>

                    </div>
                </div>
                <div class="topbar-product topbar-left">
                    <div class="topbar-btn  topbar-product-btn">
                        <span class="ng-binding" style="color: #999;" @click="openResourceDialog"><a>贡献资源</a></span>
                    </div>
                </div>
                <div class="topbar-product topbar-left">
                    <div class="topbar-btn topbar-product-btn">
                        <router-link :to="'/blog/leav'"><span style="color: #999;" class="ng-binding"><a>留言</a></span>
                        </router-link>
                    </div>
                </div>
                <div class="topbar-product topbar-left">
                    <div class="topbar-btn topbar-product-btn">
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
            <img style="margin-right: 10%; "  width="10%" height="10%"src="../../img/qq.png">
            <img style=" margin-right: 10%;" width="10%" height="10%" src="../../img/wexin.png">
            <a href="https://api.weibo.com/oauth2/authorize?client_id=3191489564&response_type=code&redirect_uri=http://zhixiang.org.cn/%23/login"> <img src="../../img/weibo.png" width="10%" height="10%"></a>
            <br>
            <br>
            <span style=" margin-right: 10%;">QQ登录</span>
            <span style=" margin-left: 1%; margin-right: 10%;">微信登录</span>
            <span style=" margin-left: 1%;">微博登录</span>
            <br><br>

            </el-dialog>
    </div>


</template>
<script>
    import tokenStore from 'store2';
    import {saveResouce} from 'api/blog/resouce';

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
                this.headurl='<img class="common-topbar-user-image-wrapper1" src='+this.user.profileUrl+'/>';
            }
        },
        methods: {

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
                this.resource.profileUrl = tokenStore.session('user').profileUrl;
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
        height: 40px;

    }
     .common-topbar-user-image-wrapper1 {
        width: 24px;
        height: 24px;

    }
    @media (max-width: 1124px) and (min-width: 1004px) {
        .common-topbar-dropdown .common-topbar-dropdown-category-container.column-5 {
            padding-left: 0 !important
        }

        .common-topbar-dropdown .common-topbar-dropdown-category-container.column-5 .common-topbar-dropdown-category-list {
            float: right
        }
    }

    @media (max-width: 1004px) {
        .common-topbar-dropdown .common-topbar-dropdown-category-container.column-5 {
            padding-left: 0 !important
        }

        .common-topbar-dropdown .common-topbar-dropdown-category-container.column-5 .common-topbar-dropdown-category-list {
            float: none
        }

        .common-topbar-dropdown .common-topbar-dropdown-category-container.column-5 .common-topbar-dropdown-category-list .category-item {
            width: 18.67219917% !important;
            margin-right: 1.65975104% !important
        }

        .common-topbar-dropdown .common-topbar-dropdown-category-container.column-5 .common-topbar-dropdown-category-list .category-item:last-child {
            margin-right: 0 !important
        }
    }

    @media (max-width: 1320px) and (min-width: 1200px) {
        .common-topbar-dropdown .common-topbar-dropdown-category-container.column-6 {
            padding-left: 0 !important
        }

        .common-topbar-dropdown .common-topbar-dropdown-category-container.column-6 .common-topbar-dropdown-category-list {
            float: right
        }
    }

    @media (max-width: 1200px) {
        .common-topbar-dropdown .common-topbar-dropdown-category-container.column-6 {
            padding-left: 0 !important
        }

        .common-topbar-dropdown .common-topbar-dropdown-category-container.column-6 .common-topbar-dropdown-category-list {
            float: none
        }

        .common-topbar-dropdown .common-topbar-dropdown-category-container.column-6 .common-topbar-dropdown-category-list .category-item {
            width: 15.51724138% !important;
            margin-right: 1.37931034% !important
        }

        .common-topbar-dropdown .common-topbar-dropdown-category-container.column-6 .common-topbar-dropdown-category-list .category-item:last-child {
            margin-right: 0 !important
        }
    }



    .common-topbar-body em {
        color: #ff8a00
    }

    .common-topbar-body a, .common-topbar-body a:link, .common-topbar-body a:visited {
        color: #fff;
        cursor: pointer;
        text-decoration: none
    }

    .common-topbar-body a:hover {
        color: #00c1de;
        text-decoration: none
    }

    .common-topbar-body .common-topbar-top .common-topbar-logo img {
        width: 100%
    }

    .common-topbar-body .common-topbar-top .common-topbar-site-switch .topbar-site-switch-dropdown li {
        height: 30px;
        line-height: 30px;
        cursor: pointer
    }

    .common-topbar-body .common-topbar-top .common-topbar-site-switch .topbar-site-switch-dropdown li a {
        display: block;
        height: 100%
    }

    .common-topbar-body .common-topbar-top .common-topbar-site-switch .topbar-site-switch-dropdown li.current {
        cursor: default
    }

    .common-topbar-body .common-topbar-top .common-topbar-site-switch .topbar-site-switch-dropdown li.current a {
        color: #00c1de;
        cursor: default
    }

    .common-topbar-body .common-topbar-top .common-topbar-search i {
        top: 5px;
        position: absolute;
        color: #fff;
        font-size: 18px;
        display: inline-block;
        left: 10px;
        cursor: pointer
    }

    .common-topbar-body .common-topbar-top .common-topbar-search.hover i {
        color: #fff
    }



    .common-topbar-body .common-topbar-bottom .common-topbar-nav .common-topbar-nav-list li {
        float: left;
        height: 60px;
        line-height: 60px;
        padding: 0 16px;
        position: relative
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-nav .common-topbar-nav-list li a {
        display: block
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-nav .common-topbar-nav-list li:hover a {
        color: #00c1de
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-nav .common-topbar-nav-list li img {
        position: absolute;
        top: 8px;
        right: 4px;
        width: 24px
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-nav .common-topbar-nav-list li a[href="javascript:void(0)"] {
        cursor: default
    }



    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-category-container .common-topbar-dropdown-category-list {

        overflow: hidden
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-category-container .common-topbar-dropdown-category-list .category-item {
        float: left;
        width: 180px;
        margin-right: 16px
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-category-container .common-topbar-dropdown-category-list .category-item:last-child {
        margin-right: 0
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-category-container .common-topbar-dropdown-category-list .category-item a {
        display: block
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-category-container .common-topbar-dropdown-category-list .category-item .category-item-title {
        font-size: 14px;
        font-weight: 600;
        height: 24px;
        line-height: 24px;
        margin-bottom: 12px
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-category-container .common-topbar-dropdown-category-list .category-item li {
        font-size: 12px;
        line-height: 24px;
        margin-bottom: 4px
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-category-container .common-topbar-dropdown-category-list .category-item li:last-child {
        margin-bottom: 0
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-category-container .common-topbar-dropdown-category-list .category-item li a, .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-category-container .common-topbar-dropdown-category-list .category-item li a:link, .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-category-container .common-topbar-dropdown-category-list .category-item li a:visited {
        color: #c3c5c6
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-category-container .common-topbar-dropdown-category-list .category-item li a:hover {
        color: #00c1de
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .all-product-individual-wrapper {

        height: 60px;
        line-height: 60px;
        background: #2f3438;
        text-align: left
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .all-product-individual-wrapper .individual-most-visited {
        display: inline
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .all-product-individual-wrapper .individual-most-visited .individual-most-visited-title {
        font-size: 12px;
        color: #9b9ea0;
        letter-spacing: 0
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .all-product-individual-wrapper .individual-most-visited ul {
        display: inline-block
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .all-product-individual-wrapper .individual-most-visited ul li {
        display: inline;
        margin-right: 16px
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .all-product-individual-wrapper .individual-most-visited ul li a, .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .all-product-individual-wrapper .individual-most-visited ul li a:link, .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .all-product-individual-wrapper .individual-most-visited ul li a:visited {
        font-size: 12px;
        color: #fff;
        letter-spacing: 0
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .all-product-individual-wrapper .individual-most-visited ul li a:hover {
        color: #00c1de
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .all-product-individual-wrapper .individual-activity {
        float: right;
        font-size: 12px;
        color: #c3c5c6;
        letter-spacing: 0
    }



    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .product-column {
        width: 264px;
        margin-right: 20px;
        display: inline-block;
        text-align: left;
        vertical-align: top;
        font-size: 0
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .product-column a {
        display: block
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .product-column .product-item {
        position: relative;
        padding: 4px 0
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .product-column .product-item .product-item-title {
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        letter-spacing: .99px;
        line-height: 24px;
        margin-bottom: 8px
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .product-column .product-item li {
        font-size: 12px;
        color: #c3c5c6;
        letter-spacing: .85px;
        line-height: 24px
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .product-column .product-item li.line {
        width: 220px;
        height: 1px;
        opacity: .5;
        background: #73777a
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .product-column .product-item li a, .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .product-column .product-item li a:link, .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .product-column .product-item li a:visited {
        color: #c3c5c6
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .product-column .product-item li a:hover {
        color: #00c1de
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .product-column .product-item:last-child li.line {
        display: none
    }



    .common-topbar-body .common-topbar-bottom .common-topbar-dropdown .common-topbar-dropdown-all-product .product-column:last-child {
        margin-right: 0
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .higher-text a {
        position: relative;
        display: block;
        z-index: 2
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-level1-nav ul {
        width: 200px
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-level1-nav ul li a {
        display: block
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-level1-nav ul li.active a {
        color: #00c1de
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-level1-nav .dock-bottom {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 18px;
        line-height: 18px;

        padding-left: 20px;
        padding-bottom: 20px;
        font-size: 14px;
        background: #272b2e
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-level1-content.common-topbar-level2-nav ul {
        width: 200px
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-detail-list {
        background: #303538;
        width: 400px;
        height: 100%;
        box-sizing: border-box;
        border-right: 1px solid hsla(0, 0%, 100%, .15);
        float: left;

        overflow: hidden
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-detail-list .bg-title-text {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 4px;
        margin-left: 20px;
        font-weight: 600
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-detail-list .content-wrapper {
        width: 370px;

        margin-left: 10px;
        margin-right: 20px;

    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-detail-list .content-wrapper .content-link {
        display: block
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-detail-list .content-wrapper .content-name {
        font-size: 12px;
        letter-spacing: 1px;
        line-height: 20px
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-detail-list .content-wrapper .content-description {
        font-size: 12px;
        color: #9b9ea0;
        line-height: 20px
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-detail-list .content-wrapper .content-child {
        overflow: hidden
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-detail-list .content-wrapper .content-child a {
        display: block;
        width: 170px;
        height: 28px;
        padding-left: 12px;
        text-align: left;
        line-height: 28px;
        font-size: 12px;
        border: 1px solid #474f54;
        float: left;
        margin-right: 10px;
        margin-top: 4px;
        box-sizing: border-box
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-detail-list .content-wrapper .content-child a:nth-child(2n+2) {
        margin-right: 0
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-detail-list .content-wrapper .content-child a:hover {
        border: 1px solid #00c1de;
        color: #00c1de;
        text-decoration: none
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-detail-list .content-wrapper:hover {
        background: hsla(0, 0%, 100%, .05)
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-detail-list .content-wrapper:hover .content-name {
        color: #00c1de
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-detail-list .content-wrapper:hover .content-description {
        color: #9b9ea0
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-detail-list .sub-content-title {
        font-size: 12px;
        color: #fff;
        line-height: 20px;
        margin-left: 20px;

        font-weight: 600
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-relevant-list {
        float: left;
        background-color: #303538;
        background-position-y: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        width: 280px;
        height: 100%;


        overflow: hidden
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-relevant-list .relavant-title {
        font-size: 14px;
        color: #9b9ea0;

    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-relevant-list a {
        display: block;
        font-size: 12px;
        line-height: 24px;
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-relevant-list a:first-child {
        padding-top: 0
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-relevant-list a:last-child {
        padding-bottom: 20px
    }

    .common-topbar-body .common-topbar-bottom .common-topbar-all-nav-dropdown .common-topbar-leve2-content .common-topbar-relevant-list a:hover {
        color: #00c1de
    }

    .common-topbar-body .common-topbar-user-info-dropdown a {
        display: block
    }



    .common-topbar-body .common-topbar-user-info-dropdown .bottom-line a, .common-topbar-body .common-topbar-user-info-dropdown .bottom-line a:link, .common-topbar-body .common-topbar-user-info-dropdown .bottom-line a:visited {
        color: #73777a
    }

    .common-topbar-body .common-topbar-user-info-dropdown .bottom-line a:hover {
        color: #00c1de
    }

    @keyframes level1NavSlidein {
        0% {
            left: -200px
        }
        to {
            left: 0
        }
    }

    @keyframes level1NavSlideout {
        0% {
            left: 0
        }
        to {
            left: -200px
        }
    }

    @keyframes leve1ContentSlidein {
        0% {
            left: 0
        }
        to {
            left: 200px
        }
    }

    @keyframes leve1ContentSlideout {
        0% {
            left: 200px
        }
        to {
            left: 0
        }
    }

    @keyframes leve1ContentSlideinExpand {
        0% {
            left: -120px
        }
        to {
            left: 200px
        }
    }

    @keyframes leve1ContentSlideoutExpand {
        0% {
            left: 200px
        }
        to {
            left: -120px
        }
    }

    @keyframes level2ContentSlideout {
        0% {
            left: 400px
        }
        to {
            left: 0
        }
    }

    @keyframes level2ContentSlidein {
        0% {
            left: 0
        }
        to {
            left: 400px
        }
    }

    @keyframes level2ContentSlideoutExpand {
        0% {
            left: 400px
        }
        to {
            left: -280px
        }
    }

    @keyframes level2ContentSlideinExpand {
        0% {
            left: -280px
        }
        to {
            left: 400px
        }
    }

    @keyframes leve1NavMove {
        0% {
            opacity: 0;
            transform: translateX(-10px)
        }
        to {
            opacity: 1;
            transform: translateX(0)
        }
    }

    @keyframes detailListMove {
        0% {
            opacity: 0;
            transform: translateX(-20px)
        }
        to {
            opacity: 1;
            transform: translateX(0)
        }
    }

    @keyframes relevantListMove {
        0% {
            opacity: 0;
            transform: translateX(-10px)
        }
        to {
            opacity: 1;
            transform: translateX(0)
        }
    }

    @keyframes allNavSlideText {
        0% {
            opacity: 0;
            transform: translateX(-10px)
        }
        45% {
            opacity: 0;
            transform: translateX(-10px)
        }
        to {
            opacity: 1;
            transform: translateX(0)
        }
    }

    @media (max-width: 1440px) and (min-width: 1281px) {
        .common-topbar-dropdown-all-product .product-column {
            width: 18.85% !important;
            margin-right: 1.4% !important
        }

        .common-topbar-dropdown-all-product .product-column:last-child {
            margin-right: 0 !important
        }
    }

    @media (max-width: 1156px) {
        .product-column {
            width: 225px !important
        }
    }

    @media (max-width: 769px) {
        .common-topbar-relevant-list {
            display: none
        }
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
        top: 5px;
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

    .aliyun-common-search-container .aliyun-common-search-close {
        display: none;
        position: absolute;
        z-index: 3;
        right: 32px;
        top: 7px;
        bottom: 0;
        width: 12px;
        height: 12px;
        cursor: pointer;
        background-image: url(https://img.alicdn.com/tfs/TB1QnaDg_nI8KJjSszgXXc8ApXa-28-28.png);
        background-size: 100%
    }

    .aliyun-common-search-container .aliyun-common-search-close:hover {
        background-image: url(https://img.alicdn.com/tfs/TB13xq7g4PI8KJjSspoXXX6MFXa-28-28.png)
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

    .aliyun-common-search-container .aliyun-common-search-dropdown {
        color: #fff;
        position: absolute;
        z-index: 999;

        left: 0;
        width: 100%;
        background: #262c30;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .15);
        transition: all .17s ease;
        padding: 0;
        height: 0;
        overflow: hidden
    }

    .aliyun-common-search-container .aliyun-common-search-dropdown.open {
        height: 172px
    }

    .aliyun-common-search-container .aliyun-common-search-dropdown.open .dropdown-list {
        display: block
    }

    .aliyun-common-search-container .aliyun-common-search-dropdown .title {
        color: #ccc
    }

    .aliyun-common-search-container .aliyun-common-search-dropdown .dropdown-list {

        display: none;
        margin: 0
    }

    .aliyun-common-search-container .aliyun-common-search-dropdown .dropdown-list li {
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 12px;
        line-height: 18px;
        text-align: left
    }

    .aliyun-common-search-container .aliyun-common-search-dropdown .dropdown-list li:hover a {
        color: #00c1de
    }

    .aliyun-common-search-container .aliyun-common-search-dropdown .dropdown-list li a {
        display: inline-block;
        width: 100%;
        padding-bottom: 8px;
        color: #fff;
        transition: all .17s ease;
        text-decoration: none
    }

    .aliyun-common-search-container .aliyun-common-search-dropdown .dropdown-list li a:hover {
        text-decoration: none
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

    .console-component-topbar span, .console-component-topbar a, .console-component-topbar p, .console-component-topbar li {
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        letter-spacing: 0.02em;
    }

    .console-component-topbar a {
        text-decoration: none;
    }

    .console-component-topbar a:focus {
        outline: none;
    }

    .console-component-topbar .dropdown .dropdown-menu a {
        padding: 0;
    }

    .console-component-topbar .topbar-info-dropdown {
        position: relative;
    }

    .console-component-topbar .topbar-info-dropdown .topbar-btn {
        position: relative;
    }

    .console-component-topbar .topbar-info-dropdown .topbar-info-dropdown-toggle {
        color: #fff;
    }

    .console-component-topbar .topbar-info-dropdown:hover .topbar-info-dropdown-memu {
        visibility: visible;
        opacity: 1;
    }

    .console-component-topbar .topbar-info-dropdown:hover .topbar-info-dropdown-toggle {
        background: #2a2f32;
    }

    .console-component-topbar .topbar-info-dropdown:hover .topbar-info-dropdown-toggle:hover {
        background: #2a2f32;
    }

    .console-component-topbar .topbar-info-dropdown-memu {
        padding: 0;
        position: absolute;
        top: 100%;
        right: 0;
        visibility: hidden;
        float: left;
        list-style: none;
        background-color: #ffffff;
        background-clip: padding-box;
        z-index: 1;
        font-size: 12px;
        min-width: 100%;
        margin: 0;
        border: none;
        -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        -webkit-transition: opacity 0.15s, visibility 0s 0.15s;
        transition: opacity 0.15s, visibility 0s 0.15s;
        opacity: 0;
    }

    .console-component-topbar .topbar-info-dropdown-memu li a {
        display: block;
        padding: 0 20px;
        clear: both;
        font-weight: normal;
        line-height: 1.428571429;
        color: #333333;
        white-space: nowrap;
        min-width: 140px;
        -webkit-transition: all 0.15s;
        transition: all 0.15s;
    }

    .console-component-topbar .topbar-info-dropdown-memu li a:hover, .console-component-topbar .topbar-info-dropdown-memu li a:focus {
        background-color: #f5f5f5;
    }

    .console-component-topbar .topbar-info-dropdown-memu-list {
        padding: 10px 0;
        margin: -2px;
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

    .console-component-topbar .topbar-clearfix:after {
        clear: both;
    }

    .console-component-topbar .topbar-align-right {
        right: 0;
        left: auto;
    }

    .console-component-topbar .topbar-head {
        background: #2a2f32;
        height: 50px;
        position: relative;
        z-index: 3;
    }

    .console-component-topbar .topbar-product {
        position: relative;
        z-index: 2;
        background: #373d41;
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

    .console-component-topbar .topbar-home-link {
        margin-right: 1px;
        background: #373d41;
        width: 128px;
        text-align: center;
    }

    a:hover {
        color: white;
    }

    .console-component-topbar .topbar-btn {
        color: #fff;
        font-size: 14px;
        line-height: 50px;
    }

    .console-component-topbar .topbar-product.open .topbar-product-btn {
        background: #fff;
        color: #333;
    }

    .console-component-topbar .topbar-product-btn {
        padding: 0 20px;
        display: inline-block;
        height: 50px;
        cursor: pointer;
    }

    .console-component-topbar .topbar-product-dropdown ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .console-component-topbar .topbar-product-dropdown ul li > a {
        color: #333;
        display: inline-block;
        width: 100%;
        height: 100%;
    }

    .console-component-topbar .topbar-product-container-simple .topbar-product-all-item ul.topbar-product-all-list li a {
        width: 140px;
    }

    .console-component-topbar .topbar-product-nav ul.topbar-product-nav-list li {
        height: 32px;
        line-height: 32px;
        padding-left: 16px;
        width: 164px;
        -o-transition: all 0.1s, 0s;
        -moz-transition: all 0.1s 0s;
        -webkit-transition: all 0.1s 0s;
        transition: all 0.1s 0s;
    }

    .console-component-topbar .topbar-product-nav ul.topbar-product-nav-list li.active {
        color: #fff;
        background: #00c1de;
    }

    .console-component-topbar .topbar-product-nav ul.topbar-product-nav-list li > span {
        cursor: default;
        overflow: hidden;
        white-space: nowrap;
        display: inline-block;
        width: 100%;
        text-overflow: ellipsis;
    }

    .console-component-topbar .topbar-product-close .icon-double-arrow i {
        display: block;
        border: 1px solid #333;
        width: 8px;
        height: 8px;
        border-bottom: none;
        border-left: 0;
        background-color: transparent;
        transform: rotate(-45deg);
    }

    .console-component-topbar .topbar-product-close .icon-double-arrow i:first-child {
        margin-bottom: -3px;
    }

    .console-component-topbar .topbar-product-all-item ul.topbar-product-all-list li {
        height: 28px;
        line-height: 28px;
    }

    .console-component-topbar .topbar-product-all-item ul.topbar-product-all-list li a {
        width: 136px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background: #f7f8fa;
        padding: 0 8px;
        margin-right: 10px;
    }

    .console-component-topbar .topbar-product-all-item ul.topbar-product-all-list li a:hover {
        background: #00C1DE;
        color: #fff;
    }

    .console-component-topbar .topbar-product-history ul.topbar-product-history-list li {
        height: 32px;
        line-height: 32px;
        padding-left: 10px;
        margin-bottom: 8px;
        background: #fff;
        -o-transition: all 0.15s, 0s;
        -moz-transition: all 0.15s, 0s;
        -webkit-transition: all 0.15s, 0s;
        transition: all 0.15s, 0s;
    }

    .console-component-topbar .topbar-product-history ul.topbar-product-history-list li:hover {
        background: #00c1de;
    }

    .console-component-topbar .topbar-product-history ul.topbar-product-history-list li:hover a {
        color: #fff;
        background: #00c1de;
    }

    .console-component-topbar .topbar-product-history ul.topbar-product-history-list li a {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #373D41;
        background-color: #fff;
    }

    .console-component-topbar .topbar-product-history ul.topbar-product-history-list li i {
        font-size: 14px;
        vertical-align: middle;
    }

    .console-component-topbar .topbar-product-category .topbar-product-category-col li {
        background-color: #F5F5F6;
        margin-bottom: 4px;
        margin-right: 8px;
    }

    .console-component-topbar .topbar-product-category ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .console-component-topbar .topbar-product-search input {
        display: block;
        height: 32px;
        padding: 4px 38px 4px 18px;
        width: 180px;
        border-width: 0;
        outline: 0;
        line-height: 32px;
        color: #666;
        font-size: 12px;
        background: #f0f0f0;
    }

    .console-component-topbar .topbar-info {
        background: #2a2f32;
        position: absolute;
        z-index: 3;
        top: 0;
        right: 0;
    }

    .console-component-topbar .topbar-info .topbar-btn {
        padding: 0 18px;
        height: 50px;
        display: block;
        z-index: 2;
        background: #373d41;
        border-right: 1px solid #2a2f32;
    }

    .console-component-topbar .topbar-info .topbar-btn:hover, .console-component-topbar .topbar-info .topbar-btn.topbar-btn-dark {
        background: #373d41;
    }

    .console-component-topbar .topbar-info .dropdown.open .topbar-btn {
        color: #333;
        background: #fff;
        border-bottom: 1px solid #eaedf1;
        position: relative;
    }

    .console-component-topbar .topbar-info .topbar-info-btn a {
        height: 40px;
        line-height: 39px;
        padding: 0 18px;
    }

    .console-component-topbar .topbar-info .topbar-info-btn-gap {

        height: 1px;
        display: block;
        width: 100%;
        background: #eaeaea;
    }

    .console-component-topbar .topbar-info .topbar-info-btn-identity .user-btn-link {
        display: inline-block;
        color: #06C;
        line-height: 32px;
        margin-right: 8px;
    }

    .console-component-topbar .topbar-info .topbar-info-btn-identity .user-btn-link:hover {
        background: none;
        text-decoration: underline;
    }

    .console-component-topbar .topbar-info-item {
        display: inline-block;
    }

    .console-component-topbar .topbar-notice {
        position: relative;
        font-size: 12px;
    }

    .console-component-topbar .topbar-notice .topbar-btn {
        padding: 0 16px;
    }

    .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body ul li {
        height: 60px;
        line-height: 20px;
        border-bottom: 1px solid #eaedf1;
    }

    .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body ul li a {
        display: block;
        height: 100%;

        background: #fff;
        color: #333;
    }

    .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body ul li a:hover {
        background: #f9f9f9;
    }

    .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body ul li.topbar-notice-readed a {
        color: #666;
    }

    .console-component-topbar .topbar-notice .topbar-notice-panel .topbar-notice-body ul li.topbar-notice-readed a .topbar-notice-time {
        color: #999;
    }

    .console-component-topbar .topbar-btn-notice {
        width: auto;
        display: block;
        height: 50px;
    }

    .console-component-topbar .topbar-nav-buoy-wrap ul {
        position: relative;
        z-index: 2;
    }

    .console-component-topbar .topbar-user .topbar-info-dropdown-memu .topbar-user-entrance-list {
        overflow: hidden;
        width: 270px;
        margin: 8px 0;
        padding: 8px 15px;
    }

    .console-component-topbar .topbar-user .topbar-info-dropdown-memu .topbar-user-entrance {
        width: 80px;
        height: 80px;
        float: left;
        text-align: center;
        color: #333;
        -webkit-transition: background 0.15s;
        transition: background 0.15s;
        border-radius: 2px;
    }

    .console-component-topbar .topbar-user .topbar-info-dropdown-memu .topbar-user-entrance:hover {
        background: #f5f5f5;
    }

    .console-component-topbar .topbar-user .topbar-info-dropdown-memu .topbar-user-entrance-logo {
        font-size: 20px;
     
        width: 40px;
        height: 40px;
        display: block;
        vertical-align: middle;
        line-height: 40px;
        color: #788D9B;
    }

    .console-component-topbar .topbar-user .topbar-info-dropdown-memu .user-btn-list .user-btn-link {
        height: 50px;
        line-height: 50px;
        display: block;
        -webkit-transition: all 0.15s;
        transition: all 0.15s;
        text-align: center;
        color: #333;
        border-top: 1px solid #f5f5f5;
    }

    .console-component-topbar .topbar-user .topbar-info-dropdown-memu .user-btn-list .user-btn-link:hover {
        background: #f5f5f5;
    }

    .console-component-topbar .topbar-search {
        position: relative;
    }

    .console-component-topbar .topbar-search .icon-search {
        font-size: 16px;
        padding-right: 4px;
        position: relative;
        top: 2px;
    }

    .console-component-topbar .topbar-search .topbar-search-dropdown {
        height: 38px;
        position: absolute;
        bottom: -38px;
        right: -1px;
        left: auto;
        border: 2px solid #2a2f32;
        background: #fff;
    }

    .console-component-topbar .topbar-search .topbar-search-dropdown input {
        display: block;
        height: 34px;
        padding: 4px 6px;
        margin-right: 30px;
        width: 250px;
        border-width: 0;
        outline: 0;
        line-height: 34px;
        color: #546478;
        font-size: 12px;
    }

    .console-component-topbar .topbar-search:hover .topbar-btn, .console-component-topbar .topbar-notice:hover .topbar-btn {
        background: #2a2f32;
    }

    .topbar-product-category-box .topbar-product-search input {
        width: 100%;
        padding-left: 10px;
        padding-right: 28px;
        padding-bottom: 7px;
        border: none;
        font-size: 18px;
        opacity: 0.3;
        color: #666;
        border-bottom: 2px solid #E3E6E9;
        background-color: transparent;
    }

    .topbar-product-category-box .topbar-product-search input:focus {
        color: #373D41;
        opacity: 1;
        border-bottom: 2px solid #00C1DE;
        outline: 0;
    }

    .topbar-product-category-box .waterfall-group-wrapper dl {
        margin: 0;
        margin-bottom: 8px;
    }

    .topbar-product-category-box .waterfall-group-wrapper dt {
        line-height: 28px;
        color: #999;
        background-color: #f0f0f0;
        padding: 0 8px;
        font-weight: 400;
    }

    .topbar-product-category-box .waterfall-group-wrapper dd {
        margin: 0;
    }

    .topbar-product-category-box .waterfall-group-wrapper dd a {
        display: block;
        padding: 0 8px;
        line-height: 28px;
        height: 28px;
        background: #f5f5f6;
        color: #373D41;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .topbar-product-category-box .waterfall-group-wrapper dd a:hover {
        background: #00C1DE;
        color: #fff;
    }

    .topbar-product-category-box .topbar-filter-tiptxt strong {
        color: #FF9600;
    }

    .topbar-product-category-box .topbar-filter-tiptxt a {
        color: #00C1DE;
    }

</style>