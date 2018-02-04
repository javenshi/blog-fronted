<template>

    <div>
        <top></top>

        <br>
        <br>
        <el-row :gutter="20">
            <el-col :span="3"><br>
                <div class="grid-content bg-purple">
                </div>
            </el-col>
            <el-col :span="12">
                如果您对本站有什么好的建议和意见，请在此留下您的足迹。
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
                        @click="savePro">&nbsp;&nbsp;留&nbsp;&nbsp;&nbsp;&nbsp;言&nbsp;&nbsp;
                </el-button>
                <br><br>
                <br><br>
                <ul v-for="item in proList" :key="item">
                    <li>
                        <el-card class="box-card ">
                            <span v-html="item.userProfileUrl"></span> {{item.userName}} <span class="y el-icon-date">{{item.creatTime|parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
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
                                            <span v-html="it.userProfileUrl"></span> {{it.userName}} <span class="y el-icon-date">{{it.creatTime|parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
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
            </el-col>

            <el-col :span="8">

                <el-card class="box-card">
                    <div>
                        <strong>智享简介：</strong><br><br>
                        <div style="font-size: 14px;">
                        <span style="margin-left: 30px;"></span> 智享，一个分享你智慧和才智的地方。 <br>
                        <span style="margin-left: 30px;"></span> 站长和站长夫人是97年生人，作为年轻人，我们的梦想以及成立智享的初衷是为了给广大热爱学习的朋友们提供一个
                        写写博客，分享分享资源的平台。仅此而已。<br>
                        我们承诺：<br>
                        <span style="margin-left: 30px;"></span> 1.在这里，不管你是学生党、初入职业的小白、还是大神，都可以加入我们，一起共同学习，一起进步，
                        共同创造属于我们的明天。<br>
                        <span style="margin-left: 30px;"></span> 1.如果您有什么意见和建议，请您留言后我们会以最快的速度解决。<br>
                        <span style="margin-left: 30px;"></span> 2.本站所有博客及资源都会经过站长审核，如果您发现有人抄袭您的作品请直接联系站长，一经核实，马上处理。<br>
                        <span style="margin-left: 30px;"></span> 3.如果您想学习建站技巧，请联系站长<br>
                        <span style="margin-left: 30px;"></span> 4.如果您想成为智享的一员，和站长一起经营智享，那么请加入我们。<br>
                        </div>
                        <br><br><strong>联系站主:</strong> &nbsp;&nbsp;<a target="_blank"
                                        href="http://wpa.qq.com/msgrd?v=3&uin=2388386839&site=qq&menu=yes"><img src="../../img/qqjiaoliu.png"
                                                                                                                alt="qq"
                                                                                                                title="qq"/></a>
                        <el-popover
                                ref="popover1"
                                placement="top-start"

                                width="60"
                                trigger="hover"
                        ><img src="../../assets/wecat.png">
                        </el-popover>
                        <a v-popover:popover1><img src="../../img/weixinjiaoliu.png"></a>

                        <br><br>
                       <strong> 加入我们:</strong>&nbsp;&nbsp;&nbsp;<a target="_blank"
                                href="//shang.qq.com/wpa/qunwpa?idkey=d45324b056242c9171abd284c697d99e182b5963bf5f6018315c14cb243d8e01"><img
                            border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="智享" title="智享"></a>
                        <br><br>
                        <div style="font-size: 14px;">
                        如果您觉得本站的内容给您带来了帮助，恰好您愿意打赏一下的话，请动一下您的小手为我们的服务器延长一下期限：
                        </div><br><br><br> <strong>微信：</strong><br>
                        <img src="../../img/WM.png"><br>
                        <strong>支付宝：</strong><br>
                        <img src="../../img/PM.png">

                    </div>
                </el-card>
            </el-col>
            <el-col :span="1">

            </el-col>

        </el-row>
        <br>


        <div>

        </div>
        <down></down>
    </div>
</template>
<script>
    import top from '../component/top';
    import down from '../component/down';
    import {saveP, getProList} from 'api/blog/proposal';
    import tokenStore from 'store2';
    import {parseTime} from 'utils';

    export default {
        name: 'leavIng',
        components: {
            top, down
        },
        data() {

            return {
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
        },
        created() {
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
                if(this.Proposal.context == ''||this.Proposal.context == null){
                    return false;
                }
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
                this.context='';

            },
            getMorePro() {

                this.listQuery.pageSize += 5;
                this.getProList0();
            },
            getProList0() {

                this.listQuery.filterList.push({
                    filterKey: 'noblog',
                    filterValue: "11"
                })
                getProList(this.listQuery).then(response => {
                    this.proList = response.data.returnData.list;
                    this.total = response.data.returnData.total;
                });
            },


        },
    }
</script>
<style>
    /* CSS Document */
    li {
        list-style-type: none;
        margin-bottom: 30px;
    }





</style>