<template>
    <div>
        <!--导航条-->
        <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#000000"
                text-color="#ffffff"
                active-text-color="#ffd04b">
            <el-menu-item index="1" >
              <router-link to="/">
                返回
              </router-link></el-menu-item>
        </el-menu>

        <div style="width:90%;" align="center">
        <el-card class="box-card" >
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
        </div>
        <!--评论区-->
        <div>
        <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="textarea3">
        </el-input>
       <!-- <el-rate
                v-model="value4"
                :icon-classes="['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']"
                void-icon-class="icon-rate-face-off"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>-->


        </div>
    </div>
</template>

<script>


    export default {

        data() {
            return {

            };
        },mounted(){

        },
        computed: {

        },
        methods: {

        }
    }
</script>
<style lang="scss">
    @import '../../styles/index.scss'; // 全局自定义的css样式
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 100px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }


</style>
