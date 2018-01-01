<template>
    <div class="app-container calendar-list-container">
        <template>
            <el-tabs type="border-card">
                <el-tab-pane label="轮播图"  >
                    <el-upload
                            class="upload-demo"
                            drag
                            :onSuccess="uploadSuccess"
                            action="http://localhost:8088/api/admin/upl"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                    <el-table
                            :data="Carousel"
                            border
                            style="width: 100%">
                        <el-table-column label="操作" width="190">
                            <template scope="scope">

                                <el-button
                                        type="danger" size="small" v-waves icon="delete"
                                        @click="handleEdit(scope.$index, scope.row)">删除
                                </el-button>

                            </template>
                        </el-table-column>
                        <el-table-column label="图片">
                            <template scope="scope">
                                <div v-html="scope.row.url"></div>

                            </template>
                        </el-table-column>

                    </el-table>

                </el-tab-pane>
                <el-tab-pane label="博客管理" >
                    <el-table
                            :data="blogList"
                            style="width: 100%">
                        <el-table-column width="180px">
                            <template scope="scope" >
                                <div v-if="scope.row.blogsStatus==1&&scope.row.status==0">
                                    <el-button size="small" type="success" @click="pass(2,scope.row.id)">通过</el-button>
                                    <el-button size="small" type="danger" @click="pass(1,scope.row.id)">驳回</el-button>
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
                <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
            </el-tabs>
        </template>

    </div>
</template>

<script>
    import {formatDate} from 'utils/date.js';
    import {getAllCarousel, deleteCarousel} from 'api/admin/index';
    import {selectBlogsPage,passBlog} from 'api/blog/blog';

    export default {
        name: 'cloudUser',
        data() {
            return {
                Carousel: '',
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                blogList: '',
                total: '',
            }
        },
        created() {
            this.getAllC();
            this.getBlogs();
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            }
        },
        methods: {
            getAllC() {
                getAllCarousel().then(response => {
                    this.Carousel = response.data.returnData;
                });
            },
            getBlogs() {
                selectBlogsPage(this.listQuery).then(response => {
                    this.blogList = response.data.returnData.pageInfo.list;
                    this.total = response.data.returnData.pageInfo.total;
                });
            },
            read(id) {
                this.$router.push('/blog/read?id=' + id);
            },
            pass(status,id){
                passBlog(status,id).then(response => {
                    this.getBlogs();
                });
            },
            handleEdit(index, row) {
                deleteCarousel(row.id).then(response => {
                    this.getAllC();
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
            uploadSuccess(response) {
                this.getAllC();
            },


        }
    }
</script>



