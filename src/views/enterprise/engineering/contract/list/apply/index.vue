<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll :native="false" class="h-100 form-box">
        <!-- 发起计量 -->
        <Measurement
          ref="rulforms1"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 1"
        ></Measurement>
        <!-- 发起付款 -->
        <Payment
          ref="rulforms2"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 2"
        ></Payment>
        <v-approval-form
          @submitAllDataApproval="submitAllDataApproval"
          ref="approval_form"
          :modules_union="titleArr[type - 1].key"
          :titleName="titleName"
          :type="type"
        ></v-approval-form>
      </n-scroll>
    </div>
    <div class="d-flex justify-content-end mb-08">
      <n-button
        v-if="$route.query.isAdd || (!draft_id && !$route.query.id)"
        class="mt-1"
        :btnText="'保存'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="saveFun"
      ></n-button>
      <n-button
        class="mt-1 ml-2"
        :btnText="'确认提交'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="submitFun"
      ></n-button>
    </div>
  </div>
</template>

<script>
import confirm from "@/mixins/confirm";

import Measurement from "./components/Measurement";
import Payment from "./components/Payment";

import vSign from "@/components/common/Sign";
import vApprovalForm from "@/components/common/ApprovalForm";

export default {
  mixins: [confirm],
  components: {
    Measurement,
    Payment,
    vSign,
    vApprovalForm,
  },
  data() {
    return {
      titleArr: [
        { name: "合同计量", key: "ProjectReportEngineeringMain" },
        { name: "合同付款", key: "ProjectReportEngineeringPay" },
      ],
      title: "",
      titleName: "", //单据名称
      type: Number(this.$route.query.t),
      editID:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)),
      draft_id: parseInt(this.$route.query.draft_id), //草稿箱id
    };
  },
  async mounted() {
    this.title = this.titleArr[this.type - 1].name;
    this.titleName = `${this.$store.getters.userName}_${
      this.titleArr[this.type - 1].name
    }`;
    if (this.draft_id) {
      //编辑草稿
      this.QueryDraft();
    }
  },
  methods: {
    async QueryDraft() {
      let { result } = await api.QueryDraft({ draft_id: this.draft_id });
      this.draft_content = JSON.parse(result[0].draft_content);
      console.log(this.draft_content);
      this.$refs["rulforms" + this.type].infoReFun(this.draft_content);
    },
    // 保存
    async saveFun() {
      let subData = {};
      subData.draft_module = "ProjectReportEngineeringPay";
      await this.$refs["rulforms" + this.type].submitFun(true);
      subData.draft_content = JSON.stringify(
        this.$refs["rulforms" + this.type].ruleforms
      );
      subData.draft_id = this.draft_id ? this.draft_id : 0;
      await api[`${this.draft_id ? "UpdateDraft" : "UploadDraft"}`](subData);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.linkTo("enterprise_oa_workbench_draft", {
            name: subData.draft_module,
          });
        },
      });
    },
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      this.$refs["rulforms" + this.type].submitFun();
    },
    async submitAllData() {
      // 在提交之前要先删除草稿
      if (this.draft_id) {
        await this.DelDraft();
      }
      this.$refs.approval_form.submitFun();
    },
    async DelDraft() {
      await api.DelDraft({ draft_id: this.draft_id });
    },
    // 审批提交
    submitAllDataApproval(form) {
      this.$refs["rulforms" + this.type].submitAllData(form);
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-config-box {
  .clear {
    .lt {
      width: 33%;
    }
  }
}
</style>
