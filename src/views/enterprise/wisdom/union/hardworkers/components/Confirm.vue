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
          <el-form-item
            v-if="ruleform.pass_state == 1"
            class="form-item-long must"
            label="困难编号："
          >
            <el-input
              class="input-m"
              v-model="ruleform.hard_worker_number"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-item-long" label="处理说明：">
            <el-input
              v-model="ruleform.hard_worker_publicity_remark"
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
        hard_worker_id: null,
        pass_state: null, //审批记录表-审批结果
        hard_worker_number: "", //困难编号
        hard_worker_publicity_remark: "",
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
        hard_worker_id: null,
        pass_state: null, //审批记录表-审批结果
        hard_worker_number: "", //困难编号
        hard_worker_publicity_remark: "",
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
      this.ruleform.hard_worker_id = this.infoData.hard_worker_id;
      if (this.ruleform.pass_state == 1) {
        if (!this.ruleform.hard_worker_number) {
          this.$tip({
            isTip: true,
            message: "您还未输入困难编号！",
          });
          return;
        }
        if (!this.$utils.vailNumber(this.ruleform.hard_worker_number)) {
          this.$tip({
            isTip: true,
            message: "困难编号为数值！",
          });
          this.ruleform.hard_worker_number = "";
          return;
        }
      }
      this.submitAllData();
    },
    async submitAllData() {
      let subdata = { ...this.ruleform };
      await api.updateUnionPartyHardWorkerExt(this.ruleform);
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