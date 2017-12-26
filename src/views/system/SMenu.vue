<template>

    <div class="app-container calendar-list-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <wscn-icon-svg icon-class="zonghe"/>
                <span style="font-size: 14px;font-weight: bold">菜单管理</span>
            </div>
            <div class="filter-container">
                <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="菜单名称" v-model="listQuery.searchKey">-->
                <!--</el-input>-->

                <!--<el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜 索</el-button>-->

                <!--<el-button class="filter-item" type="primary" v-waves icon="edit" @click="handleUpdate(multipleSelection)">修 改</el-button>-->
                <!--<el-button class="filter-item" type="danger" v-waves icon="delete" @click="handleDeleteMore(multipleSelection)">删 除</el-button>-->
            </div>
            <el-row>
                <el-col :span="12" style="padding-right: 1%">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="font-size: 14px;font-weight: bold">菜单列表</span>
                            <el-button class="filter-item" type="success" v-waves icon="plus" @click="handleCreate"
                                       style="margin-left: 50px">添 加
                            </el-button>
                        </div>
                        <div class="filter-container">

                        </div>
                        <el-tree
                                :data="treeList"
                                show-checkbox
                                node-key="id"
                                show-checkbox
                                default-expand-all
                                :check-strictly="true"
                                ref="tree"
                                :expand-on-click-node="false"
                                highlight-current
                                :default-expanded-keys="defaultExpandedKeys"
                                :default-checked-keys="defaultCheckedKeys"
                                @check-change="checkChange"
                                :props="defaultProps"
                                :render-content="renderContent">
                        </el-tree>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card"  v-if="showButtonAuthority || showDateRole">
                        <div slot="header" class="clearfix">
                            <span style="font-size: 14px;font-weight: bold">权限配置</span>
                        </div>
                        <div class="grid-content bg-purple-light box-border" style="padding-left: 5%"
                             v-if="showButtonAuthority">
                            <div class="filter-container">
                                <h4 style="display: inline-block;margin-right: 10px;margin-left: 8px">页面控件权限配置</h4>
                                <h4 style="display: inline-block;margin-right: 12px;margin-left: 0px;font-size: 16px">
                                    菜单:({{rightTitle}})</h4>
                                <el-button class="filter-item" type="success" v-waves icon="plus"
                                           @click="addButtonDiglog">操作录入
                                </el-button>
                                <el-button class="filter-item" type="danger" v-waves icon="delete"
                                           @click="deleteButton(buttonMultipleSelection)">删除
                                </el-button>
                            </div>
                            <el-table
                                    :data="buttonAuthorityList"
                                    stripe
                                    :key="buttonAuthorityList.id"
                                    style="width: 80%" @selection-change="handleButtonSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        prop="operationname"
                                        label="页面控件名称 "
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="operationcode"
                                        label="页面控件编码 "
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        label="类型"
                                >
                                    <template scope="scope">
                                        <span>{{scope.row.operationtype | buttonType}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="grid-content bg-purple-light box-border" style="padding-left: 5%"
                             v-if="showDateRole">
                            <div class="filter-container">
                                <h3 style="display: inline-block;margin-right: 10px;margin-left: 8px">数据权限控制</h3>
                                <h3 style="display: inline-block;margin-right: 12px;margin-left: 0px;font-size: 16px">
                                    菜单:({{rightTitle}})</h3>
                                <el-button class="filter-item" type="success" v-waves icon="plus"
                                           @click="addRuleDiglog">操作录入
                                </el-button>
                                <el-button class="filter-item" type="danger" v-waves icon="delete"
                                           @click="deleteDateRuler(ruleMultipleSelection)">删除
                                </el-button>
                            </div>
                            <el-table
                                    :key='tableKey' v-loading.body="dateRoleLoading" :data="dateRuleList"
                                    ref="multipleTable"
                                    border fit highlight-current-row style="width: 90%"
                                    @selection-change="handleRuleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        prop="ruleName"
                                        label="规则名称 "
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="ruleColumn"
                                        label="规则字段 "
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="ruleConditions"
                                        label="规则条件"
                                        width="120"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="ruleValue"
                                        label="规则值 "
                                >
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" align="center">
                <el-form class="small-space" :model="temp" :rules="rules" ref="formName" label-position="right"
                         label-width="120px" style='width: 90%;'>
                    <el-form-item label="菜单名称" prop="functionname">
                        <el-col style="width:250px;">
                            <el-input v-model="temp.functionname" placeholder="请输入菜单名称"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="菜单英文名" prop="functionnameEng">
                        <el-col style="width:250px;">
                            <el-input v-model="temp.functionnameEng" placeholder="请输入菜单英文名"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="菜单描述" prop="functiondescription">
                        <el-col style="width:250px;">
                            <el-input v-model="temp.functiondescription" placeholder="请输入菜单描述"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="菜单级别" prop="functionlevel">
                        <el-col :span="5">
                            <el-select
                                    style="width:250px;" v-model="temp.functionlevel"
                                    clearable
                                    placeholder="请选择">
                                <el-option
                                        v-for="item in menuLevelOption"
                                        :key="item.dicCode"
                                        :label="item.dicLabel"
                                        :value="item.dicCode">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>


                    <el-form-item v-if="temp.functionlevel == 1" label="父菜单" prop="parentfunctionid">
                        <el-col style="width:250px;">
                            <el-input v-model="temp.parentfunctionid" placeholder="请输入父菜单"></el-input>
                        </el-col>
                    </el-form-item>

                    <el-form-item label="菜单url" prop="functionurl">
                        <el-col style="width:250px;">
                            <el-input v-model="temp.functionurl" placeholder="请输入菜单url"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="菜单顺序" prop="functionorder" required>
                        <el-col style="width:250px;">
                            <el-input v-model="temp.functionorder" placeholder="请输入菜单顺序"></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="handleCancel('formName')">取 消</el-button>
                    <el-button v-if="dialogStatus=='create'" type="primary" @click="create('formName')">确 定</el-button>
                    <el-button v-else type="primary" @click="update('formName')">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisibleButton" align="center">
                <el-form class="small-space" :model="tempButton" :rules="rules" ref="formName" label-position="right"
                         label-width="120px" style='width: 90%;'>

                    <el-form-item label="页面权限名称" prop="name">
                        <el-col style="width:250px;">
                            <el-input v-model="tempButton.name" placeholder="请输入页面权限名称"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="页面权限编码" prop="chineseName">
                        <el-col style="width:250px;">
                            <el-input v-model="tempButton.chineseName" placeholder="请输入页面权限编码"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="页面控件名称" prop="buttonDes">
                        <el-col style="width:250px;">
                            <el-input v-model="tempButton.operationname" placeholder="请输入页面控件名称"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="页面控件编码" prop="buttonType">
                        <el-col style="width:250px;">
                            <el-input v-model="tempButton.operationcode" placeholder="请输入页面控件编码"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="规则类型" prop="buttonType">
                        <el-col style="width:250px;">
                            <el-select
                                    style="width:250px;" v-model="tempButton.operationtype"
                                    clearable
                                    placeholder="请选择">
                                <el-option
                                        v-for="item in buttonTypeOption"
                                        :key="item.dicCode"
                                        :label="item.dicLabel"
                                        :value="item.dicCode">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <!--<el-form-item label="测试组件" prop="">-->
                    <!--<form-selection dictionaryParam="ORDER_TYPE" @returnParam="ceshireturnParam"></form-selection>-->
                    <!--</el-form-item>-->


                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="handleCancel('formName')">取 消</el-button>
                    <el-button v-if="dialogStatus=='create'" type="primary" @click="createButtonAuthority('formName')">确
                        定
                    </el-button>
                    <el-button v-else type="primary" @click="update('formName')">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisibleRule" align="center">
                <el-form class="small-space" :model="tempRule" :rules="rules" ref="formName" label-position="right"
                         label-width="120px" style='width: 90%;'>

                    <el-form-item label="页面权限名称" prop="name">
                        <el-col style="width:250px;">
                            <el-input v-model="tempRule.name" placeholder="请输入页面权限名称"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="页面权限编码" prop="chineseName">
                        <el-col style="width:250px;">
                            <el-input v-model="tempRule.chineseName" placeholder="请输入页面权限编码"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="规则字段" prop="ruleColumn">
                        <el-col style="width:250px;">
                            <el-input v-model="tempRule.ruleColumn" placeholder="请输入规则字段"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="条件规则" prop="ruleConditions">
                        <el-col style="width:250px;">
                            <el-input v-model="tempRule.ruleConditions" placeholder="请输入条件规则"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="规则值" prop="ruleValue">
                        <el-col style="width:250px;">
                            <el-input v-model="tempRule.ruleValue" placeholder="请输入规则值"></el-input>
                        </el-col>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="handleCancel('formName')">取 消</el-button>
                    <el-button v-if="dialogStatus=='create'" type="primary" @click="createRule('formName')">确 定
                    </el-button>
                    <el-button v-else type="primary" @click="update('formName')">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import { fetchMenuList, createMenu, updateMenu, deleteMenu,hasMenuList,getMenuById,newAddMenu,getRightButton,getRightRule} from 'api/system/SMenu';
    import { parseTime } from 'utils';
    import formSelection from '../components/formSelection.vue';

    const menuLevelOption = [
        {dicCode: 1, dicLabel: '下级菜单'},
        {dicCode: 0, dicLabel: '一级菜单'}
    ];
    const buttonTypeOption = [
        {dicCode: 1, dicLabel: '隐藏'},
        {dicCode: 2, dicLabel: '禁用'}
    ];
    const menuLevelArr = ['一级菜单', '下级菜单'];
    export default {
        name: 'SMenu',
        data() {
            var validateUrl = (rule, value, callback) => {
                if (value.length<1) {
                    callback(new Error('请输入菜单顺序'));
                } else {
                    callback();
                }
            };
            return {
                list: null,
                total: null,
                listLoading: true,
                dateRoleLoading: true,
                showButtonAuthority: false,
                showDateRole: false,
                rightTitle: "未选中",
                ceshiSelectType: "ceshicanshu",
                rightMenuId: "",
                treeList: [],
                buttonAuthorityList: [],
                dateRuleList: [],
                defaultExpandedKeys: [],
                defaultCheckedKeys: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
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
                dialogFormVisible: false,
                dialogFormVisibleButton: false,
                dialogFormVisibleRule: false,
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                temp: {
                    functionlevel: 0,
                    functionname: '',
                    functionnameEng: '',
                    functiondescription: '',
                    functionorder: '',
                    functionurl: '',
                    parentfunctionid: 0,
                    functiontype: '',
                    functionurl: ''
                },
                tempButton: {
                    name: "",
                    chineseName: "",
                    operationname: "",
                    operationcode: "",
                    operationtype: "",
                    authType: 2
                },
                tempRule: {
                    name: "",
                    chineseName: "",
                    ruleColumn: "",
                    ruleConditions: "",
                    ruleValue: "",
                    authType: 3
                },

                multipleSelection: [],
                buttonMultipleSelection: [],
                ruleMultipleSelection: [],
                menuLevelOption,
                buttonTypeOption,
                rules: {
                    functionname: [
                        {required: true, message: '请输入菜单名称', trigger: 'blur'},
                        {  pattern:/^[^ ]+$/, message: '菜单名称中不能包含空格',trigger: 'blur'}
                    ],
                    functionorder: [
                        {validator: validateUrl, trigger: 'blur'},
                        {type: 'number', message: '请输入数字',trigger: 'blur'},
                        {  pattern:/^[^ ]+$/, message: '菜单顺序中不能包含空格',trigger: 'blur'}
                    ],
                    functionurl: [
                        {required: true, message: '请输入菜单路径', trigger: 'blur'},
                        {  pattern:/^[^ ]+$/, message: '菜单路径中不能包含空格',trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入页面控件名称', trigger: 'blur'}
                    ],
                    chineseName: [
                        {required: true, message: '请输入页面控件编码', trigger: 'blur'}
                    ],
                    ruleName: [
                        {required: true, message: '请输入规则名称', trigger: 'blur'}
                    ],
                    ruleField: [
                        {required: true, message: '请输入规则字段', trigger: 'blur'}
                    ],
                    ruleCondition: [
                        {required: true, message: '请输入条件规则', trigger: 'blur'}
                    ],
                    ruleZhi: [
                        {required: true, message: '请输入规则值', trigger: 'blur'}
                    ],
                }
            }
        },
        components: {
            formSelection
        },

        created() {
            this.getList();
            this.loadTreeList();
        },
        filters: {
            menuLevelFilter(val){
                return menuLevelArr[val]
            },
            buttonType(val){
                if (val == 1) {
                    return "隐藏"
                } else {
                    return "禁用"
                }
            }
        },
        methods: {
            checkChange(node, ifSelected, ifSelected2){
                console.log(node)
                console.log(ifSelected)
                console.log(ifSelected2)
            },

            handleClear() {
                this.listQuery.searchKey = '';
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleButtonSelectionChange(val) {
                this.buttonMultipleSelection = val;
            },
            handleRuleSelectionChange(val) {
                this.ruleMultipleSelection = val;
            },
            loadTreeList(){
                hasMenuList(0).then(response => {
                    if (response.data.returnCode === 200
            )
                {
                    console.log("树的默认选中：")
                    console.log(response.data.returnData)
                    this.treeList = response.data.returnData.authority
                }
            })
                ;
            },
            getList() {
//          this.listLoading = true;
//            fetchMenuList(this.listQuery).then(response => {
//                console.log("菜单列表：")
//                console.log(response.data.returnData.pageInfo.list)
//            this.list = response.data.returnData.pageInfo.list;
//            this.total = response.data.returnData.pageInfo.total;
//            this.listLoading = false;
//          })
            },
            handleCancel(ruleForm){
                this.dialogFormVisible = false;
                this.resetForm(ruleForm);
            },
//          修改菜单 后边小的按钮
            handleUpdateOne(date){
                var temp1 = {
                    functionlevel: 0,
                    functionname: '',
                    functionnameEng: '',
                    functiondescription: '',
                    functionorder: '',
                    functionurl: '',
                    parentfunctionid: 0,
                    functiontype: '',
                };
                getMenuById(date.id).then(response => {
                    console.log("ceshishi::::")
                console.log(response.data.returnData.authority);
                temp1.functionlevel = 1;
                temp1.functionname = response.data.returnData.authority.chineseName;
                temp1.functionnameEng = response.data.returnData.authority.name;
                temp1.functiondescription = response.data.returnData.authority.description;
                temp1.functionorder = response.data.returnData.authority.sortCode;
                temp1.functionurl = response.data.returnData.authority.url;
                temp1.parentfunctionid = response.data.returnData.authority.parentId;
                temp1.functiontype = "";
                this.temp = Object.assign({}, temp1);

                this.dialogStatus = 'update';
                this.dialogFormVisible = true;
                this.temp.functionId = date.id;

                if (isNaN(parseInt(this.temp.functionorder, 10)) == false) {
                    this.temp.functionorder = parseInt(this.temp.functionorder, 10);
                }
            })
            },
            handleUpdate(row){
                var keys = this.$refs.tree.getCheckedKeys();
                console.log(keys)
                if (keys.length === 0) {
                    this.$alert('请至少选择一条记录！', '提示', {
                        confirmButtonText: '确定'
                    });
                } else {
                    var temp1 = {
                        functionlevel: 0,
                        functionname: '',
                        functionnameEng: '',
                        functiondescription: '',
                        functionorder: '',
                        functionurl: '',
                        parentfunctionid: 0,
                        functiontype: '',
                    };
                    getMenuById(keys[keys.length - 1]).then(response => {
                        console.log("ceshishi::::")
                    console.log(response.data.returnData.authority);
                    temp1.functionlevel = 1;
                    temp1.functionname = response.data.returnData.authority.chineseName;
                    temp1.functionnameEng = response.data.returnData.authority.name;
                    temp1.functiondescription = response.data.returnData.authority.description;
                    temp1.functionorder = response.data.returnData.authority.sortCode;
                    temp1.functionurl = response.data.returnData.authority.url;
                    temp1.parentfunctionid = response.data.returnData.authority.parentId;
                    temp1.functiontype = "";
                    this.temp = Object.assign({}, temp1);

                    this.dialogStatus = 'update';
                    this.dialogFormVisible = true;
                    this.temp.functionId = keys[keys.length - 1];

                    if (isNaN(parseInt(this.temp.functionorder, 10)) == false) {
                        this.temp.functionorder = parseInt(this.temp.functionorder, 10);
                    }
                })
                }
            },
            handleCreate(){
                this.resetTemp();
                var keys = this.$refs.tree.getCheckedKeys();
                if (keys.length > 1) {
                    this.$alert('请最多选择一个父节点！', '提示', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.temp.parentfunctionid = keys[keys.length - 1]
                    if (keys.length > 0) {
                        this.temp.functionlevel = 1;
                    }
                    this.dialogStatus = 'create';
                    this.dialogFormVisible = true;
                }

            },
            create(ruleForm){

                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        var param = {
                            name: this.temp.functionnameEng,
                            chineseName: this.temp.functionname,
                            url: this.temp.functionurl,
                            description: this.temp.functiondescription,
                            parentId: parseInt(this.temp.parentfunctionid),
                            sortCode: this.temp.functionorder,
                            authType: 1
                        }
                        if (this.temp.functionlevel == 0) {
                            param.parentId = 0
                        }
                        console.log(param)
                        newAddMenu(param).then(response => {
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
                            this.loadTreeList();
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
            update(ruleForm){
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        var parment = {
                            name: this.temp.functionnameEng,
                            chineseName: this.temp.functionname,
                            url: this.temp.functionurl,
                            description: this.temp.functiondescription,
                            parentId: parseInt(this.temp.parentfunctionid),
                            sortCode: this.temp.functionorder,
                            authType: 1
                        }
                        if (this.temp.functionlevel == 0) {
                            parment.parentId = 0
                        }
                        updateMenu(parment, this.temp.functionId).then(response => {

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
                            this.getList();
                            this.loadTreeList();
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
                this.loadTreeList();
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getList();
                this.loadTreeList();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getList();
                this.loadTreeList();
            },

            resetTemp(){
                this.temp = {
                    functionlevel: 0,
                    functionname: '',
                    functionnameEng: '',
                    functiondescription: '',
                    functionorder: '',
                    functionurl: '',
                    parentfunctionid: 0,
                    functiontype: '',
                    functionurl: ''
                };
            },
            handleDeleteOne(date){
                deleteMenu(date.id, 1).then(response => {
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
                    this.loadTreeList();
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
            },
            handleDeleteMore(arr) {
                var keys = this.$refs.tree.getCheckedKeys();
                console.log("节点是：")
                console.log(keys)
                console.log(keys.length)
                if (keys.length === 0) {
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
                    for (var value of keys) {
                        ids.push(value.id);
                        console.log("id是：")
                        console.log(value)
                        deleteMenu(value, 1).then(response => {
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
                            this.loadTreeList();
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
                    }

                }).
                    catch(() => {
                        return;
                })
                    ;
                }
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
            showButtonAuthorityFun(data){
                this.showButtonAuthority = true;
                this.showDateRole = false;

                this.rightTitle = data.label;
                this.rightMenuId = data.id;
                this.getButtonAuthorities();
            },
            showDateRoleFun(data){
                this.showButtonAuthority = false;
                this.showDateRole = true;

                this.rightTitle = data.label;
                this.rightMenuId = data.id;
                this.getDateRuleList();
            },
//          获得 页面控件权限控制 列表
            getButtonAuthorities(){
                getRightButton(this.rightMenuId).then(response => {
                    if (response.data.returnCode === 200
            )
                {
                    console.log(response.data.returnData)
                    this.buttonAuthorityList = response.data.returnData;
                }
            })
                ;
            },
//          页面控件权限控制  删除
            deleteButton(arr){
                console.log(arr)
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
//                      var ids = [];
                        for (var value of arr
                )
                    {
//                      ids.push(value.menuId);
                        if (null == value.authorityId) {
                            this.$notify({
                                title: '失败',
                                message: '该权限数据错误！',
                                type: 'error',
                                duration: 6000
                            });
                            return
                        }
                        deleteMenu(value.authorityId, 2).then(response => {
                            if (response.data.returnCode === 200
                    )
                        {
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: '成功',
                                message: '删除成员成功',
                                type: 'success',
                                duration: 2000
                            });
                            this.getButtonAuthorities();
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
                    }

                }).
                    catch(() => {
                        return;
                })
                    ;
                }
            },
//          页面控件权限控制
            addButtonDiglog(){
                this.dialogFormVisibleButton = true;
                this.dialogStatus = 'create';
                this.tempButton = {
                    name: "",
                    chineseName: "",
                    operationname: "",
                    operationcode: "",
                    operationtype: "",
                    authType: 2
                }
            },
//          数据权限控制的操作


//          获得数据权限控制
            getDateRuleList(){
                this.dateRoleLoading = true;
                getRightRule(this.rightMenuId).then(response => {
                    if (response.data.returnCode === 200
            )
                {
                    console.log(response.data.returnData)
                    this.dateRuleList = response.data.returnData;
                    this.dateRoleLoading = false
                }
            })
                ;
            },
//          删除数据权限控制
            deleteDateRuler(arr){
                console.log(arr)
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
//                      var ids = [];
                        for (var value of arr
                )
                    {
//                      ids.push(value.id);
                        if (null == value.authorityId) {
                            this.$notify({
                                title: '失败',
                                message: '该权限数据错误！',
                                type: 'error',
                                duration: 6000
                            });
                            return
                        }
                        deleteMenu(value.authorityId, 3).then(response => {
                            if (response.data.returnCode === 200
                    )
                        {
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: '成功',
                                message: '删除成员成功',
                                type: 'success',
                                duration: 2000
                            });
                            this.getButtonAuthorities();
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


                    }
//                  console.log("删除的IDs:")
//                  console.log(ids)


                }).
                    catch(() => {
                        return;
                })
                    ;
                }
            },
//          添加数据权限控制
            addRuleDiglog(){
                this.dialogFormVisibleRule = true;
                this.dialogStatus = 'create';
                this.tempButton = {
                    name: "",
                    chineseName: "",
                    ruleColumn: "",
                    ruleConditions: "",
                    ruleValue: "",
                    authType: 3
                }
            },
            createButtonAuthority(ruleForm){

                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {

                        this.tempButton.parentId = this.rightMenuId;
                        console.log("添加createButtonAuthority：")
                        console.log(JSON.stringify(this.tempButton))

                        newAddMenu(this.tempButton).then(response => {
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
                            this.getButtonAuthorities();
                            this.dialogFormVisibleButton = false
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
            createRule(ruleForm){

                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        this.tempRule.parentId = this.rightMenuId;
                        console.log("添加createRule：")
                        console.log(JSON.stringify(this.tempRule))

                        newAddMenu(this.tempRule).then(response => {
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
                            this.getDateRuleList();
                            this.dialogFormVisibleRule = false
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
            renderContent(h, { node, data, store }) {
                return (
                        <span>
                            <span>
                                <span>{node.label}</span>
                            </span>
                            <span>

                            </span>
                            <span style="float: right; margin-right: 20px">
                                <el-button class="filter-item" type="primary" size="mini" icon="edit"
                                           on-click={ () => this.handleUpdateOne(data) }>修改
                                </el-button>
                                <el-button class="filter-item" type="danger" size="mini" icon="delete"
                                           on-click={ () => this.handleDeleteOne(data) }>删除
                                </el-button>
                                <el-button class="filter-item" type="success" size="mini"
                                           on-click={ () => this.showButtonAuthorityFun(data) }>页面控件权限
                                </el-button>
                                <el-button class="filter-item" type="success" size="mini"
                                           on-click={ () => this.showDateRoleFun(data) }>数据规则
                                </el-button>
                            </span>
                        </span>);
            },
//          ceshireturnParam(param){
//              console.log("组件里返回了：")
//              console.log(param)
//          }
        }
    }
</script>

