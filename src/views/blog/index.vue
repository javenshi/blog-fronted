<template>
    <div>
<!--导航条-->
        <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#000000"
                text-color="#ffffff"
                active-text-color="#ffd04b">
            <el-menu-item index="1" @click="index">
               首页
            </el-menu-item>
            <el-menu-item index="2" @click="writeBlog">
                写博客
            </el-menu-item>
            <el-menu-item index="3" @click="openResourceDialog">贡献资源</el-menu-item>
         <!--   <el-menu-item index="4">求助</el-menu-item>-->

            <el-menu-item style="float: right;" index="5" @click="openLoginDialog">登陆</el-menu-item>
        </el-menu>



        <!--博客资源等-->
        <div v-show="show==1">
            <template id="bokeziyuan">
                <div class="app-container calendar-list-container;" align="center">

                    <el-row :gutter="20">
                        <el-col :span="18">
                            <el-card class="box-card">

                                <template>
                                    <el-table
                                            :data="blogList"
                                            style="width: 100%">
                                        <el-table-column>
                                            <template scope="scope">
                                                <router-link to="/write">
                                                    {{scope.row.name}}
                                                </router-link>
                                             <br>
                                                <span> {{scope.row.date}}</span>
                                                <span> {{scope.row.user}}</span>
                                                <span> {{scope.row.classify}}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </template>
                                <div v-show="!listLoading" class="pagination-container">
                                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                                   :current-page.sync="listQuery.pageNum"
                                                   :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                                                   layout="total, sizes, prev, pager, next, jumper" :total="total">
                                    </el-pagination>
                                </div>
                            </el-card>
                        </el-col>

                        <el-col :span="6">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>资源</span>
                                </div>
                                <template>
                                  <!--  <el-table
                                            :data="blogList"
                                            style="width: 100%">
                                        <el-table-column>
                                            <template scope="scope">
                                                <span> {{scope.row.name}}</span><br>
                                                <span> {{scope.row.date}}</span>
                                                <span> {{scope.row.user}}</span>
                                                <span> {{scope.row.classify}}</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>-->
                                    abcd<br>
                                    abcd<br>
                                    abcd<br>
                                    abcd<br>
                                    abcd<br>
                                    加载更多
                                </template>
                            </el-card>
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>点击排行</span>
                                </div>
                                <template>

                                    abcd<br>
                                    abcd<br>
                                    abcd<br>
                                    abcd<br>
                                    abcd<br>
                                </template>
                            </el-card>
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>本站公告</span>
                                </div>
                                <template>
                                    abcd<br>
                                    abcd<br>
                                    abcd<br>
                                    abcd<br>
                                    abcd<br>
                                </template>
                            </el-card>
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>联系我们</span>
                                </div>
                                <template>

                                    abcd<br>
                                    abcd<br>
                                    abcd<br>
                                    abcd<br>
                                    abcd<br>
                                </template>
                            </el-card>
                        </el-col>
                    </el-row>

                </div>
            </template>

        </div>

        <!--写博客-->
        <div style="margin-top:50px;width:96%;margin-left: 2%;" v-show="show==2">
            <template >
                <el-form :model="blog" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="标题:" prop="name" >
                        <el-input v-model="blog.name" style="width:88%;" ></el-input>
                        <el-select v-model="blog.leixing" filterable  style="width:10%;" placeholder="请选择">
                            <el-option
                                    v-for="item in leixing"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="分类:" prop="classify">
                        <el-select v-model="blog.classify" filterable placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="正文:">
                        <div class="edit_container">
                            <quill-editor v-model="blog.context"
                                          ref="myQuillEditor"
                                          class="editer"
                                          :options="editorOption" @ready="onEditorReady($event)">
                            </quill-editor>
                        </div>
                    </el-form-item>
                <el-form-item>
                    <div style="margin-left: 35%;">
                    <el-button type="success" @click="saveBlog" round>保存</el-button>
                    <el-button type="info" round>草稿</el-button>
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
        <el-dialog :title="传资源" :visible.sync="resourceDialog" align="center">

            <el-form :model="resource" status-icon :rules="rules2" ref="resour"
                     class="demo-ruleForm">
                <el-form-item label="资源名称:" prop="name" required>
                    <el-input size="small" type="input" v-model="resource.name"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="资源Url:" prop="url" required>
                    <el-input size="small"  type="input" v-model="resource.url"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="资源描述:" prop="context">
                    <el-input type="textarea" v-model="resource.context"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="closeResourceDialog('resour')">取 消</el-button>
                    <el-button @click="" type="primary">确
                        定
                    </el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
        <!--登陸注冊-->
        <el-dialog :title="登陸注冊" :visible.sync="loginDialog" align="center">
            <el-form  :model="loginForm" status-icon :rules="loginRules" ref="loginForm"  class="demo-ruleForm" v-show="loginOrRigister">
                <h3 class="title">系统登录</h3>
                <el-form-item prop="userName" label="用户名:" required>
                    <el-input name="userName"  type="text" v-model="loginForm.userName"
                              auto-complete="off"  placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="passWord" label="密码:" required>
                    <el-input name="passWord" type="password"  v-model="loginForm.passWord"
                               placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%;">
                        登录
                    </el-button>
                </el-form-item>
                 <a @click="toRigister" class="forget-pwd">
                     没有账号?(赶紧注册一个吧)
                 </a>
            </el-form>
            <el-form  :model="rigitsterForm" status-icon :rules="loginRules" ref="loginForm"  class="demo-ruleForm" v-show="!loginOrRigister">
                <h3 class="title">系统注册</h3>
                <el-form-item prop="userName" label="用户名:" required>
                    <el-input   type="text" v-model="rigitsterForm.userName"
                              auto-complete="off"  placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="passWord" label="密码:" required>
                    <el-input  type="password"  v-model="rigitsterForm.passWord"
                               placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item prop="checkPassWord" label="确认密码:" required>
                    <el-input  type="password"  v-model="rigitsterForm.checkPassWord"
                               placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱:" required>
                    <el-input  type="text"  v-model="rigitsterForm.email"
                               placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="code" label="验证码:" required>
                    <el-input  type="text" style="width: 45%" v-model="rigitsterForm.code"
                               placeholder="验证码"></el-input>

                        <el-button  v-show="!showTime" type="success"  v-waves icon="plus"
                                    @click="sendCode">
                            获取验证码
                        </el-button>
                    <el-button  v-show="showTime" type="info"
                                   >
                            剩余{{count}}秒
                        </el-button>



                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width:100%;">
                        注册
                    </el-button>
                </el-form-item>
                 <a @click="toLogin" class="forget-pwd">
                    注册成功，赶紧去登陆吧！
                 </a>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor';

    export default {
        components: {
//使用编辑器
            quillEditor
        },
        data() {
            return {
               /*弹窗状态*/
                resourceDialog:false,
                loginDialog:false,
                /*页面切换*/
                show:1,
                content: '',
                datas:'',
                blogList: [
                    {
                        date: '2016-05-03',
                        name: '普陀区',
                        user: '王小虎',
                        classify: '多线程'
                    },
                    {
                        date: '2016-05-03',
                        name: '普陀区',
                        user: '王小虎',
                        classify: '多线程'
                    },
                    {
                        date: '2016-05-03',
                        name: '普陀区',
                        user: '王小虎',
                        classify: '多线程'
                    },
                    {
                        date: '2016-05-03',
                        name: '普陀区',
                        user: '王小虎',
                        classify: '多线程'
                    },
                    {
                        date: '2016-05-03',
                        name: '普陀区',
                        user: '王小虎',
                        classify: '多线程'
                    },
                    {
                        date: '2016-05-03',
                        name: '普陀区',
                        user: '王小虎',
                        classify: '多线程'
                    },
                    {
                        date: '2016-05-03',
                        name: '普陀区',
                        user: '王小虎',
                        classify: '多线程'
                    },
                    {
                        date: '2016-05-03',
                        name: '普陀区',
                        user: '王小虎',
                        classify: '多线程'
                    },
                    {
                        date: '2016-05-03',
                        name: '普陀区',
                        user: '王小虎',
                        classify: '多线程'
                    },
                    {
                        date: '2016-05-03',
                        name: '普陀区',
                        user: '王小虎',
                        classify: '多线程'
                    }
                ],
                blog:{ leixing:'原创',classify:'',context:'',editorOption:{}},
                resource:{name:'',url:'',context:''},
                listLoading: false,
                loginForm:'',
                rigitsterForm:'',
                loginOrRigister:true,
                count: '',
                timer: null,
                showTime:false,
                options: [
                    {
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                leixing: [
                    {
                    value: '原创',
                    label: '原创'
                }, {
                    value: '转载',
                    label: '转载'
                }, {
                    value: '翻译',
                    label: '翻译'
                }],
                value8: '',
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                total: null,
            };
        },mounted(){

        }, 
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        methods: {
            index(){
                this.show=1;
            }, writeBlog(){
                this.show=2;
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },saveBlog(){
                //console.log(this.blog);
                this.datas=this.blog.context;
                //console.log(this.datas);
            },onEditorReady(editor) {
            },
            /*打开关闭弹框*/
            openResourceDialog(){
                this.resourceDialog=true;
            },closeResourceDialog(formName){
                this.resourceDialog=false;
                this.$refs[formName].resetFields();
            },
            openLoginDialog(){
                this.loginDialog=true;
            },closeLoginDialog(formName){
                this.loginDialog=false;
                this.$refs[formName].resetFields();
            },toRigister(){
                this.loginOrRigister=false;
            },toLogin(){
                this.loginOrRigister=true;
            },
            sendCode() {
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.showTime=true;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.showTime=false;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)}
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getBlogList();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getBlogList();
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


</style>
