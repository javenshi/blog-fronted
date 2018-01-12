<template>

    <div>
        <top></top>
        <el-collapse style="padding: 20px;">
            <el-collapse-item title="如果您对本站有什么好的建议和意见，请再次留下您宝贵的建议，我们会尽快处理">
                <el-row :gutter="20">
                    <el-col :span="4"><br>
                        <div class="grid-content bg-purple">
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                width="60%"
                                placeholder="请输入内容"
                                v-model="Proposal.context"></el-input>
                        <div class="grid-content bg-purple"></div>
                    </el-col>

                    <el-col :span="2">
                        <el-button
                                style="padding-top: 17px;padding-bottom: 20px;padding-left: 30px;padding-right: 30px;"
                                type="primary" @click="savePro">发&nbsp;&nbsp;表
                        </el-button>
                        <div class="grid-content bg-purple"></div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple"></div>
                    </el-col>
                </el-row>


            </el-collapse-item>

        </el-collapse>
        <!--  <el-table
                  :data="proList"
                  :show-header=false
                  style="width: 100%">
              <el-table-column>
                  <template scope="scope">
                      <br>
                      <span style="font-size: 16px;color: #666;">{{scope.row.context}}</span>

                      <br>
                      <span style="font-size: 14px;color: #666;"> {{scope.row.creatTime|parseTime('{y}-{m}-{d} {h}:{i} ')}}</span>
                      <span style="font-size: 14px;color: #666;"> {{scope.row.userName}}</span>
                      <span> {{scope.row.answer}}</span>
                      <br> <br>
                  </template>
              </el-table-column>
          </el-table>-->
        <div class="blogs">
            <ul class="bloglist">
                <li>
                    <div class="arrow_box">
                        <div class="ti"></div>
                        <!--三角形-->
                        <div class="ci"></div>
                        <!--圆形-->
                        <ul class="textinfo">

                            <p style="padding-top:18px;"> 我希望我的做饭，洗衣服，缝一颗掉了的纽扣。然后，我们一起在时光中变老。</p>
                        </ul>
                        <ul class="details">

                            <li class="comments"><a href="#">zhang3</a></li>
                            <li class="icon-time"><a href="#">2013-8-7</a></li>
                        </ul>


                        <span style="padding:15px;"><a href="#">站长回复:--------------------------</a></span>

                    </div>
                </li>
                <li>
                    <div class="arrow_box">
                        <div class="ti"></div>
                        <!--三角形-->
                        <div class="ci"></div>
                        <!--圆形-->
                        <ul class="textinfo">

                            <p style="padding-top:18px;"> 我希望我的做饭，洗衣服，缝一颗掉了的纽扣。然后，我们一起在时光中变老。</p>
                        </ul>
                        <ul class="details">

                            <li class="comments"><a href="#">zhang3</a></li>
                            <li class="icon-time"><a href="#">2013-8-7</a></li>
                        </ul>


                        <span style="padding:15px;"><a href="#">站长回复:--------------------------</a></span>

                    </div>
                </li>
                <li>
                    <div class="arrow_box">
                        <div class="ti"></div>
                        <!--三角形-->
                        <div class="ci"></div>
                        <!--圆形-->
                        <ul class="textinfo">

                            <p style="padding-top:18px;"> 我希望我的做饭，洗衣服，缝一颗掉了的纽扣。然后，我们一起在时光中变老。</p>
                        </ul>
                        <ul class="details">

                            <li class="comments"><a href="#">zhang3</a></li>
                            <li class="icon-time"><a href="#">2013-8-7</a></li>
                        </ul>


                        <span style="padding:15px;"><a href="#">站长回复:--------------------------</a></span>

                    </div>
                </li>
            </ul>
        </div>
        <el-button style="margin-top: 20px;" type="primary" @click="getMorePro">加载更多</el-button>
        <div>

        </div>
    </div>
</template>
<script>
    import top from '../component/top';
    import {saveP, getProList} from 'api/blog/proposal';
    import tokenStore from 'store2';
    import {parseTime} from 'utils';

    export default {
        name: 'leavIng',
        components: {
            top
        },
        data() {

            return {
                proSize: 5,
                proList: [],
                Proposal: {context: '', userId: '', UserName: '', answer: '',},
                list: [{context: '太丑了', answer: '现在不丑了'},
                    {context: '太丑了', answer: '现在不丑了'},
                    {context: '太丑了', answer: '现在不丑了'},
                    {context: '太丑了', answer: '现在不丑了'},
                    {context: '太丑了', answer: '现在不丑了'},
                    {context: '太丑了', answer: '现在不丑了'},
                    {context: '太丑了', answer: '现在不丑了'}],
            };
        },
        created() {
            this.getProList0();
        },
        methods: {
            savePro() {

                this.Proposal.userName = this.UNAME;
                this.Proposal.userId = tokenStore.local('User').id;

                saveP(this.Proposal).then(response => {

                    this.getProList0();
                });
            },
            getMorePro() {
                this.proSize += 5;
                this.getProList0();
            },
            getProList0() {
                getProList(this.proSize).then(response => {
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

    /* --------------------博客列表-------------------- */
    .blogs {
        width: 1000px;
        margin: 0 auto 20px;
    }

    .bloglist {
        width: 666px;
        float: left;
    }

    .bloglist > li {
        border-right: #111 2px solid;
        padding: 20px 0;
    }

    .arrow_box {
        background: white;
        box-shadow: 0px 1px 0px rgba(255, 255, 255, .1), inset 0px 1px 1px rgba(0, 0, 0, .7);
        width: 630px;
        color: #b9b9b9;
        border-radius: 6px;
        position: relative
    }

    .ti {
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 0px 0 20px 22px;
        border-color: transparent transparent transparent #f1f1f1;
        position: absolute;
        left: 630px;
        top: 20px;
    }

    /* 三角形 */
    .ci {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: absolute;
        left: 658px;
        top: 16px;
        background: #000;
        border: 2px solid #333;
    }

    /* 圆形定义边框色与背景一致 */
    .ci:hover {
        border: 2px solid #B9B9B9;
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
        padding: 0 10px
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