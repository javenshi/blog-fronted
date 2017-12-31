<template>
    <div class="app-container calendar-list-container">
    <el-tabs>
        <el-tab-pane label="导入一条">

            <el-form :model="ruleForm2" :rules="rules2" style="width:100px;" ref="ruleForm2" class="demo-ruleForm" align="center">
                <el-form-item label="设备类型">
                    <el-select size="small" style="width: 160px;" v-model="ruleForm2.status" placeholder="设备类型">
                        <el-option label="章盾设备" value="true"></el-option>
                        <el-option label="信印设备" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备序列号" prop="pass">
                    <el-input size="small" style="width: 160px;" type="input" v-model="ruleForm2.ascSn"
                              auto-complete="off"></el-input>
                </el-form-item>
                <el-button type="success" size="small" v-waves icon="plus" @click="addEqu">导入</el-button>


            </el-form>
        </el-tab-pane>

        <el-tab-pane label="导入多条">
            <p>.cvs文件可以通过Excel文件另存为CVS(逗号分隔)(*.cvs)生成。</p>
            <p>每条设备信息占一行，共二列。</p>
            <p>第一列为设备类型：DS—章盾，MS—信印。第二列为设备序列号：章盾14位，信印15位。</p>
            <p>格式如下：</p>
           <!-- <img alt="cvs文件样式" src="../../../assets/cvs.png">-->

            <el-upload
                    class="upload-demo"
                    action="http://portal.c1.centling.cn:30264/smartseal-eye-0.1/api/cloudequip/upload"
                    drag
                    multiple
                    accept=".csv"
                    :onError="uploadError"
                    :onSuccess="uploadSuccess"
                    :beforeUpload="beforeAvatarUpload"

            >
                <p style="color: red">{{result}}</p>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>立即导入</em></div>

            </el-upload>
        </el-tab-pane>
    </el-tabs></div>
</template>

<script>
    import {upload} from 'api/cloudeye/equip';
    import {addOneEqu} from 'api/cloudeye/equip';

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
                table: {},
                ruleForm2: {
                    status: '',
                    ascSn: ''
                },
                result: '',
                rules2: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    age: [
                        {validator: checkAge, trigger: 'blur'}
                    ]
                }
            };
        }, mounted() {
        },


        methods: {

            addEqu() {
                addOneEqu(this.ruleForm2).then(response => {
                    var status = response.data.returnCode;
                    var message = response.data.returnMsg;
                    this.$notify({
                        title: status == 200 ? '成功' : '失败',
                        message: message,
                        type: status == 200 ? 'success' : 'warning',
                        duration: 2000
                    });
                    this.ruleForm2 = {};

                });
            },
            beforeAvatarUpload(file) {
            }, uploadSuccess(response) {
                this.result = response.returnData;
            }
        }
    }
</script>