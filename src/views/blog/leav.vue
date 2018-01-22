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
                <div >
                    <ul  v-for="item in proList" :key="item" >
                        <li style="margin-bottom: 40px;">
                            <div class="arrow_box">
                                <div class="ti"></div>
                                <ul class="details">
                                    <li><a href="#">{{item.userName}}</a></li>
                                    <li class="comments"><a href="#">{{item.creatTime|parseTime('{y}-{m}-{d}  {h}:{i}:{s}')}}</a></li>
                                </ul>
                                <ul class="textinfo">
                                    <p style="padding-top:18px;"> {{item.context}}</p>
                                </ul>
                                <ul class="details">

                                    <li><a @click="reply(item.id)" style="font-size: 16px;color:#20a0ff; ">回复</a></li>
                                    <li v-if="replyId!=''" >
                                        <el-input
                                                type="textarea"
                                                :autosize="{ minRows: 2, maxRows: 4}"
                                                width="60%"
                                                placeholder="请输入内容"
                                                v-model="item.toUserName"></el-input>
                                        <div class="grid-content bg-purple"></div>

                                        <el-button
                                                style="float: right;margin-top: 10px; border: 1px #20a0ff solid;background-color: white;color: #20a0ff;"
                                                @click="saveReply">&nbsp;&nbsp;回&nbsp;&nbsp;&nbsp;&nbsp;复&nbsp;&nbsp;
                                        </el-button>
                                        <br>
                                        <br>

                                    </li>
                                    <li v-if="item.hasChild==1">
                                        <div v-for="it in item.children" :key="it">
                                            <ul class="details">
                                                <li>{{it.userName}}回复:{{it.toUserName}}</li>
                                                <li class="comments">{{it.creatTime|parseTime('{y}-{m}-{d}  {h}:{i}:{s}')}}
                                                </li>
                                            </ul>
                                            <ul class="textinfo">
                                                <p style="padding-top:18px;"> {{it.context}}</p>
                                            </ul>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <el-button style="margin-top: 20px;" type="primary" @click="getMorePro">加载更多</el-button>
            </el-col>

            <el-col :span="8">

                <el-card class="box-card">
                    <div>
                        智享简介：<br>
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
                        <br><br>联系站主:<a target="_blank"
                                        href="http://wpa.qq.com/msgrd?v=3&uin=2388386839&site=qq&menu=yes"><img src=""
                                                                                                                alt="qq"
                                                                                                                title="qq"/></a>
                        <el-popover
                                ref="popover1"
                                placement="top-start"

                                width="60"
                                trigger="hover"
                        ><img src="../../assets/wecat.png">
                        </el-popover>
                        <a v-popover:popover1>微信</a>

                        <br><br>
                        加入我们:<a target="_blank"
                                href="//shang.qq.com/wpa/qunwpa?idkey=d45324b056242c9171abd284c697d99e182b5963bf5f6018315c14cb243d8e01"><img
                            border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="智享" title="智享"></a>
                        <br><br>
                        如果您觉得本站的内容给您带来了帮助，恰好您愿意打赏一下的话，请动一下您的小手为我们的服务器延长一下期限：
                        <br><br><br> 微信：<br>
                        <img src="../../img/WM.png"><br>
                        支付宝：<br>
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
            top,down
        },
        data() {

            return {
                replyId: '',
                listQuery: {
                    pageNum: 1,
                    pageSize: 5,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                proList: [],
                Proposal: {context: '', userId: '', UserName: '', answer: ''},
                returnDate: '',

                filterList: [],
            };
        },
        created() {
            this.listQuery.filterList.push({
                filterKey: 'index',
                filterValue: "11"
            })
            this.getProList0();
        },
        methods: {
            savePro() {

                this.Proposal.userName = this.UNAME;
                this.Proposal.userId = tokenStore.session('User').id;

                saveP(this.Proposal).then(response => {
                    this.getProList0();
                });
            },
            reply(proId) {

                this.replyId = proId;
            },
            saveReply() {
                for (var one  of  this.proList) {
                    if (one.id === this.replyId) {
                        this.Proposal.pid = this.replyId;
                        this.Proposal.context = one.toUserName;
                        break;
                    }
                }

                this.savePro();
                this.Proposal.pid = '';
                this.replyId = '';
                this.Proposal.context = '';
            },
            getMorePro() {

                this.listQuery.pageSize += 5;
                this.listQuery.filterList = [];
                this.listQuery.filterList.push({
                    filterKey: 'index',
                    filterValue: "11"
                })
                this.getProList0();
            },
            getProList0() {
                this.listQuery.filterList.push({
                    filterKey: 'noblog',
                    filterValue: "11"
                })
                getProList(this.listQuery).then(response => {
                    this.proList = response.data.returnData.list;
                });
            },


        },
    }
</script>
<style>
    /* CSS Document */
    * {
        margin: 0;
        padding: 0
    }

    p {
        word-wrap: break-word
    }

    ul, ol {
        list-style: none;
    }

    a {
        color: #a6a6a6;
        text-decoration: none;
        transition: All 1s ease;
        -webkit-transition: All 1s ease;
        -moz-transition: All 1s ease;
        -ms-transition: All 1s ease;
        -o-transition: All 1s ease;
    }

    a:hover {
        color: #fff;
    }

    /* --------------------评论列表-------------------- */






    .arrow_box {
        background: white;
        box-shadow: 0px 1px 1px rgba(255, 0, 0, .7), inset 0px 1px 1px rgba(255, 0, 0, .7);

        color: #000000;
        border-radius: 6px;

    }

    .ti {
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 0px 0 20px 22px;
        border-color: transparent transparent transparent #20a0ff;

    }




    .arrow_box h2.title {
        padding: 0 0 0 20px;
        font: 16px/50px "微软雅黑", "Microsoft YaHei", Arial, Helvetica, sans-serif
    }

    .arrow_box h2 a:hover {
        padding-left: 20px
    }

    .textinfo {
        overflow: hidden;
        border: 1px #20a0ff solid;
    }

    .arrow_box img {
        width: 150px;
        padding: 4px;
        float: left;
        -webkit-transition: All 1s ease;
        -moz-transition: All 1s ease;
        -ms-transition: All 1s ease;
        -o-transition: All 1s ease;
        border-radius: 4px;
        margin: 0 20px 20px;
    }

    .arrow_box img:hover {
        opacity: 0.6;
    }

    .arrow_box p {
        line-height: 24px;
        padding: 0 20px 20px
    }

    .arrow_box p:hover {
        text-shadow: 1px 1px 1px #000;
    }

    .details {

        background: rgba(190, 190, 190, 0.3);
        border-radius: 0 0 6px 6px;
        padding: 5px 20px
    }

    .details li {
        line-height: 26px;
        display: inline;
        font-size: 11px;
        margin-right: 10px;
    }

    .details li a {
        color: #3F3E3C
    }

    .details li a:hover {
        color: #933
    }

    .icon-time {
        background-position: 0 -208px;
        padding: 0 0 0 18px;
    }

    .likes, .comments {
        float: right;
        padding: 0 0 0 14px;
    }

    .likes {
        background-position: 0 -240px;
    }

    .comments {
        background-position: 0 -220px;
    }


</style>