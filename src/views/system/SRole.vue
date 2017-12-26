
<template>

  <div class="app-container calendar-list-container">



      <el-row>
          <el-card class="box-card">
              <div slot="header" class="clearfix">
                  <wscn-icon-svg  icon-class="zonghe" />
                  <span style="font-size: 14px;font-weight: bold">角色管理</span>
              </div>
              <el-col :span="10" style="" class="text item">
                  <el-card class="box-card">
                      <div slot="header" class="clearfix">
                          <span style="font-size: 13px;font-weight: bold">角色列表</span>
                      </div>
                  <div class="filter-container">
                      <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" v-model="listQuery.searchKey" placeholder="角色名称" >
                      </el-input>

                      <el-button class="filter-item" type="primary" size="small" v-waves icon="search" @click="handleFilter">搜 索</el-button>
                      <el-button class="filter-item" type="success" size="small" v-waves icon="plus" @click="handleCreate">添 加</el-button>
                      <el-button class="filter-item" type="primary" size="small" v-waves icon="edit" @click="handleUpdate(multipleSelection)">修 改</el-button>
                      <el-button class="filter-item" type="danger" size="small" v-waves icon="delete" @click="handleDeleteMore(multipleSelection)">删 除</el-button>
                  </div>
                  <el-table :key='list.id' :data="list" v-loading.body="listLoading" ref="multipleTable" border fit highlight-current-row style="width: 98%" @selection-change="handleSelectionChange">
                      <el-table-column
                              type="selection"
                              width="55">
                      </el-table-column>
                    <!--  <el-table-column width="80" label="角色编号" show-overflow-tooltip>
                          <template scope="scope">
                              <span class="link-type">{{scope.row.rolecode}}</span>
                          </template>
                      </el-table-column>-->
                      <el-table-column width="90" label="角色名称" show-overflow-tooltip>
                          <template scope="scope">
                              <span class="link-type">{{scope.row.roleName}}</span>
                          </template>
                      </el-table-column>
                     <!-- <el-table-column width="80" align="center" label="是否系统角色"  show-overflow-tooltip>
                          <template scope="scope">
                              <span>{{scope.row.isSysRole | sysFilter}}</span>
                          </template>
                      </el-table-column>-->
                      <el-table-column width="70" align="center" label="是否可用"  show-overflow-tooltip>
                          <template scope="scope">
                              <span>{{scope.row.available | availableFilter}}</span>
                          </template>
                      </el-table-column>
                      <el-table-column align="center" label="操作" width="120" v-if="listQuery.type != '2'">
                          <template scope="scope">
                              <el-button type="success" size="mini" @click="rightControll(scope.row.id,scope.row.roleName)">权限控制</el-button>
                          </template>
                      </el-table-column>
                      <el-table-column width="100" align="center" label="修改人"  show-overflow-tooltip>
                          <template scope="scope">
                              <span>{{scope.row.lastUpdateUser }}</span>
                          </template>
                      </el-table-column>
                      <el-table-column width="150" align="center" label="修改时间" >
                          <template scope="scope">
                               <el-icon name="time"></el-icon>
                              <span>{{scope.row.lastModifiedTime | formatDate }}</span>
                          </template>
                      </el-table-column>
                  </el-table>
                  <div v-show="!listLoading" class="pagination-container">
                      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"
                                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                      </el-pagination>
                  </div>
                  </el-card>
              </el-col>
              <el-col :span="5" style="padding-right: 1%;padding-left: 1%">
                  <!--//这个是右边那个树-->
                  <el-card class="box-card" >
                      <div slot="header" class="clearfix" >
                          <span style="font-size:13px;font-weight:bold;display: inline-block;margin-right: 5px;margin-left: 8px">权限控制</span>
                          <span style="font-size:13px;font-weight:bold;display: inline-block;margin-right: 5px;margin-left: 8px">角色名称：{{selectRoleName}}</span>
                      </div>
                  <div class="grid-content bg-purple-light box-border" style="min-height: 600px">
                      <!--<h4 style="display: inline-block;margin-right: 5px;margin-left: 8px">权限控制</h4>-->
                      <!--<h5 style="display: inline-block;margin-right: 5px;margin-left: 8px">角色名称：{{selectRoleName}}</h5>-->
                      <!--<el-button type="primary" @click="rightControllCreate()">保存</el-button>-->
                      <el-tree
                              :data="treeList"
                              show-checkbox
                              node-key="id"
                              v-loading.body="loadingTree"
                              show-checkbox
                              default-expand-all
                              ref="tree"
                              highlight-current
                              :default-expanded-keys="defaultExpandedKeys"
                              :default-checked-keys="defaultCheckedKeys"
                              @node-click="showRightTable"
                              @check-change="checkChange"
                              :props="defaultProps">
                      </el-tree>
                      <!--<div slot="footer" class="dialog-footer">-->
                          <!--<el-button @click="rightControllCancel()">取 消</el-button>-->
                          <!--<el-button type="primary" @click="rightControllCreate()">确 定</el-button>-->
                      <!--</div>-->
                  </div>
                      </el-card>
              </el-col>
              <el-col :span="9" style="min-height: 600px" class="box-border">
                  <el-card class="box-card">
                      <div slot="header" class="clearfix">
                          <span style="font-size: 13px;font-weight: bold">权限控制</span>
                      </div>
                  <el-col :span="24" style="">
                      <div class="filter-container">
                          <span style="display: inline-block;margin-right: 10px;margin-left: 8px;font-size: 13px">页面控件权限配置</span>
                      </div>
                      <el-table
                              :data="buttonAuthorityList"
                              stripe
                              :key="buttonAuthorityList.id"
                              v-loading.body="buttonAuthorityLoading"
                              @selection-change="buttonSelectionChange"
                              @select="buttonSelectionChangeOne"
                              style="width: 95%;height: 100%"
                              ref="buttonMultipleTable">
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
                  </el-col>
                  <el-col :span="24" style="margin-top: 20px">
                      <div class="filter-container">
                          <span style="display: inline-block;margin-right: 10px;margin-left: 8px;font-size: 13px">数据权限控制</span>
                      </div>
                          <el-table
                                  :data="dateRuleList"
                                  stripe
                                  :key="dateRuleList.id"
                                  v-loading.body="dateRoleLoading"
                                  @selection-change="handleRuleSelectionChange"
                                  @select="ruleSelectionChangeOne"
                                  style="width: 95%;height: 100%"
                                  ref="ruleMultipleTable">
                          <el-table-column
                                  type="selection"
                                  width="55">
                          </el-table-column>
                          <el-table-column
                                  prop="ruleName"
                                  label="规则名称 "
                                  width="100">
                          </el-table-column>
                          <el-table-column
                                  prop="ruleColumn"
                                  label="规则字段 "
                                  width="100">
                          </el-table-column>
                          <el-table-column
                                  prop="ruleConditions"
                                  label="规则条件"
                                  width="100"
                          >
                          </el-table-column>
                          <el-table-column
                                  prop="ruleValue"
                                  label="规则值 "
                          >
                          </el-table-column>
                      </el-table>
                  </el-col>
                </el-card>
              </el-col>
          </el-card>
      </el-row>



    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" align="center">
      <el-form class="small-space" :model="temp" :rules="rules" ref="formName" label-position="right" label-width="120px" style='width: 90%;'>


        <el-form-item label="角色编号" prop="rolecode" required>
          <el-col style="width:250px;">
            <el-input v-model="temp.rolecode" placeholder="请输入角色编号"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName" required>
          <el-col style="width:250px;">
            <el-input v-model="temp.roleName" placeholder="请输入角色名称"></el-input>
          </el-col>
        </el-form-item>

       <!-- <el-form-item label="是否系统角色" >
          <el-col :span="5" >
            <el-select
                    style="width:250px;" v-model="temp.isSysRole"
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
        <el-form-item label="是否可用" >
          <el-col :span="5" >
            <el-select
                    style="width:250px;" v-model="temp.available"
                    clearable
                    placeholder="请选择">
              <el-option
                      v-for="item in availableOption"
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
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create1('formName')">确 定</el-button>
        <el-button v-else type="primary" @click="update1('formName')">确 定</el-button>
      </div>
    </el-dialog>
    <!--<el-dialog title="数据隔离规则" :visible.sync="ruleTreePanelVisibled" align="left">
      <el-tree
              :data="filter_data_rules"
              show-checkbox
              node-key="id"
              show-checkbox
              default-expand-all
              ref="tree"
              highlight-current
              :default-expanded-keys="defaultExpandedKeys"
              :default-checked-keys="defaultCheckedKeys"
              :props="dataFilterRuleTreeShowProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showCreateFilterRulePanel()">添加新规则</el-button>
        <el-button @click="rightControllCancel()">取 消</el-button>
        <el-button type="primary" @click="rightControllCreate()">确 定</el-button>
      </div>
    </el-dialog>-->

    <!--数据隔离规则界面 start-->
    <el-dialog :title="panelTitle.ruleTableTitle" :visible.sync="ruleTablePanelVisible" align="left" size="large" >
      <div class="filter-container">
        <el-button class="filter-item" type="success" v-waves icon="plus" @click="showCreateFilterRuleFormPanel()">添加</el-button>
        <el-button class="filter-item" type="primary" v-waves icon="edit" @click="showEditFilterRuleFormPanel()">编辑</el-button>
        <el-button class="filter-item" type="danger" v-waves icon="delete" @click="deleteFilterRules()">删除</el-button>
      </div>
      <el-table
              ref="dataFilterRuleTable"
              :data="filter_data_rules"
              border
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleRuleSelectionChange">
              <el-table-column
                      type="selection"
                      prop="id"
                      width="55">
              </el-table-column>
              <el-table-column
                      label="规则名称"
                      prop="ruleName"
                      width="120">
              </el-table-column>
              <el-table-column
                      prop="ruleColumn"
                      label="规则字段名"
                      show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                      prop="ruleConditions"
                      label="规则表达式"
                      show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                      prop="ruleValue"
                      label="规则值"
                      show-overflow-tooltip>
              </el-table-column>
              <!--<el-table-column-->
                      <!--prop="createName"-->
                      <!--label="创建人"-->
                      <!--show-overflow-tooltip>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                      <!--prop="updateName"-->
                      <!--label="修改人"-->
                      <!--show-overflow-tooltip>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
                      <!--prop="updateDate"-->
                      <!--label="最后修改时间"-->
                      <!--show-overflow-tooltip>-->
              <!--</el-table-column>-->
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideFilterRuleTablePanel()">取 消</el-button>
        <el-button type="primary" @click="filterRuleTableOk()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="panelTitle.ruleFormTitle" :visible.sync="ruleFormPanelVisible" align="center">
      <el-form ref="filter_rule_from"  :rules="filter_validations" :model="filter_rule_from" label-width="80px">
        <el-input type="hidden" v-model="filter_rule_from.menuId"></el-input>
        <el-input type="hidden" v-model="filter_rule_from.id"></el-input>
        <el-form-item label="规则名称" prop="ruleName">
          <el-input v-model="filter_rule_from.ruleName"></el-input>
        </el-form-item>
        <el-form-item label="规则字段名" prop="ruleColumn">
          <el-input v-model="filter_rule_from.ruleColumn"></el-input>
        </el-form-item>
        <el-form-item label="规则表达式" prop="ruleConditions">
          <el-input v-model="filter_rule_from.ruleConditions"></el-input>
        </el-form-item>
        <el-form-item label="规则值" prop="ruleValue">
          <el-input v-model="filter_rule_from.ruleValue"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="filterRuleFormCancel('filter_rule_from')">取 消</el-button>
        <el-button type="primary" @click="filterRuleFormOk('filter_rule_from')">确 定</el-button>
      </div>
    </el-dialog>

    <!--数据隔离规则界面 end-->
  </div>
