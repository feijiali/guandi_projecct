<template>
  <n-dialog
    ref="dialog"
    :diaTit="'处理'"
    :diaWidth="'40%'"
    class="stretch-dialog"
  >
    <template slot="diaSlot">
      <n-scroll>
        <el-form class="el-form-box" ref="ruleform" :inline="false">
          <el-form-item class="form-item-long must" label="是否通过：">
            <el-radio-group
              v-model="ruleform.pass_state"
              class="el-radio-group-home vtt"
            >
              <el-radio :label="1">通过</el-radio>
              <el-radio :label="2">不通过</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="form-item-long" label="处理说明：">
            <el-input
              v-model="ruleform.subsidy_publicity_remark"
              type="textarea"
              placeholder="请输入"
              rows="4"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="d-flex justify-content-end">
          <n-button
            class="mt-1"
            :btnText="'确认提交'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="submitFun"
          ></n-button>
        </div>
      </n-scroll>
    </template>
  </n-dialog>
</template>

<script>
import vSign from "@/components/common/Sign";
export default {
  components: {
    vSign,
  },
  data() {
    return {
      ruleform: {
        subsidy_id: null,
        pass_state: null, //审批记录表-审批结果
        subsidy_publicity_remark: "",
      },
      infoData: {},
      rules: {
        pass_state: [
          {
            required: true,
            message: "请选择是否通过",
          },
        ],
      },
    };
  },
  methods: {
    //   点击设置签名
    signatureFun() {
      this.$refs.sign.$refs.signaturedialog.show();
    },
    confirmFun(row) {
      this.ruleform = {
        subsidy_id: null,
        pass_state: null, //审批记录表-审批结果
        subsidy_publicity_remark: "",
      };
      this.infoData = row;
      this.$nextTick(() => {
        this.$refs.dialog.show();
      });
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      if (!this.$utils.ruleFormPro(this, this.rules, this.ruleform)) {
        return;
      }
      // 先判断是否填写必填信息
      this.ruleform.subsidy_id = this.infoData.subsidy_id;
      this.submitAllData();
    },
    async submitAllData() {
      let subdata = { ...this.ruleform };
      let res = await api.updateUnionPartySubsidyState(subdata);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$parent.getList();
          this.$refs.dialog.cancel();
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>