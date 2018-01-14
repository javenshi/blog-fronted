<template>
    <div>
        <top></top>
        <div style="margin-top:50px;width:96%;">

            <template>
                <el-row :gutter="20">
                    <el-col :span="3"><br></el-col>
                    <el-col :span="18">
                        <el-form :model="blog" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="标题:" prop="blogsName">
                                <el-input v-model="blog.blogsName" style="width:100%;"></el-input>

                            </el-form-item>

                            <el-form-item label="正文:">
                                <div style="padding-bottom: 10%;">
                                    <quill-editor v-model="blogContext"
                                                  ref="myQuillEditor"
                                                  style="height: 500px;background-color: white"
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
                                    <el-button type="danger" round><router-link :to="'/'">取消</router-link></el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="3"></el-col>
                </el-row>

            </template>
        </div>
    </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor';
    import top from '../component/top';
    import tokenStore from 'store2';
    import {saveB} from 'api/blog/blog';

    export default {
        components: {
            quillEditor, top
        },
        data() {
            return {
                blog: {blogsName: '', blogsClassifyId: '', blogsStatus: '',blogsPart:''},
                blogContext: '',
                datas: '',
                UNAME: '',
            };
        }, mounted() {
            this.UNAME = tokenStore.local('User').userName;
        },

        methods: {

            saveBlog(blogsStatus) {

              this.blog.blogsPart=this.delHtmlTag(this.blogContext).substring(0,100);

                this.blog.blogsStatus = blogsStatus;
                this.blog.blogsUrl = this.blogContext;
                this.blog.userName = this.UNAME;
                saveB(this.blog).then(response => {
                    this.$notify({
                        title: response.data.returnCode == 200 ? '成功' : '失败',
                        message: response.data.returnMsg,
                        type: response.data.returnCode == 200 ? 'success' : 'warning',
                        duration: 5000
                    });
                });
                this.$router.push('/');
            },
            onEditorReady(editor) {

            },
            delHtmlTag(str) {
                return str.replace(/<[^>]+>/g, "");
            },
        }
    }
</script>

