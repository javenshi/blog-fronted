<template >
    <el-card class="box-card">
        <div slot="header">
            <span style="margin-left:-75%;color: #666;font-size: 16px;">联系我们</span>
        </div>
        <template>

           联系博主:<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2388386839&site=qq&menu=yes"><img  src="" alt="qq交流" title="qq交流"/></a><br><br>
           加入我们:<a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=d45324b056242c9171abd284c697d99e182b5963bf5f6018315c14cb243d8e01"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="智享" title="智享"></a>
            <br><br>
            微信：<el-popover
                ref="popover1"
                placement="top-start"
                title="标题"
                width="200"
                trigger="hover"
                content="<img src='../../assets/wecat.png'>">
        </el-popover>
            <el-button v-popover:popover1>hover 激活</el-button>
        </template>
    </el-card>
</template>
<script>
    export default {
        name: 'contactIng',
        props: {

        },
    }
</script>