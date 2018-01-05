<template >
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>本站公告</span>
        </div>
        <template>
            <el-table
                    :data="noticeList"
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