<template>
    <div>111111111111111111111</div>
</template>
<script>

    import {weibo} from 'api/admin/login';
    import tokenStore from 'store2';


    export default {

        data() {
            return {

            };
        }, created() {
           /* alert("登录")
            if(this.$route.query.code!=''&&this.$route.query.code!=null){
                console.log(this.$route.query.code)
                weibo(this.$route.query.code).then(response => {
                    console.log(response)
                    alert("成功")
                });
            }*/

        },

        methods: {

        }
    }

</script>