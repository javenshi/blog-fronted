<template>

    <div class="app-container calendar-list-container;">

        <el-row :gutter="20">
            <el-col :span="8">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>类型字典</span>
                        <el-button type="success" size="small" v-waves icon="plus" style=" margin-top: 7px; margin-right: 20px;"
                                   @click="append">
                            添加
                        </el-button>
                    </div>
                   <!-- <el-tree
                            :data="data4"
                            node-key="id"
                            @node-click="test"
                            :render-content="renderContent">
                    </el-tree>--><el-tree
                        :props="props1"
                        :load="loadNode1"
                        lazy
                        :render-content="renderContent"
                       >
                </el-tree> <!--<el-popover
                        ref="popover5"
                        placement="top"
                        width="160"
                        v-model="visible2">
                    <p>这是一段内容这是一段内容确定删除吗？</p>
                    <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
                    </div>
                </el-popover>

                    <el-button v-popover:popover5>删除</el-button>-->   <el-dialog
                        title="提示"
                        :visible.sync="dialogVisible"
                        width="30%"
                >

                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="类型名称">
                            <el-input v-model="formInline.user" placeholder="类型名称"></el-input>
                        </el-form-item>
                        <el-form-item label="类型金额">
                            <el-input v-model="formInline.user" placeholder="类型金额"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="">查询</el-button>
                        </el-form-item>
                    </el-form>
                  <!--  <el-button @click="dialogVisible = false">取 消</el-button>-->

                </el-dialog>


                </el-card>
                <!-- -->

            </el-col>

            <el-col :span="16">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>设备列表</span>
                        <el-button size="mini" style="float: right;" type="plain" @click="click4">
                            清除选择
                        </el-button>
                    </div>

                </el-card>
            </el-col>
        </el-row>

    </div>
</template>
<script>
    import {getAllDepart,deleteDepartById} from "api/cloudeye/cloudDeal";

    export default {
        name: "cloudDealAdd",
        data() {
            return {
                dialogVisible: false,
                id: 0,
                props1: {
                    label: 'name',
                    children: 'zones',
                    isLeaf: 'leaf',
                    value:'abc',
                },
                formInline:''

            };
        }, created() {

        },
        methods: {
            loadNode1(node, resolve) {
                if (node.level === 0) {
                    return resolve([{ name: '字典',id:0 }]);
                }
                getAllDepart(node.data.id).then(response => {
                    resolve(response.data.returnData);
                });


            },
            test(a, b, c) {
                console.log(a);
                /*getAllDepart(a.id).then(response => {
                    this.$set(a, 'children', []);
                    a.children.push(response.data.returnData);
                });*/
            },

            append() {
                this.dialogVisible = true;

                // alert(data.id);
                /*   const newChild = { id: id++, label: 'testtest', children: [] };
                   if (!data.children) {
                       this.$set(data, 'children', []);
                   }
                   data.children.push(newChild);*/
            },

            remove(node, data) {

                deleteDepartById(node.data.id).then(response => {
                    this.$notify({
                        title: status == 200 ? '成功' : '失败',
                        type: status == 200 ? 'success' : 'warning',
                        duration: 2000
                    });
                    this.$router.push('/cloudeye/clouddeal/add');
                });
            },

            renderContent(h, {node, data, store}) {

                return (
                    <span >
                    <span>
                    <span>{node.label}</span>
                </span>
                <span   style = "margin-left:50px;">
                <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
                </span>
                </span>);

            }
        }


    }
</script>