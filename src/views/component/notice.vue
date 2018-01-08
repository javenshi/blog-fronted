<template >
    <el-card class="box-card">
        <div slot="header" >
            <span style="margin-left:-75%;color: #666;font-size: 16px;">本站公告</span>
        </div>
        <template>
            <el-table
                    :data="noticeList"
                    :show-header=false
                    style="width: 100%">
                <el-table-column>
                    <template scope="scope">
                        <span > {{scope.row.name}}</span><br>
                        <span> {{scope.row.creatTime}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </el-card>
</template>
<script>
    import {getNoticeList} from 'api/blog/blog';
    export default {
        name: 'noticeIng',
        data() {

            return {
                noticeList:'',
            };
        }, created() {
        this.getNotice();
    },
        methods: {

            getNotice() {
                getNoticeList().then(response => {
                    this.noticeList = response.data.returnData.list;
                });
            },

        }
    }
</script>