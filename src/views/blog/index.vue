<template>
    <div>
        <top></top>
        <!--导航条-->
       <el-menu
               :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="1" @click="index">
                首页
            </el-menu-item>
            <el-menu-item index="2" @click="writeBlog">
                写博客
            </el-menu-item>
            <el-menu-item index="3" @click="openResourceDialog">贡献资源</el-menu-item>
            <el-menu-item index="3">
                <router-link :to="'/admin/index'">后台</router-link>
            </el-menu-item>
            <!--   <el-menu-item index="4">求助</el-menu-item>-->

            <el-menu-item style="float: right;" index="5" v-show="UNAME==''" @click="openLoginDialog">登录</el-menu-item>
            <el-menu-item style="float: right;" index="5" v-show="UNAME!=''">
                <router-link :to="'/blog/userCenter'">{{UNAME}}</router-link>
            </el-menu-item>
        </el-menu>

        <div style="padding-left: 10px;padding-right:10px;padding-top:15px;">
            <el-row :gutter="20">
                <el-col :span="1"><br></el-col>
                <el-col :span="22">
                    <div class="block" v-show="show==1">
                        <el-carousel height="276px">
                            <el-carousel-item v-for="item in indexUrl" :key="item">
                                <div v-html="item.url"></div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </el-col>
                <el-col :span="1"></el-col>
            </el-row>
        </div>
        <!--博客资源等-->
        <div v-show="show==1">
            <template id="bokeziyuan">
                <div class=" calendar-list-container;" style="padding-left: 10px;padding-right:10px; padding-top: 20px;"
                     align="center">

                    <el-row :gutter="20">
                        <el-col :span="1"><br></el-col>
                        <el-col :span="17">


                            <template>
                                <el-table
                                        :data="blogList"
                                        style="width: 100%;"
                                        :show-header=false

                                >
                                    <el-table-column>
                                        <template scope="scope" style="line-height: 39px;">
                                            <br>
                                            <span style="font-size: 16px; font-weight: bold;color: #666;"
                                                  @click="read(scope.row.id)">
                                                    {{scope.row.blogsName}}
                                                </span>
                                            <br>
                                            <span style="margin-left:-1%;padding: 1%;font-size: 14px;color:#f9c855"> {{scope.row.blogsClassifyName}}</span>
                                            <span> <img src="">{{scope.row.blogsDate|parseTime('{y}-{m}-{d} {h}:{i} ')}}</span>
                                            <span><img src=""> {{scope.row.userName}}</span>
                                            <br><br>
                                        </template>
                                    </el-table-column>
                                </el-table>

                            </template>
                            <div style="padding: 20px;">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                               :current-page.sync="listQuery.pageNum"
                                               :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                                </el-pagination>
                            </div>

                        </el-col>

                        <el-col :span="5">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span  style="margin-left:-75%;color: #666;font-size: 16px;">资源</span>
                                    <el-pagination
                                            style="padding-top: -39px;"
                                            small
                                            @current-change="loading"
                                            layout="prev, pager, next"
                                           >
                                    </el-pagination>
                                </div>
                                <template>
                                    <el-table
                                            :data="resourceList"
                                            :show-header=false
                                            style="width: 100%">
                                        <el-table-column>
                                            <template scope="scope">
                                                <span> {{scope.row.resouceName}}</span><br>
                                                <span> {{scope.row.context}}</span>
                                                <span> {{scope.row.creatTime}}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </el-card>
                            <div style="padding-top: 20px;">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span  style="margin-left:-75%;color: #666;font-size: 16px;">点击排行</span>
                                    </div>
                                    <template>

                                        abcd<br>
                                        abcd<br>
                                        abcd<br>
                                        abcd<br>
                                        abcd<br>
                                    </template>
                                </el-card>
                            </div>
                            <div style="padding-top: 20px;">
                                <notice></notice>
                            </div>
                            <div style="padding-top: 20px;">
                                <contact></contact>
                            </div>
                        </el-col>
                        <el-col :span="1"></el-col>
                    </el-row>

                </div>
            </template>

        </div>

        <!--写博客-->
        <div style="margin-top:50px;width:96%;margin-left: 2%;" v-show="show==2">
            <template>
                <el-form :model="blog" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="标题:" prop="blogsName">
                        <el-input v-model="blog.blogsName" style="width:100%;"></el-input>
                        <!--  <el-select v-model="blog.leixing" filterable style="width:10%;" placeholder="请选择">
                              <el-option
                                      v-for="item in leixing"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                              </el-option>
                          </el-select>-->
                    </el-form-item>

                    <el-form-item label="正文:">
                        <div style="padding-bottom: 40px;">
                            <quill-editor v-model="blogContext"
                                          ref="myQuillEditor"
                                          style="height: 500px;"
                                          class="editer"
                                          @ready="onEditorReady($event)">
                            </quill-editor>
                        </div>
                    </el-form-item>
                    <el-form-item label="分类:" prop="blogsClassifyId">
                        <el-radio-group v-model="blog.blogsClassifyId">
                            <el-radio :label="1">人工智能</el-radio>
                            <el-radio :label="2">移动开发</el-radio>
                            <el-radio :label="3">物联网架构</el-radio>
                            <el-radio :label="4"> 云计算/大数据</el-radio>
                            <el-radio :label="5">游戏开发</el-radio>
                            <el-radio :label="6"> 运维</el-radio>
                            <el-radio :label="7"> 数据库</el-radio>
                            <el-radio :label="8"> 前端</el-radio>
                            <el-radio :label="9"> 安全</el-radio>
                            <el-radio :label="10"> 编程语言</el-radio>
                            <el-radio :label="11"> 程序人生</el-radio>
                            <el-radio :label="12"> 随笔</el-radio>
                            <el-radio :label="13"> 其他</el-radio>
                        </el-radio-group>

                    </el-form-item>
                    <el-form-item>
                        <div style="margin-left: 35%;">
                            <el-button type="success" @click="saveBlog(1)" round>保存</el-button>
                            <el-button type="info" @click="saveBlog(0)" round>草稿</el-button>
                            <el-button type="danger" round>取消</el-button>
                        </div>
                    </el-form-item>
                </el-form>
                <div v-html="datas">
                    <div>{{datas}}</div>
                </div>
            </template>
        </div>
        <!--传资源-->
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
        <!--登陸注冊-->
        <el-dialog title="" :visible.sync="loginDialog" align="center">
            <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" class="demo-ruleForm"
                     v-show="loginOrRigister">
                <h3 class="title">系统登录</h3>
                <el-form-item prop="userName" label="用户名:" required>
                    <el-input name="userName" type="text" v-model="loginForm.userName"
                              placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="passWord" label="密码:" required>
                    <el-input name="passWord" type="password" v-model="loginForm.passWord"
                              placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login('loginForm')" style="width:100%;">
                        登录
                    </el-button>
                </el-form-item>
                <a @click="toRigister" class="forget-pwd">
                    没有账号?(赶紧注册一个吧)
                </a>
            </el-form>
            <el-form :model="rigitsterForm" status-icon :rules="rigitsterRules" ref="rigitsterForm"
                     class="demo-ruleForm" v-show="!loginOrRigister">
                <h3 class="title">系统注册</h3>
                <el-form-item prop="userName" label="用户名:" required>
                    <el-input type="text" v-model="rigitsterForm.userName"
                              @blur="cheackName" auto-complete="off" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="passWord" label="密码:" required>
                    <el-input type="password" v-model="rigitsterForm.passWord"
                              placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item prop="checkPassWord" label="确认密码:" required>
                    <el-input type="password" v-model="rigitsterForm.checkPassWord"
                              placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱:" required>
                    <el-input type="text" v-model="rigitsterForm.email"
                              placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="code" label="验证码:" required>
                    <el-input type="text" style="width: 45%" v-model="rigitsterForm.code"
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
                <el-form-item>
                    <el-button type="primary" style="width:100%;" @click="rigster('rigitsterForm')">
                        注册
                    </el-button>
                </el-form-item>
                <a @click="toLogin" class="forget-pwd">
                    注册成功，赶紧去登录吧！
                </a>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    import contact from '../component/contact';
    import notice from '../component/notice';
    import top from '../component/top';
    import {quillEditor} from 'vue-quill-editor';
    import {getCode, cName, saveUser, login, valUser} from 'api/blog/user';
    import {saveB, selectBlogsPage} from 'api/blog/blog';
    import {getAllCarousel} from 'api/admin/index';
    import {saveResouce, getResouceList} from 'api/blog/resouce';
    import tokenStore from 'store2';
    import {parseTime} from 'utils';

    export default {
        components: {
            quillEditor, contact, notice,top
        },

        data() {
            var validateRename = (rule, value, callback) => {
                this.cheackName();
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else if (value.length <= 0) {
                    callback(new Error('请输入用户名!'));
                } else if (this.cna) {
                    callback(new Error('用户名已存在!'));
                } else {
                    callback();
                }
            };
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.temp.repassword !== '') {
                        this.$refs.formName.validateField('repassword');
                    }
                    callback();
                }
            };
            var validateRepassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.rigitsterForm.passWord) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validateCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else if (value !== this.valCode) {
                    callback(new Error('验证码不正确'));
                } else {
                    callback();
                }
            };
            return {
                /*弹窗状态*/
                resourceDialog: false,
                activeIndex:'1',
                loginDialog: false,
                /*页面切换*/
                show: 1,
                content: '',
                datas: '',
                cna: false,
                blogList: [],

                resourceList: [],
                indexUrl: [],
                blog: {blogsName: '', blogsClassifyId: '', blogsStatus: ''},
                resource: {resouceName: '', resouceUrl: '', context: '', status: ''},
                listLoading: false,
                loginForm: {userName: '', passWord: ''},

                rigitsterForm: {
                    userName: '',
                    email: '',
                    code: '',
                    passWord: '',
                    checkPassWord: ''
                },
                loginOrRigister: true,
                count: '',
                timer: null,
                showTime: false,
                options: [],
                blogContext: '',
                value8: '',
                UNAME: '',
                valCode: '',
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                pageSize: 5,

                total: null,
                rigitsterRules: {
                    userName: [
                        {validator: validateRename, trigger: 'blur'},
                        {pattern: /^[^ ]+$/, message: '用户名中不能包含空格', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur,change'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
                    ],
                    code: [
                        {validator: validateCode, trigger: 'blur,change'}
                    ],
                    password: [
                        {validator: validatePassword, message: '请输入密码', trigger: 'blur'}
                    ],
                    checkPassWord: [
                        {validator: validateRepassword, trigger: 'blur'}
                    ]
                },
                loginRules: {
                    userName: [

                        {pattern: /^[^ ]+$/, message: '用户名中不能包含空格', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                },
            };
        },
        created() {
            this.UNAME = tokenStore.local('User').userName;
            this.getBlogs();
            getAllCarousel().then(response => {
                this.indexUrl = response.data.returnData;
            });
            this.getReso();



        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        methods: {
            index() {
                this.show = 1;
            }, writeBlog() {
                this.show = 2;
            },
            read(id) {
                this.$router.push('/blog/read?id=' + id);
            },
            saveBlog(blogsStatus) {
                this.blog.blogsStatus = blogsStatus;
                this.blog.blogsUrl = this.blogContext;
                this.blog.userName = this.UNAME;

                saveB(this.blog).then(response => {
                    this.$notify({
                        title: response.data.returnCode == 200 ? '成功' : '失败',
                        message: response.data.returnMsg,
                        type: response.data.returnCode == 200 ? 'success' : 'warning',
                        duration: 5000
                    });
                    this.getBlogs();
                });
            },

            saveReso() {
                this.resource.userId = tokenStore.local('User').id;
                this.resource.userName = tokenStore.local('User').userName;
                saveResouce(this.resource).then(response => {
                    this.$notify({
                        title: response.data.returnCode == 200 ? '成功' : '失败',
                        message: response.data.returnMsg,
                        type: response.data.returnCode == 200 ? 'success' : 'warning',
                        duration: 5000
                    });
                    this.getReso();
                });
            },
            getBlogs() {
                this.listQuery.filterList = [];
                this.listQuery.filterList.push({
                    filterKey: 'blogsStatus',
                    filterValue: 1
                })
                this.listQuery.filterList.push({
                    filterKey: 'status',
                    filterValue: 2
                })
                selectBlogsPage(this.listQuery).then(response => {
                    this.blogList = response.data.returnData.pageInfo.list;
                    this.total = response.data.returnData.pageInfo.total;
                });
            },


            getReso() {
                this.resource.resouceName = "";
                this.resource.status = 2;
                getResouceList(this.resource, this.pageSize).then(response => {
                    this.resourceList = response.data.returnData.list;
                });
            },

            loading(val) {
                       this.pageSize =val;
                this.getReso();
            },
            onEditorReady(editor) {
            },
            /*打开关闭弹框*/
            openResourceDialog() {
                this.resourceDialog = true;
            }, closeResourceDialog(formName) {
                this.resourceDialog = false;
                this.$refs[formName].resetFields();
            },
            openLoginDialog() {
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
                                tokenStore.local.set('User', response.data.returnData)
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
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getBlogs();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getBlogs();
            },
        }
    }
</script>
<style lang="scss">
    @import '../../styles/index.scss'; // 全局自定义的css样式
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 100px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
    }

</style>
