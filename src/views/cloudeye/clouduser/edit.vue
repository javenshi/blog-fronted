<template>
    <div class="app-container calendar-list-container;" align="center">
        <el-card class="box-card" style="max-width: 700px;">
            <!--<template slot="header">
                <span>租户信息</span>
                <router-link :to="'/cloudeye/clouduser/index'">
                    <el-button style="float: right; margin-right: 10px;" type="plain" size="small">返回</el-button>
                </router-link>
                <el-button style="float: right; margin-right: 10px;" type="primary" size="small" @click="submitForm('cloudUserFrom')" :loading="listLoading">&nbsp;保存&nbsp;</el-button>
            </template>-->

            <el-form :model="cloudUser" :rules="rules2" ref="cloudUserFrom" label-width="100px">
                <el-form-item label="公司名称" prop="companyName" required>
                    <el-input type="input" v-model="cloudUser.companyName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="租户企业号" prop="companyCode" required v-show="!date">
                    <el-row>
                        <el-col :span="20">
                            <el-input type="input" v-model="cloudUser.companyCode" auto-complete="off"
                                      :disabled="date"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button style="float: right;" type="success" size="small" v-waves icon="plus" @click="getCode">
                                &nbsp;生成&nbsp;
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="租户企业号" prop="companyCode" required  v-show="date">
                            <el-input type="input" v-model="cloudUser.companyCode" auto-complete="off"
                                      :disabled="date"></el-input>
                </el-form-item>
                <el-form-item label="管理员账号" prop="sysUser" required>
                    <el-input type="input" v-model="cloudUser.sysUser" auto-complete="off" :disabled="date"></el-input>
                </el-form-item>
                <el-form-item label="重置密码"  v-show="date">
                    <el-select v-model="radio" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                </el-form-item>
                <el-form-item label="密码" prop="sysPassword" required v-show="!date">
                    <el-input type="password" v-model="cloudUser.sysPassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="sysPasswordAgain" required v-show="!date">
                    <el-input type="password" v-model="cloudUser.sysPasswordAgain" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="companyLinker" required>
                    <el-input type="input" v-model="cloudUser.companyLinker" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="companyPhone" required>
                    <el-input type="input" v-model="cloudUser.companyPhone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="companyTel">
                    <el-input type="input" v-model="cloudUser.companyTel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <router-link :to="'/cloudeye/clouduser/index'">
                        <el-button style="float: right; margin-right: 10px;" type="plain" size="small">返回</el-button>
                    </router-link>
                    <el-button style="float: right; margin-right: 10px;" type="primary" size="small"
                               @click="submitForm('cloudUserFrom')">&nbsp;保存&nbsp;
                    </el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script>
    import {saveCloudUser, getCloudUser, getCompanCode, validateCode} from 'api/cloudeye/cloudUser';

    export default {
        name: 'cloudUserEdit',
        created() {
            if (this.$route.query.uid) {
                this.date = true;
                getCloudUser(this.$route.query.uid).then(response => {
                    this.cloudUser = response.data.returnData;
                });
            }
        },
        data() {

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } if (value.length < 6) {
                    callback(new Error('密码长度不能小于6位'));
                } else {
                    callback();
                }
            };
            var validateCode = (rule, value, callback) => {
                 if (value.length < 6) {
                    callback(new Error('企业号长度不能小于6位'));
                } else {
                    callback();
                }
            };


            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.cloudUser.sysPassword) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                date: false,
                value: '',
                radio:'',
                options: [{
                    value: 0,
                    label: '否'
                }, {
                    value: 1,
                    label: '是'
                }],
                cloudUser: {
                    id: null,
                    radio:0,
                    companyCode: '',
                    companyName: '',
                    sysDomain: '',
                    sysUser: '',
                    sysPassword: '',
                    sysPasswordAgain: '',
                    sysSchema: '',
                    xinyinNum: '',
                    zhangdunNum: '',
                    companyLinker: '',
                    companyPhone: '',
                    companyTel: '',
                    state: null,
                    createdBy: null,
                    createdDate: null,
                    createdId: null,
                    deleteFlag: null,
                    lastModifiedBy: null,
                    lastModifiedDate: null,
                    lastModifiedId: null,

                },
                rules2: {
                    companyName: [
                        {required: true, message: '请输入企业名称', trigger: 'blur'}
                    ],
                    companyCode: [
                        {required: true, message: '请输入或点击按钮生成企业号', trigger: 'blur'},
                        {validator: validateCode, trigger: 'blur'},
                        {  pattern:/^[^\u4e00-\u9fa5]+$/, message: '企业号中不能包含汉字',trigger: 'blur'}
                    ], sysUser: [
                        {required: true, message: '请输入管理员账号', trigger: 'blur'},
                        {  pattern:/^[^ ]+$/, message: '管理员账号中不能包含空格',trigger: 'blur'},
                        {  pattern:/^[^\u4e00-\u9fa5]+$/, message: '管理员账号中不能包含汉字',trigger: 'blur'}

                    ], companyLinker: [
                        {required: true, message: '请输入该企业联系人', trigger: 'blur'},
                        {  pattern:/^[^ ]+$/, message: '企业联系人中不能包含空格',trigger: 'blur'}
                    ], companyPhone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                        {  pattern:/^[^ ]+$/, message: '手机号中不能包含空格',trigger: 'blur'},
                        {  pattern:/^1\d{10}$/, message: '手机号不符合规则',trigger: 'blur'},
                        {  pattern:/^[^\u4e00-\u9fa5]+$/, message: '手机号中不能包含汉字',trigger: 'blur'}
                    ],
                    companyTel: [
                        {  pattern:/^[^\u4e00-\u9fa5]+$/, message: '电话号中不能包含汉字',trigger: 'blur'}

                    ],

                    sysPassword: [
                        {validator: validatePass, trigger: 'blur'}

                    ],
                    sysPasswordAgain: [
                        {validator: validatePass2, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {

                if (this.cloudUser.id != null) {
                    this.cloudUser.sysPasswordAgain=this.cloudUser.sysPassword;
                    this.$refs[formName].validate((valid) => {
                            if (valid) {
                    this.cloudUser.radio=this.radio;
                    saveCloudUser(this.cloudUser).then(response => {
                        this.$notify({
                            title: '成功',
                            message: "用户信息修改成功",
                            type: 'success',
                            duration: 2000
                        });
                        this.$router.push('/cloudeye/clouduser/index');
                    });}});
                } else {
                    this.$refs[formName].validate((valid) => {

                        if (valid) {
                            validateCode(this.cloudUser.companyCode).then(response => {
                                    if ("企业号已被注册" == response.data.returnData) {
                                        var message = response.data.returnData;
                                        this.$notify({
                                            title: '失败',
                                            message: message,
                                            type: 'warning',
                                            duration: 2000
                                        });
                                    } else {
                                        saveCloudUser(this.cloudUser).then(response => {
                                            setTimeout(() => {},1000);
                                            this.$notify({
                                                title: '成功',
                                                message: '租户新增成功！',
                                                duration: 2000
                                            });
                                            if (202 == response.data.returnData) {
                                                this.$notify.error({
                                                    title: '失败',
                                                    message: '数据库已被用完！',
                                                    duration: 0
                                                });
                                            }
                                        });
                                    }
                                }
                            );
                            this.$router.push('/cloudeye/clouduser/index');
                        }
                        else {
                            return false;
                        }
                    });
                }

            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }, getCode() {
                getCompanCode().then(response => {
                    this.cloudUser.companyCode = response.data.returnData;
                });
            }
        }
    }
</script>