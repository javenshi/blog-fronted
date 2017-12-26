<template>

    <div class="app-container calendar-list-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <wscn-icon-svg icon-class="zonghe"/>
                <span style="font-size: 14px;font-weight: bold">数据字典</span>
            </div>


            <el-row>
                <el-col :span="13" style="padding-right: 1%">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="font-size: 13px;font-weight: bold;margin-right: 10px">字典列表</span>
                            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                                      v-model="listQuery.searchKey" placeholder="字典名称">
                            </el-input>

                            <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜
                                索
                            </el-button>
                            <el-button class="filter-item" type="success" v-waves icon="plus" @click="handleCreate">
                                字典分类录入
                            </el-button>
                        </div>
                        <div class="filter-container">

                            <!--<el-button class="filter-item" type="primary" v-waves icon="edit" @click="handleUpdate(multipleSelection)">修 改</el-button>-->
                            <!--<el-button class="filter-item" type="danger" v-waves icon="delete" @click="handleDeleteMore(multipleSelection)">删 除</el-button>-->
                        </div>
                        <el-table :key='tableKey' :data="dictionaryList" v-loading.body="listLoading"
                                  ref="multipleTable" border fit highlight-current-row style="width: 90%"
                                  @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <el-table-column width="110" label="字典名称" show-overflow-tooltip>
                                <template scope="scope">
                                    <span class="link-type">{{scope.row.dictTypeName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width="120" label="字典Code" show-overflow-tooltip>
                                <template scope="scope">
                                    <span class="link-type">{{scope.row.dictType}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label="操作">
                                <template scope="scope">
                                    <el-button class="filter-item" size="small" type="primary" v-waves
                                               @click="handleUpdate(scope.row)">编辑
                                    </el-button>
                                    <el-button class="filter-item" size="small" type="primary" v-waves
                                               @click="showRight(scope.row)">查看类型
                                    </el-button>
                                    <el-button class="filter-item" size="small" type="danger" v-waves
                                               @click="handleSingleDelete(scope.row)">删除
                                    </el-button>
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
                    </el-card>
                </el-col>
                <el-col :span="11">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="font-size: 14px;font-weight: bold">字典类表</span>
                        </div>
                        <!--//这个是右边那个树-->
                        <div class="grid-content bg-purple-light box-border">
                            <h4 style="display: inline-block;margin-right: 20px;margin-left: 8px;font-size: 14px">类型类表</h4>
                            <h4 style="display: inline-block;margin-right: 40px;margin-left: 8px;font-size: 14px">
                                字典分类：{{selectRoleName}}</h4>
                            <el-button class="filter-item" type="success" v-waves icon="plus"
                                       @click="handleCreateRight">类型录入
                            </el-button>
                            <el-table
                                    v-loading.body="rightListLoading"
                                    :data="dicTypeList"
                                    stripe
                                    :key="id"
                                    style="width: 100%" @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        prop="dictName"
                                        label="类型名称"
                                        width="100">
                                </el-table-column>
                                <el-table-column
                                        prop="dictValue"
                                        label="类型编码"
                                        width="100">
                                </el-table-column>
                                <el-table-column align="center" label="操作" show-overflow-tooltip>
                                    <template scope="scope">
                                        <el-button class="filter-item" type="primary" v-waves icon="edit"
                                                   @click="handleUpdateRight(scope.row)">编辑
                                        </el-button>
                                        <el-button class="filter-item" type="danger" v-waves icon="delete"
                                                   @click="handleSingleDeleteRight(scope.row)">删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                        </div>
                    </el-card>
                </el-col>
            </el-row>

            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" align="center">
                <el-form class="small-space" :model="temp" :rules="rules" ref="formName" label-position="right"
                         label-width="120px" style='width: 90%;'>

                    <el-form-item label="字典名称" v-if="(dialogStatus=='create') || (dialogStatus=='update')"
                                  prop="dictTypeName">
                        <el-col style="width:250px;">
                            <el-input v-model="temp.dictTypeName" placeholder="请输入字典名称"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="字典Code" v-if="(dialogStatus=='create') || (dialogStatus=='update')"
                                  prop="dictType">
                        <el-col style="width:250px;">
                            <el-input v-model="temp.dictType" placeholder="请输入字典Code"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="类型名称" v-if="(dialogStatus=='createRight') || (dialogStatus=='updateRight')"
                                  prop="dictName">
                        <el-col style="width:250px;">
                            <el-input v-model="temp.dictName" placeholder="请输入字典名称"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="类型Code" v-if="(dialogStatus=='createRight') || (dialogStatus=='updateRight')"
                                  prop="dictValue">
                        <el-col style="width:250px;">
                            <el-input v-model="temp.dictValue" placeholder="请输入字典Code"></el-input>
                        </el-col>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="handleCancel('formName')">取 消</el-button>
                    <el-button v-if="dialogStatus=='create'" type="primary" @click="create('formName')">确 定</el-button>
                    <el-button v-if="dialogStatus=='createRight'" type="primary" @click="createRight('formName')">确 定
                    </el-button>
                    <el-button v-if="dialogStatus=='update'" type="primary" @click="update('formName')">确 定</el-button>
                    <el-button v-if="dialogStatus=='updateRight'" type="primary" @click="updateRight('formName')">确 定
                    </el-button>
                </div>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
    /*import { rightControll, hasMenuList,getRulesByRoleAndMenu} from 'api/system/SRole';*/
    import { parseTime } from 'utils';
    import { getAllDictionaryList, getDictionaryListByType, createNewDictionary,
            updateDictionary, updateDictionaryChild,
            deleteDictionary, deleteDictionaryChild} from 'api/system/SDictionary.js';

    const sysOption = [
        {dictType: false, dicLabel: '否'},
        {dictType: true, dicLabel: '是'}
    ];
    const availableOption = [
        {dictType: false, dicLabel: '不可用'},
        {dictType: true, dicLabel: '可用'}
    ];
    const sysArr = ['否', '是'];
    const availableArr = ['不可用', '可用'];
    export default {
        name: 'SRole',
        data() {
            return {
                //暂存变量
                tempStore: {
                    roleId: undefined,
                    menuId: undefined
                },

                //弹出界面显示状态
                dialogFormVisible: false,
                rightControllVisible: false,
                ruleTablePanelVisible: false,
                ruleFormPanelVisible: false,

                dictionaryList: null,
                total: null,
                listLoading: true,
                rightListLoading: false,
                selectRoleName: "未选中",
                selectRoleType: "未选中",
                selectRoleNameId: "",
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
                dialogStatus: '',
                textMap: {
                    update: '编辑字典',
                    updateRight: '编辑类型',
                    create: '创建字典',
                    createRight: '添加类型',
                    controll: '权限控制',
                    ruleTreePanelTitle: '数据隔离'
                },
                temp: {
                    dictTypeName: '',
                    dictType: '',
                    dictName: '',
                    dictValue: ''
                },
                multipleSelection: [],
                treeList: [],
                filter_data_rules: [],
                defaultCheckedKeys: [],
                defaultExpandedKeys: [],
                sysOption,
                availableOption,
                rules: {
                    dictTypeName: [
                        {required: true, message: '请输入字典名称', trigger: 'blur'},
                        {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
                    ],
                    dictType: [
                        {required: true, message: '请输入字典Code', trigger: 'blur'},
                        {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
                    ],
                    dictName: [
                        {required: true, message: '请输入类型名称', trigger: 'blur'},
                        {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
                    ],
                    dictValue: [
                        {required: true, message: '请输入类型Code', trigger: 'blur'},
                        {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur'}
                    ],
                },
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                menuTemp: {
                    roleid: undefined,
                    menuIds: []
                },
                dicTypeList: [],
            }
        },
        created() {
            this.getList();
        },
        filters: {
            sysFilter(val){
                if (val) {
                    return "是"
                } else {
                    return "否"
                }
//            return sysArr[val]
            },
            availableFilter(val){
                if (val) {
                    return "可用"
                } else {
                    return "不可用"
                }
                return availableArr[val]
            }
        },
        methods: {
            showRight(row){
                console.log("查看字典分类列表：")
                console.log(row.dictType + '')
                this.selectRoleName = row.dictTypeName
                this.selectRoleType = row.dictType
                this.getRightList(row.dictType)
            },
            checkChange(node, ifSelected, ifSelected2){
                console.log(node)
                console.log(ifSelected)
                console.log(ifSelected2)
            },
            hideFilterRuleTablePanel(){
                this.ruleTablePanelVisible = false;
            },

            filterRuleTableOk(){
                var selectSize = this.dataFilterRuleSelection.length;
                if (selectSize === 0) {
                    this.$alert('请至少选择一条记录！', '提示', {
                        confirmButtonText: '确定'
                    });
                    return;
                } else {
                    //
                    var ids = [];
                    for (var value of this.dataFilterRuleSelection) {
                        ids.push(value.id);
                    }
                    var rid = this.menuTemp.roleid;
                    var mid = this.tempStore.menuId;
                    updateRoleMenuRealtionForRule(rid, mid, ids).then(response => {
                        if (response.data.returnCode === 200
                )
                    {
                        //var rid = this.menuTemp.roleid;
                        // var mid = this.tempStore.menuId;
                        // this.loadingDataFilterRules(rid, mid);
                        this.$message({
                            showClose: true,
                            message: response.data.returnMsg,
                            type: 'success'
                        });
                    }
                else
                    {
                        this.$message({
                            showClose: true,
                            message: response.data.returnMsg,
                            type: 'error'
                        });
                    }
                }
                )
                    ;
                }
            },

            showEditFilterRuleFormPanel(){

                this.loadingDataFilterRule();
            },

            filterRuleFormCancel(formName){
                this.ruleFormPanelVisible = false;
                this.resetForm(formName);
            },


            loadingDataFilterRules(rid, mid){
                /*getRulesByRoleAndMenu(rid,mid).then(response=>{
                 if (response.data.returnCode === 200) {
                 this.filter_data_rules = response.data.returnData.rules;
                 }else{
                 this.$message({
                 showClose: true,
                 message: response.data.returnMsg,
                 type: 'error'
                 });
                 }
                 }
                 );*/
            },


            handleRuleSelectionChange(val) {
                this.dataFilterRuleSelection = val;
            },

            deleteFilterRules(){
                var selectSize = this.dataFilterRuleSelection.length;
                if (selectSize === 0) {
                    this.$alert('请至少选择一条记录！', '提示', {
                        confirmButtonText: '确定'
                    });
                    return;
                } else {
                    //
                    var ids = [];
                    for (var value of this.dataFilterRuleSelection) {
                        ids.push(value.id);
                    }
                }
            },

            /*过滤规则相关操作方法   end*/



            handleClear() {
                this.listQuery.searchKey = '';
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getList() {
                this.listLoading = true;
                console.log(this.listQuery)
                getAllDictionaryList(this.listQuery).then(response => {
                    console.log("这是分页查询")
                console.log(response)
                this.dictionaryList = response.data.returnData.pageInfo.list;
                this.total = response.data.returnData.pageInfo.total;
                this.listLoading = false;
            })
            },
            getRightList(dictType) {
                this.rightListLoading = true;
                console.log(this.listQuery)
                getDictionaryListByType(this.listQuery, dictType).then(response => {
                    console.log("这是右边的分页查询")
                console.log(response)
                this.dicTypeList = response.data.returnData;
                this.rightListLoading = false;
            })
            },
            handleCancel(ruleForm){
                this.dialogFormVisible = false;
                this.resetForm(ruleForm);
            },
            handleUpdate(row){
                this.temp = Object.assign({}, row);
                console.log("字典编辑框打开：")
                console.log(row)
                console.log(this.temp)
                this.dialogStatus = 'update';
                this.dialogFormVisible = true;
            },
            handleUpdateRight(row){
                this.temp = Object.assign({}, row);
                console.log("类型编辑框打开：")
                console.log(row)
                console.log(this.temp)
                this.dialogStatus = 'updateRight';
                this.dialogFormVisible = true;
            },
            handleCreate(){
                this.resetTemp();
                this.dialogStatus = 'create';
                this.dialogFormVisible = true;
            },
            handleCreateRight(){
                if (this.selectRoleName != null && this.selectRoleType != null && this.selectRoleName != "未选中" && this.selectRoleType != "未选中") {
                    this.resetTemp();
                    this.dialogStatus = 'createRight';
                    this.dialogFormVisible = true;
                } else {
                    this.$notify({
                        title: '失败',
                        message: '请先选择字典',
                        type: 'error',
                        duration: 6000
                    });
                }
            },
            create(ruleForm){
                console.log("创建字典分类：")
                console.log(ruleForm)
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        console.log("创建传入参数：")
                        console.log(this.temp)
                        console.log(JSON.stringify(this.temp))
                        createNewDictionary(this.temp).then(response => {
                            if (response.data.returnCode === 200
                    )
                        {
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: '成功',
                                message: '创建成功',
                                type: 'success',
                                duration: 2000
                            });
                            this.getList();
                            this.resetForm(ruleForm);
                        }
                    else
                        {
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
                    }else {
                        return false;
            }
            })
                ;
            },
            createRight(ruleForm){
                console.log("创建类型分类：")
                console.log(ruleForm)
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        console.log("创建传入参数：")
                        console.log(this.temp)
                        console.log(JSON.stringify(this.temp))
                        if (this.selectRoleName != null && this.selectRoleType != null && this.selectRoleName != '未选中' && this.selectRoleType != '未选中') {
                            this.temp.dictTypeName = this.selectRoleName;
                            this.temp.dictType = this.selectRoleType;
                            createNewDictionary(this.temp).then(response => {
                                if (response.data.returnCode === 200
                        )
                            {
                                this.dialogFormVisible = false;
                                this.$notify({
                                    title: '成功',
                                    message: '创建成功',
                                    type: 'success',
                                    duration: 2000
                                });
                                this.getRightList(this.temp.dictType);
                                this.resetForm(ruleForm);
                            }
                        else
                            {
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
                        }
                    }else {
                        return false;
            }
            })
                ;
            },
            update(ruleForm){
                console.log("修改字典分类：")
                console.log(ruleForm)
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        var dictionary = {
                            id: this.temp.id,
                            dictType: this.temp.dictType,
                            dictTypeName: this.temp.dictTypeName
                        };
                        console.log("修改传入参数：")
                        console.log(dictionary)
                        console.log(JSON.stringify(dictionary))
                        updateDictionary(dictionary).then(response => {
                            if (response.data.returnCode === 200
                    )
                        {
                            if (this.selectRoleName != null && this.selectRoleName != '未选中' && this.selectRoleType != null && this.selectRoleType != '未选中') {
                                this.selectRoleName = this.temp.dictTypeName;
                                this.selectRoleType = this.temp.dictType;
                            }
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success',
                                duration: 2000
                            });
                            this.getList();
                            this.resetForm(ruleForm);
                        }
                    else
                        {
                            this.$notify({
                                title: '失败',
                                message: '修改失败: ' + response.data.returnMsg,
                                type: 'error',
                                duration: 6000
                            });
                            this.resetForm(ruleForm);
                        }
                    })
                    }else {
                        return false;
            }
            })
                ;
            },
            updateRight(ruleForm){
                console.log("修改类型分类：")
                console.log(ruleForm)
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        var dictionary = {
                            id: this.temp.id,
                            dictName: this.temp.dictName,
                            dictValue: this.temp.dictValue
                        };
                        console.log("修改传入参数：")
                        console.log(dictionary)
                        console.log(JSON.stringify(dictionary))
                        updateDictionaryChild(this.temp).then(response => {
                            if (response.data.returnCode === 200
                    )
                        {
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success',
                                duration: 2000
                            });
                            this.getRightList(this.selectRoleType)
                            this.resetForm(ruleForm);
                        }
                    else
                        {
                            this.$notify({
                                title: '失败',
                                message: '修改失败: ' + response.data.returnMsg,
                                type: 'error',
                                duration: 6000
                            });
                            this.resetForm(ruleForm);
                        }
                    })
                    }else {
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
            resetTemp(){
                this.temp = {
                    dictTypeName: '',
                    dictType: ''
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
                    /*deleteRole(ids).then(response => {
                     if (response.data.returnCode === 200) {
                     this.dialogFormVisible = false;
                     this.$notify({
                     title: '成功',
                     message: '删除成功',
                     type: 'success',
                     duration: 2000
                     });
                     this.getList();
                     } else {
                     this.$notify({
                     title: '失败',
                     message: '删除失败: ' + response.data.returnMsg,
                     type: 'error',
                     duration: 6000
                     });
                     }
                     })*/
                }).
                    catch(() => {
                        return;
                })
                    ;
                }
            },
            loadTreeList(){
                /*fetchTreeList().then(response=>{
                 if (response.data.returnCode === 200) {
                 console.log("加载树：")
                 console.log(response.data.returnData)
                 this.treeList = response.data.returnData;
                 }
                 });*/
            },
            handleSingleDelete(row){
                this.temp = Object.assign({}, row);
                console.log("删除字典：")
                console.log(row)
                console.log(this.temp)
                this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var dictionary = {id: this.temp.id}
                    deleteDictionary(dictionary).then(response => {
                    if (response.data.returnCode === 200
            )
                {
                    this.dialogFormVisible = false;
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success',
                        duration: 2000
                    });
                    this.getList();
                    if (this.selectRoleName == this.temp.dictTypeName) {
                        this.selectRoleName = '未选中'
                        this.selectRoleType = '未选中'
                        this.dicTypeList = []
                    }
                }
            else
                {
                    this.$notify({
                        title: '失败',
                        message: '删除失败: ' + response.data.returnMsg,
                        type: 'error',
                        duration: 6000
                    });
                }
            })
            }).
                catch(() => {
                    return;
            })
                ;
            },
            handleSingleDeleteRight(row){
                this.temp = Object.assign({}, row);
                console.log("删除字典：")
                console.log(row)
                console.log(this.temp)
                this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteDictionaryChild(this.temp.id
            ).
                then(response => {
                    if (response.data.returnCode === 200
            )
                {
                    this.dialogFormVisible = false;
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success',
                        duration: 2000
                    });
                    this.getRightList(this.selectRoleType)
                }
            else
                {
                    this.$notify({
                        title: '失败',
                        message: '删除失败: ' + response.data.returnMsg,
                        type: 'error',
                        duration: 6000
                    });
                }
            })
            }).
                catch(() => {
                    return;
            })
                ;
            },
            /*rightControll(id,roleName){
             this.selectRoleName=roleName;
             this.selectRoleNameId=id;
             this.dialogStatus = 'controll';
             //            this.rightControllVisible = true;
             this.menuTemp.roleid = id;
             this.tempStore.roleId = id;
             this.defaultCheckedKeys = [];
             hasMenuList(id).then(response=>{
             if (response.data.returnCode === 200) {
             console.log("树的默认选中：")
             console.log(response.data.returnData)
             this.treeList=response.data.returnData.authority
             this.defaultCheckedKeys = response.data.returnData.selectIds;
             //                      this.loadTreeList();
             }
             });

             },*/
            rightControllCancel(){
                this.rightControllVisible = false;
                this.defaultCheckedKeys = [];
                this.menuTemp = {
                    roleid: undefined,
                    menuIds: []
                };
                this.tempStore = {
                    roleId: undefined,
                    menuId: undefined
                }
            },
            rightControllCreate(){
                var keys = this.$refs.tree.getCheckedKeys();
                this.menuTemp.menuIds = this.$refs.tree.getCheckedKeys();
                //创建角色菜单关系
                console.log("修改树传入额参数：")
                console.log(this.menuTemp)
                /*rightControll(this.menuTemp).then(response=>{
                 if (response.data.returnCode === 200) {
                 this.rightControllVisible = false;
                 this.$notify({
                 title: '成功',
                 message: '分配成功',
                 type: 'success',
                 duration: 2000
                 });
                 } else {
                 this.$notify({
                 title: '失败',
                 message: '分配失败: ' + response.data.returnMsg,
                 type: 'error',
                 duration: 6000
                 });
                 }
                 });*/

            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style>
    .box-border {
        border: 1px solid #eee;
    }
</style>

