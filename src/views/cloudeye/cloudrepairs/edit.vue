<template>
    <div class="app-container calendar-list-container" align="center">
        <el-card class="box-card" style="max-width: 700px;">
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="处理人" prop="pass">
                    <el-input size="small" style="width: 100px;" type="input" v-model="ruleForm2.conductUser" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="处理结果">
                    <el-input size="small" style="width: 100px;" type="input" v-model="ruleForm2.conductResult" auto-complete="off" ></el-input>
                </el-form-item>

             <el-form-item label="处理描述">
                    <el-input size="small" style="width: 200px;" type="input" v-model="ruleForm2.context" auto-complete="off" ></el-input>
                </el-form-item>

                <el-form-item label="维修费用" prop="pass">
                    <el-input size="small" style="width: 100px;" type="input" v-model="ruleForm2.conductMoney" auto-complete="off" ></el-input>
                </el-form-item>
            </el-form>
            <el-button
                    type="success" size="small" v-waves icon="plus"
                    @click="update">导入结果
            </el-button>
            <el-button
                    type="primary"
                    size="small"
                    @click="retn">返回
            </el-button>
        </el-card>
    </div>
</template>

<script>
    import {updateById} from 'api/cloudeye/repairs';
    export default {
        name: 'cloudrepairsEdit',
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                table:{},
                ruleForm2: {
                    id:'',
                    conductUser:'', conductResult:'', context:'', conductMoney:''
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    age: [
                        { validator: checkAge, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            update(){
                this.ruleForm2.id=this.$route.query.id;
                updateById(this.ruleForm2).then(response => {
                    var status=response.data.returnCode;
                    var message=response.data.returnMsg;
                    this.$notify({
                        title: status==200?'成功':'失败',
                        message: message,
                        type: status==200?'success':'warning',
                        duration: 2000});
                    this.$router.push('/cloudeye/cloudrepairs/index');
                });
            },
            retn(){
                this.$router.push('/cloudeye/cloudrepairs/index');
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>