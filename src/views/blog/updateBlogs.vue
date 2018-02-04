<template>
    <div>

        <top></top>

        <div class=" calendar-list-container;" style="padding: 20px;"
        >

            <div style="margin-top:50px;width:96%;margin-left: 2%;">
                <template>
                    <el-form :model="blog" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="标题:" prop="blogsName" :rules="[
        { min:1,max:80, message: '标题长度不规范', trigger: 'blur' },
         { required: true, message: '请输入标题', trigger: 'blur' }
                                ]">
                            <el-input v-model="blog.blogsName" style="width:100%;"></el-input>

                        </el-form-item>

                        <el-form-item label="正文:"  prop="blogContext">
                            <div style="padding-bottom: 40px;">
                                <quill-editor v-model="blog.blogsUrl"
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
                                <el-button type="danger" round><router-link :to="'/'">取消</router-link></el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </template>
            </div>

        </div>
        <down></down>
    </div>


</template>
<script>
    import top from '../component/top';
    import down from '../component/down';
    import {quillEditor} from 'vue-quill-editor';
    import {getBlogsById,saveB,seletcClassifyName, insertClassName} from 'api/blog/blog';
    import tokenStore from 'store2';
    import {parseTime} from 'utils';

    export default {
        components: {
//使用编辑器
            quillEditor,top,down
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
                dynamicTags: '',
                inputVisible: false,
                inputValue: ''
            };
        }, created() {
            this.UID = tokenStore.session('user').id;

            if(this.UID==null||this.UID==0){
                this.$router.push('/blog/updateBlogs3123123?id=' + id);
            }
            getBlogsById(this.$route.query.id,this.getIp()).then(response => {
                if(this.UID==response.data.returnData.userId){
                    this.blog = response.data.returnData;
                }
            });
            seletcClassifyName().then(response => {
                this.dynamicTags = response.data.returnData;
            });
        },

        methods: {
            getIp() {
                return returnCitySN["cip"];
            },
            saveBlog(blogsStatus,formName) {
                this.$refs[formName].validate((valid) => {
                        if (valid) {
                            if (this.blog.blogsUrl == ''||this.blog.blogsUrl.length<40) {
                                this.$message({
                                    message: "正文长度太短",
                                    type: 'error',
                                    duration: 3 * 1000
                                });

                            }else  if(this.blogContext.length>4194304){
                                this.$message({
                                    message: "正文内容过长，建议您调整一下图片大小",
                                    type: 'error',
                                    duration: 3 * 1000
                                });
                            } else {
                                this.blog.blogsStatus = blogsStatus;
                                //this.blog.status = 0;
                                this.blog.status = 2;
                                this.blog.blogsPart = this.delHtmlTag(this.blog.blogsUrl).substring(0, 100);
                                saveB(this.blog).then(response => {
                                    this.$notify({
                                        title: response.data.returnCode == 200 ? '成功' : '失败',
                                        message: response.data.returnMsg,
                                        type: response.data.returnCode == 200 ? 'success' : 'warning',
                                        duration: 5000
                                    });
                                    this.getBlogs();
                                });
                            }
                        }});

            },  delHtmlTag(str) {
                return str.replace(/<[^>]+>/g, "");
            },
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
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
    }
</script>