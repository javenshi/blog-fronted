<template>
    <div class="app-container calendar-list-container" align="center">
        <el-card class="box-card" style="max-width: 700px;">
            <el-form :model="table" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="设备类型" prop="pass">
                    <el-input type="input" v-model="table.type" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备序列号" prop="pass">
                <el-input type="input" v-model="table.ascSn" auto-complete="off"></el-input>
            </el-form-item>
                <el-form-item label="设备状态" prop="checkPass">
                    <el-input type="input" v-model="table.status" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="设备蓝牙地址" prop="checkPass">
                    <el-input type="input" v-model="table.blueToothMac" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="租户" prop="age">
                    <el-input v-model.number="table.cloudUserId"></el-input>
                </el-form-item>
                <el-form-item label="代理商" prop="checkPass">
                    <el-input type="input" v-model="table.proxyId" auto-complete="off"></el-input>
                </el-form-item>
                <el-button style="float: right; margin-right: 10px;" type="plain" size="small" @click="retn">返回</el-button>
                <el-button style="float: right; margin-right: 10px;" type="primary" size="small"  @click="updateEquip">&nbsp;保存&nbsp;</el-button>
            </el-form>

        </el-card>
    </div>
</template>

<script>
    import {findOneById,updateById} from 'api/cloudeye/equip';
    export default {
        name: 'cloudequipEdit',
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
        },mounted(){
            findOneById(this.$route.query.id).then(response => {
                this.table= response.data.returnData;
            });
        },


        methods: {
            updateEquip(){
                updateById(this.table).then(response => {
                    var status=response.data.returnCode;
                    var message=response.data.returnMsg;
                    this.$notify({
                        title: status==200?'成功':'失败',
                        message: message,
                        type: status==200?'success':'warning',
                        duration: 2000});
                    this.$router.push('/cloudeye/cloudequeip/index');
                });
            },
            retn(){
                this.$router.push('/cloudeye/cloudequeip/index');
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