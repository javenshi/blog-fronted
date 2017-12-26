<template>
    <el-menu mode="vertical" theme="dark" :default-active="$route.path">
        <img src="../../../static/logo.png" height="40" width="144" style="margin-left: 10px; margin-bottom: 10px;"/>
        <sidebar-item :routes='permission_routers'></sidebar-item>
    </el-menu>
</template>

<script>
    import { mapGetters } from 'vuex';
    import SidebarItem from './SidebarItem';
    export default {
      components: { SidebarItem },
      computed: {
        ...mapGetters([
          'permission_routers'
        ])
      },
    created(){

    }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .el-menu {
        min-height: 100%;
    }
</style>
