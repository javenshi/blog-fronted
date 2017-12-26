<template>

    <div class="app-container calendar-list-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <wscn-icon-svg icon-class="zonghe"/>
                <span style="font-size: 14px;font-weight: bold">用户管理</span>
            </div>
            <div class="filter-container">
                <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                          placeholder="请输入关键词" v-model="listQuery.searchKey">
                </el-input>
                <!--<el-select
                        class="filter-item"
                        v-model="listQuery.searchKey"
                        filterable
                        clearable
                        remote
                        placeholder="请输入关键词"
                        :remote-method="remoteManagerQuery"
                        @clear="handleClear()"
                        :loading="loading">
                    <el-option
                            v-for="item in managers"
                            :key="item.id"
                            :label="item.realName"
                            :value="item.userName">
                    </el-option>
                </el-select>-->
                <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜 索
                </el-button>
                <el-button class="filter-item" type="success" v-waves icon="plus" @click="handleCreate">添 加</el-button>
                <el-button class="filter-item" type="primary" v-waves icon="edit"
                           @click="handleUpdate(multipleSelection)">修 改
                </el-button>
                <el-button class="filter-item" type="warning" v-waves icon="edit"
                           @click="updateStatus(multipleSelection)">启用/禁用
                </el-button>
              <!--  <el-button class="filter-item" type="danger" v-waves icon="delete"
                           @click="handleDeleteMore(multipleSelection)">删 除
                </el-button>-->
            </div>

            <el-table :key='tableKey' :data="list" v-loading.body="listLoading" ref="multipleTable" border fit
                      highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column width="100" align="center" label="使用状态" show-overflow-tooltip>
                    <template scope="scope" >
                        <span  v-if="scope.row.deleteFlag==0">启用中</span>
                        <span  v-else>停用中</span>
                    </template>

                </el-table-column>
                <el-table-column width="150" label="用户名" show-overflow-tooltip>
                    <template scope="scope">
                        <span >{{scope.row.userName}}</span>
                    </template>
                </el-table-column>
                <!--<el-table-column width="100" align="center" label="是否系统账号" show-overflow-tooltip>
                    <template scope="scope">
                        <span>{{scope.row.isSysAccount | sysFilter}}</span>
                    </template>
                </el-table-column>-->
                <el-table-column width="100" align="center" label="真实姓名" show-overflow-tooltip>
                    <template scope="scope">
                        <span>{{scope.row.realName}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="70" align="center" label="性别" show-overflow-tooltip>
                    <template scope="scope">
                        <span >{{scope.row.sex | sexFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="200" align="center" label="邮件" show-overflow-tooltip>
                    <template scope="scope">
                        <span >{{scope.row.email}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="150" align="center" label="电话号" show-overflow-tooltip>
                    <template scope="scope">
                        <span >{{scope.row.mobile}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="200" align="center" label="工作地址" show-overflow-tooltip>
                    <template scope="scope">
                        <span>{{scope.row.workAddress}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="100" align="center" label="激活状态" show-overflow-tooltip>
                    <template scope="scope">
                        <span >{{scope.row.status | statusFilter}}</span>
                    </template>
                </el-table-column>


                <el-table-column width="150" align="center" label="微信账号" show-overflow-tooltip>
                    <template scope="scope">
                        <span >{{scope.row.wechat}}</span>
                    </template>
                </el-table-column>
        <el-table-column width="150" align="center" label="所属角色" show-overflow-tooltip>
                    <template scope="scope">
                        <span >{{scope.row.roleName}}</span>
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
                <el-form class="small-space" :model="temp" :rules="rules" ref="formName" label-position="right"
                         label-width="120px" style='width: 90%;'>


                    <el-form-item label="用户名" prop="userName" required>
                        <el-col style="width:250px;">
                            <el-input v-model="temp.userName" placeholder="请输入用户名" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="realName" required>
                        <el-col style="width:250px;">
                            <el-input v-model="temp.realName" placeholder="请输入真实姓名"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item v-if="dialogStatus=='create'" label="密码" prop="password" required>
                        <el-col style="width:250px;">
                            <el-input type="password" v-model="temp.password" placeholder="请输入密码"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item v-if="dialogStatus=='create'" label="重复密码" prop="repassword" required>
                        <el-col style="width:250px;">
                            <el-input type="password"
                                      v-model="temp.repassword"
                                      placeholder="请输入重复密码"></el-input>
                        </el-col>
                    </el-form-item>
                   <!-- <el-form-item label="是否系统账号">
                        <el-col :span="5">
                            <el-select
                                    style="width:250px;" v-model="temp.isSysAccount"
                                    clearable
                                    placeholder="请选择">
                                <el-option
                                        v-for="item in sysOption"
                                        :key="item.dicCode"
                                        :label="item.dicLabel"
                                        :value="item.dicCode">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>-->
                    <el-form-item label="角色" prop="roleName" required>
                        <el-col style="width:80px;">
                            <el-button type="text"  @click="chooseRole">选择角色</el-button>
                        </el-col>
                        <el-col style="width:170px;">
                            <el-input v-model="temp.roleName" placeholder="请选择角色"  :disabled="true"></el-input>
                        </el-col>
                      <!--  <el-col style="width:170px; color: red;" v-show="role">请选择角色</el-col>-->

                    </el-form-item>
                    <el-form-item label="性别">
                        <el-col :span="5">
                            <el-select
                                    style="width:250px;" v-model="temp.sex"
                                    clearable
                                    placeholder="请选择性别">
                                <el-option
                                        v-for="item in sexOption"
                                        :key="item.dicCode"
                                        :label="item.dicLabel"
                                        :value="item.dicCode">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email" required>
                        <el-col style="width:250px;">
                            <el-input v-model="temp.email" placeholder="请输入邮箱" ></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="电话" prop="mobile" required>
                        <el-col style="width:250px;">
                            <el-input v-model="temp.mobile" placeholder="请输入电话"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="工作地址" prop="workAddress" required>
                        <el-col style="width:250px;">
                            <el-input v-model="temp.workAddress" placeholder="请输入工作地址"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="微信账号" prop="wechat" >
                        <el-col style="width:250px;">
                            <el-input v-model="temp.wechat" placeholder="请输入微信账号"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="是否激活">
                        <el-col :span="5">
                            <el-select
                                    style="width:250px;" v-model="temp.status"
                                    clearable
                                    placeholder="请选择状态">
                                <el-option
                                        v-for="item in statusOption"
                                        :key="item.dicCode"
                                        :label="item.dicLabel"
                                        :value="item.dicCode">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="handleCancel('formName')">取 消</el-button>
                    <el-button v-if="dialogStatus=='create'" type="primary" @click="create('formName')">确 定</el-button>
                    <el-button v-else type="primary" @click="update('formName')">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="角色选择" :visible.sync="dialogRoleVisible">
                <el-table :data="roleGridData" ref="multipleTable" border fit highlight-current-row style="width: 100%"
                          @selection-change="handleRoleChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column width="200" label="角色编号" show-overflow-tooltip>
                        <template scope="scope">
                            <span class="link-type">{{scope.row.rolecode}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="200" label="角色名称" show-overflow-tooltip>
                        <template scope="scope">
                            <span class="link-type">{{scope.row.roleName}}</span>
                        </template>
                    </el-table-column>
                   <!-- <el-table-column width="100" align="center" label="是否系统角色" show-overflow-tooltip>
                        <template scope="scope">
                            <span>{{scope.row.isSysRole | sysFilter}}</span>
                        </template>
                    </el-table-column>-->
                    <el-table-column width="200" align="center" label="是否可用" show-overflow-tooltip>
                        <template scope="scope">
                            <span>{{scope.row.available | availableFilter}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogRoleVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addRole(roleSelection)">确 定</el-button>
                </div>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import {
        fetchUserList,
        createUser,
        updateUser,
        deleteUser,
        unavailableUser,
        availableUser,
        createTable1
    } from 'api/system/SUser';
    import {fetchRoleList} from 'api/system/SRole';
    import {parseTime} from 'utils';
    import {fetchManagerList} from 'api/user/manager';

    const availableOption = [
        {dicCode: '0', dicLabel: '不可用'},
        {dicCode: '1', dicLabel: '可用'}
    ];
    const availableArr = ['不可用', '可用'];
    const statusOption = [
        {dicCode: 0, dicLabel: '不激活'},
        {dicCode: 1, dicLabel: '激活'}
    ];
    const statusArr = statusOption.reduce((arr, obj) => {
            arr[obj.dicCode] = obj.dicLabel;
            return arr;
        },
        {}
        )
    ;
    const sexOption = [
        {dicCode: '0', dicLabel: '男'},
        {dicCode: '1', dicLabel: '女'}
    ];
    const sexArr = ['男', '女'];
    const sysOption = [
        {dicCode: 0, dicLabel: '否'},
        {dicCode: 1, dicLabel: '是'}
    ];
    const sysArr = ['否', '是'];
    export default {
        name: 'SUser',
        data() {
            var validatePassword = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入密码'));
                    } else {
                        if (this.temp.repassword !== '') {
                            this.$refs.formName.validateField('repassword');
                        }
                        callback();
                    }
                }
            ;
            var validateRepassword = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请再次输入密码'));
                    } else if (value !== this.temp.password) {
                        callback(new Error('两次输入密码不一致!'));
                    } else {
                        callback();
                    }
                }
            ;  var validateRename = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入用户名'));
                    } else if (value.length<=0) {
                        callback(new Error('请输入用户名!'));
                    } else {
                        callback();
                    }
                }
            ;  var validateRerealName = (rule, value, callback) => {
                    if (value === '') {
                        callback(new Error('请输入真实姓名'));
                    }  else if (value.length<=0) {
                        callback(new Error('请输入真实姓名!'));
                    }else {
                        callback();
                    }
                }
            ;
            return {
                role:false,
                roleGridData: null,
                list: null,
                total: null,
                listLoading: true,
                buttomText: "启用",
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                roleListQuery: {
                    pageNum: 1,
                    pageSize: 999,
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
                    update: '编辑',
                    create: '创建'
                },
                temp: {
                    userName: '',
                    isSysAccount: undefined,
                    password: '',
                    realName: '',
                    email: '',
                    mobile: '',
                    status: undefined,
                    sex: '0',
                    workAddress: '',
                    wechat: '',
                    repassword: '',
                    roleName: '',
                    roleId: []
                },
                roleSelection: [],
                multipleSelection: [],
                statusOption,
                sysOption,
                sexOption,
                availableOption,
                options: [],
                rules: {
                    userName: [
                        {validator:validateRename, trigger: 'blur'},
                        {  pattern:/^[^ ]+$/, message: '用户名中不能包含空格',trigger: 'blur'}
                    ],
                    realName: [
                        {validator:validateRerealName, trigger: 'blur'},
                        {  pattern:/^[^ ]+$/, message: '真实姓名中不能包含空格',trigger: 'blur'}
                    ],

                    mobile: [
                        {required: true, message: '请输入电话', trigger: 'blur'}
                    ],
                    workAddress: [
                        {required: true, message: '请输入工作地址', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur,change'},
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                    ],
                    roleName: [
                        {required: true, message: '请选择角色', trigger: 'blur,change'}
                    ],
                    password: [
                        {validator: validatePassword, message: '请输入密码', trigger: 'blur'}
                    ],
                    repassword: [
                        {validator: validateRepassword, trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.getList();
            this.roleList();
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
            roleList() {
                //this.listLoading = true;
                fetchRoleList(this.roleListQuery).then(response => {
                    this.roleGridData = response.data.returnData.pageInfo.list;
                    //this.total = response.data.returnData.pageInfo.total;
                    //this.listLoading = false;
                })
            },
            getList() {
                this.listLoading = true;
                fetchUserList(this.listQuery).then(response => {
                    this.list = response.data.returnData.pageInfo.list;
                    this.total = response.data.returnData.pageInfo.total;
                    this.listLoading = false;
                })
            },
            handleCancel(ruleForm) {
                this.dialogFormVisible = false;
                this.resetForm(ruleForm);
            },
            updateStatus(row) {
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
                    console.log("启用  禁用")
                    console.log(this.temp)
//                  1 :激活
                    if (this.temp.deleteFlag == 0) {
//                      this.buttomText="禁用"
                        unavailableUser(this.temp.id).then(response => {
                            if (response.data.returnCode === 200
                            ) {
                                this.dialogFormVisible = false;
                                this.$notify({
                                    title: '成功',
                                    message: '禁用成功',
                                    type: 'success',
                                    duration: 2000
                                });
                                this.getList();
                            }
                            else {
                                this.$notify({
                                    title: '失败',
                                    message: '禁用失败: ' + response.data.returnMsg,
                                    type: 'error',
                                    duration: 6000
                                });
                            }
                        })
                    } else {
//                      this.buttomText="启用"

                        availableUser(this.temp.id).then(response => {
                            if (response.data.returnCode === 200
                            ) {
                                this.dialogFormVisible = false;
                                this.$notify({
                                    title: '成功',
                                    message: '启用成功',
                                    type: 'success',
                                    duration: 2000
                                });
                                this.getList();
                            }
                            else {
                                this.$notify({
                                    title: '失败',
                                    message: '启用失败: ' + response.data.returnMsg,
                                    type: 'error',
                                    duration: 6000
                                });
                            }
                        })
                    }
                }
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
            create(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if(this.temp.roleName==''){
                      //  alert("1");
                        this.role=true;
                    }else{
                        this.role=false;
                    if (valid) {
                        createUser(this.temp).then(response => {
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
                                this.resetForm(ruleForm);
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
                    }}
                })
                ;

            },
            update(ruleForm) {
                this.$refs[ruleForm].validate((valid) => {
                    if (valid) {
                        updateUser(this.temp).then(response => {

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
                                this.resetForm(ruleForm);
                            }
                            else {
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
            remoteManagerQuery(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                            this.loading = false;
                            fetchManagerList(query).then(response => {

                                this.managers = response.data.returnData;
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
            resetTemp() {
                this.temp = {
                    userName: '',
                    isSysAccount: 0,
                    password: '',
                    realName: '',
                    email: '',
                    mobile: '',
                    status: 1,
                    sex: '0',
                    workAddress: '',
                    wechat: '',
                    repassword: '',
                    roleName: '',
                    roleId: []
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
                        deleteUser(ids).then(response => {
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
            addRole(arr) {
                var str = "";
                var ids = [];
                let i = 0;
                for (var value of arr) {
                    ids.push(value.id);
                    if (i == 0) {
                        str += value.roleName;
                    } else {
                        str += "," + value.roleName;
                    }
                    i++;
                }
                this.temp.roleId = ids;
                this.temp.roleName = str;
                this.dialogRoleVisible = false;
                this.roleList();
            },
            chooseRole() {
                this.dialogRoleVisible = true;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            createTable() {
                console.log('aaa');
                createTable1();
            }
        }
    }
</script>

