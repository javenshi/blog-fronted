<template>
    <div>
        <top></top>


        <div class=" calendar-list-container;" style="padding: 20px;">

            <el-row :gutter="20">
                <el-col :span="1"><br></el-col>
                <el-col :span="1"><br></el-col>
                <el-col :span="16">
                    <div v-if="!noBlog" v-loading="loadingBlog"
                         element-loading-text="拼命加载中"
                         element-loading-spinner="el-icon-loading"
                         element-loading-background="rgba(0, 0, 0, 0.8)">
                        <div>
                            <div>
                                <h1> {{blog.blogsName}}</h1>
                                {{blog.blogsDate | parseTime('{y}年{m}月{d}日 ')}} 总访问次数：{{blog.blogsClick}}
                            </div>
                            <br>
                            <br>
                            <br>
                            <div v-html="blog.blogsUrl"></div>
                            <br>
                            <br>
                            <br>
                            <div v-if="top==null||top==''">上一篇：这是作者的第一篇博客</div>
                            <div v-else>上一篇：<span @click="read(top.id)">{{top.blogsName}}</span></div>
                            <div v-if="down==null||down==''">下一篇：作者暂时还未更新</div>
                            <div v-else>下一篇：<span @click="read(down.id)">{{down.blogsName}}</span></div>
                        </div>
                        <!--    <div>
                                <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入内容"
                                        v-model="textarea">
                                </el-input>
                                <el-button type="danger" style="float: right;" @click="savePinglun">评论</el-button>
                            </div>-->
                        <div>
                            <!--  <el-table
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
                              <el-button type="danger" style="float: right;" @click="loading">加载更多</el-button>-->
                        </div>
                    </div>
                    <div style="margin-top: 17%;font-size: 20px; font-weight: 300; color: #999;" v-if="noBlog"
                         align="center">
                        <img src="../../assets/4044.png"><br>我勒个去，博客被外星人挟持了!
                    </div>


                </el-col>

                <el-col :span="5">

                    <br>
                    <br>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            作者：
                            <span v-html="headurl"></span>
                            {{user.userName}}
                        </div>
                        <template>
                            性别：{{user.gender|fomartGender}}
                            <br>
                            来自：{{user.location}}
                            <br>
                            个性签名：{{user.description}}
                            <br>

                        </template>
                    </el-card>
                    <br>
                    <br>
                    <br>
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


            <div>
                <ul>
                    <!-- 新浪微博 -->
                    <li @click="weiBo">新浪微博</li>
                    <!-- QQ好友 -->
                    <li @click="qqFriend">QQ好友</li>
                    <!-- QQ空间 -->
                    <li @click="qqZone">QQ空间</li>
                    <!-- 腾讯微博 -->
                    <li href="" @click="tencentWeiBo">腾讯微博</li>
                    <!--<li href="" @click="weiXin">微信</li>-->
                </ul>


            </div>


        </div>
        <down></down>
    </div>


</template>

<script>
    import top from '../component/top';
    import down from '../component/down';
    import {getBlogsById, saveComents, getComentsList, getTopAndDown} from 'api/blog/blog';
    import {getUserById} from 'api/blog/user';
    import tokenStore from 'store2';
    import {parseTime} from 'utils';

    export default {
        components: {
            top, down
        },
        data() {
            return {
                loadingBlog: false,
                blog: '',
                textarea: '',
                Comments: {blogId: '', userId: '', context: '', userName: ''},
                pageSize: 5,
                comentsList: '',
                noBlog: false,
                top: '',
                down: '',
                user: {
                    id: '', uid: '', userName: '', uSource: '', location: '', description: '',
                    profileUrl: '', gender: '', passWord: '', email: '', integral: '', status: '', createdTime: '',
                }, headurl: '',
            };
        }, created() {
            this.loadingBlog = true;
            this.getBById(this.$route.query.id);
            this.getComents();

        },

        methods: {
            getBById(id) {
                getBlogsById(id, this.getIp()).then(response => {
                    if (response.data.returnCode == 404 || response.data.returnCode == 400) {
                        this.noBlog = true;
                        return false;
                    }
                    this.blog = response.data.returnData;
                    this.loadingBlog = false;
                    getUserById(this.blog.userId).then(response => {
                        this.user = response.data.returnData;
                        this.headurl = '<img class="common-topbar-user-image-wrapper1" src=' + this.user.profileUrl + '>';
                    });
                    getTopAndDown(id).then(response => {
                        this.top = response.data.returnData[0];
                        this.down = response.data.returnData[1];
                    });
                });
            },
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
                this.Comments.userId = tokenStore.session('user').id;
                getComentsList(this.Comments, this.pageSize).then(response => {
                    this.comentsList = response.data.returnData.list;
                });
            },
            loading() {
                this.pageSize += 5;
                this.getComents();
            },
            getIp() {
                return returnCitySN["cip"];
            },
            read(id) {
                this.getBById(id);
            },
            weiBo() {
                window.open("http://service.weibo.com/share/share.php?url=http://www.zhixiang.org.cn/%23/blog/read?id=" + this.blog.id + "&title=我在智享看到了 " + this.blog.blogsName + " ,真的很赞。&pic=http://www.zhixiang.org.cn/img/120-120.png&appkey=3191489564&searchPic=false");
            },
            qqZone() {
                window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http://www.zhixiang.org.cn&showcount=0&title=我在智享看到了 " + this.blog.blogsName + " ,真的很赞。&pic=http://www.zhixiang.org.cn/img/120-120.png");
            }, qqFriend() {
                window.open("http://connect.qq.com/widget/shareqq/index.html?url=http://www.zhixiang.org.cn/%23/blog/read?id=" + this.blog.id + "&title=智享&summary=我在智享看到了 " + this.blog.blogsName + " ,真的很赞。&pics=http://www.zhixiang.org.cn/img/120-120.png&site=http://www.zhixiang.org.cn&style=201&width=32&height=32");
            }, tencentWeiBo() {
                window.open("http://share.v.t.qq.com/index.php?c=share&a=index&url=http://www.zhixiang.org.cn/%23/blog/read?id=" + this.blog.id + "&title=我在智享看到了 " + this.blog.blogsName + " ,真的很赞。&site=我在智享看到了 " + this.blog.blogsName + " ,真的很赞。&pic=http://www.zhixiang.org.cn/img/120-120.png");
            },

        },
        filters: {
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
    .common-topbar-user-image-wrapper1 {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
</style>