<template>
    <div>
        <top></top>
        <div class="app-container calendar-list-container">
            <br>
            <el-card class="box-card">
                <el-row :gutter="20">
                    <el-col :span="2">
                        <span v-html="headurl"></span>
                    </el-col>
                    <el-col :span="18">
                        <span class="fontColor"> 用户名：</span> {{user.userName}}

                        <span class="fontColor">  性别：</span> {{user.gender|fomartGender}}

                        <span class="fontColor">  地址： </span> {{user.location}}

                        <span class="fontColor">   邮箱：</span> {{user.email}}
                        <p></p>
                        <span class="fontColor"  >  个性签名：</span> {{user.description}}
                        <p></p>
                        <span class="fontColor"  >  博客总阅读击次数：</span> {{user.blogclick}}
                        <span class="fontColor"  >  资源总下载次数：</span> {{user.resouceClick}}


                    </el-col>
                    <el-col :span="2">
                        <span @click="openEditUserDis"><el-icon class="cursor y"   name="edit"></el-icon></span>
                    </el-col>
                    <el-col :span="2">
                    </el-col>
                </el-row>
            </el-card>



            <br>
            <el-card class="box-card">
            <el-tabs type="border-card">

                <el-tab-pane >
                    <span slot="label" style="width: 250%;"><i class="el-icon-document"></i> 我的博客</span>

                    <el-table
                            :data="blogList"
                            style="width: 100%">
                        <el-table-column  label="操作" width="180px">
                            <template scope="scope">
                                <div>
                                    <el-button size="small" type="primary" @click="updateBlogs(scope.row.id)">编辑
                                    </el-button>
                                    <el-button size="small" type="danger" @click="deleteBlogs(scope.row.id)">删除
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="审核状态" width="180px">
                            <template scope="scope">
                                <el-tag v-show="scope.row.status==0" type="warning">未审核</el-tag>
                                <el-tag v-show="scope.row.status==1" type="danger">驳回</el-tag>
                                <el-tag v-show="scope.row.status==2" type="success">通过</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="博客状态" width="180px">
                            <template scope="scope">
                                <el-tag v-if="scope.row.blogsStatus==0" type="warning">草稿</el-tag>
                                <el-tag v-if="scope.row.blogsStatus==1" type="success">正式</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="博客" show-overflow-tooltip>
                            <template scope="scope">
                                                    {{scope.row.blogsName}}
                            </template>
                        </el-table-column>
                        <el-table-column label="创建时间">
                            <template scope="scope">
                                <span> {{scope.row.blogsDate|parseTime('{y}-{m}-{d}{h}:{i} ')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="创建时间">
                            <template scope="scope">
                                <span> {{scope.row.blogsDate|parseTime('{y}-{m}-{d}{h}:{i} ')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="阅读次数">
                            <template scope="scope">
                                <span> {{scope.row.blogsClick}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
<br>
                    <div class="pagination-container" align="center">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                       :current-page.sync="listQuery.pageNum"
                                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                                       layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </div>
                    <br>
                </el-tab-pane>
                <el-tab-pane >
                    <span slot="label"><i class="el-icon-share"></i> 我的资源</span>
                    <el-table
                            :data="resourceList"
                            style="width: 100%">
                        <el-table-column label="操作" width="180px">
                            <template scope="scope">
                                <div>
                                    <el-button size="small" type="primary" @click="openRDis(scope.$index)">编辑
                                    </el-button>
                                    <el-button size="small" type="danger" @click="deleteRes(scope.row.id)">删除
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="审核状态" >
                            <template scope="scope">
                                <el-tag v-show="scope.row.status==0" type="warning">未审核</el-tag>
                                <el-tag v-show="scope.row.status==1" type="danger">驳回</el-tag>
                                <el-tag v-show="scope.row.status==2" type="success">通过</el-tag>

                            </template>
                        </el-table-column>
                        <el-table-column label="资源" show-overflow-tooltip>
                            <template scope="scope">
                                                    {{scope.row.resouceName}}
                            </template>
                        </el-table-column>
                        <el-table-column label="上传日期">
                            <template scope="scope">

                                <span> {{scope.row.creatTime|parseTime('{y}-{m}-{d}{h}:{i} ')}}</span>

                            </template>
                        </el-table-column>
                        <el-table-column label="描述" show-overflow-tooltip>
                            <template scope="scope">
                               {{scope.row.context}}
                            </template>
                        </el-table-column>
                        <el-table-column label="下载次数">
                            <template scope="scope">
                                <span> {{scope.row.resouceClick}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
<br>

                    <div class="pagination-container" align="center">
                        <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
                                       :current-page.sync="listQuery1.pageNum"
                                       :page-sizes="[10,20,30, 50]" :page-size="listQuery1.pageSize"
                                       layout="total, sizes, prev, pager, next, jumper" :total="total1">
                        </el-pagination>
                    </div>
                    <br>
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
                                <el-button @click="resourceDialog=false">取 消</el-button>
                                <el-button @click="updateRess" type="primary">确
                                    定
                                </el-button>
                            </el-form-item>
                        </el-form>

                    </el-dialog>
                </el-tab-pane>
            </el-tabs>

            </el-card>
            <el-dialog title="更新个人信息" :visible.sync="editUserDis" size="tiny" align="center">

                <el-form :model="user" status-icon ref="userRules"
                         class="demo-ruleForm">
                    <el-form-item  label="头像:">
                        <el-upload
                                class="upload-demo"
                                :action="url"
                                :on-change="handleChange"
                                :on-success="success"
                        >
                            <span style="margin-left: -130%;"  v-html="headurl"></span>
                            <div class="el-upload__tip" slot="tip">只能上传不超过500kb的图片</div>
                        </el-upload>

                    </el-form-item>

                    <el-form-item
                            prop="userName"
                            label="用户名:"
                            :rules="[
        { min:2,max:20, message: '用户名长度不规范', trigger: 'blur' },
       {  pattern:/^[^ ]+$/, message: '用户名中不能包含空格',trigger: 'blur'},
       {  pattern:/^[^'`/+ - \\ ()（）《》<>~#^$@%&!*,.'' ? <> -]+$/, message: '用户名中不能包含特殊字符',trigger: 'blur'},
       {  pattern:/^[^😃]+$/, message: '用户名中不能包含表情',trigger: 'blur'},
         { required: true, message: '请输入用户名', trigger: 'blur' }
    ]"

                            >
                        <el-input type="text"  v-model="user.userName"
                                  auto-complete="off" placeholder="用户名"></el-input>
                    </el-form-item>


                    <el-form-item prop="email" label="邮箱:" :rules="[
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },

    ]" >
                        <el-input type="text"  v-model="user.email"
                                  placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="gender" label="性别:"
                    >
                        <el-radio class="radio" v-model="user.gender" label="m">男</el-radio>
                        <el-radio class="radio" v-model="user.gender" label="f">女</el-radio>
                        <el-radio class="radio" v-model="user.gender" label="n">未知</el-radio>


                    </el-form-item>
                    <el-form-item prop="location" label="来自:"
                    >
                        <el-input type="text" v-model="user.location"
                                  placeholder=""></el-input>
                    </el-form-item>

                    <el-form-item prop="description" :rules="[
        { max:200, message: '用户名长度不规范', trigger: 'blur' }]" label="个性签名:"
                    ><el-input style="width: 80%;"
                            type="textarea"
                            placeholder="请输入内容"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            max="20"
                            v-model="user.description">
                    </el-input>
                    </el-form-item>
                    <el-form-item
                    >
                        <el-button type="primary" @click="updateUser('userRules')">更新</el-button>
                    </el-form-item>

                </el-form>

            </el-dialog>

        </div>
        <down></down>
    </div>
</template>

<script>
    import down from '../component/down';
    import {selectResourcesPage, updateRes, deleteRe} from 'api/blog/resouce';
    import {selectBlogsPage, deleteBlog} from 'api/blog/blog';
    import {getUserById,updateUser} from 'api/blog/user';
    import tokenStore from 'store2';
    import {parseTime} from 'utils';
    import top from '../component/top';

    export default {
        components: {
            top, down
        },
        data() {
            return {
                url: process.env.BASE_API + '/api/blogUser/upl',
                blogList: '',
                resourceDialog: false,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                total: '',
                user: {
                    id: '', uid: '', userName: '', uSource: '', location: '', description: '',
                    profileUrl: '', gender: '', passWord: '', email: '', integral: '', status: '', createdTime: '',
                },
                userUrl:'',
                editUserDis: false,
                listQuery1: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                total1: '',
                resourceList: '',
                resource: '',
                headurl: '',
            };
        }, created() {
            if(tokenStore.session('user').id!=null&&tokenStore.session('user').id!=''){
            getUserById(tokenStore.session('user').id).then(response => {
                this.user = response.data.returnData;
                this.headurl = '<img class="common-topbar-user-image-wrapper" src=' + this.user.profileUrl + '>';
            });
            this.getBlogs();
            this.getResources();
            }
        },

        methods: {
            updateUser(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      if(this.userUrl!=''&&this.userUrl!=null){
                          this.user.profileUrl= this.userUrl;
                      }
                        updateUser(this.user).then(response => {
                            if(response.data.returnCode == 200){
                                tokenStore.session.set('user',this.user);
                                window.location.reload();
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
            handleChange(file, fileList) {
                if(file.size>735497){
                    this.$refs.upload.abort(file);
                }
            },
            success(response, file, fileList) {
                this.userUrl=response.returnData;
                this.headurl=   '<img class="common-topbar-user-image-wrapper" src='+ response.returnData + '>';
            },
            openEditUserDis() {

                this.editUserDis = true;

            },
            updateBlogs(id) {
                this.$router.push('/blog/updateBlogs?id=' + id);
            },
            getBlogs() {
                this.listQuery.filterList = [];
                this.listQuery.filterList.push({
                    filterKey: 'userId',
                    filterValue: this.user.id
                });

                selectBlogsPage(this.listQuery).then(response => {
                    this.blogList = response.data.returnData.pageInfo.list;
                    this.total = response.data.returnData.pageInfo.total;
                });
            },
            getResources() {
                this.listQuery1.filterList = [];
                this.listQuery1.filterList.push({
                    filterKey: 'userId',
                    filterValue: this.user.id
                });

                selectResourcesPage(this.listQuery1).then(response => {
                    this.resourceList = response.data.returnData.pageInfo.list;
                    this.total1 = response.data.returnData.pageInfo.total;
                });
            },
            deleteBlogs(id) {
                deleteBlog(id).then(response => {
                    this.getBlogs();
                });
            },
            updateRess() {
                updateRes(this.resource).then(response => {
                    this.resourceDialog = false;
                    this.getResources();
                });
            },
            deleteRes(id) {
                deleteRe(id).then(response => {
                    this.getResources();
                });
            },
            openRDis(id) {
                this.resourceDialog = true;
                this.resource = this.resourceList[id];

            },

            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getBlogs();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getBlogs();
            },
            handleSizeChange1(val) {
                this.listQuery1.pageSize = val;
                this.getResources();
            },
            handleCurrentChange1(val) {
                this.listQuery1.pageNum = val;
                this.getResources();
            },

        }, filters: {
            fomartGender(gender) {

                if ('m' == gender) {
                    return '男';
                } else if ('f' == gender) {
                    return '女';
                } else {
                    return '未知';
                }
            }
        }
    }
</script>
<style>
    .el-input{
        width: 80%;
        float: right;
    }
    .common-topbar-user-image-wrapper {
        width: 40px;
        height: 40px;
        margin-left: 50px;
    }

    .fontColor {
        color: #20a0ff;
        margin-left: 20px;
    }
</style>