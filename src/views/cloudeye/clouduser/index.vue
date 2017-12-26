<template>
    <div class="app-container calendar-list-container">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1">
                <template slot="title">
                    <span>查询</span>
                    <router-link :to="'/cloudeye/clouduser/edit'">
                        <el-button type="success" size="small" v-waves icon="plus"
                                   style="float: right; margin-top: 7px; margin-right: 20px;">&nbsp;添加租户&nbsp;
                        </el-button>
                    </router-link>
                    <!--<el-button type="plain" size="small" @click="queryList" style="float: right; margin-top: 7px; margin-right: 20px;">&nbsp;查&nbsp;询&nbsp; </el-button>-->
                </template>

                <el-form ref="form" :inline="true" :model="formInline" size="mini">
                    <el-form-item label="注册日期">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" size="small" style="width: 120px;"
                                        v-model="formInline.startDate" placeholder="开始日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="至">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" size="small" style="width: 120px;"
                                        v-model="formInline.endDate" placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="公司企业号">
                        <el-input size="small" v-model="formInline.companyCode" placeholder="公司企业号"></el-input>
                    </el-form-item>
                    <el-form-item label="公司名称">
                        <el-input size="small" v-model="formInline.companyName" placeholder="公司名称"></el-input>
                    </el-form-item>

                    <el-form-item label="费用状态">
                        <el-select size="small" style="width: 100px;" v-model="formInline.moneyStatus"
                                   placeholder="费用状态">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="欠费" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用状态">
                        <el-select size="small" style="width: 100px;" v-model="formInline.state" placeholder="使用状态">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="正常" value="0"></el-option>
                            <el-option label="停用" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" v-waves icon="search" @click="queryList">&nbsp;查&nbsp;询&nbsp; </el-button>
                    </el-form-item>

                </el-form>


            </el-collapse-item>
        </el-collapse>
        <el-table
                v-loading.body="listLoading"
                :data="cloudUserList"
                border
                fit
                highlight-current-row
                @sort-change="sortedChange"
                :default-sort="{prop: 'createdTime', order: 'descending'}"
                style="width: 100%">

            <el-table-column label="操作" width="190">
                <template scope="scope">
                    <el-button
                            type="primary" size="small" v-waves icon="edit"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            type="warning" size="small" v-waves icon="edit"
                            v-show="scope.row.state!=0"
                            @click="handleStart(scope.row.id)">启用
                    </el-button>
                    <el-button
                            type="danger" size="small" v-waves icon="delete"
                            v-show="scope.row.state==0"
                            @click="handleStop( scope.row.id)">停用
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="companyCode"
                    label=" 租户企业号"
                    width="125">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.companyCode }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="companyName"
                    label=" 公司名称"
                    width="130">
                <template scope="scope">

                    <span style="margin-left: 10px">{{ scope.row.companyName }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createdTime"
                    label=" 注册日期"
                    sortable="custom"
                    width="130">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.createdTime | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 管理员账号"
                    width="130">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.sysUser }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    prop="sysSchema"
                    label="数据库"
                    sortable="custom"
                    width="130">
                <template scope="scope">

                    <span style="margin-left: 10px">{{ scope.row.sysSchema }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 购买章盾数量"
                    width="110">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.zhangdunNum }}</span>

                </template>
            </el-table-column>
            <el-table-column
                    label=" 购买信印数量"
                    width="110">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.xinyinNum }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 联系人"
                    width="120">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.companyLinker }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="手机号"
                    width="150">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.companyPhone }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="电话号码"
                    width="150">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.companyTel }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 费用状态"

                    width="130">
                <template scope="scope">

                    <span style="margin-left: 10px">{{ scope.row.moneyStatus }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 使用状态"
                    width="100">
                <template scope="scope">
                    <el-tag v-show="scope.row.state==0" type="success" size="small">启用中</el-tag>
                    <el-tag v-show="scope.row.state==1" type="warning" size="small">停用中</el-tag>
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
    import {formatDate} from 'utils/date.js';
    import {fetchCloudUserList, UserStart, UserEnd} from 'api/cloudeye/cloudUser';

    export default {
        name: 'cloudUser',
        data() {
            return {
                activeName: '1',
                formInline: {
                    startDate: '',
                    endDate: '',
                    companyCode: '',
                    companyName: '',
                    moneyStatus: '',
                    state: ''
                },
                cloudUserList: null,
                total: null,
                listLoading: false,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
            }
        },
        created() {

            this.getCloudUserList();
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            }
        },
        methods: {
            getStartTime(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            },
            getEndTime(time) {
                let date = new Date(time);
                date.setDate(date.getDate() + 1);
                return formatDate(date, 'yyyy-MM-dd');
            },
            getCloudUserList() {
                this.listLoading = true;
                fetchCloudUserList(this.listQuery).then(response => {
                    this.cloudUserList = response.data.returnData.pageInfo.list;
                    this.total = response.data.returnData.pageInfo.total;
                    this.listLoading = false;
                });
            },
            sortedChange(sort) {
                let sortvalue = 'asc';
                if (sort.order == 'descending') {
                    sortvalue = 'desc';
                }
                this.listQuery.sortList = [{
                    sortKey: sort.prop,
                    sortValue: sortvalue
                }];
                this.getCloudUserList();
            },
            queryList() {
                this.listQuery.filterList = [];
                if (this.formInline.startDate != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'startTime',
                        filterValue: this.getStartTime(this.formInline.startDate)
                    });
                }
                if (this.formInline.endDate != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'endTime',
                        filterValue: this.getEndTime(this.formInline.endDate)
                    });
                }
                if (this.formInline.companyCode != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'companyCode',
                        filterValue: '%' + this.formInline.companyCode + '%'
                    });
                }
                if (this.formInline.companyName != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'companyName',
                        filterValue: '%' + this.formInline.companyName + '%'
                    });
                }
                if (this.formInline.moneyStatus != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'moneyStatus',
                        filterValue: this.formInline.moneyStatus
                    });
                }
                if (this.formInline.state != '') {
                    this.listQuery.filterList.push({
                        filterKey: 'state',
                        filterValue: this.formInline.state
                    });
                }
                this.getCloudUserList();
            },
            handleEdit(index, row) {
                this.$router.push('/cloudeye/clouduser/edit?uid=' + row.id);

            },
            handleStop(index, row) {
                row.state = 0;
                saveCloudUser(row).then(response => {
                });
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getCloudUserList();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getCloudUserList();
            },
            handleStart(val) {

                UserStart(val).then(response => {
                    this.getCloudUserList();
                });

            },
            handleStop(val) {
                this.$confirm('此操作将使该租户下所有人员无法登陆, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    UserEnd(val).then(response => {
                        this.getCloudUserList();
                    });

                    this.$message({
                        type: 'success',
                        message: '停用成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消停用'
                    });
                });

            }

        }
    }
</script>



