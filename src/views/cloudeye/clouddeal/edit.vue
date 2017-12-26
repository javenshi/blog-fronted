<template>
    <div class="app-container calendar-list-container;" >
        <el-card class="box-card" style="max-width: 700px;margin:0 auto">
            <el-form :model="cloudDeal" ref="cloudDealFrom" label-width="100px">
                <el-form-item label="缴费租户" prop="companyName" required>
                    <el-input type="input" v-model="cloudDeal.companyName" auto-complete="off" :disabled="true" ></el-input>
                </el-form-item>
                <el-form-item label="应交金额" prop="dealAmount" required>
                    <el-input type="input" v-model="cloudDeal.dealAmount" auto-complete="off" :disabled="true"  ></el-input>
                </el-form-item>
                <el-form-item label="缴费类型"  required>
                   <el-select v-model="cloudDeal.dealType" placeholder="缴费类型">
                          <el-option v-for="item in dealTypeList"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                          </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="实交金额" prop="dealRealAmount" required>
                    <el-input type="number" v-model="cloudDeal.dealRealAmount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否缴清" prop="isPayFinish" required>
                    <el-select v-model="cloudDeal.isPayFinish" placeholder="是否缴清">
                            <el-option v-for="item in isPayFinishList"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                          </el-option>
                    </el-select>
               </el-form-item>
                <el-form-item>
                    <router-link :to="'/cloudeye/clouduser/index'">
                        <el-button style="float: right; margin-right: 10px;" type="plain" size="small">返回</el-button>
                    </router-link>
                    <el-button style="float: right; margin-right: 10px;" type="primary" size="small" @click="submitForm('cloudDealFrom')" :loading="listLoading">&nbsp;保存&nbsp;</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script>
import { getDealInfoById, updateInfo } from "api/cloudeye/cloudDeal";
export default {
  name: "cloudDealEdit",
  created() {
    if (this.$route.query.uid) {
      getDealInfoById(this.$route.query.uid).then(response => {
        this.cloudDeal = response.data.returnData;
      });
    }
  },
  data() {
    return {
      listLoading: false,
      cloudDeal: {
        id: null,
        companyName: "",
        dealAmount: "",
        dealType: "",
        dealRealAmount: "",
        isPayFinish: ""
      },
      dealTypeList: [
        {
          value: 1,
          label: "设备金额"
        },
        {
          value: 2,
          label: "维修费用"
        }
      ],
      isPayFinishList: [
        {
          value: 1,
          label: "已缴费"
        },
        {
          value: 0,
          label: "未缴费"
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.listLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.cloudDeal.id = this.$route.query.uid;
          updateInfo(this.cloudDeal).then(response => {
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            this.listLoading = false;
            this.$router.push("/cloudeye/clouddeal/index");
          });
        } else {
          this.listLoading = false;
          return false;
        }
      });
    }
  }
};
</script>