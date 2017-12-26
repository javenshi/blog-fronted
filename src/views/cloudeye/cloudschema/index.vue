<template>
    <div class="app-container calendar-list-container">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1">
                <template slot="title">
                    <span>查询</span>
                    <router-link :to="'/cloudeye/clouduser/edit'">
                        <el-button type="primary" size="small" style="float: right; margin-top: 7px; margin-right: 20px;">&nbsp;同步数据库节点&nbsp;</el-button>
                    </router-link>
                </template>

                <el-form ref="form" :inline="true" :model="formInline" size="mini">
                    <el-form-item label="创建日期">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" size="small" style="width: 120px;" v-model="formInline.startDate" placeholder="开始日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="至">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" size="small" style="width: 120px;" v-model="formInline.endDate" placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="数据库名称">
                        <el-input  size="small" v-model="formInline.companyCode" placeholder="公司企业号"></el-input>
                    </el-form-item>
                    <el-form-item label="租户名称">
                        <el-input  size="small" v-model="formInline.companyName" placeholder="公司名称"></el-input>
                    </el-form-item>

                    <el-form-item label="状态">
                        <el-select  size="small" style="width: 100px;" v-model="formInline.moneyStatus" placeholder="费用状态">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未使用" value="1"></el-option>
                            <el-option label="使用中" value="2"></el-option>
                            <el-option label="已停用" value="3"></el-option>
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
                :data="cloudSchemaList"
                border
                fit
                highlight-current-row
                @sort-change="sortedChange"
                :default-sort = "{prop: 'createdTime', order: 'descending'}"
                style="width: 100%">

            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button
                            type="primary" size="small" v-waves icon="edit"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            type="warning" v-waves icon="edit"
                            v-show="!scope.row.state"
                            @click="handleStart(scope.$index, scope.row)">启用</el-button>
                    <el-button
                            type="warning" v-waves icon="edit"
                            v-show="scope.row.state"
                            @click="handleStop(scope.$index, scope.row)">停用</el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="companyCode"
                    label="数据库名称"
                    width="125">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.companyCode }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 使用状态"
                    width="100">
                <template scope="scope">
                    <el-tag v-if="scope.row.useStatus" type="success" size="small">启用中</el-tag>
                    <el-tag v-else="scope.row.useStatus" type="warning" size="small">停用中</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createdTime"
                    label="创建时间"
                    sortable="custom"
                    width="130">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.createdTime | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="关联租户"
                    width="130">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.sysUser }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createdTime"
                    label="关联时间"
                    sortable="custom"
                    width="130">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.createdTime | formatDate }}</span>
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
    export default {
        name: 'cloudSchema',
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
                cloudSchemaList: null,
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
        }
    }
</script>