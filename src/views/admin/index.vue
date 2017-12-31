<template>
    <div class="app-container calendar-list-container">
        <template>
            <el-tabs type="border-card">
                <el-tab-pane label="轮播图">
                    <el-upload
                            class="upload-demo"
                            drag
                            :onSuccess="uploadSuccess"
                            action="http://localhost:8088/api/admin/upl"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                    <el-table
                            :data="Carousel"
                            border
                            style="width: 100%">
                        <el-table-column label="操作" width="190">
                            <template scope="scope">

                                <el-button
                                        type="danger" size="small" v-waves icon="delete"
                                        @click="handleEdit(scope.$index, scope.row)">删除
                                </el-button>

                            </template>
                        </el-table-column>
                        <el-table-column label="图片">
                            <template scope="scope">
                                <div v-html="scope.row.url"></div>

                            </template>
                        </el-table-column>

                    </el-table>

                </el-tab-pane>
                <el-tab-pane label="配置管理">配置管理</el-tab-pane>
                <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
            </el-tabs>
        </template>

    </div>
</template>

<script>
    import {formatDate} from 'utils/date.js';
    import {getAllCarousel,deleteCarousel} from 'api/admin/index';

    export default {
        name: 'cloudUser',
        data() {
            return {
                Carousel: '',
            }
        },
        created() {
            this.getAllC();

        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd');
            }
        },
        methods: {
            getAllC() {
                getAllCarousel().then(response => {
                    this.Carousel = response.data.returnData;
                });
            },
            handleEdit(index, row) {
                deleteCarousel(row.id).then(response => {
                    this.getAllC();
                });

            },
            uploadSuccess(response){
               this.getAllC();
            },


        }
    }
</script>



