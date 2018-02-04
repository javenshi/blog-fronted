<template>
    <div>
        <top></top>
        <div style="padding-left: 10px;padding-right:10px;padding-top:15px;">
            <el-row :gutter="20">
                <el-col :span="1"><br></el-col>
                <el-col :span="22">
                    <div class="block">
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

        <div>
            <template id="bokeziyuan">
                <div class=" calendar-list-container;" style="padding-left: 10px;padding-right:10px; padding-top: 20px;"
                     align="center">

                    <el-row :gutter="20">
                        <el-col :span="1">
                            <br>
                        </el-col>
                        <el-col :span="16">
                            <el-card v-if="blog">
                                <div slot="header">
                                    <span class="title">博客</span>
                                </div>
                                <template>
                                    <el-table
                                            style="width: 100%;"
                                            :show-header=false
                                            v-loading="loadingBlog"
                                            element-loading-text="拼命加载中"
                                            element-loading-spinner="el-icon-loading"
                                            element-loading-background="rgba(0, 0, 0, 0.8)"
                                            :data="blogList"
                                    >
                                        <el-table-column>
                                            <template scope="scope" >
                                                <br>
                                                <span class="titleName cursor"
                                                      @click="read(scope.row.id)">
                                                    {{scope.row.blogsName}}
                                                </span>
                                                <br>
                                                <br>
                                                <span class="part"> {{scope.row.blogsPart}}...</span>
                                                <br> <span
                                                    class="className"> {{scope.row.blogsClassifyName}}</span>
                                                <span class="img1"><img
                                                        src="../../img/time.png" >{{scope.row.blogsDate|parseTime('{y}-{m}-{d} {h}:{i} ')}}</span>
                                                <span  class="img1"><span
                                                        v-html="scope.row.profileUrl"></span>{{scope.row.userName}}</span>
                                                <span  class="img1"><img
                                                        src="../../img/click.png" > {{scope.row.blogsClick}}</span>
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
                            </el-card>
                            <el-card v-else>
                                <div slot="header">
                                    <span class="title">资源</span>
                                </div>
                                <template>
                                    <el-table
                                            style="width: 100%;"
                                            :show-header=false
                                            v-loading="loadingRes"
                                            element-loading-text="拼命加载中"
                                            element-loading-spinner="el-icon-loading"
                                            element-loading-background="rgba(0, 0, 0, 0.8)"
                                            :data="resourceList"
                                    >
                                        <el-table-column>
                                            <template scope="scope" >
                                                <br>
                                                <span class="titleName cursor"
                                                      @click="getResource(scope.row)"> {{scope.row.resouceName}}
                                                </span>
                                                <br>
                                                <br>
                                                <span class="part"> {{scope.row.context}}...</span>
                                                <br> <span class="className"> {{scope.row.blogsClassifyName}}</span>
                                                <span  class="img1"><img
                                                        src="../../img/time.png" >{{scope.row.creatTime|parseTime('{y}-{m}-{d} {h}:{i} ')}}</span>
                                                <span  class="img1"><span
                                                        v-html="scope.row.profileUrl"></span>{{scope.row.userName}}</span>
                                                <span  class="img1"><img
                                                        src="../../img/click.png" > {{scope.row.resouceClick}}</span>
                                                <br><br>
                                            </template>
                                        </el-table-column>
                                    </el-table>

                                </template>
                                <div style="padding: 20px;">
                                    <el-pagination @size-change="handleSizeChange1"
                                                   @current-change="handleCurrentChange1"
                                                   :current-page.sync="listQuery1.pageNum"
                                                   :page-sizes="[10,20,30, 50]" :page-size="listQuery1.pageSize"
                                                   layout="total, sizes, prev, pager, next, jumper" :total="total1">
                                    </el-pagination>
                                </div>
                            </el-card>
                        </el-col>
                        <el-col :span="1">
                            <br>
                            <div align="center ">
                                <img  @click="toLeft" class="cursor" src="../../img/huadong.png">
                                <br>

                            </div>
                        </el-col>
                        <el-col :span="5">
                            <el-card v-if="blog">
                                <div slot="header">
                                    <span class="rTitle">资源</span>
                                </div>
                                <template>
                                    <el-table
                                            style="width: 100%;"
                                            :show-header=false
                                            v-loading="loadingRes"
                                            element-loading-text="拼命加载中"
                                            element-loading-spinner="el-icon-loading"
                                            element-loading-background="rgba(0, 0, 0, 0.8)"
                                            :data="resourceList"
                                    >
                                        <el-table-column>
                                            <template scope="scope" >

                                                <span v-html="scope.row.profileUrl"></span>
                                                <span class="cursor"
                                                      @click="getResource(scope.row)"> {{scope.row.resouceName}}
                                                </span>


                                            </template>
                                        </el-table-column>
                                    </el-table>

                                    <el-pagination
                                            style="padding-top: -39px;"
                                            small
                                            :total="total1"
                                            @current-change="handleCurrentChange1"
                                            layout="prev, pager, next"
                                    >
                                    </el-pagination>
                                </template>
                            </el-card>
                            <el-card v-else>
                                <div slot="header">
                                    <span  class="rTitle">博客</span>
                                </div>

                                <template>

                                    <el-table

                                            style="width: 100%;"
                                            :show-header=false
                                            v-loading="loadingBlog"
                                            element-loading-text="拼命加载中"
                                            element-loading-spinner="el-icon-loading"
                                            element-loading-background="rgba(0, 0, 0, 0.8)"
                                            :data="blogList"
                                    >
                                        <el-table-column>
                                            <template scope="scope" >
                                                <span v-html="scope.row.profileUrl"></span>
                                                <span class="cursor"
                                                      @click="read(scope.row.id)">
                                                    {{scope.row.blogsName}}
                                                </span>
                                                <br>

                                            </template>
                                        </el-table-column>
                                    </el-table>

                                </template>
                                <div style="padding: 20px;">
                                    <el-pagination @current-change="handleCurrentChange"
                                                   small
                                                   layout="prev, pager, next" :total="total">
                                    </el-pagination>

                                </div>
                            </el-card>
                            <el-dialog :title="resourceItem.resouceName" :visible.sync="resourceDialog" align="center">

                                <el-form :model="resourceItem" status-icon
                                         class="demo-ruleForm">

                                    <el-form-item label="资源Url:" prop="resouceUrl">
                                        <span class="disable">{{resourceItem.resouceUrl}}</span>
                                        &nbsp;&nbsp;&nbsp;
                                        <el-button type="primary" size="mini"
                                                   @click="copyUrl(resourceItem.resouceUrl,resourceItem.id)"
                                        >下载
                                        </el-button>
                                    </el-form-item>
                                    <el-form-item label="资源描述:" prop="context">
                                        {{resourceItem.context}}
                                    </el-form-item>
                                    <el-form-item label="作者:" prop="context">
                                        <span v-html="resourceItem.profileUrl"></span>
                                        {{resourceItem.userName}}于{{resourceItem.creatTime|parseTime('{y}年{m}月{d}日')}}发表
                                    </el-form-item>
                                    <el-form-item label="下载次数:">
                                        {{resourceItem.resouceClick}}
                                    </el-form-item>

                                </el-form>

                            </el-dialog>


                        </el-col>
                        <el-col :span="1"></el-col>
                    </el-row>
                    <down></down>
                </div>
            </template>

        </div>

    </div>
