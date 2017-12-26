<template>
    <div class="app-container calendar-list-container;" align="center">
        <el-card class="box-card" style="max-width: 700px;">
            <el-form :model="cloudAgency" :rules="rules2" ref="cloudAgencyFrom" label-width="100px">
                <!--<el-form-item label="公司名称" prop="companyName" required>-->
                    <!--<el-input type="input" v-model="cloudAgency.companyName" auto-complete="off"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="代理商编号" prop="agencyNum" required v-show="!id">
                    <el-row>
                        <el-col :span="20">
                            <el-input type="input" v-model="cloudAgency.agencyNum" auto-complete="off"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button style="float: right;" type="success" v-waves  size="small" icon="plus" @click="getCode">&nbsp;生成&nbsp;</el-button>
                        </el-col>
                    </el-row>
            </el-form-item>
                <el-form-item label="代理商编号" prop="agencyNum" required v-show="id">
                    <el-input type="input" v-model="cloudAgency.agencyNum" auto-complete="off" :disabled="id"></el-input>
            </el-form-item>
                <el-form-item label="代理商账号" prop="agencyAccount" required v-show="!id">
                    <el-input type="input" v-model="cloudAgency.agencyAccount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="代理商账号" prop="agencyAccount" required v-show="id">
                    <el-input type="input" v-model="cloudAgency.agencyAccount" auto-complete="off" :disabled="id"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="agencyPassword" required v-show="!id">
                    <el-input type="password" v-model="cloudAgency.agencyPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="agencyPasswordAgain" required v-show="!id">
                    <el-input type="password" v-model="cloudAgency.agencyPasswordAgain" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建人" prop="createdName" required  :disabled="true" v-show="id">
                    <el-input type="input" v-model="cloudAgency.createdName" auto-complete="off" :disabled="id"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="createdTime" required  :disabled="true" v-show="id">

                    {{cloudAgency.createdTime|parseTime('{y}-{m}-{d} {h}:{i}')}}
                </el-form-item>
                <el-form-item>
                    <router-link :to="'/cloudeye/cloudagency/index'">
                        <el-button style="float: right; margin-right: 10px;" type="plain" size="small">返回</el-button>
                    </router-link>
                    <el-button style="float: right; margin-right: 10px;" type="primary" size="small" @click="submitForm('cloudAgencyFrom')" :loading="listLoading">&nbsp;保存&nbsp;</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script>
    import { saveCloudAgency, getCloudAgency } from 'api/cloudeye/cloudAgency';
    import {getCompanCode} from 'api/cloudeye/cloudUser';
    import {parseTime} from 'utils';
    export default {
        name: 'cloudAgencyEdit',
        created() {
            console.log(this.$route.query.uid);
            if( this.$route.query.uid ) {

                getCloudAgency(this.$route.query.uid).then(response => {
                    this.cloudAgency = response.data.returnData;
                    this.id=true;
                });
            }
        },
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } if (value.length<6) {
                    callback(new Error('密码长度不能小于6位'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.cloudAgency.agencyPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validateCode = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('代理商编号长度不能小于6位'));
                } else {
                    callback();
                }
            };
            return {
                id:false,
                listLoading: false,
                cloudAgency: {
                    id: null,
                    agencyNum:'',
                    agencyAccount:'',
                    agencyPassword: '',
                    agencyPasswordAgain: '',
                    createdTime: '',
                    createdName: '',
                    createdBy: '',
                    lastModifiedTime: '',
                    lastModifiedName: '',
                    lastModifiedBy: '',
                    deleteFlag: ''

                },
                rules2: {
                    agencyNum: [
                        { validator: validateCode, trigger: 'blur' },
                        {required: true, message: '请输入代理商编号', trigger: 'blur'},
                        {  pattern:/^[^ ]+$/, message: '代理商编号中不能包含空格',trigger: 'blur'},
                        {  pattern:/^[^\u4e00-\u9fa5]+$/, message: '代理商编号中不能包含汉字',trigger: 'blur'},
                ],
                    agencyAccount: [

                        {  pattern:/^[^ ]+$/, message: '代理商账号中不能包含空格',trigger: 'blur'},
                        {required: true, message: '请输入代理商账号', trigger: 'blur'},
                        {  pattern:/^[^\u4e00-\u9fa5]+$/, message: '代理商账号中不能包含汉字',trigger: 'blur'},
                    ],
                    agencyPassword: [
                        { validator: validatePass, trigger: 'blur' }

                    ],
                    agencyPasswordAgain: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.listLoading = true;
                if(this.id){
                    this.cloudAgency.agencyPasswordAgain=this.cloudAgency.agencyPassword;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        saveCloudAgency(this.cloudAgency).then(response => {
                            console.log(response);
                            var status=response.data.returnCode;
                            var message=response.data.returnMsg;
                            this.$notify({
                                title: status==200?'成功':'失败',
                                message: message,
                                type: status==200?'success':'warning',
                                duration: 2000});
                                this.listLoading = false;
                            this.$router.push('/cloudeye/cloudagency/index');
                        });
                    } else {
                        /*this.$alert('表单验证不通过！', '提示', {
                            confirmButtonText: '确定'
                        });*/
                        this.listLoading = false;
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }, getCode() {
                getCompanCode().then(response => {
                    this.cloudAgency.agencyNum = response.data.returnData;
                });
            }
        }
    }
</script>