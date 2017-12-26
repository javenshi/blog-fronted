<template>
    <div class="app-container calendar-list-container">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1">
                <template slot="title">
                    <span>查询</span>
                    <!--   <el-button type="primary" size="small" style="float: right; margin-top: 7px; margin-right: 20px;">
                           新增
                       </el-button>-->
                </template>
                <!--<el-row :gutter="10">
                    <el-col :span="4">
                        <el-input
                            placeholder="请选择日期"
                            icon="search"
                            :on-icon-click="handleIconClick">
                    </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-input
                                placeholder="请选择日期"
                                icon="search"
                                :on-icon-click="handleIconClick">
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="plain" size="middle">查询</el-button>
                    </el-col>
                </el-row>-->

                <el-form :inline="true" :model="formInline">
                      <el-form-item label="解除注册日期">
                             <el-date-picker size="small" type="date" v-model="listQuery.relieveRegisterTime" placeholder="解除注册日期"></el-date-picker>
                         </el-form-item>
                    <el-form-item label="设备序列号">
                        <el-input size="small" v-model="listQuery.equipSn" placeholder="设备序列号"></el-input>
                    </el-form-item>
                    <el-form-item label="租户">
                        <el-input size="small" v-model="listQuery.userNum" placeholder="租户"></el-input>
                    </el-form-item>



                    <el-form-item>
                        <el-button type="primary" size="small" v-waves icon="search" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>


            </el-collapse-item>
        </el-collapse>
        <el-table
                :data="tableData"
                border
                fixed
                style="width: 100%">



            <el-table-column
                    label=" 序号"
                    width="61">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.$index+1}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 设备类型"
                    width="85">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.sn  }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 设备序列号"
                    width="150">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.sn }}</span>
                </template>
            </el-table-column>


            <el-table-column
                    label=" 设备状态"
                    width="94">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.sn  }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 解除注册时间"
                    sortable
                    width="155">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.sn  }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 内置翻斗章序列号"
                    width="160">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{scope.row.sn }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 租户">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.userNum }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 代理商">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.agencyNum }}</span>
                </template>
            </el-table-column>

            <!--<el-table-column label="操作">-->
                <!--<template scope="scope">-->
                    <!--<el-button-->
                            <!--size="small"-->
                            <!--@click="handleEdit(scope.$index, scope.row)">编辑-->
                    <!--</el-button>-->
                    <!--<el-button-->
                            <!--size="small"-->
                            <!--type="danger"-->
                            <!--@click="handleDelete(scope.$index, scope.row)">删除-->
                    <!--</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
        </el-table>
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
  import { fetchCloudEquipHistoryList,delCloudEquipHistory} from 'api/cloudeye/cloudEquipHistory';
     export default {
         name: 'cloudEquipHistory',
         data() {
             return {
                 activeName: '1',
                 formInline: {
                     startDate: '',
                     endDate: '',
                     user: '',
                     region: ''
                 },
                 tableData:null,
                 total: null,
                 listLoading: false,
                 listQuery: {
                     pageNum: 1,
                     pageSize: 10,
                     filterList: [],
                     sortList: [],
                     relieveRegisterTime:null,
                     equipSn:null,
                     userNum:null
                 },
             }
         },
         created() {
             this.getCloudEquipHistoryList();
         },
         methods: {
             getCloudEquipHistoryList() {
                 this.listLoading = true;
                 fetchCloudEquipHistoryList(this.listQuery).then(response => {
                     console.log("aaaaaa",response);
                     this.tableData = response.data.returnData.pageInfo.list;
                     this.total = response.data.returnData.pageInfo.total;
                     console.log("aaaaa",this.total)
                     this.listLoading = false;
                 });
             },
             handleEdit(index, row) {
                 console.log(index, row);
                 this.$router.push('/cloudeye/cloudagency/edit?uid='+row.id);
             },
             onSubmit(){
                 console.log("进来了");
                 this.getCloudEquipHistoryList();
             },
             handleSizeChange(val) {
                 this.listQuery.pageSize = val;
                 this.getCloudEquipHistoryList();
             },
             handleCurrentChange(val) {
                 this.listQuery.pageNum = val;
                 this.getCloudEquipHistoryList();
             }
         }
     }
</script>



