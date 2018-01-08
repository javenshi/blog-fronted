<template>

    <div>
        <top></top>
        <el-collapse style="padding: 20px;">
            <el-collapse-item title="如果您对本站有什么好的建议和意见，请再次留下您宝贵的建议，我们会尽快处理">
                <el-row :gutter="20">
                    <el-col :span="4"><br>
                        <div class="grid-content bg-purple">
                        </div>
                    </el-col>
                    <el-col :span="14">
                        <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                width="60%"
                                placeholder="请输入内容"
                                v-model="Proposal.context"></el-input>
                        <div class="grid-content bg-purple"></div>
                    </el-col>

                    <el-col :span="2">
                        <el-button style="padding-top: 17px;padding-bottom: 20px;padding-left: 30px;padding-right: 30px;" type="primary" @click="savePro">发&nbsp;&nbsp;表</el-button>
                        <div class="grid-content bg-purple"></div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple"></div>
                    </el-col>
                </el-row>


            </el-collapse-item>

        </el-collapse>
         <el-table
                 :data="proList"
                 :show-header=false
                 style="width: 100%">
             <el-table-column>
                 <template scope="scope">
                     <br>
                     <span style="font-size: 16px;color: #666;">{{scope.row.context}}</span>

                     <br>
                     <span style="font-size: 14px;color: #666;"> {{scope.row.creatTime|parseTime('{y}-{m}-{d} {h}:{i} ')}}</span>
                     <span style="font-size: 14px;color: #666;"> {{scope.row.userName}}</span>
                     <span> {{scope.row.answer}}</span>
                     <br> <br>
                 </template>
             </el-table-column>
         </el-table>
         <el-button style="margin-top: 20px;" type="primary" @click="getMorePro">加载更多</el-button>
        <div>

        </div>
    </div>
</template>
<script>
    import top from '../component/top';
    import {saveP, getProList} from 'api/blog/proposal';
    import tokenStore from 'store2';
    import {parseTime} from 'utils';

    export default {
        name: 'leavIng',
        components: {
            top
        },
        data() {

            return {
                proSize: 5,
                proList: [],
                Proposal: {context: '', userId: '', UserName: '', answer: '',},
                list: [{context: '太丑了', answer: '现在不丑了'},
                    {context: '太丑了', answer: '现在不丑了'},
                    {context: '太丑了', answer: '现在不丑了'},
                    {context: '太丑了', answer: '现在不丑了'},
                    {context: '太丑了', answer: '现在不丑了'},
                    {context: '太丑了', answer: '现在不丑了'},
                    {context: '太丑了', answer: '现在不丑了'}],
            };
        },
        created() {
            this.getProList0();
        },
        methods: {
            savePro() {

                this.Proposal.userName = this.UNAME;
                this.Proposal.userId = tokenStore.local('User').id;

                saveP(this.Proposal).then(response => {

                    this.getProList0();
                });
            },
            getMorePro() {
                this.proSize += 5;
                this.getProList0();
            },
            getProList0() {
                getProList(this.proSize).then(response => {
                    this.proList = response.data.returnData.list;
                });
            },

        },
    }
</script>
<style>

</style>