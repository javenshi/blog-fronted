<template>
    <div><top></top>
    <div class="app-container calendar-list-container">
        <el-tabs type="border-card">
            <el-tab-pane label="我的博客" >
                <el-table
                        :data="blogList"
                        style="width: 100%">
                    <el-table-column width="180px">
                        <template scope="scope" >
                            <div>
                                <el-button size="small" type="primary" @click="updateBlogs(scope.row.id)">编辑</el-button>
                                <el-button size="small" type="danger" @click="deleteBlogs(scope.row.id)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column width="180px">
                        <template scope="scope" >
                            <el-tag v-show="scope.row.status==0"type="warning">未审核</el-tag>
                            <el-tag v-show="scope.row.status==1" type="danger">驳回</el-tag>
                            <el-tag v-show="scope.row.status==2"type="success">通过</el-tag>
                            <el-tag v-if="scope.row.blogsStatus==0" type="warning">草稿</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template scope="scope">
                                                <span @click="read(scope.row.id)">
                                                    {{scope.row.blogsName}}
                                                </span>
                            <br>
                            <span> {{scope.row.blogsDate|parseTime('{y}-{m}-{d}{h}:{i} ')}}</span>
                            <span> {{scope.row.userName}}</span>
                            <span> {{scope.row.blogsClassifyName}}</span>
                        </template>
                    </el-table-column>
                </el-table>

                <div  class="pagination-container">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page.sync="listQuery.pageNum"
                                   :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                                   layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="我的资源">
                <el-table
                        :data="resourceList"
                        style="width: 100%">
                    <el-table-column width="180px">
                        <template scope="scope" >
                            <div>
                                <el-button size="small" type="primary" @click="openRDis(scope.$index)">编辑</el-button>
                                <el-button size="small" type="danger" @click="deleteRes(scope.row.id)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column>
                        <template scope="scope">
                                                <span @click="read(scope.row.id)">
                                                    {{scope.row.resouceName}}
                                                </span>
                            <br>
                            <span> {{scope.row.creatTime|parseTime('{y}-{m}-{d}{h}:{i} ')}}</span>
                            <span> {{scope.row.userName}}</span>
                            <span> {{scope.row.context}}</span>
                        </template>
                    </el-table-column>
                </el-table>

                <div  class="pagination-container">
                    <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1"
                                   :current-page.sync="listQuery1.pageNum"
                                   :page-sizes="[10,20,30, 50]" :page-size="listQuery1.pageSize"
                                   layout="total, sizes, prev, pager, next, jumper" :total="total1">
                    </el-pagination>
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
                            <el-button @click="resourceDialog=false">取 消</el-button>
                            <el-button @click="updateRess" type="primary">确
                                定
                            </el-button>
                        </el-form-item>
                    </el-form>

                </el-dialog>
            </el-tab-pane>
        </el-tabs>
    </div>
    <down></down>
    </div>
</template>

<script>
    import down from '../component/down';
    import {selectResourcesPage,updateRes,deleteRe} from 'api/blog/resouce';
    import {selectBlogsPage,deleteBlog} from 'api/blog/blog';
    import tokenStore from 'store2';
    import {parseTime} from 'utils';
    import top from '../component/top';
    export default {
        components: {
            top,down
        },
        data() {
            return {
                UID:'',
                blogList:'',
                resourceDialog: false,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                total: '',
                listQuery1: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                total1: '',
                resourceList:'',
                resource:'',
            };
        }, created() {
            this.UID = tokenStore.session('User').id;
            this.getBlogs();
            this.getResources();
        },

        methods: {
            updateBlogs(id){
                this.$router.push('/blog/updateBlogs?id=' + id);
            },
            getBlogs() {
                this.listQuery.filterList=[];
                this.listQuery.filterList.push({
                    filterKey: 'userId',
                    filterValue: this.UID
                });

                selectBlogsPage(this.listQuery).then(response => {
                    this.blogList = response.data.returnData.pageInfo.list;
                    this.total = response.data.returnData.pageInfo.total;
                });
            },
            getResources() {
                this.listQuery1.filterList=[];
                this.listQuery1.filterList.push({
                    filterKey: 'userId',
                    filterValue: this.UID
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
                    this.resourceDialog=false;
                    this.getResources();
                });
            },
            deleteRes(id) {
                deleteRe(id).then(response => {
                    this.getResources();
                });
            },
            openRDis(id){
                this.resourceDialog=true;
             this.resource=this.resourceList[id];

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

        }
    }
</script>