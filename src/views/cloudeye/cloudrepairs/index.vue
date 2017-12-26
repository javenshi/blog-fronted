<template>
    <div class="app-container calendar-list-container">

        <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1">
                <template slot="title">
                    <span>查询</span>



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
               <!--   <el-form-item label="启用日期">
                        <el-date-picker type="date" v-model="formInline.startDate" placeholder="启用日期"></el-date-picker>
                    </el-form-item>-->
                    <el-form-item label="上报公司">
                        <el-input v-model="formInline.putCompany"  size="small" style="width: 100px;" placeholder="上报公司"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="上报类型">
                        <el-select v-model="formInline.region"  size="small" style="width: 100px;" placeholder="上报类型">
                            <el-option label="手动上报" value="shanghai"></el-option>
                            <el-option label="设备自检" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>-->
                    <el-form-item label="上报时间">
                        <el-date-picker type="date" v-model="formInline.putTime"  size="small" style="width: 120px;" placeholder="上报时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="处理时间">
                        <el-date-picker type="date" v-model="formInline.conductTime"  size="small" style="width: 120px;" placeholder="处理时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="设备序列号">
                        <el-input v-model="formInline.sn" size="small" placeholder="设备序列号"></el-input>
                    </el-form-item>
                    <el-form-item label="印章名称">
                        <el-input v-model="formInline.realName"  size="small" style="width: 100px;" placeholder="印章名称"></el-input>
                    </el-form-item>
                    <el-form-item label="处理结果">
                        <el-select v-model="formInline.conductResult"  size="small" style="width: 100px;" placeholder="处理结果">
                            <el-option label="已处理" value="已处理"></el-option>
                            <el-option label="未处理" value="未处理"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" v-waves icon="search" @click="findPage">查询</el-button>
                    </el-form-item>
                </el-form>




            </el-collapse-item>
        </el-collapse>

        <el-table
                :data="tableData"
                border
                style="width: 100%">



            <el-table-column
                    label=" 上报公司"
                    width="180">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.putCompany }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 上报人"
                    width="125">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.putUser }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 上报时间"
                    sortable
                    width="130">
                <template scope="scope">
                   <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.putTime }}</span>
                </template>
            </el-table-column>

        <!--    <el-table-column
                    label=" 上报类型"
                    width="130">
                <template scope="scope">

                    <span style="margin-left: 10px">{{ scope.row.type }}</span>
                </template>
            </el-table-column>-->

            <el-table-column
                    label=" 故障描述"
                    width="254">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.context }}</span>
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
                    label=" 印章名称"
                    width="180">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.realName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 处理人"
                    width="150">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.conductUser }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 处理状态"
                    width="100">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.conductStatus }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 处理时间"
                    prop="createdTime"
                    sortable="custom"
                    width="130">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.conductTime | formatDate}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 处理结果"
                    width="100">
                <template scope="scope">

                    <span style="margin-left: 10px">{{ scope.row.conductResult }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 维修费用"
                    width="100">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.conductMoney }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="120">
                <template scope="scope">
                    <el-button
                            type="success" size="small" v-waves icon="plus"
                            @click="handleEdit(scope.row.id)">导入处理结果
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
    import {getAll} from 'api/cloudeye/repairs';
    import {formatDate} from 'utils/date.js';
    export default {
        name: 'cloudRepairs',
        data() {
            return {
                activeName: '1',
                formInline: {
                    putCompany:'', putTime:'', conductTime:'', sn:'', realName:'', conductResult:''
                },
                listLoading: false,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                tableData: []
            }
        },mounted() {
            this.listLoading = true;
            getAll(this.listQuery).then(response => {
                this.tableData = response.data.returnData.pageInfo.list;
            });
            this.listLoading = false;
        }, filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
            }
        },
        methods: {
            sortedChange(sort) {
                let sortvalue = 'asc';
                if (sort.order == 'descending') {
                    sortvalue = 'desc';
                }
                this.listQuery.sortList = [{
                    sortKey: sort.prop,
                    sortValue: sortvalue
                }];
                this.findPage();
            },

            findPage() {
                this.listQuery.filterList = [];

                if (this.formInline.putTime != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'putTime',
                        filterValue:  this.formInline.putTime.getTime()
                    });
                }
                if (this.formInline.conductTime != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'conductTime',
                        filterValue: this.formInline.conductTime.getTime()
                    });
                }
                if (this.formInline.putCompany != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'putCompany',
                        filterValue: this.formInline.putCompany
                    });
                }
                if (this.formInline.sn != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'sn',
                        filterValue: this.formInline.sn
                    });
                }
                if (this.formInline.realName != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'realName',
                        filterValue: this.formInline.realName
                    });
                }
                if (this.formInline.conductResult != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'conductResult',
                        filterValue: this.formInline.conductResult
                    });
                }
                this.listLoading = true;
                getAll(this.listQuery).then(response => {
                    this.tableData = response.data.returnData.pageInfo.list;
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
            handleEdit(id) {
                this.$router.push('/cloudeye/cloudrepairs/edit?id='+id);
            }

        }
    }
</script>


                                                  