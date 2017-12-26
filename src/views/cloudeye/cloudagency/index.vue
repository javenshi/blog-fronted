<template>
    <div class="app-container calendar-list-container">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1">
                <template slot="title">
                    <span>查询</span>

                    <el-button type="success" v-waves  size="small" icon="plus" style="float: right; margin-top: 7px; margin-right: 20px;" @click="add" >
                        &nbsp;新&nbsp;增&nbsp;
                    </el-button>
                    <el-button type="primary" size="small" v-waves icon="search" style="float: right; margin-top: 7px; margin-right: 20px;" @click="onSubmit">&nbsp;查&nbsp;询&nbsp;</el-button>
                </template>

                <el-form :inline="true" :model="formInline" size="mini">
                    <el-form-item label="编号">
                        <el-input type="number" v-model="listQuery.agencyNum" placeholder="编号"></el-input>
                    </el-form-item>
                    <el-form-item label="账号">
                        <el-input v-model="listQuery.agencyAccount" placeholder="账号"></el-input>
                    </el-form-item>


                </el-form>


            </el-collapse-item>
        </el-collapse>
        <el-table
                v-loading.body="listLoading"
                :data="tableData"
                border
                fit
                highlight-current-row
                style="width: 100%">

            <el-table-column
                    label=" 序号"
                    width="61">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 代理商编号"
                    width="125">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.agencyNum }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 代理商账号"
                    width="150">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.agencyAccount }}</span>
                </template>
            </el-table-column>


            <el-table-column
                    label=" 代理商名称"
                    width="144">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.agencyName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 旗下用户"
                    width="255">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.subordinateUser }}</span>

                </template>
            </el-table-column>
            <el-table-column
                    label=" 报修信息"
                    width="250">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.repairs }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="210">
                <template scope="scope">
                    <el-button
                            type="primary" size="small" v-waves icon="edit"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="small"
                            type="danger"
                            v-waves icon="delete"
                            @click="handleDelete(scope.$index, scope.row)">删除
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
    </div>
</template>

<script>
    import { formatDate } from 'utils/date.js';
    import { fetchCloudAgencyList,delCloudAgency } from 'api/cloudeye/cloudAgency';
    export default {
        name: 'cloudAgency',
        data() {
            return {
                activeName: '1',
                formInline: {
                    startDate: '',
                    endDate: '',
                    user: '',
                    region: ''
                },
                data: [{
                    num: '01',
                    agencySerialNum: '0001',
                    agencyAccountNum: '0001',
                    agencyName:'英泰',
                    subordinateUser:'做成tree还是打开详情页？ ',
                    repairs:'做成tree还是打开详情页？'


                },{
                    num: '01',
                    agencySerialNum: '0002',
                    agencyAccountNum: 'baidu',
                    agencyName:'百度推广',
                    subordinateUser:'做成tree还是打开详情页？ ',
                    repairs:'做成tree还是打开详情页？'
                },{
                    num: '01',
                    agencySerialNum: '0003',
                    agencyAccountNum: 'sougou',
                    agencyName:'搜狗推广',
                    subordinateUser:'做成tree还是打开详情页？ ',
                    repairs:'做成tree还是打开详情页？'
                },{
                    num: '01',
                    agencySerialNum: '0004',
                    agencyAccountNum: 'google',
                    agencyName:'google推广',
                    subordinateUser:'做成tree还是打开详情页？ ',
                    repairs:'做成tree还是打开详情页？'
                },{
                    num: '01',
                    agencySerialNum: '0008',
                    agencyAccountNum: 'wikipedia',
                    agencyName:'维基推广',
                    subordinateUser:'做成tree还是打开详情页？ ',
                    repairs:'做成tree还是打开详情页？'
                }

                ],
                tableData:null,
                total: null,
                listLoading: false,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: '',
                    agencyAccount:null,
                    agencyNum:null
                },
            }
        },
        created() {
            this.getCloudAgencyList();
        },
        methods: {
            getCloudAgencyList() {
                this.listLoading = true;
                fetchCloudAgencyList(this.listQuery).then(response => {
                    console.log(response);
                    this.tableData = response.data.returnData.pageInfo.list;
                    this.total = response.data.returnData.pageInfo.total;
                    this.listLoading = false;
                });
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.$router.push('/cloudeye/cloudagency/edit?uid='+row.id);
            },
            handleDelete(index, row) {
                console.log(index, row);
                this.$confirm('此操作删除已选中的记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    delCloudAgency(row.id).then(response=>{
                        var status=response.data.returnCode;
                        var message=response.data.returnMsg;
                        this.$notify({
                            title: status==200?'成功':'失败',
                            message: message,
                            type: status==200?'success':'warning',
                            duration: 2000});
                        this.listLoading = false;
                        this.getCloudAgencyList();
                    })
                });
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getCloudAgencyList();
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getCloudAgencyList();
            },
            add(){
                this.$router.push('/cloudeye/cloudagency/edit');
            },
            onSubmit(){
                this.getCloudAgencyList();
            }

        }
    }
</script>



