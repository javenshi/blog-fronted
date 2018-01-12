<template>
    <div>
        <top></top>
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

        <div >
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
                                            <span > {{scope.row.blogsPart}}</span>
                                           <br> <span style="margin-left:-1%;padding: 1%;font-size: 14px;color:#f9c855"> {{scope.row.blogsClassifyName}}</span>
                                            <span> <img src="">{{scope.row.blogsDate|parseTime('{y}-{m}-{d} {h}:{i} ')}}</span>
                                            <span><img src=""> {{scope.row.userName}}</span>
                                            <span><img src=""> {{scope.row.blogsClick}}</span>
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
                                            :total="totalRe"
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
                                        <aside style="margin-left: -40px; margin-top: -20px;">
                                            <div class="tuijian">

                                                <ol>
                                                    <li><span><strong>1</strong></span><a href="/">有一种思念，是淡淡的幸福,一个心情一行文字</a></li>
                                                    <li><span><strong>2</strong></span><a href="/">励志人生-要做一个潇洒的女人</a></li>
                                                    <li><span><strong>3</strong></span><a href="/">女孩都有浪漫的小情怀——浪漫的求婚词</a></li>
                                                    <li><span><strong>4</strong></span><a href="/">Green绿色小清新的夏天-个人博客模板</a></li>
                                                    <li><span><strong>5</strong></span><a href="/">女生清新个人博客网站模板</a></li>
                                                    <li><span><strong>6</strong></span><a href="/">Wedding-婚礼主题、情人节网站模板</a></li>
                                                    <li><span><strong>7</strong></span><a href="/">Column 三栏布局 个人网站模板</a></li>
                                                    <li><span><strong>8</strong></span><a href="/">时间煮雨-个人网站模板</a></li>
                                                    <li><span><strong>9</strong></span><a href="/">花气袭人是酒香—个人网站模板</a></li>
                                                </ol>
                                            </div>

                                        </aside>
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

    </div>
</template>

<script>
    import contact from '../component/contact';
    import notice from '../component/notice';
    import top from '../component/top';

    import { selectBlogsPage} from 'api/blog/blog';
    import {getAllCarousel} from 'api/admin/index';
    import { getResouceList} from 'api/blog/resouce';
    import tokenStore from 'store2';
    import {parseTime} from 'utils';

    export default {
        components: {
             contact, notice,top
        },

        data() {

            return {
                blogList: [],
                resourceList: [],
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
                resource:{resouceName:'',status:''},
                total: null,
                totalRe:null,
            };
        },
        created() {
            this.getBlogs();
            getAllCarousel().then(response => {
                this.indexUrl = response.data.returnData;
            });
            this.getReso();
        },

        methods: {

            read(id) {
                this.$router.push('/blog/read?id=' + id);
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
                    this.totalRe = response.data.returnData.total;
                });
            },

            loading(val) {
                       this.pageSize =val;
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

    .tuijian li, .clicks li { white-space: nowrap; text-overflow: ellipsis; overflow: hidden }
    .tuijian li a:hover { padding-left: 10px }
    .tuijian li span:before { content: "0"; }/* 数字列表前面统一加0  */
    .tuijian li span { margin-right: 10px; font-size: 14px; font-family: "微软雅黑"; }
    .tuijian li:nth-child(-n+3) span { width: 39px; color: #999 } /* 选择从第3个开始倒数也就是第三个前面的 */
    .tuijian li:nth-child(-n+3) strong { font-size: 24px; font-weight: normal; }
    .tuijian li:first-child span { color: #f8490b; } /* 选择第一个 */
    .tuijian li:nth-child(n+3) { line-height: 24px } /* 选择从第3个开始往后数 */
    .tuijian li:nth-child(4) { margin: 5px 0 0 0 } /* 选择第四个 */
</style>
