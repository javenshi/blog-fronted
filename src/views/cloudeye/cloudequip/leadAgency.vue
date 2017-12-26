<template>
    <div class="app-container calendar-list-container" align="center">
        <el-card class="box-card" style="max-width: 700px;">
            <div slot="header" class="clearfix">
                <span style="font-size: 13px;font-weight: bold">设备代理商关系导入</span>
            </div>


            <p>.cvs文件可以通过Excel文件另存为CVS(逗号分隔)(*.cvs)生成。</p>
            <p>每条设备信息占一行，共三列。(第三列为可选列)</p>
            <p>第一列为设备类型：DS—章盾，MS—信印。第二列为设备序列号：章盾14位，信印15位。</p>
            <p>第三列为设备所属代理商的企业号</p>
            <p>格式如下：</p>
            <img alt="cvs文件样式" src="../../../assets/cvs.png">
            <img alt="cvs文件样式" src="../../../assets/CVS2.png">

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
            <el-button style="float: right; margin-right: 10px;" type="primary" size="small" @click="retn">返回</el-button>


        </el-card>
    </div>
</template>

<script>
    import {upload} from 'api/cloudeye/equip';
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
                result:'',
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
        },


        methods: {
            retn(){
                this.$router.push('/cloudeye/cloudequeip/index');
            },
            beforeAvatarUpload (file) {
            },uploadSuccess(response){
                this.result=response.returnData;
            }
        }
    }
</script>