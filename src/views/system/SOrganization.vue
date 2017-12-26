<template>

    <div class="app-container calendar-list-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <wscn-icon-svg icon-class="zonghe"/>
                <span style="font-size: 14px;font-weight: bold">组织架构</span>
            </div>

            <el-row>
                <el-col :span="12" style="padding-right: 1%">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span style="font-size: 13px;font-weight: bold">组织列表</span>
                            <el-button class="filter-item" type="success" v-waves icon="plus" @click="handleCreate"
                                       style="margin-left: 50px">添 加
                            </el-button>
                        </div>
                        <div class="filter-container">

                            <!--<el-button class="filter-item" type="primary" v-waves icon="edit" @click="handleUpdate(multipleSelection)">修 改</el-button>-->
                            <!--<el-button class="filter-item" type="danger" v-waves icon="delete" @click="handleDeleteMore(multipleSelection)">删 除</el-button>-->
                        </div>
                        <el-tree
                                :data="treeList"
                                show-checkbox
                                node-key="id"
                                default-expand-all
                                :check-strictly="true"
                                ref="tree"
                                :expand-on-click-node="false"
                                highlight-current
                                :default-expanded-keys="defaultExpandedKeys"
                                :default-checked-keys="defaultCheckedKeys"
                                @check-change="checkChange"
                                :render-content="renderContent">
                            :props="defaultProps">
                        </el-tree>
                    </el-card>
                </el-col>
                <el-col :span="12">
                    <el-card class="box-card" v-if="showMemberDiv || showRoleDiv">
                        <div slot="header" class="clearfix">
                            <span style="font-size: 13px;font-weight: bold">组织成员/角色设置</span>
                        </div>
                        <div class="grid-content bg-purple-light box-border" style="padding-left: 5%"
                             v-if="showMemberDiv">
                            <div class="filter-container">
                                <h4 style="display: inline-block;margin-right: 10px;margin-left: 8px">组织成员</h4>
                                <h4 style="display: inline-block;margin-right: 12px;margin-left: 0px;font-size: 16px">
                                    组织:({{rightTitle}})</h4>
                                <el-button class="filter-item" type="success" v-waves icon="plus" @click="addMember">
                                    添加成员
                                </el-button>
                                <el-button class="filter-item" type="danger" v-waves icon="delete"
                                           @click="deleteMember(multipleSelection)">删除成员
                                </el-button>
                            </div>
                            <el-table
                                    :data="tableData"
                                    stripe
                                    :key=""
                                    style="width: 80%" @selection-change="handleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column
                                        prop="id"
                                        label="成员Id"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="realName"
                                        label="成员姓名"
                                        width="90">
                                </el-table-column>
                                <el-table-column
                                        prop="mobile"
                                        label="电话"
                                >
                                </el-table-column>
                                <!--<el-table-column-->
                                <!--prop="workAddress"-->
                                <!--label="工作地址"-->
                                <!--width="100">-->
                                <!--</el-table-column>-->
                            </el-table>
                        </div>
                        <div class="grid-content bg-purple-light box-border" style="padding-left: 5%"
                             v-if="showRoleDiv">
                            <div class="filter-container">
                                <h3 style="display: inline-block;margin-right: 10px;margin-left: 8px">角色设置</h3>
                                <h3 style="display: inline-block;margin-right: 12px;margin-left: 0px;font-size: 16px">
                                    组织:({{rightTitle}})</h3>
                                <!--<el-button class="filter-item" type="success" v-waves icon="plus" @click="toggleSelection([roleList[1],roleList[3]])" >默认选择</el-button>-->
                                <!--<el-button class="filter-item" type="success" v-waves icon="plus" @click="addMember" >添加角色</el-button>-->
                                <!--<el-button class="filter-item" type="danger" v-waves icon="delete" @click="deleteMember(multipleSelection)">删除角色</el-button>-->
                                <el-button class="filter-item" type="success" v-waves
                                           @click="saveRoleToDepart(roleMultipleSelection)">保存
                                </el-button>
                            </div>
                            <el-table :key='tableKey' v-loading.body="roleListLoading" :data="roleList"
                                      ref="multipleTable" border fit highlight-current-row style="width: 90%"
                                      @selection-change="roleHandleSelectionChange">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column width="100" label="角色编号" show-overflow-tooltip>
                                    <template scope="scope">
                                        <span class="link-type">{{scope.row.rolecode}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column width="100" label="角色名称" show-overflow-tooltip>
                                    <template scope="scope">
                                        <span class="link-type">{{scope.row.roleName}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column width="100" align="center" label="是否系统角色" show-overflow-tooltip>
                                    <template scope="scope">
                                        <span>{{scope.row.isSysRole | sysFilter}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column width="100" align="center" label="是否可用" show-overflow-tooltip>
                                    <template scope="scope">
                                        <span>{{scope.row.available | availableFilter}}</span>
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
                    <el-form-item label="机构名称" prop="departname">
                        <el-col style="width:250px;">
                            <el-input v-model="temp.departname" placeholder="请输入机构名称"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="机构描述" prop="">
                        <el-col style="width:250px;">
                            <el-input v-model="temp.description" placeholder="请输入机构描述"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="机构级别" prop="">
                        <el-col :span="5">
                            <el-select
                                    style="width:250px;" v-model="temp.departLevel"
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

                    <el-form-item v-if="temp.departLevel == 1" label="父机构" prop="">
                        <el-col :span="10">
                            <el-select v-model="temp.parentdepartid" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.id"
                                        :label="item.departname"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>

                    </el-form-item>
                    <el-form-item label="机构类型" prop="">
                        <el-col :span="5">
                            <el-select
                                    style="width:250px;" v-model="temp.orgType"
                                    placeholder="请选择">
                                <el-option
                                        v-for="item in orgTypeOption"
                                        :key="item.dicCode"
                                        :label="item.dicLabel"
                                        :value="item.dicCode">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="机构电话" prop="">
                        <el-col style="width:250px;">
                            <el-input v-model="temp.mobile" placeholder="请输入机构电话"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="机构传真" prop="">
                        <el-col style="width:250px;">
                            <el-input v-model="temp.fax" placeholder="请输入机构传真"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="机构地址" prop="">
                        <el-col style="width:250px;">
                            <el-input v-model="temp.address" placeholder="请输入机构地址"></el-input>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="handleCancel('formName')">取 消</el-button>
                    <el-button v-if="dialogStatus=='create'" type="primary" @click="create('formName')">确 定</el-button>
                    <el-button v-else type="primary" @click="update('formName')">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="添加成员" :visible.sync="dialogMemberAdd" align="center" top="5%">
                <div class="filter-container" align="left" style="padding-left: 10%">
                    <el-select
                            class="filter-item"
                            v-model="listQuery.searchKey"
                            filterable
                            clearable
                            remote
                            placeholder="请输入关键词"
                            :remote-method="fetchUser"
                            @clear=""
                            :loading="loading">
                        <el-option
                                v-for="item in managers"
                                :key="item.id"
                                :label="item.realName"
                                :value="item.userName">
                        </el-option>
                    </el-select>
                    <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜 索
                    </el-button>
                    <el-button class="filter-item" type="success" v-waves icon="plus"
                               @click="addMemberDialog(memberMultipleSelection)">添加
                    </el-button>

                </div>
                <el-table
                        :data="memberList"
                        stripe
                        :key=""
                        style="width: 80%" @selection-change="memberHandleSelectionChange"
                        v-loading.body="listLoading">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="id"
                            label="用户Id"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="realName"
                            label="用户姓名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="stationName"
                            label="站点">
                    </el-table-column>
                    <!--<el-table-column-->
                    <!--prop="workAddress"-->
                    <!--label="工作地址">-->
                    <!--</el-table-column>-->
                </el-table>
                <div v-show="!listLoading" class="pagination-container">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page.sync="listQuery.pageNum"
                                   :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                                   layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import { fetchMenuList, createMenu, updateMenu, deleteMenu,hasMenuList,getMenuById} from 'api/system/SMenu';
    import {fetchUser,fetchUserList} from 'api/system/SUser';
    import {getParentDepartById,addMemberToOrganization,hasDepartList,createDepart,getDepartById,updateDepart,deleteDepart,getUserById,
            addUserToDepart,deleteUserToDepart,getRoleById,updateRole} from 'api/system/SOrganization';
    import { fetchRoleList} from 'api/system/SRole';
    import { fetchManagerList } from 'api/user/manager';

    import { parseTime } from 'utils';

    const menuLevelOption = [
        {dicCode: 1, dicLabel: '下级机构'},
        {dicCode: 0, dicLabel: '一级机构'}
    ];
    const orgTypeOption = [
        {dicCode: 1, dicLabel: '公司'},
        {dicCode: 2, dicLabel: '其他'}
    ];
    const sysArr = ['否', '是'];
    const availableArr = ['不可用', '可用'];
    const menuLevelArr = ['一级机构', '下级机构'];
    export default {
        name: 'SMenu',
        data() {
            return {
                updateDepartId: "",
                rightTitle: "未选中",
                rightDepartId: "",
                roleListLoading: true,
                list: null,
                total: null,
                listLoading: true,
                showMemberDiv: false,
                showRoleDiv: false,
                dialogMemberAdd: false,
                roleList: [],
                managers: [],
                memberList: [],
                treeList: [],
                tableData: [],
                RoleSelected: [],
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
                listQuery1: {
                    pageNum: 1,
                    pageSize: 999,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                tableKey: 0,
                currentRow: null,
                loading: false,
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                temp: {
                    departname: "",
                    description: '',
                    parentdepartid: '',
                    mobile: '',
                    fax: "",
                    address: '',
                    orgType: 1,
                    departLevel: 0
                },
                multipleSelection: [],
                memberMultipleSelection: [],
                roleMultipleSelection: [],
                menuLevelOption,
                options:[{   value: '',
                    label: ''}],
                orgTypeOption,
                rules: {
                    departname: [
                        {required: true, message: '请输入机构名称', trigger: 'blur'},
                        {  pattern:/^[^ ]+$/, message: '机构名称中不能包含空格',trigger: 'blur'}
                    ],
                    orgType: [
                        {required: true, message: '请输入机构类型', trigger: 'blur'}
                    ],
                    departLevel: [
                        {required: true, message: '请输入机构级别', trigger: 'blur'}
                    ],
                }
            }
        },
        created() {
            this.loadTreeList();
            getParentDepartById(0).then(response => {
                this.options=  response.data.returnData;});
        },
        filters: {
            menuLevelFilter(val){
                return menuLevelArr[val]
            },
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
//            成员方法
//            删除成员
            deleteMember(arr){
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
                        var ids = [];
                    for (var value of arr) {
                        ids.push(value.id);
                    }
                    deleteUserToDepart(this.rightDepartId, ids).then(response => {
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
                        this.getDepartListById(this.rightDepartId);
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
                }
            },
//            获得成员列表
            getMemberList(){
                this.listLoading = true;
                fetchUserList(this.listQuery).then(response => {
                    console.log("用户列表");
                console.log(response.data.returnData.pageInfo.list);
                this.memberList = response.data.returnData.pageInfo.list;
                this.total = response.data.returnData.pageInfo.total;
                this.listLoading = false;
            })
            },
//            添加成员 模态框
            addMember(){
                this.dialogMemberAdd = true;
                this.getMemberList()
            },
            // 添加成员
            addMemberDialog(rows){
                console.log(rows)
                if (rows.length === 0) {
                    this.$alert('请至少选择一条记录！', '提示', {
                        confirmButtonText: '确定'
                    });
                } else {
                    var ids = [];
                    for (var value of rows) {
                        ids.push(value.id);
                    }
                    console.log("添加的成员IDs 是:")
                    console.log(ids)

                    addUserToDepart(this.rightDepartId, ids).then(response => {
                        if (response.data.returnCode === 200)
                    {
                        this.dialogFormVisible = false;
                        this.$notify({
                            title: '成功',
                            message: '添加成员成功',
                            type: 'success',
                            duration: 2000
                        });
                        this.getDepartListById(this.rightDepartId);
                        this.dialogMemberAdd = false;
                    }
                else
                    {
                        this.$notify({
                            title: '失败',
                            message: '添加失败: ' + response.data.returnMsg,
                            type: 'error',
                            duration: 6000
                        });
                    }
                })
                }
            },
//            修改角色设置里的角色
            saveRoleToDepart(rows){
                var ids = [];
                for (var value of rows) {
                    ids.push(value.id);
                }
                console.log("修改角色设置里的角色，IDs 是:")
                console.log(ids)

                updateRole(this.rightDepartId, ids).then(response => {
                    if (response.data.returnCode === 200
            )
                {
                    this.$notify({
                        title: '成功',
                        message: '添加成员成功',
                        type: 'success',
                        duration: 2000
                    });
                    this.getRoleList();
                }
            else
                {
                    this.$notify({
                        title: '失败',
                        message: '添加失败: ' + response.data.returnMsg,
                        type: 'error',
                        duration: 6000
                    });
                }
            })
            },
//            角色查询
            getRoleList() {
                this.roleListLoading = true;
                var _this = this;
                fetchRoleList(this.listQuery1).then(response => {
                    console.log("这是分页查询")
                console.log(response)
                this.roleList = response.data.returnData.pageInfo.list;
//                查找选中的角色
                getRoleById(this.rightDepartId).then(response => {
                    if (response.data.returnCode === 200
            )
                {
                    this.RoleSelected = response.data.returnData;
//                    console.log("选中的角色 是：：")
//                    console.log(this.RoleSelected)
//                    console.log("角色list 是：：")
//                    console.log(this.roleList)
//                    根据id 获得 index的 数组
                    var selectedIt = [];
                    for (let j = 0; j < this.roleList.length; j++) {
                        for (let m = 0; m < this.RoleSelected.length; m++) {
                            if (this.roleList[j].id == this.RoleSelected[m]) {
                                selectedIt.push(j)
                            }

                        }
                    }
                    console.log("最后的selectedIt是：：")
                    console.log(selectedIt)
                    console.log(selectedIt.length)
                    var selectedItRow = [];
                    for (let i = 0; i < selectedIt.length; i++) {
                        selectedItRow.push(_this.roleList[selectedIt[i]])
                    }
                    _this.$nextTick(function () {
                        _this.toggleSelection(selectedItRow);//每次更新了数据，触发这个函数即可。
                    });
                    this.roleListLoading = false;
                }
            })
                ;


            })


            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getMemberList();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getMemberList();
            },
            toggleSelection(rows) {
                if (rows) {
                    console.log("jinlail111")
                    console.log(rows)
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                })
                    ;
                } else {
                    console.log("jinlail12")
                    this.$refs.multipleTable.clearSelection();
                }
            },
            checkChange(node, ifSelected, ifSelected2){
                console.log(node)
                console.log(ifSelected)
                console.log(ifSelected2)
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            memberHandleSelectionChange(val) {
                this.memberMultipleSelection = val;
            },
            roleHandleSelectionChange(val) {
                this.roleMultipleSelection = val;
            },
            loadTreeList(){
                console.log("开始加载组织架构的树：")
                hasDepartList().then(response => {
                    if (response.data.returnCode === 200
            )
                {
                    console.log("组织架构的树：")
                    console.log(response.data.returnData);
                    this.treeList = response.data.returnData;
                }
            else
                {
                    this.$notify({
                        title: '失败',
                        message: '加载失败: ' + response.data.returnMsg,
                        type: 'error',
                        duration: 6000
                    });
                }
            })
                ;
            },
            handleCancel(ruleForm){
                this.dialogFormVisible = false;
                this.resetForm(ruleForm);
            },
            handleUpdate(data){
                var keys = this.$refs.tree.getCheckedKeys();
                this.updateDepartId = data.id;
                console.log("ID是：")
                console.log(data.id)

                if (undefined == data.id || "" == data.id || null == data.id) {
                    this.$alert('数据有误！', '提示', {
                        confirmButtonText: '确定'
                    });
                } else {
//                    根据id,拿到组织的详细信息，然后进行修改
                    getDepartById(data.id).then(response => {
                        console.log("根据id,拿到组织的详细信息，然后进行修改::::")
                    console.log(response.data.returnData);
                    if (response.data.returnData.parentdepartid == 0) {
                        response.data.returnData.departLevel = 0;
                    } else {
                        response.data.returnData.departLevel = 1;
                    }
                    this.temp = Object.assign({}, response.data.returnData);
                    if (isNaN(parseInt(this.temp.orgType, 10)) == false) {
                        this.temp.orgType = parseInt(this.temp.orgType, 10);
                    }
                    this.dialogStatus = 'update';
                    this.dialogFormVisible = true;

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
                    this.temp.parentdepartid = keys[keys.length - 1]
                    if (keys.length == 1) {
                        this.temp.departLevel = 1;
                    }
                    this.dialogStatus = 'create';
                    this.dialogFormVisible = true;
                }

            },
            create(ruleForm){
//alert(this.temp.parentdepartid);
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        console.log("添加部门：")
                        console.log(JSON.stringify(this.temp))
                        if (this.temp.departLevel == 0) {
                            this.temp.parentdepartid = 0
                        }
                        createDepart(this.temp).then(response => {
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
                    console.log("修改参数：")
                console.log(this.temp)
                if (valid) {
                    if (this.temp.departLevel == 0) {
                        this.temp.parentdepartid = 0
                    }
                    updateDepart(this.temp).then(response => {

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
                this.getMemberList();
            },
            resetTemp(){
                this.temp = {
                    departname: "",
                    description: '',
                    parentdepartid: '',
                    mobile: '',
                    fax: "",
                    address: '',
                    orgType: 1,
                    departLevel: 0
                };
            },

            handleDeleteMore(data) {
                var keys = this.$refs.tree.getCheckedKeys();
                console.log("ID是：")
                console.log(data.id)
                if (undefined == data.id || "" == data.id || null == data.id) {
                    this.$alert('数据有误！', '提示', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.$confirm('此操作删除已选中的记录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        deleteDepart(data.id
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


                }).
                    catch(() => {
                        return;
                })
                    ;
                }
            },
            fetchUser(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                            fetchUser(query).then(response => {
                        this.managers = response.data.returnData;
                                this.memberList=response.data.returnData;
                                this.total = response.data.returnData;
                    this.loading = false;
                })
                },
                    200
                )
                    ;
                } else {
                    this.managers = [];
                }
            },
            handleClear() {
                this.managers = [];
                this.listQuery.searchKey = '';
                this.temp.repassword = '';
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
            showMem(data) {
                this.showMemberDiv = true;
                this.showRoleDiv = false;

                console.log("ID是：")
//                console.log(data.label)
                this.rightTitle = data.label;
                this.rightDepartId = data.id;
                console.log(data.id)
                this.getDepartListById(data.id)

            },
//            获得右边的列表 ，很据iD
            getDepartListById(id){
                getUserById(id).then(response => {
                    if (response.data.returnCode === 200
            )
                {
                    this.tableData = response.data.returnData;
                }
            })
                ;
            },

            //            获得右边的 角色设置 列表 ，很据iD
            getRightRoleListById(id){
                getRoleById(id).then(response => {
                    if (response.data.returnCode === 200
            )
                {
                    this.RoleSelected = response.data.returnData;
                }
            })
                ;
            },
            showRole(data) {
                this.rightTitle = data.label;
                this.rightDepartId = data.id;

                this.getRoleList();
                this.showMemberDiv = false;
                this.showRoleDiv = true;
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
                                <el-button class="filter-item" type="success" size="mini"
                                           on-click={ () => this.showMem(data) }>查看成员
                                </el-button>
                                <el-button class="filter-item" type="success" size="mini"
                                           on-click={ () => this.showRole(data) }>角色设置
                                </el-button>
                                <el-button class="filter-item" type="danger" size="mini"
                                           on-click={ () => this.handleDeleteMore(data) }>删除
                                </el-button>
                                <el-button class="filter-item" type="primary" size="mini"
                                           on-click={ () => this.handleUpdate(data) }>修改
                                </el-button>
                            </span>
                        </span>);
            }
        }
    }
</script>

       