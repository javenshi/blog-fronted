<template>
    <div>
        <top></top>
        <div style="margin-top:50px;width:96%;">

            <template>
                <el-row :gutter="20">
                    <el-col :span="3"><br></el-col>
                    <el-col :span="18">
                        <el-form :model="blog" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="标题:" prop="blogsName" :rules="[
        { min:1,max:80, message: '标题长度不规范', trigger: 'blur' },
         { required: true, message: '请输入标题', trigger: 'blur' }
                                ]">
                                <el-input v-model="blog.blogsName" style="width:100%;"></el-input>

                            </el-form-item>

                            <el-form-item label="正文:" prop="blogContext" >

                                <div style="padding-bottom: 10%;">
                                    <quill-editor v-model="blogContext"
                                                  ref="myQuillEditor"
                                                  style="height: 500px;background-color: white"
                                                  class="editer"
                                                  @ready="onEditorReady($event)">
                                    </quill-editor>
                                </div>
                            </el-form-item>
                            <el-form-item label="分类:" prop="blogsClassifyName"
                                          :rules="[
         { required: true, message: '请选择标签', trigger: 'blur' }]">

                                <el-tag v-if="blog.blogsClassifyName!=null&&blog.blogsClassifyName!=''" type="success">
                                    {{blog.blogsClassifyName}}
                                </el-tag>
                                <br>
                                <el-tag
                                        type="primary"
                                        :key="tag"
                                        v-for="tag in dynamicTags"
                                >
                                    <span class="cursor" @click="useTag(tag)"> {{tag}}</span>
                                </el-tag>
                                <el-input
                                        class="input-new-tag"
                                        v-if="inputVisible"
                                        v-model="inputValue"
                                        ref="saveTagInput"
                                        size="mini"
                                        style="width: 200px;"
                                        @keyup.enter.native="handleInputConfirm"
                                        @blur="handleInputConfirm"
                                >
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput">创建一个
                                </el-button>
                            </el-form-item>
                            <el-form-item>
                                <div style="margin-left: 35%;">
                                    <el-button type="success" @click="saveBlog(1,'ruleForm')" round>保存</el-button>
                                    <el-button type="info" @click="saveBlog(0,'ruleForm')" round>草稿</el-button>
                                    <el-button type="danger" round>
                                        <router-link :to="'/'">取消</router-link>
                                    </el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="3"></el-col>
                </el-row>
                <down></down>
            </template>
        </div>
    </div>
</template>

<script>
    import down from '../component/down';
    import {quillEditor} from 'vue-quill-editor';
    import top from '../component/top';
    import tokenStore from 'store2';
    import {saveB, seletcClassifyName, insertClassName} from 'api/blog/blog';


    export default {
        components: {
            quillEditor, top, down
        },
        data() {

            return {
                blog: {blogsName: '', profileUrl: '', blogsClassifyName: '', blogsStatus: '', blogsPart: ''},
                blogContext: '',
                dynamicTags: '',
                inputVisible: false,
                inputValue: ''

            };
        }, mounted() {
            if (tokenStore.session('user') == null) {
                window.location.href = "/";
            }
            seletcClassifyName().then(response => {
                this.dynamicTags = response.data.returnData;
            });

        },

        methods: {

            useTag(tag) {
                this.blog.blogsClassifyName = tag;
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    if (this.dynamicTags.toString().indexOf(inputValue) > 0) {
                        this.$message({
                            message: "标签已存在",
                            type: 'error',
                            duration: 3 * 1000
                        });
                    } else {
                        this.dynamicTags.push(inputValue);
                        insertClassName(inputValue).then(response => {

                        });
                    }

                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            saveBlog(blogsStatus,formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.blogContext == ''||this.blogContext.length<40) {
                            this.$message({
                                message: "正文长度太短",
                                type: 'error',
                                duration: 3 * 1000
                            });

                        }else if(this.blogContext.length>4194304){
                            this.$message({
                                message: "正文内容过长，建议您调整一下图片大小",
                                type: 'error',
                                duration: 3 * 1000
                            });
                        } else {
                            this.blog.blogsPart = this.delHtmlTag(this.blogContext).substring(0, 100);
                            this.blog.blogsStatus = blogsStatus;
                            this.blog.blogsUrl = this.blogContext;
                            this.blog.status = 2;
                            this.blog.userName = tokenStore.session('user').userName;
                            this.blog.userId = tokenStore.session('user').id;
                            this.blog.profileUrl = "<img class=\"userLogo\" src=\"" + tokenStore.session('user').profileUrl + "\">";
                            saveB(this.blog).then(response => {
                                this.$notify({
                                    title: response.data.returnCode == 200 ? '成功' : '失败',
                                    message: response.data.returnMsg,
                                    type: response.data.returnCode == 200 ? 'success' : 'warning',
                                    duration: 5000
                                });
                            });
                            this.$router.push('/');
                        }

                    }


                });
            },
            onEditorReady(editor) {

            },
            delHtmlTag(str) {
                return str.replace(/<[^>]+>/g, "");
            },
        }
    }
</script>

