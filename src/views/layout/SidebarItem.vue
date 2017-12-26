<template>
    <div>
        <template v-for="item in routes" v-if="true">
            <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
                <el-menu-item :index="item.path+'/'+item.children[0].path">
                    <wscn-icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.children[0].name}}
                </el-menu-item>
            </router-link>
            <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
                <template slot="title">
                    <wscn-icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.name}}
                </template>
                <template v-for="child in item.children" v-if='!child.hidden /*&&(contains(authorityList,child.meta.role[0]))*/'>
                    <!--<span>{{child.meta.role[0]}}</span>-->
                    <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
                    <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
                        <el-menu-item :index="item.path+'/'+child.path">
                            {{child.name}}
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
    import { getAuthority} from 'api/login';
    import { mapGetters } from 'vuex';
    export default {
      name: 'SidebarItem',
      props: {
        routes: {
          type: Array
        }
      },

        data(){
          return{
              authorityList:[]
          }
        },
        computed: {
                ...mapGetters([
                    'roles',
                    'nroles'
                ])
            },
        methods:{
            contains(arr, obj){
                var i = arr.length;
                    while (i--) {
                            if (arr[i] === obj) {
                                    return true;
                                }
                        }
                    return false;

            }
        },

        created(){
        console.log("从store拿的权限")
//        console.log(this.roles)
        console.log(this.nroles)
        this.authorityList=this.nroles;
//            getAuthority().then(response => {
//               console.log("获得展示的权限")
//
//            if(response.data.returnCode==200){
//                this.authorityList=response.data.returnData
//                console.log(this.authorityList)
//            }
//        })



        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .wscn-icon {
        margin-right: 10px;
    }
    .hideSidebar .menu-indent{
        display: block;
        text-indent: 10px;
    }
</style>

