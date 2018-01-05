<template>
    <div>



        <div class=" calendar-list-container;" style="padding: 20px;"
        >

            <div style="margin-top:50px;width:96%;margin-left: 2%;">
                <template>
                    <el-form :model="blog" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="标题:" prop="blogsName">
                            <el-input v-model="blog.blogsName" style="width:100%;"></el-input>
                            <!--  <el-select v-model="blog.leixing" filterable style="width:10%;" placeholder="请选择">
                                  <el-option
                                          v-for="item in leixing"
                                          :key="item.value"
                                          :label="item.label"
                                          :value="item.value">
                                  </el-option>
                              </el-select>-->
                        </el-form-item>

                        <el-form-item label="正文:">
                            <div style="padding-bottom: 40px;">
                                <quill-editor v-model="blog.blogsUrl"
                                              ref="myQuillEditor"
                                              style="height: 500px;"
                                              class="editer"
                                              @ready="onEditorReady($event)">
                                </quill-editor>
                            </div>
                        </el-form-item>
                        <el-form-item label="分类:" prop="blogsClassifyId">
                            <el-radio-group v-model="blog.blogsClassifyId">
                                <el-radio :label="1">人工智能</el-radio>
                                <el-radio :label="2">移动开发</el-radio>
                                <el-radio :label="3">物联网架构</el-radio>
                                <el-radio :label="4"> 云计算/大数据</el-radio>
                                <el-radio :label="5">游戏开发</el-radio>
                                <el-radio :label="6"> 运维</el-radio>
                                <el-radio :label="7"> 数据库</el-radio>
                                <el-radio :label="8"> 前端</el-radio>
                                <el-radio :label="9"> 安全</el-radio>
                                <el-radio :label="10"> 编程语言</el-radio>
                                <el-radio :label="11"> 程序人生</el-radio>
                                <el-radio :label="12"> 随笔</el-radio>
                                <el-radio :label="13"> 其他</el-radio>
                            </el-radio-group>

                        </el-form-item>
                        <el-form-item>
                            <div style="margin-left: 35%;">
                                <el-button type="success" @click="saveBlog(1)" round>保存</el-button>
                                <el-button type="info" @click="saveBlog(0)" round>草稿</el-button>
                                <el-button type="danger" round><router-link :to="'/blog/userCenter'">取消</router-link></el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </template>
            </div>

        </div>
    </div>


</template>
<script>
    import {quillEditor} from 'vue-quill-editor';
    import {getCode, cName, saveUser, login, valUser} from 'api/blog/user';
    import {getBlogsById,saveB} from 'api/blog/blog';
    import tokenStore from 'store2';
    import {parseTime} from 'utils';

    export default {
        components: {
//使用编辑器
            quillEditor
        },
        data() {
            return {
                UID: '',
                blog: '',
                textarea: '',
                Comments:{blogId:'',userId:'',context:'',userName:''},
                pageSize: 5,
                comentsList:'',
                noBlog: false,
            };
        }, mounted() {
            this.UID = tokenStore.local('User').id;

            if(this.UID==null||this.UID==0){
                this.$router.push('/blog/updateBlogs3123123?id=' + id);
            }
            getBlogsById(this.$route.query.id).then(response => {
                this.blog = response.data.returnData;
            });
        },

        methods: {
            saveBlog(blogsStatus) {
                this.blog.blogsStatus = blogsStatus;
                saveB(this.blog).then(response => {
                    this.$notify({
                        title: response.data.returnCode == 200 ? '成功' : '失败',
                        message: response.data.returnMsg,
                        type: response.data.returnCode == 200 ? 'success' : 'warning',
                        duration: 5000
                    });
                    this.getBlogs();
                });
            },
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
    }
</script>