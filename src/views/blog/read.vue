<template>
    <div>
     <top></top>


        <div class=" calendar-list-container;" style="padding: 20px;">

            <el-row :gutter="20">
                <el-col :span="1"><br></el-col>
                <el-col :span="17">
               <div v-if="!noBlog" >
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
                UNAME: '',
                blog: '',
                textarea: '',
                Comments: {blogId: '', userId: '', context: '', userName: ''},
                pageSize: 5,
                comentsList: '',
                noBlog: false,
            };
        }, created() {
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
    !function () {
        function n(n, e, t) {


            return n.getAttribute(e) || t
        }

        function e(n) {

            return document.getElementsByTagName(n);
        }

        function t() {
            var t = e("script"), o = t.length, i = t[o - 1];

            return {
                l: o,
                z: n(i, "zIndex", -1),
                o: n(i, "opacity", .5),
                c: n(i, "color", "0,0,0"),
                n: n(i, "count", 99)
            }
        }

        function o() {
            a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }

        function i() {
            r.clearRect(0, 0, a, c);
            var n, e, t, o, m, l;
            s.forEach(function (i, x) {
                for (i.x += i.xa, i.y += i.ya, i.xa *= i.x > a || i.x < 0 ? -1 : 1, i.ya *= i.y > c || i.y < 0 ? -1 : 1, r.fillRect(i.x - .5, i.y - .5, 1, 1), e = x + 1; e < u.length; e++) n = u[e], null !== n.x && null !== n.y && (o = i.x - n.x, m = i.y - n.y, l = o * o + m * m, l < n.max && (n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m), t = (n.max - l) / n.max, r.beginPath(), r.lineWidth = t / 2, r.strokeStyle = "rgba(" + d.c + "," + (t + .2) + ")", r.moveTo(i.x, i.y), r.lineTo(n.x, n.y), r.stroke()))
            }), x(i)
        }

        var a, c, u, m = document.createElement("canvas"), d = t(), l = "c_n" + d.l, r = m.getContext("2d"),
            x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (n) {
                window.setTimeout(n, 1e3 / 45)
            }, w = Math.random, y = {x: null, y: null, max: 2e4};
        m.id = l, m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o, e("body")[0].appendChild(m), o(), window.onresize = o, window.onmousemove = function (n) {
            n = n || window.event, y.x = n.clientX, y.y = n.clientY
        }, window.onmouseout = function () {
            y.x = null, y.y = null
        };
        for (var s = [], f = 0; d.n > f; f++) {
            var h = w() * a, g = w() * c, v = 2 * w() - 1, p = 2 * w() - 1;
            s.push({x: h, y: g, xa: v, ya: p, max: 6e3})
        }
        u = s.concat([y]), setTimeout(function () {
            i()
        }, 100)
    }();
</script>