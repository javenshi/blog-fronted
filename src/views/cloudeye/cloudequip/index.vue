<template>
    <div class="app-container calendar-list-container">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item name="1">
                <template slot="title">
                    <span>查询</span>
                    <el-button style="float: right; margin-top: 7px; margin-right: 20px;" class="filter-item" type="success" size="small" v-waves icon="plus"
                               @click="addEquip">添加设备
                    </el-button>


                    <!-- <el-button type="primary" size="small" icon="plus" style=" margin-top: 7px; margin-right: 20px;"
                                @click="lead">
                         导入设备
                     </el-button>-->
                    <el-button style="float: right; margin-top: 7px; margin-right: 20px;" type="success" size="small" v-waves icon="plus"
                               @click="leadAgency">
                        导入设备
                    </el-button>
                    <el-dialog :title="添加设备" :visible.sync="dialogFormVisible" align="center" style="">

                        <el-form :model="ruleFor" status-icon :rules="rules2" ref="rule2" label-width="100px"
                                 class="demo-ruleForm">

                            <el-form-item label="设备类型" prop="equipType" required>
                                <el-select size="small" style="width: 160px;" v-model="ruleFor.equipType"
                                           placeholder="设备类型" auto-complete="off">
                                    <el-option label="章盾设备" value="0"></el-option>
                                    <el-option label="信印设备" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="设备序列号" prop="ascSn" required>
                                <el-input size="small" style="width: 160px;" type="input" v-model="ruleFor.ascSn"
                                          auto-complete="off"></el-input>
                            </el-form-item>
                            <el-collapse accordion>
                                <el-collapse-item title=" 添加或更新此设备与代理商的关系">

                                    <el-form-item label="代理商企业号" prop="proxyId">
                                        <el-input size="small" style="width: 160px;" type="input" v-model="ruleFor.proxyId"
                                                  auto-complete="off"></el-input>
                                    </el-form-item>
                                </el-collapse-item>
                            </el-collapse>

                            <el-form-item>
                                <el-button @click="handleCancel">取 消</el-button>
                                <el-button @click="addEqu('rule2')" type="primary">确
                                    定
                                </el-button>
                            </el-form-item>
                        </el-form>

                    </el-dialog>
                </template>


                <el-form ref="form" :inline="true" :model="formInline" size="small">
                    <el-form-item label="注册日期">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" size="small" style="width: 120px;"
                                        v-model="formInline.startDate" placeholder="开始日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="至">
                        <el-date-picker type="date" value-format="yyyy-MM-dd" size="small" style="width: 120px;"
                                        v-model="formInline.endDate" placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="设备序列号">
                        <el-input size="small" v-model="formInline.ascSn" placeholder="设备序列号"></el-input>
                    </el-form-item>
                    <el-form-item label="设备类型">
                        <el-select size="small" style="width: 100px;" v-model="formInline.status" placeholder="设备类型">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="台式" value="1"></el-option>
                            <el-option label="便携" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用状态">
                        <el-select size="small" style="width: 100px;" v-model="formInline.registerStatus"
                                   placeholder="使用状态">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="停用" value="0"></el-option>
                        </el-select>
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
                highlight-current-row
                @sort-change="sortedChange"
                :default-sort="{prop: 'createdTime', order: 'descending'}"
                style="width: 100%">

           <!-- <el-table-column
                    label=" 序号"
                    width="61">
                <template scope="scope">
                    &lt;!&ndash; <el-icon name="time"></el-icon>&ndash;&gt;
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>-->
            <el-table-column
                    label=" 设备类型"
                    width="99">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px" v-if="scope.row.equipType==0">章盾</span>
                    <span style="margin-left: 10px" v-else>信印</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 设备序列号"
                    width="166">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.ascSn }}</span>
                </template>
            </el-table-column>


            <el-table-column
                    label=" 设备状态"
                    width="94">
                <template scope="scope">

                    <span style="margin-left: 10px" v-if="scope.row.status==0">未注册</span>
                    <span style="margin-left: 10px" v-else-if="scope.row.status==1">已注册</span>
                    <span style="margin-left: 10px" v-else-if="scope.row.status==2">维修中</span>
                    <span style="margin-left: 10px" v-else>已换机</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 设备蓝牙地址"
                    width="155">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.blueToothMac }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 租户企业号"
                    width="140">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.cloudUserId }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label=" 代理商企业号"
                    width="140">
                <template scope="scope">
                    <!-- <el-icon name="time"></el-icon>-->
                    <span style="margin-left: 10px">{{ scope.row.proxyId }}</span>
                </template>
            </el-table-column>

            <!--<el-table-column label="操作" width="140">
                <template scope="scope">
                    <el-button
                            size="small"
                            @click="handleEdit(scope.row.id)">编辑
                    </el-button>
                    <el-button
                            size="small"
                            type="danger"
                            @click="deleteOneById(scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>-->
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
    import {getAll, deleteById, addOneEqu} from 'api/cloudeye/equip';

    export default {
        name: 'cloudEquip',
        data() {
            var validateType = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择设备类型'));
                } else {
                    callback();
                }
            };

            var validateSn = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入设备序列号'));
                } else if (this.ruleFor.equipType === '1') {
                    if (value.length !== 15) {
                        callback(new Error('信印设备序列号为15位!'));
                    }
                } else if (this.ruleFor.equipType === '0') {
                    if (value.length !== 14) {
                        callback(new Error('章盾设备序列号为14位!'));
                    }
                } else {
                    callback();
                }
            };
            return {
                isTr: false,
                listQuery: {
                    pageNum: 1,
                    pageSize: 10,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                formInline: {
                    startDate: '', endDate: '', ascSn: '', registerStatus: '', status: ''
                }, total: null,
                ruleFor: {
                    equipType: '',
                    ascSn: '',
                    proxyId: ''
                }, rules2: {
                    equipType: [
                        {validator: validateType, trigger: 'blur'}
                    ], ascSn: [
                        {validator: validateSn, trigger: 'blur'}
                    ]
                },
                listLoading: false,
                dialogFormVisible: false,
                tablel: [],
            };
        }, mounted() {
            this.listLoading = true;
            getAll(this.listQuery).then(response => {
                this.tablel = response.data.returnData.pageInfo.list;
                this.total = response.data.returnData.pageInfo.total;
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
                    this.total = response.data.returnData.pageInfo.total;
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
                console.log(id);
                this.$router.push('/cloudeye/cloudequip/edit?id=' + id);
            }, lead() {
                this.$router.push('/cloudeye/cloudequip/leading');
            }
            , leadAgency() {
                this.$router.push('/cloudeye/cloudequip/leadAgency');
            }
            , deleteOneById(id) {
                this.$confirm('此操作删除已选中的记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteById(id).then(response => {
                        var status = response.data.returnCode;
                        var message = response.data.returnMsg;
                        this.$notify({
                            title: status == 200 ? '成功' : '失败',
                            message: message,
                            type: status == 200 ? 'success' : 'warning',
                            duration: 2000
                        });
                        this.findPage();
                    });
                });
            }, handleCancel() {
                this.$refs['rule2'].resetFields();
                this.dialogFormVisible = false;
            },
            addEquip() {
                this.dialogFormVisible = true;
                this.$refs['rule2'].resetFields();
            },
            addEqu(formName) {
                this.isTr = true;
                this.$refs[formName].validate((valid) => {

                    if (!valid) {
                        this.isTr = false;
                        return false;
                    }

                });
                if (this.isTr) {
                    addOneEqu(this.ruleFor).then(response => {

                        var status = response.data.returnCode;
                        var message = response.data.returnMsg;
                        this.$notify({
                            title: status == 200 ? '成功' : '失败',
                            message: message,
                            type: status == 200 ? 'success' : 'warning',
                            duration: 2000
                        });
                        this.findPage();
                        this.dialogFormVisible = false;
                    });
                }

            }
        }

    }
</script>



