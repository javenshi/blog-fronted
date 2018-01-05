<template>
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
                                <el-button size="small" type="danger" @click="pass(scope.row.id)">删除</el-button>
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

                <div v-show="!listLoading" class="pagination-container">
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
                            <div  v-if="scope.row.status==0">
                                <el-button size="small" type="success" @click="passResourc(2,scope.row.id)">通过</el-button>
                                <el-button size="small" type="danger" @click="passResourc(1,scope.row.id)">驳回</el-button>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column width="180px">
                        <template scope="scope" >
                            <el-tag v-show="scope.row.status==0"type="warning">未审核</el-tag>
                            <el-tag v-show="scope.row.status==1" type="danger">驳回</el-tag>
                            <el-tag v-show="scope.row.status==2"type="success">通过</el-tag>
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


            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {getCode, cName, saveUser, login, valUser} from 'api/blog/user';
    import {selectBlogsPage} from 'api/blog/blog';
    import tokenStore from 'store2';
    import {parseTime} from 'utils';

    export default {

        data() {
            return {
                UID:'',
                blogList:'',
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                total: '',
            };
        }, mounted() {
            this.UID = tokenStore.local('User').id;
            this.getBlogs();
        },

        methods: {
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
            updateBlogs(id) {
                    this.$router.push('/blog/updateBlogs?id=' + id);
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