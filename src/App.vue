<template>
    <div id="app" style="background-color: #eeeeee; ">
        <router-view ></router-view>
    </div>
</template>

<script>
    export default {
        name: 'APP'
    }
</script>

<style lang="scss">
    @import './styles/index.scss'; // 全局自定义的css样式

    el-icon{
        margin-right:6px;
    }
    .common-topbar-user-image-wrapper1 {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

</style>
