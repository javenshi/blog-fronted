<template>
    <div>
        <top></top>
        <div style="margin-top:50px;width:96%;">

            <template>
                <el-row :gutter="20">
                    <el-col :span="1"><br></el-col>
                    <el-col :span="21">
                        <el-card class="box-card">
                            <el-row :gutter="20">
                                <div v-for=" item in uiList" :key="item">
                                <el-col :span="6">
                                    <el-card class="box-card">
                                        <div class="cursor cursor1" @click="browse(item.id)" v-html="item.brief"></div>
                                        <strong> {{item.uiName}}</strong><br>

                                        <span class="img1"><span
                                                v-html="item.profileUrl"></span> {{item.userName}}</span>
                                        <span class="img1"><img
                                                src="../../img/click.png"> {{item.uiClick}}</span>
                                        <br>
                                        <span class="img1"><img
                                                src="../../img/time.png">
                                            {{item.createdTime|parseTime('{y}-{m}-{d} {h}:{i} ')}}
                                        </span>
                                        <br><br>
                                    </el-card>
                                </el-col>
                                </div>
                            </el-row>
                        </el-card>
                    </el-col>
                    <el-col :span="2"><span @click="opo"> <el-button><i class="el-icon-upload"></i>上传</el-button></span>
                        <el-dialog title="传作品" :visible.sync="upDis" align="center">
                            <el-form :model="ui" status-icon ref="resour"
                                     class="demo-ruleForm">
                                <el-form-item label="标题:" prop="uiName" :rules="[
        { min:1,max:80, message: '标题长度不规范', trigger: 'blur' },
         { required: true, message: '请输入标题', trigger: 'blur' }
                                ]">
                                    <el-input size="small" type="input" v-model="ui.uiName"
                                              auto-complete="off"></el-input>
                                </el-form-item>

                                <el-form-item label="简略图:" prop="brief" :rules="[
         { required: true, message: '请上传简略图', trigger: 'blur' }
                                ]">
                                    <el-upload
                                            :action="url"
                                            list-type="picture-card"
                                            :on-preview="handlePictureCardPreview"
                                            :on-success="success"
                                    >
                                        <i class="el-icon-plus"></i>
                                    </el-upload>
                                    <el-dialog v-model="dialogVisible" size="tiny">
                                        <img width="100%" :src="dialogImageUrl" alt="">
                                    </el-dialog>
                                </el-form-item>
                                <el-form-item label="作品:" prop="sample" :rules="[
         { required: true, message: '请上传作品集', trigger: 'blur' }
                                ]">
                                    <el-upload
                                            class="upload-demo"
                                            :action="url"
                                            :on-success="successMore"
                                            :file-list="fileList"
                                            list-type="picture">
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                </el-form-item>
                                <el-form-item>
                                    <el-button @click="saveUI('resour')" type="primary">上传
                                    </el-button>
                                </el-form-item>
                            </el-form>

                        </el-dialog>
                    </el-col>
                </el-row>
                <down></down>
            </template>
        </div>
    </div>
</template>

<script>
    import down from '../component/down';
    import {selectPage,insert} from 'api/ui/ui';
    import {parseTime} from 'utils';
    import top from '../component/top';
    import tokenStore from 'store2';


    export default {
        components: {
            top, down
        },
        data() {

            return {
                upDis: false,
                ui: {brief: '', sample: '',},
                url: process.env.BASE_API + '/api/ui/upl',
                dialogImageUrl: '',
                dialogVisible: false,
                fileList: [],
                uiList:[],
            };
        }, mounted() {
            this.getUIList();
        },

        methods: {
            browse(id){
                this.$router.push('/ui/browse?id='+id);
            },
            opo(){
                if (tokenStore.session('user') != null) {
                    this.upDis=true;
                } else {
                    this.$message({
                        message: "请先登录后再上传资源",
                        type: 'error',
                        duration: 3 * 1000
                    });
                }

            },
            handleChange(file, fileList) {
                if (file.size > 735497) {
                    this.$refs.upload.abort(file);
                }
            },
            success(response, file, fileList) {
                this.ui.brief = "<img style=\"width: 100%;height: 200px;\" src=\"" + response.returnData + "\">";
            },
            successMore(response, file, fileList) {
                this.ui.sample = "<img style=\"width: 100%;height: 100%;\" src=\"" + response.returnData + "\"><br><br>";
                this.fileList.push({
                    name: file.name,
                    url: file.url
                });

            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            getUIList(){
                selectPage().then(response => {
                  this.uiList=response.data.returnData;
                });
            },
            uplode() {
                this.ui.status = 2;
                this.ui.userName = tokenStore.session('user').userName;
                this.ui.userId = tokenStore.session('user').id;
                this.ui.profileUrl = "<img class=\"userLogo\" src=\"" + tokenStore.session('user').profileUrl + "\">";
                insert(this.ui).then(response => {
                     this.$notify({
                         title: response.data.returnCode == 200 ? '成功' : '失败',
                         message: response.data.returnMsg,
                         type: response.data.returnCode == 200 ? 'success' : 'warning',
                         duration: 5000
                     });
                     this.getUIList();
                     this.upDis=false;
                    this.ui='';
                 });

            },
            saveUI(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.uplode();
                    }
                });
            },
        }
    }
</script>

<style>
    .cursor1:hover{
       margin-top: -3px;
    }
</style>