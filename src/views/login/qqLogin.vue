<template>

</template>
<script>

    import {qqLogin} from 'api/admin/login';
    import tokenStore from 'store2';


    export default {

        data() {
            return {};
        }, created() {
            var ht = window.location.href;
            if (ht.indexOf("=") > -1) {
                ht = ht.substring(ht.indexOf("=") + 1, ht.length-8);
                qqLogin(ht).then(response => {
                    if (response.data.returnCode == 400||response.data.returnCode == 300) {
                        this.$message({
                            message: response.data.returnMsg,
                            type: 'error',
                            duration: 5 * 1000
                        });
                    }else{

                        tokenStore.session.set("user", response.data.returnData);
                        this.$message({
                            message: "登录成功",
                            type: 'success',
                            duration: 5 * 1000
                        });
                    }
                    window.location.href = "/";
                });
            }

        },

        methods: {}
    }

</script>