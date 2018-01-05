<template>
    <div>
        <div >
            <el-col style="width:250px;">
                <el-select
                        style="width:250px;" v-model="returnParam"
                        placeholder="请选择">
                    <el-option
                            v-for="item in dictionaryOption"
                            :key="item.id"
                            :label="item.dictName"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
        </div>
    </div>
</template>

<script>
   // import {getDictionaryListByType} from 'api/system/SDictionary.js';
    export default {
        data () {
            return {
                listQuery: {
                    pageNum: 1,
                    pageSize: 999,
                    filterList: [],
                    sortList: [],
                    searchKey: ''
                },
                returnParam: ""
            }
        },
        props: {
            dictionaryParam: {
                type: String,
                default () {
                    return ''
                }
            }
        },
        created(){
            console.log("传入的参数")
            console.log(this.dictionaryParam)

           /* getDictionaryListByType(this.listQuery, this.dictionaryParam).then(response => {
                console.log("查询")*/
           /* console.log(response)
            this.dictionaryOption = response.data.returnData;*/


//            this.dictionaryOption=[
//                {dicCode:1,dicLabel:'测试1'},
//                {dicCode:2,dicLabel:'测试2'},
//                {dicCode:3,dicLabel:'测试3'},
//                {dicCode:4,dicLabel:'测试4'},
//            ]
        },
        watch: {
            returnParam(newValue,oldValue){
                console.log(newValue)
                console.log(oldValue)
                this.$emit("returnParam", this.returnParam);
            },
        },
        methods: {

            successClick(){
                if (this.filterData.startTime != "" || this.filterData.endTime != "") {
                    this.$emit("on-success", this.filterData);
                }
            }
        }
    }

</script>