</template>

<script>
    import contact from '../component/contact';
    import notice from '../component/notice';
    import top from '../component/top';
    import down from '../component/down';
    import {selectBlogsPage} from 'api/blog/blog';
    import {getAllCarousel} from 'api/admin/index';
    import {getResouceList, resourceClick} from 'api/blog/resouce';
    import tokenStore from 'store2';
    import {parseTime} from 'utils';

    export default {
        components: {
            contact, notice, top, down
        },

        data() {

            return {
                loadingBlog: false,
                loadingRes: false,
                blogList: [],
                resourceList: [],
                resourceDialog: false,
                indexUrl: [],
                listLoading: false,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                listQuery1: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                total1:'',
                resource: {resouceName: '', status: ''},
                resourceItem: {
                    resouceName: '',
                    resouceUrl: '',
                    resouceClick: '',
                    creatTime: '',
                    userName: '',
                    context: '',
                    profileUrl: ''
                },

                total: '',
                totalRe: null,
                blog: true,

            };
        },
        created() {
            this.getBlogs();
            this.getReso();
            getAllCarousel().then(response => {
                this.indexUrl = response.data.returnData;
            });


        },

        methods: {
            toLeft() {
                if(this.blog){
                    this.blog = false;
                }else{
                    this.blog = true;
                }

            },

            read(id) {
                this.$router.push('/blog/read?id=' + id);
            },
            getResource(item) {
                this.resourceItem = item;
                this.resourceDialog = true;
            },

            getBlogs() {
                this.loadingBlog = true;
                this.listQuery.filterList = [];
                this.listQuery.filterList.push({
                    filterKey: 'blogsStatus',
                    filterValue: 1
                })
                this.listQuery.filterList.push({
                    filterKey: 'status',
                    filterValue: 2
                })
                if (tokenStore.session('search') != '' && tokenStore.session('search') != null) {
                    this.listQuery.filterList.push({
                        filterKey: 'select',
                        filterValue: tokenStore.session('search')
                    })
                    this.resource.resouceName = tokenStore.session('search');
                    tokenStore.session.remove('search');
                }
                selectBlogsPage(this.listQuery).then(response => {
                    this.blogList = response.data.returnData.pageInfo.list;
                    this.total = response.data.returnData.pageInfo.total;
                    this.$route.query.search = '';
                    this.loadingBlog = false;
                });
            },


            getReso() {
                this.loadingRes = true;
                this.listQuery1.filterList = [];
                this.listQuery1.filterList.push({
                    filterKey: 'status',
                    filterValue: 2
                });
                if (this.resource.resouceName != null && this.resource.resouceName != '') {
                    this.listQuery1.filterList.push({
                        filterKey: 'resouceName',
                        filterValue: this.resource.resouceName
                    })
                    this.listQuery1.filterList.push({
                        filterKey: 'userName',
                        filterValue: this.resource.resouceName
                    })
                }
                getResouceList(this.listQuery1).then(response => {
                    this.resourceList = response.data.returnData.pageInfo.list;
                    this.total1 = response.data.returnData.pageInfo.total;
                    this.resource.resouceName = '';
                    this.loadingRes = false;
                });
            },
            copyUrl(url, id) {
                window.open(url);
                resourceClick(id, this.getIp()).then(response => {
                    this.getReso();
                });
                this.resourceDialog = false;
            },
            getIp() {
                return returnCitySN["cip"];
            },
            loading(val) {
                this.pageSize = val;
                this.getReso();
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
                this.getReso();
            },
            handleCurrentChange1(val) {
                this.listQuery1.pageNum = val;
                this.getReso();
            },
        },
        filters: {}


    }

</script>

<style>


    .rTitle {
        margin-left:-75%;color: #666;font-size: 16px;
    }

    .disable {
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .zleft {
        width: 180px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        color: #282828;
    }

    .title {
        margin-left: -90%;
        color: #666;
        font-size: 16px;
    }

    .titleName {
        font-size: 20px;
        font-weight: bold;
        color: #282828;
    }

    .className {
        margin-left: -1%;
        margin-right: 18px;
        padding: 1%;
        font-size: 14px;
        color: #20a0ff
    }
    .part {
        font-size: 14px;
        color: #666;
    }
    .img1 {
        margin-right:18px;
    }

</style>