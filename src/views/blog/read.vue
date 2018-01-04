<template>
    <div>
        <!--导航条-->
        <el-menu
                class="el-menu-demo"
                mode="horizontal"
                background-color="#000000"
                text-color="#ffffff"
                active-text-color="#ffd04b">
            <el-menu-item index="1" @click="index">
                首页
            </el-menu-item>
            <el-menu-item index="2">
                写博客
            </el-menu-item>
            <el-menu-item index="3">贡献资源</el-menu-item>
            <el-menu-item index="3">
                <router-link :to="'/admin/index'">后台</router-link>
            </el-menu-item>
            <!--   <el-menu-item index="4">求助</el-menu-item>-->

            <el-menu-item style="float: right;" index="5" v-show="UNAME==''" >登录</el-menu-item>
            <el-menu-item style="float: right;" index="5" v-show="UNAME!=''">{{UNAME}}
            </el-menu-item>
        </el-menu>


        <div class=" calendar-list-container;" style="padding: 20px;"
        >

            <el-row :gutter="20">
                <el-col :span="1"><br></el-col>
                <el-col :span="17">
                    <el-card class="box-card">
                        <div v-if="noBlog==false">
                            <div>
                                <h1> {{blog.blogsName}}</h1>
                                {{blog.blogsDate | parseTime('{y}年{m}月{d}日 ')}}     点击 {{blog.blogsClick}}次
                            </div>

                            <div v-html="blog.blogsUrl"></div>
                        </div>

                        <div v-if="noBlog==true" style="font-size: 20px; font-weight: 300; color: #999;" align="center">
                            <img src="../../assets/4044.png"><br>我勒个去，博客被外星人挟持了!
                        </div>
                        <div v-if="noBlog==false">
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
                    </el-card>
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
    import {getCode, cName, saveUser, login, valUser} from 'api/blog/user';
    import {getBlogsById,saveComents,getComentsList} from 'api/blog/blog';
    import tokenStore from 'store2';
    import {parseTime} from 'utils';

    export default {

        data() {
            return {
                UNAME: '',
                blog: '',
                textarea: '',
                Comments:{blogId:'',userId:'',context:'',userName:''},
                pageSize: 5,
                comentsList:'',
                noBlog: false,
            };
        }, mounted() {
            this.UNAME = tokenStore.local('User').userName;
            getBlogsById(this.$route.query.id).then(response => {
                if (response.data.returnCode == 404 || response.data.returnCode == 400) {
                    this.noBlog = true;
                    return false;
                }
                this.blog = response.data.returnData;
            });
            this.getComents();

        },

        methods: {
            savePinglun(){
                this.Comments.context=this.textarea;
                this.Comments.blogId=this.$route.query.id;
                this.Comments.userId= tokenStore.local('User').id;
                this.Comments.userName=tokenStore.local('User').userName;

                saveComents(this.Comments).then(response => {
                    this.getComents();
                });
            },
            getComents(){
                this.Comments.blogId=this.$route.query.id;
                this.Comments.userId= tokenStore.local('User').id;
                getComentsList(this.Comments,this.pageSize).then(response => {
                    this.comentsList=response.data.returnData.list;
                });
            },
            loading(){
                this.pageSize+=5;
                this.getComents();
            }
        }
    }
</script>