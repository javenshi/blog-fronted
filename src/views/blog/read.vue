<template>
    <div>
     <top></top>


        <div class=" calendar-list-container;" style="padding: 20px;">

            <el-row :gutter="20">
                <el-col :span="1"><br></el-col>
                <el-col :span="17">
               <div v-if="!noBlog"v-loading="loadingBlog"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)" >
                            <div>
                                <div>
                                    <h1> {{blog.blogsName}}</h1>
                                    {{blog.blogsDate | parseTime('{y}年{m}月{d}日 ')}} 点击 {{blog.blogsClick}}次
                                </div>
                                <div v-html="blog.blogsUrl"></div>
                            </div>
                            <div>
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="textarea">
                                </el-input>
                                <el-button type="danger" style="float: right;" @click="savePinglun">评论</el-button>
                            </div>
                            <div>
                                <el-table
                                        :data="comentsList"
                                        style="width: 100%">
                                    <el-table-column>
                                        <template scope="scope">
                                                <span>
                                                    {{scope.row.context}}
                                                </span>
                                            <br>
                                            <span> {{scope.row.userName}}</span>
                                            <span> {{scope.row.creatTime|parseTime('{y}-{m}-{d}{h}:{i} ')}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-button type="danger" style="float: right;" @click="loading">加载更多</el-button>
                            </div>
                        </div style>
                        <div style="margin-top: 17%;font-size: 20px; font-weight: 300; color: #999;" v-if="noBlog" align="center" >
                            <img src="../../assets/4044.png"><br>我勒个去，博客被外星人挟持了!
                        </div>


                </el-col>

                <el-col :span="5">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>资源</span>
                        </div>
                        <template>

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
                <el-col :span="1"></el-col>
            </el-row>

        </div>
    </div>


</template>
<script>
    import top from '../component/top';
    import {getBlogsById, saveComents, getComentsList} from 'api/blog/blog';
    import tokenStore from 'store2';
    import {parseTime} from 'utils';

    export default {
        components: {
             top
        },
        data() {
            return {
                loadingBlog:false,
                UNAME: '',
                blog: '',
                textarea: '',
                Comments: {blogId: '', userId: '', context: '', userName: ''},
                pageSize: 5,
                comentsList: '',
                noBlog: false,
            };
        }, created() {
            this.loadingBlog=true;
            this.UNAME = tokenStore.local('User').userName;
            getBlogsById(this.$route.query.id).then(response => {
                if (response.data.returnCode == 404 || response.data.returnCode == 400) {
                    this.noBlog = true;
                    return false;
                }
                this.blog = response.data.returnData;
                this.loadingBlog=false;});
            this.getComents();

        },

        methods: {
            savePinglun() {
                this.Comments.context = this.textarea;
                this.Comments.blogId = this.$route.query.id;
                this.Comments.userId = tokenStore.local('User').id;
                this.Comments.userName = tokenStore.local('User').userName;

                saveComents(this.Comments).then(response => {
                    this.getComents();
                });
            },
            getComents() {
                this.Comments.blogId = this.$route.query.id;
                this.Comments.userId = tokenStore.local('User').id;
                getComentsList(this.Comments, this.pageSize).then(response => {
                    this.comentsList = response.data.returnData.list;
                });
            },
            loading() {
                this.pageSize += 5;
                this.getComents();
            }
        }
    }

</script>