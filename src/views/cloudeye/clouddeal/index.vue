<template>
    <div class="app-container calendar-list-container">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1">
                <template slot="title">
                    <span>查询</span>
                    <el-button class="filter-item" type="primary" size="small" icon="plus"
                               style="float: right; margin-top: 7px; margin-right: 20px;" @click="chartDepart">类型字典
                    </el-button>
                </template>
                <el-form :inline="true" :model="formInline">
                    <el-form-item label="缴费租户名称">
                        <el-input size="small" style="width: 140px;" v-model="formInline.companyName"
                                  placeholder="缴费租户名称"></el-input>
                    </el-form-item>
                    <el-form-item label="缴费类型">
                        <el-select size="small" style="width: 140px;" v-model="formInline.dealType" placeholder="缴费类型">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="设备金额" value="1"></el-option>
                            <el-option label="维修费用" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="缴费时间">
                        <el-date-picker size="small" style="width: 140px;" type="date" v-model="formInline.startDate"
                                        placeholder="缴费开始时间"></el-date-picker>
                        ~
                        <el-date-picker size="small" style="width: 140px;" type="date" v-model="formInline.endDate"
                                        placeholder="缴费结束时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" v-waves icon="search" @click="queryList">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
        </el-collapse>
        <el-table
                v-loading.body="listLoading"
                :data="cloudDealList"
                border
                fit
                highlight-current-row
                @sort-change="sortedChange"
                :default-sort="{prop: 'createdTime', order: 'descending'}"
                style="width: 100%">

            <el-table-column
                    label=" 缴费时间"
                    prop="dealTime"
                    sortable="custom"
                    width="130">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.dealTime | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 应交金额"
                    width="125">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.dealAmount }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 实交金额"
                    width="130">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.dealRealAmount }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label=" 缴费类型"
                    width="130">
                <template scope="scope">

                    <span style="margin-left: 10px">{{ scope.row.dealType | dealTypeFilter }}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label=" 是否缴清"
                    width="104">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.isPayFinish | isPayFinishFilter }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 缴费租户">
                <template scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.companyName }}</span>
                </template>
            </el-table-column>


            <el-table-column label="操作" width="210">
                <template scope="scope">
                    <el-button
                            type="primary" size="small" v-waves icon="edit"
                            @click="handleEdit(scope.$index, scope.row)">更新记录
                    </el-button>
                    <el-button
                            type="danger" size="small" v-waves icon="delete"
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
    import {formatDate} from "utils/date.js";
    import {getCloudDealPage, deleteCloudDealById} from "api/cloudeye/cloudDeal";

    export default {
        name: "cloudDeal",
        data() {
            return {
                dialogFormVisible: false,
                activeName: "1",
                formInline: {
                    startDate: "",
                    endDate: "",
                    companyCode: "",
                    companyName: "",
                    moneyStatus: "",
                    state: "0",
                    dealType: ""
                },
                cloudDealList: null,
                total: null,
                listLoading: false,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ""
                }
            };
        },
        created() {
            this.getCloudDealPage();
        },
        filters: {
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, "yyyy-MM-dd");
            },
            isPayFinishFilter(flag) {
                var returnInfo;
                switch (flag) {
                    case 1:
                        returnInfo = "已缴费";
                        break;
                    case 0:
                        returnInfo = "未缴费";
                        break;
                }
                return returnInfo;
            },
            dealTypeFilter(flag) {
                var returnInfo;
                switch (flag) {
                    case 1:
                        returnInfo = "设备金额";
                        break;
                    case 2:
                        returnInfo = "维修金额";
                        break;
                }
                return returnInfo;
            }
        },
        methods: {
            getCloudDealPage() {
                this.listLoading = true;
                getCloudDealPage(this.listQuery).then(response => {
                    this.cloudDealList = response.data.returnData.pageInfo.list;
                    this.total = response.data.returnData.pageInfo.total;
                    this.listLoading = false;
                });
            },
            sortedChange(sort) {
                let sortvalue = "asc";
                if (sort.order == "descending") {
                    sortvalue = "desc";
                }
                this.listQuery.sortList = [
                    {
                        sortKey: sort.prop,
                        sortValue: sortvalue
                    }
                ];
                this.getCloudDealPage();
            },
            queryList() {
                this.listQuery.filterList = [];
                this.listQuery.searchMap = {};
                if (this.formInline.startDate != "") {
                    this.listQuery.searchMap.dealStartTime = Date.parse(this.formInline.startDate);
                }
                if (this.formInline.endDate != "") {
                    this.listQuery.searchMap.dealEndTime = Date.parse(this.formInline.endDate);
                }

                if (this.formInline.companyName != "") {
                    this.listQuery.searchMap.companyName = this.formInline.companyName;
                }
                if (this.formInline.dealType != "") {

                    this.listQuery.searchMap.dealType = this.formInline.dealType;
                }
                if (this.formInline.state != "") {
                    this.listQuery.filterList.push({
                        filterKey: "state",
                        filterValue: this.formInline.state
                    });
                }
                this.getCloudDealPage();
            },
            handleEdit(index, row) {
                this.$router.push("/cloudeye/clouddeal/edit?uid=" + row.id);
            },
            handleDelete(index, row) {
                this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        deleteCloudDealById(row.id).then(response => {
                            this.getCloudDealPage();
                            this.$message({
                                type: "success",
                                message: "删除成功!"
                            });
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
            handleStop(index, row) {
                row.state = 0;
                saveCloudUser(row).then(response => {
                });
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.getCloudDealPage();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNum = val;
                this.getCloudDealPage();
            }, chartDepart() {
                this.$router.push('/cloudeye/clouddeal/add');
            },  append(data) {
               // alert(data.id);
                const newChild = { id: id++, label: 'testtest', children: [] };
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },

            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },

            renderContent(h, { node, data, store }) {
                return (
                    <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                    <span>
                    <span>{node.label}</span>
                </span>
                <span>
                <el-button style="font-size: 12px;" type="text" on-click={ () => this.append(data) }>添加</el-button>
                <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
                </span>
                </span>);
            }
    }


    };
</script>


