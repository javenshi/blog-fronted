<template>
    <div class="app-container calendar-list-container;">
        <el-tabs>
            <el-tab-pane label="代理商">
                <el-collapse accordion>
                    <el-collapse-item name="1">
                        <template slot="title">
                            <span>查询</span>
                        </template>

                        <el-form :inline="true" :model="formInline" size="mini">
                            <el-form-item label="编号">
                                <el-input type="number" size="small" placeholder="编号"></el-input>
                            </el-form-item>
                            <el-form-item label="账号">
                                <el-input size="small" placeholder="账号"></el-input>
                            </el-form-item>
                            <el-form-item label="名称">
                                <el-input size="small" placeholder="名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" size="small" v-waves icon="search" @click="onSubmit">&nbsp;查&nbsp;询&nbsp;</el-button>
                            </el-form-item>
                        </el-form>


                    </el-collapse-item>
                </el-collapse>
                <el-dialog :title="代理商信息" :visible.sync="dialogFormVisible" align="center" size="max" style="width:80%; margin-left: 10%;">
                    <template>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span>租户列表</span>
                                        <el-button size="mini" style="float: right;" type="plain" @click="click3">
                                            清除选择
                                        </el-button>
                                    </div>
                                    <el-table
                                            :data="tableData4"
                                            @row-click='handleRowHandle4'
                                            highlight-current-row
                                            style="width: 100%">
                                        <el-table-column
                                                label="序号"
                                                prop="id"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                label="公司编号"
                                                prop="companyCode"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="companyName"
                                                label="公司名">
                                        </el-table-column>
                                    </el-table>
                                    <div v-show="!listLoading" class="pagination-container">
                                        <el-pagination @size-change="handleSizeChange4" @current-change="handleCurrentChange4"
                                                       :current-page.sync="listQuery4.pageNum"
                                                       :page-sizes="[10,20,30, 50]" :page-size="listQuery4.pageSize"
                                                       layout="total, sizes, prev, pager, next, jumper" :total="total">
                                        </el-pagination>
                                    </div>
                                </el-card>
                            </el-col>

                            <el-col :span="12">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span>设备列表</span>
                                        <el-button size="mini" style="float: right;" type="plain" @click="click4">
                                            清除选择
                                        </el-button>
                                    </div>
                                    <el-table
                                            :data="tableData3"
                                            @row-click='handleRowHandle3'
                                            highlight-current-row
                                            style="width: 100%">
                                        <el-table-column
                                                label="编号"
                                                prop="id"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                label="序列号"
                                                prop="ascSn"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="blueToothMac"
                                                label="蓝牙地址">
                                        </el-table-column>
                                    </el-table>
                                    <div v-show="!listLoading" class="pagination-container">
                                        <el-pagination @size-change="handleSizeChange3" @current-change="handleCurrentChange3"
                                                       :current-page.sync="listQuery3.pageNum"
                                                       :page-sizes="[10,20,30, 50]" :page-size="listQuery3.pageSize"
                                                       layout="total, sizes, prev, pager, next, jumper" :total="total">
                                        </el-pagination>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>

                    </template>
                </el-dialog>

                <el-table
                        :data="tableData5"
                        @row-click='handleRowHandle'
                        style="width: 100%">


                    <el-table-column
                            label="代理商编号"
                    >
                        <template scope="scope"><span>{{scope.row.agencyNum}}</span></template>
                    </el-table-column>
                    <el-table-column
                            label="代理商账号"
                    >
                        <template scope="scope"><span>{{scope.row.agencyAccount}}</span></template>
                    </el-table-column>
                    <el-table-column
                            label="代理商名称"
                    >
                        <template scope="scope"><span>{{scope.row.agencyPassword}}</span></template>
                    </el-table-column>

                </el-table>
            </el-tab-pane>

            <el-tab-pane label="相关租户">
                <el-collapse accordion>
                    <el-collapse-item name="1">
                        <template slot="title">
                            <span>查询</span>
                        </template>

                        <el-form :inline="true" :model="formInline" size="mini">
                            <el-form-item label="编号">
                                <el-input type="number" size="small" placeholder="编号"></el-input>
                            </el-form-item>
                            <el-form-item label="账号">
                                <el-input size="small" placeholder="账号"></el-input>
                            </el-form-item>
                            <el-form-item label="名称">
                                <el-input size="small" placeholder="名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="plain" size="small" @click="onSubmit">&nbsp;查&nbsp;询&nbsp;</el-button>
                            </el-form-item>
                        </el-form>


                    </el-collapse-item>
                </el-collapse>

                <el-table
                        :data="tableData5"
                        @row-click='handle'
                        style="width: 100%">
                    <!--     <el-table-column type="expand">
                             <template scope="props">
                                  <el-row :gutter="20">
                                      <el-col :span="12">
                                          <el-card class="box-card">
                                              <div slot="header" class="clearfix">
                                                  <span>代理商列表</span>
                                                  <el-button size="mini" style="float: right;" type="plain">清除选择</el-button>
                                              </div>
                                              <el-table
                                                      :data="tableData"
                                                      highlight-current-row
                                                      style="width: 100%">
                                                  <el-table-column
                                                          prop="date"
                                                          label="日期"
                                                          width="180">
                                                  </el-table-column>
                                                  <el-table-column
                                                          prop="name"
                                                          label="姓名"
                                                          width="180">
                                                  </el-table-column>
                                                  <el-table-column
                                                          prop="address"
                                                          label="地址">
                                                  </el-table-column>
                                              </el-table>
                                          </el-card>
                                      </el-col>

                                      <el-col :span="12">
                                          <el-card class="box-card">
                                              <div slot="header" class="clearfix">
                                                  <span>设备列表</span>
                                                  <el-button size="mini" style="float: right;" type="plain">清除选择</el-button>
                                              </div>
                                              <el-table
                                                      :data="tableData"
                                                      highlight-current-row
                                                      style="width: 100%">
                                                  <el-table-column
                                                          prop="date"
                                                          label="日期"
                                                          width="180">
                                                  </el-table-column>
                                                  <el-table-column
                                                          prop="name"
                                                          label="姓名"
                                                          width="180">
                                                  </el-table-column>
                                                  <el-table-column
                                                          prop="address"
                                                          label="地址">
                                                  </el-table-column>
                                              </el-table>
                                          </el-card>
                                      </el-col>
                                  </el-row>

                              </template>
                         <el-table-column>-->

                    <el-table-column
                            label="租户企业号"
                            prop="id">
                    </el-table-column>
                    <el-table-column
                            label="租户账号"
                            prop="agencyNum">
                    </el-table-column>
                    <el-table-column
                            label="租户名称"
                            prop="agencyPassword">
                    </el-table-column>
                </el-table>
                <el-dialog :title="租户信息" :visible.sync="dialogForm" align="center" size="max" style="width:80%; margin-left: 10%;">
                    <template>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span>租户列表</span>
                                        <el-button size="mini" style="float: right;" type="plain" @click="click3">
                                            清除选择
                                        </el-button>
                                    </div>
                                    <el-table
                                            :data="tableData4"
                                            @row-click='handleRowHandle4'
                                            highlight-current-row
                                            style="width: 100%">
                                        <el-table-column
                                                label="序号"
                                                prop="id"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                label="公司编号"
                                                prop="companyCode"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="companyName"
                                                label="公司名">
                                        </el-table-column>
                                    </el-table>
                                    <div v-show="!listLoading" class="pagination-container">
                                        <el-pagination @size-change="handleSizeChange4" @current-change="handleCurrentChange4"
                                                       :current-page.sync="listQuery4.pageNum"
                                                       :page-sizes="[10,20,30, 50]" :page-size="listQuery4.pageSize"
                                                       layout="total, sizes, prev, pager, next, jumper" :total="total">
                                        </el-pagination>
                                    </div>
                                </el-card>
                            </el-col>

                            <el-col :span="12">
                                <el-card class="box-card">
                                    <div slot="header" class="clearfix">
                                        <span>设备列表</span>
                                        <el-button size="mini" style="float: right;" type="plain" @click="click4">
                                            清除选择
                                        </el-button>
                                    </div>
                                    <el-table
                                            :data="tableData3"
                                            @row-click='handleRowHandle3'
                                            highlight-current-row
                                            style="width: 100%">
                                        <el-table-column
                                                label="编号"
                                                prop="id"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                label="序列号"
                                                prop="ascSn"
                                                width="180">
                                        </el-table-column>
                                        <el-table-column
                                                prop="blueToothMac"
                                                label="蓝牙地址">
                                        </el-table-column>
                                    </el-table>
                                    <div v-show="!listLoading" class="pagination-container">
                                        <el-pagination @size-change="handleSizeChange3" @current-change="handleCurrentChange3"
                                                       :current-page.sync="listQuery3.pageNum"
                                                       :page-sizes="[10,20,30, 50]" :page-size="listQuery3.pageSize"
                                                       layout="total, sizes, prev, pager, next, jumper" :total="total">
                                        </el-pagination>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>

                    </template>
                </el-dialog>

            </el-tab-pane>
            <el-tab-pane label="相关设备">
                <el-collapse accordion>
                    <el-collapse-item name="1">
                        <template slot="title">
                            <span>查询</span>
                        </template>

                        <el-form :inline="true" :model="formInline" size="mini">
                            <el-form-item label="编号">
                                <el-input type="number" size="small" placeholder="编号"></el-input>
                            </el-form-item>
                            <el-form-item label="账号">
                                <el-input size="small" placeholder="账号"></el-input>
                            </el-form-item>
                            <el-form-item label="名称">
                                <el-input size="small" placeholder="名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="plain" size="small" @click="onSubmit">&nbsp;查&nbsp;询&nbsp;</el-button>
                            </el-form-item>
                        </el-form>


                    </el-collapse-item>
                </el-collapse>
                <el-table
                        :data="tableData5"
                        style="width: 100%">
                    <el-table-column type="expand">
                        <template scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="代理商信息">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <el-form-item label="租户信息">
                                    <span>{{ props.row.shop }}</span>
                                </el-form-item>
                                <el-form-item label="代理商历史">
                                    <span>{{ props.row.id }}</span>
                                </el-form-item>
                                <el-form-item label="租户历史">
                                    <span>{{ props.row.shopId }}</span>
                                </el-form-item>

                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="代理商编号"
                    >
                        <template scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.agencyNum }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="代理商账号"
                    >
                        <template scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.agencyAccount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="代理商名称"
                    >
                        <template scope="scope">
                            <span style="margin-left: 10px">{{ scope.row.agencyPassword }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="listQuery.pageNum"
                           :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    import {
        getCloudAgencyList,
        getUserList,
        getEquipList,
        getUserByEquip,
        getEquipByUser
    } from 'api/cloudeye/cloudAgency';

    export default {
        name: 'cloudAgencyEquipList',
        data() {
            return {
                listLoading: false,
                selectedAgencyList: [],
                listLoading: false,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                listQuery4: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                listQuery3: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                tableData5: [{id:'',agencyNum:'',agencyAccount:'',agencyPassword:'',userdto:'',equipDTO:''}],
                tableData4: [{id:'',ascSn:'',ascSn:'',proxyId:'',cloudUserId:''}],
                tableData3: [{id:'',companyCode:'',companyName:'',AgencyID:''}],
                id:0,
                dialogFormVisible:false,
                dialogForm:false,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }]
            };
        }, mounted() {
            this.listLoading = true;
            getCloudAgencyList(this.listQuery).then(response => {
                this.tableData5 = response.data.returnData.pageInfo.list;
            });
            this.listLoading = false;
        },
        methods: {
            findPage() {
                this.listLoading = true;
                getCloudAgencyList(this.listQuery).then(response => {
                    this.tableData5 = response.data.returnData.pageInfo.list;
                   // console.log(this.tableData5);
                });
                this.listLoading = false;
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.findPage();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.findPage();
            }, handleRowHandle(row, event, column) {
                this.dialogFormVisible=true;
                this.click3(row.id);
                this.click4(row.id);
                this.id=row.id;
            },
            handle(row, event, column) {
                this.dialogForm=true;
                this.click3(row.id);
                this.click4(row.id);
                this.id=row.id;
            },handleRowHandle4(row, event, column) {
                getEquipByUser(row.id).then(response => {
                    this.tableData3 = response.data.returnData;
                });
            }, handleRowHandle3(row, event, column) {
                getUserByEquip(row.cloudUserId).then(response => {
                    this.tableData4 = response.data.returnData;
                });
            }, click4(id) {
                if(isNaN(id)){
                    id=this.id;
                }
                getUserList(id).then(response => {
                    this.tableData4 = response.data.returnData;
                });
            }, click3(id) {
                if(isNaN(id)){
                    id=this.id;
                }
                getEquipList(id).then(response => {
                    this.tableData3 = response.data.returnData;
                });
            }

        }
    }
</script>                                            