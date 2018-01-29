<template>
    <div style="margin: -8px;">
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
                        <el-col :span="1"><br></el-col>
                        <el-col :span="17">


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
                                        <template scope="scope" style="line-height: 39px;">
                                            <br>
                                            <span style="font-size: 20px; font-weight: bold;color: #282828;"
                                                  @click="read(scope.row.id)">
                                                    {{scope.row.blogsName}}
                                                </span>
                                            <br>
                                            <span style="font-size: 14px;color: #666;"> {{scope.row.blogsPart}}...</span>
                                            <br> <span
                                                style="margin-left:-1%;margin-right:18px;padding: 1%;font-size: 14px;color:#20a0ff"> {{scope.row.blogsClassifyName}}</span>
                                            <span style="margin-right:18px; margin-top: 2px;"><el-icon
                                                    name="time"></el-icon>{{scope.row.blogsDate|parseTime('{y}-{m}-{d} {h}:{i} ')}}</span>
                                            <span style="margin-right:18px;"><span v-html="scope.row.profileUrl"></span>{{scope.row.userName}}</span>
                                            <span style="margin-right:18px; margin-top: 2px;"><img
                                                    src="../../img/click.png" style="margin-right:6px;"> {{scope.row.blogsClick}}</span>
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
                            <el-card>
                                <div slot="header">
                                    <span style="margin-left:-75%;color: #666;font-size: 16px;">资源</span>

                                </div>
                                <template>
                                    <div v-for="item in resourceList" :key="item">
                                        <span style=" width:180px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;font-size: 14px; color: #282828;"> <span
                                                style="float: left;"
                                                @click="getResource(item)"> {{item.resouceName}}</span></span>

                                        <br>
                                        <div style="width:180px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;font-size: 12px;">
                                            <span style="float: left;"> <span v-html="item.profileUrl"></span> {{item.userName}}
                                            <span> <el-icon
                                                    name="time"></el-icon>{{item.creatTime |parseTime('{y}-{m}-{d} ')}}</span>
                                       </span></div>
                                        <hr>
                                    </div>

                                    <el-pagination
                                            style="padding-top: -39px;"
                                            small
                                            :total="totalRe"
                                            @current-change="loading"
                                            layout="prev, pager, next"
                                    >
                                    </el-pagination>
                                </template>
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
                            <div style="padding-top: 20px;">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span style="margin-left:-75%;color: #666;font-size: 16px;">点击排行</span>
                                    </div>
                                    <template>
                                        <div v-for="(item,index) in ranking" :key="item">
                                            <br>
                                            <span style=" width:180px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;font-size: 14px; color: #282828;">
                                                <span style="float: left;">
                                                <el-badge :value="index+1"></el-badge>
                                                    <span v-if="item.status==0"  @click="read(item.id)">{{item.resouceName}}</span>
                                                    <span v-if="item.status==1"  @click="getResource(item)">{{item.resouceName}}</span>
                                                </span>
                                            </span>

                                            <br>
                                            <br>
                                            <hr>
                                        </div>


                                    </template>
                                </el-card>
                            </div>

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
    import {getAllCarousel, getRankIng} from 'api/admin/index';
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
                pageSize: 1,
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
                ranking: {
                    id: '',
                    status: '',
                    resouceName: '',
                    resouceUrl: '',
                    resouceClick: '',
                    userName: '',
                    context: '',
                    profileUrl: ''
                },
                total: null,
                totalRe: null,
            };
        },
        created() {
            this.getBlogs();
            this.getReso();
            getAllCarousel().then(response => {
                this.indexUrl = response.data.returnData;
            });
            getRankIng().then(response => {
                this.ranking = response.data.returnData;
            });

        },

        methods: {

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
                this.resource.status = 2;

                getResouceList(this.resource, this.pageSize).then(response => {
                    this.resourceList = response.data.returnData.list;
                    this.totalRe = response.data.returnData.total;
                    this.resource.resouceName = '';
                    this.loadingRes = false;
                });
            }, copyUrl(url, id) {
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
        },
        filters: {
            formatUrl(url) {
                url = "  <img  src=\"" + url +
                    "\" style=\"margin-right:6px;\">";
                return url;
            }
        }


    }

</script>

<style>
    .userLogo {
        width: 16px;
        height: 16px;
        border-radius: 50%;
    }

    .disable {
        -moz-user-select: -moz-none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

</style>