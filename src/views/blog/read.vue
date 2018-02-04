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
                         element-loading-background="rgba(0, 0, 0, 0.8)"style="height: 800px;">
                        <div>
                            <div>
                                <h1> {{blog.blogsName}}</h1>
                                {{blog.blogsDate | parseTime('{y}年{m}月{d}日 ')}} 总访问次数：{{blog.blogsClick}}
                            </div>
                            <hr>
                            <br>
                            <br>
                            <br>
                            <div v-html="blog.blogsUrl"></div>
                            <br>
                            <br>
                            <br>
                            <div v-if="top==null||top==''">
                                <el-tag type="warning">这是作者的第一篇博客</el-tag>
                            </div>
                            <div v-else>
                                <el-tag type="success">上一篇</el-tag>
                                <span @click="read(top.id)">&nbsp;<a>{{top.blogsName}}</a></span></div>
                            <br>
                            <div v-if="down==null||down==''">
                                <el-tag type="warning">作者暂时还未更新</el-tag>
                            </div>
                            <div v-else>
                                <el-tag type="success">下一篇</el-tag>
                                <span @click="read(down.id)">&nbsp;<a>{{down.blogsName}}</a></span></div>
                        </div>

                        <div>
                            <br>
                            <br>
                            <br>

                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 4}"
                                    maxlength="800"
                                    width="60%"
                                    placeholder="请输入内容"
                                    v-model="Proposal.context"></el-input>
                            <div class="grid-content bg-purple"></div>

                            <el-button
                                    style="float: right;margin-top: 10px; border: 1px #20a0ff solid;background-color: white;color: #20a0ff;"
                                    @click="savePro">&nbsp;&nbsp;评&nbsp;&nbsp;&nbsp;&nbsp;论&nbsp;&nbsp;
                            </el-button>

                            <br><br>
                            <br><br>
                            <ul v-for="item in proList" :key="item">
                                <li>
                                    <el-card class="box-card ">
                                        <span v-html="item.userProfileUrl"></span> {{item.userName}} <span
                                            class="y el-icon-date">{{item.creatTime|parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                                        <hr>
                                        <br>
                                        <p>{{item.context}}</p>
                                        <br>
                                        <a @click="reply(item.id)"
                                           style="font-size: 16px;color:#20a0ff; ">回复</a>&nbsp;&nbsp;&nbsp;
                                        <div v-if="replyId==item.id">
                                            <el-input
                                                    type="textarea"
                                                    :autosize="{ minRows: 2, maxRows: 4}"
                                                    maxlength="800"
                                                    width="60%"
                                                    placeholder="请输入内容"
                                                    v-model="context"></el-input>
                                            <div class="grid-content bg-purple"></div>
                                            <el-button
                                                    style="float: right;margin-top: 10px; border: 1px #20a0ff solid;background-color: white;color: #20a0ff;"
                                                    @click="saveReply">&nbsp;&nbsp;回&nbsp;&nbsp;&nbsp;&nbsp;复&nbsp;&nbsp;
                                            </el-button>

                                        </div>
                                        <br>
                                        <br>
                                        <br>

                                        <div v-if="item.children!=null">
                                            <ul v-for="it in item.children" :key="it">
                                                <li>
                                                    <el-card class="box-card ">
                                                        <span v-html="it.userProfileUrl"></span> {{it.userName}} <span
                                                            class="y el-icon-date">{{it.creatTime|parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                                                        <hr>
                                                        <br>
                                                        <p>{{it.context}} </p>
                                                        <br>
                                                    </el-card>
                                                </li>
                                            </ul>
                                        </div>
                                    </el-card>
                                </li>
                            </ul>

                            <br><br>
                            <el-button v-if="listQuery.pageSize<total" @click="getMorePro" style="margin-left: 42%;" type="info">加载更多</el-button>
                            <p v-else style="color: #999;margin-left: 42%;">我是有底线的</p>
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

                    <div style="padding-top: 40px;" v-if="showRanking">
                        <el-card class="box-card">
                            <div slot="header">
                                <span style="color: #666;font-size: 16px;">本站排行</span>
                            </div>
                            <template>
                                <div v-for="(item,index) in ranking" :key="item">
                                    <br>
                                    <span style=" width:180px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;font-size: 14px; color: #282828;">
                                                <span style="float: left;">
                                                <el-badge :value="index+1"></el-badge>
                                                    <span v-if="item.status==0" @click="read(item.id)">{{item.resouceName}}</span>
                                                    <span v-if="item.status==1" @click="getResource(item)">{{item.resouceName}}</span>
                                                </span>
                                            </span>

                                    <br>
                                    <br>
                                    <hr>
                                </div>


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

                    </div>
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
    import {getBlogsById, getTopAndDown} from 'api/blog/blog';
    import {saveP, getProList} from 'api/blog/proposal';
    import {getRankIng} from 'api/admin/index';
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
                showRanking: false,
                ranking: {
                    id: '',
                    status: '',
                    resouceName: '',
                    resouceUrl: '',
                    resouceClick: '',
                    userName: '',
                    context: '',
                    profileUrl: ''
                }, resourceDialog: false,
                resourceItem: '',
                user: {
                    id: '', uid: '', userName: '', uSource: '', location: '', description: '',
                    profileUrl: '', gender: '', passWord: '', email: '', integral: '', status: '', createdTime: '',
                }, headurl: '',
                replyId: 0,
                listQuery: {
                    pageNum: 1,
                    pageSize: 5,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                proList: [],
                Proposal: {context: '', userId: '', UserName: ''},
                context: '',
                total:0,
            };
        }, created() {
            this.loadingBlog = true;
            this.getBById(this.$route.query.id);
            getRankIng().then(response => {
                this.showRanking = true;
                this.ranking = response.data.returnData;
            });
            this.listQuery.filterList = [];
            this.listQuery.filterList.push({
                filterKey: 'index',
                filterValue: "11"
            })
            this.getProList0();
        },

        methods: {
            savePro() {
                if (tokenStore.session('user') == null) {
                    this.$message({
                        message: "请先登录后再留言",
                        type: 'error',
                        duration: 3 * 1000
                    });
                }
                if (this.Proposal.context == '' || this.Proposal.context == null) {
                    return false;
                }
                this.Proposal.blogId=this.$route.query.id;
                this.Proposal.userProfileUrl = "<img class=\"userLogo\" src=\"" + tokenStore.session('user').profileUrl + "\">";
                this.Proposal.userName = tokenStore.session('user').userName;
                this.Proposal.userId = tokenStore.session('user').id;
                saveP(this.Proposal).then(response => {
                    this.Proposal.context = '';
                    this.getProList0();
                });
            },
            reply(proId) {
                this.replyId = proId;
            },
            saveReply() {

                this.Proposal.context = this.context;
                this.Proposal.pid = this.replyId;
                this.savePro();
                this.replyId = 0;
                this.context = '';

            },
            getMorePro() {

                this.listQuery.pageSize += 5;
                this.getProList0();
            },
            getProList0() {

                this.listQuery.filterList.push({
                    filterKey: 'blogId',
                    filterValue: this.$route.query.id
                });
                getProList(this.listQuery).then(response => {
                    this.proList = response.data.returnData.list;
                    this.total = response.data.returnData.total;
                });
            },

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
            getResource(item) {
                this.resourceItem = item;
                this.resourceDialog = true;
            },
            copyUrl(url, id) {
                window.open(url);
                resourceClick(id, this.getIp()).then(response => {
                    this.getReso();
                });
                this.resourceDialog = false;
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