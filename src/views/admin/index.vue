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
                    <!--<el-form :model="notice" status-icon ref="resour"
                             class="demo-ruleForm">
                        <el-form-item label="公告名称:" prop="name" required>
                            <el-input size="small" type="input" v-model="notice.name"
                                      auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="公告描述:" prop="context" required>
                            <el-input size="small" type="input" v-model="notice.context"
                                      auto-complete="off"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button @click="saveNotice" type="primary">确
                                定
                            </el-button>
                        </el-form-item>
                    </el-form>-->
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
                        <el-table-column width="120px">
                            <template scope="scope" >

                                    <el-button size="small" type="danger" @click="deleteBlogsById(scope.row.id)">删除</el-button>

                            </template>
                        </el-table-column>
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
                <el-tab-pane label="资源管理">
                    <el-table
                            :data="resourceList"
                            style="width: 100%">
                        <el-table-column width="180px">
                            <el-table-column width="120px">
                                <template scope="scope" >
                                    <el-button size="small" type="danger" @click="deleteResourceById(scope.row.id)">删除</el-button>
                                    <div  v-if="scope.row.status==0">
                                        <el-button size="small" type="success" @click="passResourc(2,scope.row.id)">通过</el-button>
                                        <el-button size="small" type="danger" @click="passResourc(1,scope.row.id)">驳回</el-button>
                                    </div>
                                </template>



                            </el-table-column>

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
                <el-tab-pane label="意见管理">
                    <el-table
                            :data="proList"
                            style="width: 100%">
                        <el-table-column width="180px">
                            <template scope="scope" >
                                <div>
                                    <el-button size="small" type="danger" @click="deletePro(scope.row.id)">删除</el-button>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column>
                            <template scope="scope">

                                {{scope.row.context}}

                                <br>
                                <span> {{scope.row.creatTime|parseTime('{y}-{m}-{d} {h}:{i} ')}}</span>
                                <span> {{scope.row.userName}}</span>
                                <span> {{scope.row.answer}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="180px">
                            <template scope="scope" >
                                <div v-if="scope.row.answer==null">
                                    <el-button size="small" type="primary" @click="Reply0(scope.$index)">回复</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button type="danger"  @click="getMorePro">加载更多</el-button>
                    <el-dialog title="传资源" :visible.sync="proPlyDialog" align="center">
                        <el-form>
                        <el-input v-model="answer" placeholder="请输入内容"></el-input>
                        <el-button size="small" type="primary" @click="Reply">回复</el-button>
                        </el-form> </el-dialog>


                </el-tab-pane>
            </el-tabs>
        </template>

    </div>
</template>

<script>
    import {formatDate} from 'utils/date.js';
    import {getAllCarousel, deleteCarousel} from 'api/admin/index';
    import {selectBlogsPage,passBlog,saveNa,deleteBlog} from 'api/blog/blog';
    import {getResouceList,passResourc,deleteRe} from 'api/blog/resouce';
    import {getProList,deletePro0,updatePro} from 'api/blog/proposal';
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
                rowId:'',
                proPlyDialog:false,
                answer:'',
                pageSize:1,
                resourceList:'',
                blogList: '',
                proList: '',
                proSize: 5,
                notice:{name:'',context:''},
                total: '',
                resource:{resouceName:''},
            }
        },
        created() {
            this.getAllC();
            this.getBlogs();
            this.getReso();
            this.getProList0();
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
            deleteBlogsById(id){
                deleteBlog(id).then(response => {
                    this.getBlogs();
                });
            },
            deleteResourceById(id){
                deleteRe(id).then(response => {
                    this.getReso();
                });
            },
            passResourc(status,id){
                passResourc(status,id).then(response => {
                    this.getReso();

                });
            },
            getReso() {
                this.resource.resouceName="";
                this.resource.status=3;
                getResouceList(this.resource,this.pageSize).then(response => {
                    this.resourceList = response.data.returnData.list;
                });
            },
            saveNotice() {

                saveNa(this.notice).then(response => {

                });
            },
            getProList0() {
                getProList(this.proSize).then(response => {
                    this.proList = response.data.returnData.list;
                });
            }, deletePro(id) {
                deletePro0(id).then(response => {
                    this.getProList0();
                });
            },
            Reply0(id){
                this.rowId=id;
                this.proPlyDialog=true;
            },
            Reply() {

                this.proList[this.rowId].answer=this.answer;


                updatePro(this.proList[this.rowId]).then(response => {
                    this.proPlyDialog=false;
                    this.getProList0();
                });
            },
            getMorePro() {
                this.proSize+=5;
                this.getProList0();
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



