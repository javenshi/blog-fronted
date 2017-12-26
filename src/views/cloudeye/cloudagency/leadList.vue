<template>
    <div class="app-container calendar-list-container">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1">
                <template slot="title">
                    <span>查询</span>
                    <el-button type="success" size="small" v-waves icon="plus" style="float: right; margin-top: 7px; margin-right: 20px;"@click="lead" >
                        &nbsp;导&nbsp;入&nbsp;
                    </el-button>
                </template>



                <el-form ref="form" :inline="true" :model="formInline" size="small">
                    <el-form-item label="注册日期">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" size="small" style="width: 120px;" v-model="formInline.startDate" placeholder="开始日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="至">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" size="small" style="width: 120px;" v-model="formInline.endDate" placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="设备序列号">
                        <el-input  size="small" v-model="formInline.ascSn" placeholder="设备序列号"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" size="small" v-waves icon="search" @click="findPage">查询</el-button>
                    </el-form-item>
                </el-form>

            </el-collapse-item>
        </el-collapse>






        <el-table
                :data="tablel"
                border
                fit
                fixed
                highlight-current-row
                @sort-change="sortedChange"
                :default-sort = "{prop: 'createdTime', order: 'descending'}"
                style="width: 100%">



            <el-table-column
                    label=" 设备序列号"
                    >
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.ascSn }}</span>
                </template>
            </el-table-column>



            <el-table-column
                    label=" 设备蓝牙地址"
                    >
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.blueToothMac }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label=" 租户"
                    >
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.cloudUserId }}</span>
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
    import {getAll} from 'api/cloudeye/equip';
    export default {
        name: 'cloudEquip',
        data() {
            return {
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                formInline:{
                    startDate:'', endDate:'', ascSn:'', registerStatus:'',status:''
                },
                ruleForm2:{
                    status:''
                },
                listLoading : false,

                tablel:[],
            }
        },mounted(){
            this.listLoading = true;
            getAll(this.listQuery).then(response => {
                this.tablel= response.data.returnData.pageInfo.list;
            });
            this.listLoading = false;
        }, filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
            }
        },
        methods: {
            findPage() {
                this.listQuery.filterList = [];
                if (this.formInline.startDate != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'startDate',
                        filterValue: this.formInline.startDate.getTime()
                    });
                }
                if (this.formInline.endDate != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'endDate',
                        filterValue: this.formInline.endDate.getTime()
                    });
                }

                if (this.formInline.ascSn != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'ascSn',
                        filterValue: this.formInline.ascSn
                    });
                }
                if (this.formInline.status != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'status',
                        filterValue: this.formInline.status
                    });
                }
                if (this.formInline.registerStatus != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'registerStatus',
                        filterValue: this.formInline.registerStatus
                    });
                }
                this.listLoading = true;
                getAll(this.listQuery).then(response => {
                    this.tablel = response.data.returnData.pageInfo.list;
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
            },
            lead() {
                this.$router.push('/cloudeye/cloudagency/leading');
            }

        }

    }
</script>



