<template>
    <div class="app-container calendar-list-container">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1">
                <template slot="title">
                    <span>查询</span>
                </template>


                <el-form :inline="true" :model="formInline">
                    <el-form-item label="开始时间">
                        <el-date-picker type="date" size="small"style="width: 120px;" value-format="yyyy-MM-dd" v-model="formInline.startDate" placeholder="开始时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-date-picker type="date" size="small" style="width: 120px;" value-format="yyyy-MM-dd" v-model="formInline.endDate" placeholder="结束时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="操作人">
                        <el-input v-model="formInline.user" size="small" style="width: 100px;" placeholder="操作人"></el-input>
                    </el-form-item>
                    <el-form-item label="操作描述">
                        <el-input v-model="formInline.logContent" size="small"  placeholder="描述"></el-input>
                    </el-form-item>
                    <el-form-item label="操作模块">
                        <el-input v-model="formInline.module" size="small" style="width: 100px;"  placeholder="模块"></el-input>
                    </el-form-item>
                    <el-form-item label="操作类型">
                        <el-select v-model="formInline.region" size="small" style="width: 100px;" placeholder="操作类型">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="增加" value="增加"></el-option>
                            <el-option label="修改" value="修改"></el-option>
                            <el-option label="删除" value="删除"></el-option>
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
                fit
                highlight-current-row
                @sort-change="sortedChange"
                :default-sort = "{prop: 'createdTime', order: 'descending'}"
                style="width: 100%">

            <el-table-column
                    label=" 序号"
                    >
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 时间"
                    prop="createdTime"
                    sortable="custom"
                    width="185">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 6px">{{ scope.row.createdTime | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 操作人"
                    width="150">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.createdName }}</span>
                </template>
            </el-table-column>


            <el-table-column
                    label=" 操作名称"
                    width="125">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.operatorName }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label=" 操作方法"
                    width="160">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.operationMethod }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label=" 操作模块"
                    width="100">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.operatorModule }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 操作描述"
                    width="590">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.logContent }}</span>
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
    import {getAll} from 'api/cloudeye/log';
    import {formatDate} from 'utils/date.js';
    export default {
        name: 'cloudUser',
        data() {
            return {
                activeName: '1',
                formInline: {
                    startDate:'', endDate:'', region:''
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
        }, mounted() {
            this.listLoading = true;
            getAll(this.listQuery).then(response => {
                this.tableData = response.data.returnData.pageInfo.list;
            });
            this.listLoading = false;
        },
        filters: {
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

                if (this.formInline.startDate != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'startDate',
                        filterValue:  this.formInline.startDate.getTime()
                    });
                }
                if (this.formInline.endDate != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'endDate',
                        filterValue: this.formInline.endDate.getTime()
                    });
                }
                if (this.formInline.user != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'user',
                        filterValue: this.formInline.user
                    });
                }
                if (this.formInline.logContent != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'logContent',
                        filterValue: this.formInline.logContent
                    });
                }
                if (this.formInline.module != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'module',
                        filterValue: this.formInline.module
                    });
                }
                if (this.formInline.region != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'region',
                        filterValue: this.formInline.region
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
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            add() {

            }
        }
    }
</script>



   