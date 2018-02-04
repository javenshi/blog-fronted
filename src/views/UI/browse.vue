<template>
    <div>
        <top></top>


        <div class=" calendar-list-container;" style="padding: 20px;">

            <el-row :gutter="20">

                <el-col :span="2">
                    <br>
                    <div style="position:fixed;left:0;top:30%">
                        <ul>
                            <!-- <li @click=""><img src="../../img/leav.png"></li>-->

                            <li @click="qqFriend" class="qq img"></li>

                            <li @click="qqZone" class="qqZon img"></li>

                            <li @click="weiBo" class="wb img"></li>

                            <li href="" @click="tencentWeiBo" class="twb img"></li>
                            <!--<li href="" @click="weiXin">微信</li>-->
                        </ul>


                    </div>
                </el-col>
                <el-col :span="16">
                    <div v-if="!noBlog" v-loading="loadingBlog"
                         element-loading-text="拼命加载中"
                         element-loading-spinner="el-icon-loading"
                         element-loading-background="rgba(0, 0, 0, 0.8)"
                    style="height: 800px;">
                        <div>
                        <div v-html="ui.sample"></div>

                        <div>
                            <br>
                            <br>
                            <br>


                            <p  style="color: #999;margin-left: 42%;">我是有底线的</p>
                        </div>
                        </div>
                    </div>
                    <div style="margin-top: 17%;font-size: 20px; font-weight: 300; color: #999;" v-if="noBlog"
                         align="center">
                        <img src="../../assets/4044.png"><br>我勒个去，页面被外星人挟持了!
                    </div>


                </el-col>

                <el-col :span="5">

                    <br>
                    <br>
                    <el-card class="box-card" v-if="!noBlog">
                        <div slot="header" class="clearfix">
                            <!-- <span style="color: #666;font-size: 16px;">  本文作者：</span>-->
                            <span v-html="headurl"></span><span style="padding: 13px;">{{user.userName}}</span>
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


                </el-col>
                <el-col :span="1"></el-col>
            </el-row>


        </div>
        <down></down>
    </div>


</template>

<script>
    import top from '../component/top';
    import down from '../component/down';
    import {getUIById} from 'api/ui/ui';
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
                ui:'',
                noBlog: false,
                user: {
                    id: '', uid: '', userName: '', uSource: '', location: '', description: '',
                    profileUrl: '', gender: '', passWord: '', email: '', integral: '', status: '', createdTime: '',
                },
                headurl: '',

            };
        }, created() {
            this.loadingBlog = true;
            this.getBById(this.$route.query.id);


        },

        methods: {


            getBById(id) {

                getUIById(id, this.getIp()).then(response => {
                    if (response.data.returnCode == 404 || response.data.returnCode == 400) {
                        this.noBlog = true;
                        return false;
                    }
                    this.ui = response.data.returnData;
                    this.loadingBlog = false;
                    getUserById(this.ui.userId).then(response => {
                        this.user = response.data.returnData;
                        this.headurl = '<img class="common-topbar-user-image-wrapper1" src=' + this.user.profileUrl + '>';
                    });

                });
            },



            getIp() {
                return returnCitySN["cip"];
            },

            weiBo() {
                window.open("http://service.weibo.com/share/share.php?url=http://www.zhixiang.org.cn/%23/blog/read?id=" + this.blog.id + "&title=我在智享看到了 " + this.blog.blogsName + " ,真的很赞。&pic=http://zx-blog.oss-cn-beijing.aliyuncs.com/ui/%E5%AE%A3%E4%BC%A0%E5%9B%BE.png&appkey=3191489564&searchPic=false");
            },
            qqZone() {
                window.open("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http://www.zhixiang.org.cn&showcount=0&title=我在智享看到了 " + this.blog.blogsName + " ,真的很赞。&pic=http://zx-blog.oss-cn-beijing.aliyuncs.com/ui/%E5%AE%A3%E4%BC%A0%E5%9B%BE.png");
            }, qqFriend() {
                window.open("http://connect.qq.com/widget/shareqq/index.html?url=http://www.zhixiang.org.cn/%23/blog/read?id=" + this.blog.id + "&title=智享&summary=我在智享看到了 " + this.blog.blogsName + " ,真的很赞。&pics=http://zx-blog.oss-cn-beijing.aliyuncs.com/ui/%E5%AE%A3%E4%BC%A0%E5%9B%BE.png&site=http://www.zhixiang.org.cn&style=201&width=32&height=32");
            }, tencentWeiBo() {
                window.open("http://share.v.t.qq.com/index.php?c=share&a=index&url=http://www.zhixiang.org.cn/%23/blog/read?id=" + this.blog.id + "&title=我在智享看到了 " + this.blog.blogsName + " ,真的很赞。&site=我在智享看到了 " + this.blog.blogsName + " ,真的很赞。&pic=http://zx-blog.oss-cn-beijing.aliyuncs.com/ui/%E5%AE%A3%E4%BC%A0%E5%9B%BE.png");
            },

        },
        filters: {
            fomartGender(gender) {

                if ('m' == gender) {
                    return '男';
                } else if ('f' == gender) {
                    return '女';
                } else if('n' == gender){
                    return '未知';
                }else{
                    return '';
                }
            }
        }
    }

</script>
<style>
    ul li {
        list-style-type: none;
        margin-bottom: 20px;
    }

    a:hover {
        cursor: pointer;
        color: blue;
    }

    .img {
        z-index: 3;
        width: 39px;
        height: 39px;
        cursor: pointer;

        background-repeat: no-repeat;
    }

    .qqZon {
        background-image: url(../../img/qqZon.png);
    }

    .qqZon:hover {
        background-image: url(../../img/qqZon1.png)
    }

    .twb {
        background-image: url(../../img/twb.png);
    }

    .twb:hover {
        background-image: url(../../img/twb1.png)
    }


</style>