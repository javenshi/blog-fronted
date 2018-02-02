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
    .cursor {
        cursor: pointer;
    }
    el-icon{
        margin-right:6px;
    }
    .common-topbar-user-image-wrapper1 {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .qq {
        background-image: url(img/qq.png);
    }

    .qq:hover {
        background-image: url(img/qq1.png)
    }
    .wb {
        background-image: url(img/wb.png);
    }

    .wb:hover {
        background-image: url(img/wb1.png)
    }.y{
        float: right;
         }

</style>