</template>

<script>
    import { fetchRoleList, createRole, updateRole, deleteRoleByIds,updateFilterDataRule,createFilterDataRule,deleteRole, fetchTreeList, rightControll, hasMenuList,getRulesByRoleAndMenu,addAuthorities,deleteAuthorities,newAddAuthorities,getButtonAuthoritiesSelected,getDateRuleSelected} from 'api/system/SRole';
    import { parseTime } from 'utils';
    import {formatDate} from 'utils/date.js';
    import { getRightButton,getRightRule} from 'api/system/SMenu';

    const sysOption = [
        {dicCode:false,dicLabel:'否'},
        {dicCode:true,dicLabel:'是'}
    ];
    const availableOption = [
        {dicCode:false,dicLabel:'不可用'},
        {dicCode:true,dicLabel:'可用'}
    ];
    const sysArr = ['否','是'];
    const availableArr = ['不可用','可用'];
    export default {
      name: 'SRole',
      data() {

          return {
              oldButtonSelectionLength:0,
              oldRuleSelectionLength:0,
              //暂存变量
              tempStore:{
                roleId : undefined,
                menuId : undefined
              },
              //过滤规则表单
              filter_rule_from:{
                id:'',
                menuId:'',
                ruleName:'',
                ruleColumn:'',
                ruleConditions:'',
                ruleValue:''
              },
              rules:{
                  roleName:[
                      {required:true,message:'请输入角色名称',trigger:'blur'}
                  ],
                  rolecode:[
                      {required:true,message:'请输入角色编号',trigger:'blur'}

                  ]
              },
              //过滤规则数据校验规则
              filter_validations:{
                  ruleName:[
                      {required:true,message:'请输入规则名称',trigger:'blur'},
                      {min:1,max:30,message:'长度在 1 到 30 个字符',trigger:'blur'}
                  ],
                  ruleColumn:[
                      {required:true,message:'请输入规则字段',trigger:'blur'},
                      {min:1,max:30,message:'长度在 1 到 30 个字符',trigger:'blur'}
                  ],
                  ruleConditions:[
                      {required:true,message:'请输入规则表达式',trigger:'blur'}
                  ],
                  ruleValue:[
                      {required:true,message:'请输入规则值',trigger:'blur'}
                  ],
              },
              //数据隔离规则列表选择数组
              dataFilterRuleSelection:[],

              //弹出界面显示状态
              dialogFormVisible: false,
              rightControllVisible: false,
              ruleTablePanelVisible:false,
              ruleFormPanelVisible:false,

              panelTitle:{
                  ruleTableTitle:'数据隔离规则列表',
                  ruleFormTitle:'',
              },




          list: [],
              buttonSelected: [],
              ruleSelected: [],
              newRuleSelectedItRow: [],
          total: null,
          listLoading: true,
          loadingTree: false,
          selectRoleName:"未选中",
          selectRoleNameId:"",
              rightMenuId:"",
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
          dateRoleLoading: false,
              buttonAuthorityLoading: false,
          dialogStatus: '',
          textMap: {
                update: '编辑',
                create: '创建',
                controll: '权限控制',
                ruleTreePanelTitle:'数据隔离'
          },
          temp:{
              rolecode: '',
              roleName: '',
              isSysRole: undefined,
              available: undefined
          },
          multipleSelection:[],
              buttonMultipleSelection:[],
          treeList: [],
              buttonAuthorityList: [],
              dateRuleList: [],
          filter_data_rules:[],
          defaultCheckedKeys: [],
          defaultExpandedKeys: [],
          sysOption,
          availableOption,

          defaultProps: {
              children: 'children',
              label: 'label'
          },

          menuTemp:{
              roleid: undefined,
              menuIds: []
          }

        }
      },
      created() {
        this.getList();
      },
      filters: {
        sysFilter(val){
            if(val){
                return "是"
            }else{
                return "否"
            }
//            return sysArr[val]
        },  formatDate(time) {
                  let date = new Date(time);
                  return formatDate(date, 'yyyy-MM-dd');
          },
        availableFilter(val){
            if(val){
                return "可用"
            }else{
                return "不可用"
            }
            return availableArr[val]
        },
          buttonType(val){
              if(val==1){
                  return "隐藏"
              }else{
                  return "禁用"
              }
          }
      },
      methods: {
        /*过滤规则相关操作方法   start*/
         showFilterRuleTablePanelByRoleAndMenu(data) {
            var rid =  this.menuTemp.roleid;
            var mid = data.id;
             console.log(rid,mid)
            this.tempStore.menuId = data.id;
            this.ruleTablePanelVisible = true;
            this.loadingDataFilterRules(rid,mid);
         },
          showRightTable(data){
              this.rightMenuId=data.id;
              this.getButtonAuthorities()
              this.getDateRuleList()
          },
          checkChange(node,ifSelected,ifSelected2){
              console.log(node)
              console.log(ifSelected)
              console.log(ifSelected2)
              var paramete={
                  roleid:this.selectRoleNameId,
                  authorityId:node.id
              }
              if(ifSelected){
                  console.log("添加权限")
                  console.log(paramete)
                  this.loadingTree=true;
                  addAuthorities(paramete).then(response => {
                      console.log("操作完成")
                  this.loadingTree=false;
              })
              }else{
                  this.loadingTree=true;
                  deleteAuthorities(paramete).then(response => {
                      console.log("操作完成")
                  this.loadingTree=false;
              })
              }
          },

         hideFilterRuleTablePanel(){
            this.ruleTablePanelVisible = false;
         },

         filterRuleTableOk(){
             var selectSize = this.dataFilterRuleSelection.length;
             if(selectSize === 0) {
                 this.$alert('请至少选择一条记录！', '提示', {
                     confirmButtonText: '确定'
                 });
                 return;
             } else {
                 //
                 var ids = [];
                 for(var value of this.dataFilterRuleSelection){
                     ids.push(value.id);
                 }
                 var rid = this.menuTemp.roleid;
                 var mid = this.tempStore.menuId;
                 updateRoleMenuRealtionForRule(rid,mid,ids).then(response=> {
                         if (response.data.returnCode === 200) {
                             //var rid = this.menuTemp.roleid;
                            // var mid = this.tempStore.menuId;
                            // this.loadingDataFilterRules(rid, mid);
                             this.$message({
                                 showClose: true,
                                 message: response.data.returnMsg,
                                 type: 'success'
                             });
                         } else {
                             this.$message({
                                 showClose: true,
                                 message: response.data.returnMsg,
                                 type: 'error'
                             });
                         }
                     }
                 );
             }
         },

         showCreateFilterRuleFormPanel(){
             this.filter_rule_from= {
                         id:'',
                         menuId:'',
                         ruleName:'',
                         ruleColumn:'',
                         ruleConditions:'',
                         ruleValue:''
             };
            this.filter_rule_from.menuId = this.tempStore.menuId;
            this.ruleFormPanelVisible = true;
            this.panelTitle.ruleFormTitle ='添加数据隔离规则';
         },

         showEditFilterRuleFormPanel(){

             this.loadingDataFilterRule();
         },

         filterRuleFormCancel(formName){
            this.ruleFormPanelVisible = false;
            this.resetForm(formName);
         },

         filterRuleFormOk(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log("ceshi:")
                    console.log(this.filter_rule_from.id)
                    if(this.filter_rule_from.id > 0){
                        updateFilterDataRule(this.filter_rule_from.id,this.filter_rule_from).then(response=>{
                            if (response.data.returnCode === 200) {
                                this.ruleFormPanelVisible = false;
                                this.resetForm(formName);
                                var rid = this.tempStore.roleId;
                                var mid = this.tempStore.menuId;
                                this.loadingDataFilterRules(rid,mid);
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: response.data.returnMsg,
                                    type: 'error'
                                });
                            }
                        })
                    }else{
                        createFilterDataRule(this.filter_rule_from).then(response=>{
                            if (response.data.returnCode === 200) {
                                this.ruleFormPanelVisible = false;
                                this.resetForm(formName);
                                var rid = this.tempStore.roleId;
                                var mid = this.tempStore.menuId;
                                this.loadingDataFilterRules(rid,mid);
                            }else{
                                this.$message({
                                    showClose: true,
                                    message: response.data.returnMsg,
                                    type: 'error'
                                });
                            }
                        })
                    }
                } else {
                    return false;
                }
            });
        },

         loadingDataFilterRules(rid,mid){
            getRulesByRoleAndMenu(rid,mid).then(response=>{
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
            );
        },

         loadingDataFilterRule(){
            var selectSize = this.dataFilterRuleSelection.length;
            if(selectSize === 0) {
                this.$alert('请至少选择一条记录！', '提示', {
                    confirmButtonText: '确定'
                });
                return;
            } else if (selectSize > 1) {
                this.$alert('只能选择一条记录进行修改！', '提示', {
                    confirmButtonText: '确定'
                });
                return;
            } else {
                this.ruleFormPanelVisible = true;
                this.panelTitle.ruleFormTitle ='修改数据隔离规则';
                this.filter_rule_from = Object.assign({}, this.dataFilterRuleSelection[0]);
            }
        },

         handleRuleSelectionChange(val) {
           this.dataFilterRuleSelection = val;
         },

         deleteFilterRules(){
             var selectSize = this.dataFilterRuleSelection.length;
             if(selectSize === 0) {
                 this.$alert('请至少选择一条记录！', '提示', {
                     confirmButtonText: '确定'
                 });
                 return;
             } else {
                 //
                 var ids = [];
                 for(var value of this.dataFilterRuleSelection){
                     ids.push(value.id);
                 }
                 deleteRoleByIds(ids).then(response=> {
                       if (response.data.returnCode === 200) {
                           var rid = this.menuTemp.roleid;
                           var mid = this.tempStore.menuId;
                           this.loadingDataFilterRules(rid, mid);
                       } else {
                           this.$message({
                               showClose: true,
                               message: response.data.returnMsg,
                               type: 'error'
                           });
                       }
                     }
                 );
             }
         },

        /*过滤规则相关操作方法   end*/



        handleClear() {
          this.listQuery.searchKey = '';
        },
          handleSelectionChange(val) {
              this.multipleSelection = val;
          },
          buttonSelectionChange(val) {
              this.buttonMultipleSelection = val;
          },
          buttonSelectionChangeOne(selection,row){
              console.log(selection)
              console.log(row)
              console.log(row.authorityId)
              var paramete={
                  roleid:this.selectRoleNameId,
                  authorityId:row.authorityId
              }
              if(this.oldButtonSelectionLength < selection.length){
                  console.log("添加ss权限")
                  console.log(paramete)
                  newAddAuthorities(paramete).then(response => {
                      this.$notify({
                      title: '成功',
                      message: '操作成功',
                      type: 'success',
                      duration: 2000
                  });
                  this.oldButtonSelectionLength=selection.length;
              })
              }else{
                  console.log("删除ss权限")
                  deleteAuthorities(paramete).then(response => {
                      this.$notify({
                      title: '成功',
                      message: '操作成功',
                      type: 'success',
                      duration: 2000
                  });
                  this.oldButtonSelectionLength=selection.length;
              })
              }
          },
          ruleSelectionChangeOne(selection,row){
              console.log(selection)
              console.log(row)
              console.log(row.authorityId)
              var paramete={
                  roleid:this.selectRoleNameId,
                  authorityId:row.authorityId
              }
              if(this.oldRuleSelectionLength < selection.length){
                  console.log("添加ss权限")
                  console.log(paramete)
                  newAddAuthorities(paramete).then(response => {
                      this.$notify({
                      title: '成功',
                      message: '操作成功',
                      type: 'success',
                      duration: 2000
                  });
                  this.oldRuleSelectionLength=selection.length;
              })
              }else{
                  console.log("删除ss权限")
                  deleteAuthorities(paramete).then(response => {
                      this.$notify({
                      title: '成功',
                      message: '操作成功',
                      type: 'success',
                      duration: 2000
                  });
                  this.oldRuleSelectionLength=selection.length;
              })
              }
          },
        getList() {
          this.listLoading = true;
            console.log(this.listQuery)
            fetchRoleList(this.listQuery).then(response => {
                console.log("这是分页查询")
                console.log(response)
            this.list = response.data.returnData.pageInfo.list;
            this.total = response.data.returnData.pageInfo.total;
            this.listLoading = false;
          })
        },
        handleCancel(ruleForm){
              this.dialogFormVisible = false;
              this.resetForm(ruleForm);
        },
        handleUpdate(row){
            if(row.length === 0) {
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
        handleCreate(){
            this.resetTemp();
            this.dialogStatus = 'create';
            this.dialogFormVisible = true;
        },
        create1(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    console.log(this.temp);
                    createRole(this.temp).then(response=>{
                        if (response.data.returnCode === 200) {
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: '成功',
                                message: '创建成功',
                                type: 'success',
                                duration: 2000
                            });
                            this.getList();
                            this.resetForm(ruleForm);
                        } else {
                            this.$notify({
                                title: '失败',
                                message: '创建失败: ' + response.data.returnMsg,
                                type: 'error',
                                duration: 6000
                            });
                            this.resetForm(ruleForm);
                        }
                    });
                }else {
                    return false;
                }
            });

        },
        update1(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    var updataParameter ={
                        rolecode: this.temp.rolecode,
                        roleName: this.temp.roleName,
                        isSysRole: this.temp.isSysRole,
                        available: this.temp.available
                    }
                    updateRole(updataParameter,this.temp.id).then(response => {

                        if (response.data.returnCode === 200) {
                            this.dialogFormVisible = false;
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success',
                                duration: 2000
                            });
                            this.getList();
                            this.resetForm(ruleForm);
                        } else {
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
            });
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
                  rolecode: '',
                  roleName: '',
                  isSysRole: undefined,
                  available: undefined
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
                      deleteRole(ids).then(response => {
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
                      })
                  }).catch(() => {
                      return;
                  });
              }
          },
          loadTreeList(){
              fetchTreeList().then(response=>{
                  if (response.data.returnCode === 200) {
                  console.log("加载树：")
                  console.log(response.data.returnData)
                      this.treeList = response.data.returnData;
                  }
              });
          },
          rightControll(id,roleName){
              this.selectRoleName=roleName;
              this.selectRoleNameId=id;
            this.dialogStatus = 'controll';
//            this.rightControllVisible = true;
            this.menuTemp.roleid = id;
            this.tempStore.roleId = id;
            this.defaultCheckedKeys = [];
              this.loadingTree=true
              hasMenuList(id).then(response=>{
                  if (response.data.returnCode === 200) {
                      console.log("树的默认选中：")
                      console.log(response.data.returnData)
                      this.treeList=response.data.returnData.authority
                      this.defaultCheckedKeys = response.data.returnData.selectIds;
//                      this.loadTreeList();
                      this.buttonAuthorityList=[];
                      this.dateRuleList=[];
                      this.loadingTree=false
                  }
              });

          },
          rightControllCancel(){
              this.rightControllVisible = false;
              this.defaultCheckedKeys = [];
              this. menuTemp = {
                  roleid: undefined,
                  menuIds: []
              };
              this.tempStore = {
                  roleId :undefined,
                  menuId : undefined
              }
          },
          rightControllCreate(){
              var keys = this.$refs.tree.getCheckedKeys();
              this.menuTemp.menuIds = this.$refs.tree.getCheckedKeys();
              //创建角色菜单关系
              console.log("修改树传入额参数：")
              console.log(this.menuTemp)
              rightControll(this.menuTemp).then(response=>{
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
              });

          },
          resetForm(formName){
              this.$refs[formName].resetFields();
          },
          //          获得 页面控件权限控制 列表
          getButtonAuthorities(){
              var _this=this;
              this.buttonAuthorityLoading=true;
              getRightButton(this.rightMenuId).then(response=>{
                  if (response.data.returnCode === 200) {
                  console.log(response.data.returnData)
                  this.buttonAuthorityList=response.data.returnData;


                  getButtonAuthoritiesSelected(this.selectRoleNameId,this.rightMenuId).then(response=>{
                      if (response.data.returnCode === 200) {
                      this.buttonSelected=response.data.returnData;
                      var buttonSelectedArr=[];
                    console.log("选中的角色 是：：")
                    console.log(this.buttonSelected)
                      for(var n=0 ;n<this.buttonSelected.length;n++){
                          if(this.buttonSelected[n].valid){
                              buttonSelectedArr.push(this.buttonSelected[n].authorityId)
                          }
                      }
                    console.log("页面控件权限配置list 是：：")
                    console.log(this.buttonAuthorityList)
                    console.log(buttonSelectedArr)
//                    根据id 获得 index的 数组
                      var selectedIt = [];
                      for(let j=0;j<this.buttonAuthorityList.length;j++){
                          for(let m=0;m<buttonSelectedArr.length;m++){
                              if(this.buttonAuthorityList[j].authorityId==buttonSelectedArr[m]){
                                  selectedIt.push(j)
                              }
                          }
                      }
                      console.log("最后的selectedIt是：：")
                      console.log(selectedIt)
                      console.log(selectedIt.length)
                      var selectedItRow = [];
                      for(let i=0;i<selectedIt.length;i++){
                          selectedItRow.push(_this.buttonAuthorityList[selectedIt[i]])
                      }
                      _this.$nextTick(function(){
                          _this.buttonToggleSelection(selectedItRow);//每次更新了数据，触发这个函数即可。
                      });
                      this.buttonAuthorityLoading=false;
                  }
              });
              }
          });
          },
          //          获得数据权限控制
          getDateRuleList(){
              this.dateRoleLoading=true;
              var _this = this;
              getRightRule(this.rightMenuId).then(response=>{
                  if (response.data.returnCode === 200) {
                  console.log(response.data.returnData)
                  this.dateRuleList=response.data.returnData;

                  getDateRuleSelected(this.selectRoleNameId,this.rightMenuId).then(response=>{
                      if (response.data.returnCode === 200) {
                      this.ruleSelected=response.data.returnData;
                      var dateRuleSelectedArr=[];
                      console.log("选中的数据权限控制 是：：")
                      console.log(this.ruleSelected)
                      for(var n=0 ;n<this.ruleSelected.length;n++){
                          if(this.ruleSelected[n].valid){
                              dateRuleSelectedArr.push(this.ruleSelected[n].authorityId)
                          }
                      }
                      console.log("数据权限控制list 是：：")
                      console.log(this.dateRuleList)
                      console.log(dateRuleSelectedArr)
//                    根据id 获得 index的 数组
                      var selectedIt = [];
                      for(let j=0;j<this.dateRuleList.length;j++){
                          for(let m=0;m<dateRuleSelectedArr.length;m++){
                              if(this.dateRuleList[j].authorityId==dateRuleSelectedArr[m]){
                                  selectedIt.push(j)
                              }
                          }
                      }
                      console.log("数据权限控制最后的selectedIt是：：")
                      console.log(selectedIt)
                      console.log(selectedIt.length)
                      var selectedItRow = [];
                      for(let i=0;i<selectedIt.length;i++){
                          selectedItRow.push(_this.dateRuleList[selectedIt[i]])
                      }

                      this.newRuleSelectedItRow=selectedItRow
                      _this.$nextTick(function(){
                          _this.dateRuleToggleSelection(selectedItRow);//每次更新了数据，触发这个函数即可。
                      });
                      this.dateRoleLoading=false
                  }
              });


              }
          });
          },
          buttonToggleSelection(rows) {
              if (rows) {
                  console.log("jinlail111")
                  console.log(rows)
                  rows.forEach(row => {
                      this.$refs.buttonMultipleTable.toggleRowSelection(row);
              });
              } else {
                  console.log("jinlail12")
                  this.$refs.buttonMultipleTable.clearSelection();
              }
          },
          dateRuleToggleSelection(rows) {
              console.log("进来的rows是：")
              console.log(rows)
              if (rows) {
                  rows.forEach(row => {
                      this.$refs.ruleMultipleTable.toggleRowSelection(row);
              });
              } else {
                  console.log("jinlail12")
                  this.$refs.ruleMultipleTable.clearSelection();
              }
          },
      }
    }
</script>
<style >
    .el-card__header {
        padding: 14px 20px;
    }
</style>

