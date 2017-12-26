<!--章盾设备升级管理-created by cecilia.yang at 2017/11/15-->
<template>

    <div class="app-container calendar-list-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <wscn-icon-svg icon-class="zonghe"/>
                <span style="font-size: 14px;font-weight: bold">章盾设备升级管理</span>
            </div>
            <div class="filter-container">

                <el-button class="filter-item" type="success" v-waves icon="plus" @click="handleCreate">添加设备版本信息</el-button>
                <el-button class="filter-item" type="primary" v-waves icon="edit"
                           @click="handleDetail(multipleSelection)">详情
                </el-button>
                <el-button class="filter-item" type="primary" v-waves icon="edit"
                           @click="handleUpdate(multipleSelection)">修改
                </el-button>
                <el-button class="filter-item" type="danger" v-waves icon="delete"
                           @click="handleDeleteMore(multipleSelection)">删 除
                </el-button>

            </div>

            <el-table :key='tableKey' :data="list" v-loading.body="listLoading" ref="multipleTable" border fit
                      highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column  label="序号" show-overflow-tooltip>
                    <template scope="scope">
                        <span class="link-type">{{ scope.$index+1}}</span>
                    </template>
                </el-table-column>
                <el-table-column  align="center" label="章盾固件名称" show-overflow-tooltip>
                    <template scope="scope">
                        <span>{{scope.row.firmwareVerision}}</span>
                    </template>
                </el-table-column>
                <el-table-column  align="center" label="内置翻斗章固件名称" show-overflow-tooltip>
                    <template scope="scope">
                        <span>{{scope.row.embedVersion}}</span>
                    </template>
                </el-table-column>
                <el-table-column  align="center" label="APP名称" show-overflow-tooltip>
                    <template scope="scope">
                        <span>{{scope.row.appVersion}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="备注" show-overflow-tooltip>
                    <template scope="scope">
                        <span>{{scope.row.remark}}</span>
                    </template>
                </el-table-column>

            </el-table>

            <div v-show="!listLoading" class="pagination-container">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="listQuery.pageNum"
                               :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>

            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" align="center">
                <el-form class="small-space" :model="temp" :rules="rules" ref="formName" label-position="center" :data="roleGridData"
                         label-width="200px" >
                    <!--新增时不展示，其余展示解析后的文件名称-->
                    <el-form-item label="章盾固件文件名称" prop="firmwareVerision" v-if="dialogStatus !='create'">
                        <el-col >
                            <el-input v-model="temp.firmwareVerision"readonly="readonly"></el-input>
                        </el-col>
                    </el-form-item>


                    <el-form-item label="章盾固件版本描述" prop="firmwareVersionDescribe">
                        <el-col >
                            <el-input v-model="temp.firmwareVersionDescribe" placeholder="请输入章盾固件版本描述"></el-input>
                        </el-col>
                    </el-form-item>
                    <!--只有新增时展示-->
                    <el-form-item label="章盾固件版本" prop="firmwareVerision" v-if="dialogStatus=='create'">
                        <el-upload
                                class="upload-demo"
                                action="http://portal.c1.centling.cn:30264/smartseal-eye-0.1/api/upgradeManage/equipUpgrade/upload"
                                ngf-select
                                accept=".bin"
                                :onError="uploadError"
                                :onSuccess="uploadFirmwareSuccess"
                                :beforeUpload="firmwareUpload"
                        >
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <p style="color: red">{{result}}</p>

                        </el-upload>
                    </el-form-item>

                    <!--新增时不展示，其余展示解析后的文件名称-->
                    <el-form-item label="内置翻斗章固件版本名称" prop="embedVersion" v-if="dialogStatus !='create'">
                        <el-col >
                            <el-input v-model="temp.embedVersion" readonly="readonly"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="内置翻斗章固件版本描述" prop="embedVersionDescribe">
                        <el-col >
                            <el-input v-model="temp.embedVersionDescribe" placeholder="请输入内置翻斗章固件版本描述"></el-input>
                        </el-col>
                    </el-form-item>
                    <!--只有新增时展示-->

                    <el-form-item label="内置翻斗章固件版本" prop="embedVersion"v-if="dialogStatus=='create'">

                        <el-upload
                                class="upload-demo"
                                action="http://portal.c1.centling.cn:30264/smartseal-eye-0.1/api/upgradeManage/equipUpgrade/upload"
                                ngf-select
                                accept=".bin"
                                :onError="uploadError"
                                :onSuccess="uploadEmbedSuccess"
                                :beforeUpload="embedUpload"
                        >
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <p style="color: red">{{result}}</p>

                        </el-upload>

                    </el-form-item>
                    <!--新增时不展示，其余展示解析后的文件名称-->
                    <el-form-item label="APP版本名称" prop="appVersion" v-if="dialogStatus !='create'">
                        <el-col >
                            <el-input v-model="temp.appVersion" readonly="readonly"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="APP版本描述" prop="appVersionDescribe">
                        <el-col>
                            <el-input v-model="temp.appVersionDescribe" placeholder="请输入APP版本描述"></el-input>
                        </el-col>
                    </el-form-item>
                    <!--只有新增时展示-->
                    <el-form-item label="APP版本文件" prop="appVersion" v-if="dialogStatus=='create'">
                        <el-upload

                                class="upload-demo"
                                action="http://portal.c1.centling.cn:30264/smartseal-eye-0.1/api/upgradeManage/equipUpgrade/upload"
                                ngf-select
                                accept=".apk"
                                :onError="uploadError"
                                :onSuccess="uploadAppSuccess"
                                :beforeUpload="appUpload"
                        >
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <p style="color: red">{{result}}</p>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-col >
                            <el-input type="textarea" v-model="temp.remark" placeholder="请输入备注"></el-input>
                        </el-col>
                    </el-form-item>
                    <!--新增时不展示-->
                    <el-form-item label="创建时间" prop="createdTime"v-if="dialogStatus !='create' && dialogStatus !='update'">
                        <el-col >
                            <el-input  v-model="temp.createdTimeStr"type="date" value-format="yyyy-MM-dd"readonly="readonly"></el-input>
                        </el-col>
                    </el-form-item>
                    <!--新增时不展示-->
                    <el-form-item label="创建人" prop="createdByStr" v-if="dialogStatus !='create' && dialogStatus !='update'">
                        <el-col >
                            <el-input v-model="temp.createdByStr"  readonly="readonly"></el-input>
                        </el-col>
                    </el-form-item>
                    <!--新增时不展示-->
                    <el-form-item label="修改时间" prop="lastModifiedTime"v-if="dialogStatus !='create' && dialogStatus !='update'">
                        <el-col >
                            <el-input v-model="temp.lastModifiedTimeStr"  readonly="readonly"></el-input>
                        </el-col>
                    </el-form-item>
                    <!--新增、修改时不展示-->
                    <el-form-item label="修改人" prop="lastModifiedByStr"v-if="dialogStatus !='create' && dialogStatus !='update'">
                        <el-col >
                            <el-input v-model="temp.lastModifiedByStr" readonly="readonly"></el-input>
                        </el-col>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="handleCancel('formName')">取 消</el-button>
                    <el-button v-if="dialogStatus=='create'" type="primary" @click="create('formName')">保存</el-button>
                    <el-button v-if="dialogStatus=='update'" type="primary" @click="update('formName')">确 定</el-button>
                </div>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
    import {
        fetchEquipUpgradeList,
        createEquipManage,
        updateEquipManage,
        deleteEquipManage,
    } from 'api/system/equipUpgradeManage';

    export default {
        name: 'equipUpgradeManage',
        data() {
            return {
                roleGridData: null,
                list: null,
                total: null,
                listLoading: true,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                tableKey: 0,
                currentRow: null,
                loading: false,
                managers: [],
                dialogRoleVisible: false,
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: '修改',
                    create: '添加版本设备信息',
                    detail:'版本详情'
                },
                temp: {
                    firmwareVersionDescribe: '',
                    firmwareVerision: null,
                    embedVersionDescribe: '',
                    embedVersion: null,
                    appVersionDescribe: '',
                    appVersion: null,
                    remark: ''

                },
            }
        },
        created() {
            this.getList();
        },
        filters: {
            sexFilter(val) {
                return sexArr[val]
            },
            statusFilter(val) {
                return statusArr[val]
            },
            sysFilter(val) {
                return sysArr[val]
            },
            availableFilter(val) {
                return availableArr[val]
            }
        },
        methods: {
            handleClear() {
                this.managers = [];
                this.listQuery.searchKey = '';
                this.temp.repassword = '';
            },

            handleRoleChange(val) {
                this.roleSelection = val;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            //章盾升级管理页面展示
            getList() {
                this.listLoading = true;
                fetchEquipUpgradeList(this.listQuery).then(response => {
                    this.list = response.data.returnData.pageInfo.list;
                    this.total = response.data.returnData.pageInfo.total;
                    this.listLoading = false;
                })
            },
            //内置翻斗章上传
            embedUpload (file) {
                this.temp.embedVersion=file.name;

            },
            uploadEmbedSuccess(response){
                this.temp.embedDownloadPath=response;
                console.log("embedDownloadPath",this.temp.embedDownloadPath)
            },
            //章盾上传
            firmwareUpload (file) {
                this.temp.firmwareVerision=file.name;
            },
            uploadFirmwareSuccess(response){
                this.temp.firmwareDownloadPath=response;
                console.log("firmwareDownloadPath",this.temp.firmwareDownloadPath)

            },
            //APP上传
            appUpload (file) {
                this.temp.appVersion=file.name;

            },
            uploadAppSuccess(response){
                this.temp.appDownloadPath=response;
                console.log("appDownloadPath",this.temp.appDownloadPath)

            },

            handleCancel(ruleForm) {
                this.dialogFormVisible = false;
                this.resetForm(ruleForm);
            },
            handleUpdate(row) {
                if (row.length === 0) {
                    this.$alert('请至少选择一条记录！', '提示', {
                        confirmButtonText: '确定'
                    });
                } else if (row.length > 1) {
                    this.$alert('只能选择一条记录进行修改！', '提示', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.temp = Object.assign({}, row[0]);
                    this.dialogStatus = 'update';
                    this.dialogFormVisible = true;
                }
            },
            handleCreate() {
                this.resetTemp();
                this.dialogStatus = 'create';
                this.dialogFormVisible = true;
            },
            handleDetail(row) {
                if (row.length === 0) {
                    this.$alert('请至少选择一条记录！', '提示', {
                        confirmButtonText: '确定'
                    });
                } else if (row.length > 1) {
                    this.$alert('只能选择一条记录！', '提示', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.temp = Object.assign({}, row[0]);
                    this.dialogStatus = 'detail';
                    this.dialogFormVisible = true;
                }
            },
            create(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        createEquipManage(this.temp).then(response => {
                            if (response.data.returnCode === 200
                            ) {
                                this.dialogFormVisible = false;
                                this.$notify({
                                    title: '成功',
                                    message: '创建成功',
                                    type: 'success',
                                    duration: 2000
                                });
                                this.getList();
                                this.resetTemp();
                            }
                            else {
                                this.$notify({
                                    title: '失败',
                                    message: '创建失败: ' + response.data.returnMsg,
                                    type: 'error',
                                    duration: 6000
                                });
                                this.resetForm(ruleForm);
                            }
                        })
                        ;
                    } else {
                        return false;
                    }
                })
                ;
            },
            update(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        updateEquipManage(this.temp).then(response => {
                            if (response.data.returnCode === 200
                            ) {
                                this.dialogFormVisible = false;
                                this.$notify({
                                    title: '成功',
                                    message: '修改成功',
                                    type: 'success',
                                    duration: 2000
                                });
                                this.getList();
                                this.resetForm(formName);
                            }
                            else {
                                this.$notify({
                                    title: '失败',
                                    message: '修改失败: ' + response.data.returnMsg,
                                    type: 'error',
                                    duration: 6000
                                });
                                this.resetForm(formName);
                            }
                        })
                    } else {
                        return false;
                    }
                })
                ;
            },
            handleCurrentTableChange(val) {
                this.currentRow = val;
            },
            filterChange(newfilter) {
            },
            handleFilter() {

                this.getList();
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getList();
            },

            resetTemp() {
                this.temp = {
                    firmwareVersionDescribe: '',
                    firmwareVerision: null,
                    embedVersionDescribe: '',
                    embedVersion: null,
                    appVersionDescribe: '',
                    appVersion: null,
                    remark: ''
                };
            },
            handleDeleteMore(arr) {
                if (arr.length === 0) {
                    this.$alert('请至少选择一条记录！', '提示', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.$confirm('此操作删除已选中的记录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var ids = [];
                        for (var value of arr) {
                            ids.push(value.id);
                        }
                        deleteEquipManage(ids).then(response => {
                            if (response.data.returnCode === 200
                            ) {
                                this.dialogFormVisible = false;
                                this.$notify({
                                    title: '成功',
                                    message: '删除成功',
                                    type: 'success',
                                    duration: 2000
                                });
                                this.getList();
                            }
                            else {
                                this.$notify({
                                    title: '失败',
                                    message: '删除失败: ' + response.data.returnMsg,
                                    type: 'error',
                                    duration: 6000
                                });
                            }
                        })
                    }).catch(() => {
                        return;
                    })
                    ;
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        }
    }
</script>

