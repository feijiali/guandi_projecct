<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll :native="false" class="h-100 form-box">
        <cancel-leavee-info
          ref="rulforms"
          :editID="editID"
          @submitAllData="submitAllData"
        ></cancel-leavee-info>
        <v-approval-form
          @submitAllDataApproval="submitAllDataApproval"
          ref="approval_form"
          :modules_union="'OALeave'"
          :titleName="titleName"
          :revise_info_union="revise_info_process_id_union"
        ></v-approval-form>
      </n-scroll>
    </div>
    <div class="d-flex justify-content-end mb-08">
      <n-button
        v-if="
          $route.query.isAdd ||
          (!leave_cancel_id && !$route.query.id) ||
          draft_id
        "
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
import api from "@/api/index";
import confirm from "@/mixins/confirm";
import CancelLeaveeInfo from "./components/CancelLeaveeInfo";

import vSign from "@/components/common/Sign";
import vApprovalForm from "@/components/common/ApprovalForm";

export default {
  mixins: [confirm],
  components: {
    CancelLeaveeInfo,
    vApprovalForm,
  },
  data() {
    return {
      titleArr: this.GLOBAL.titleArr,
      title: "新增销假申请",
      titleName: "", //单据名称
      revise_info_process_id_union: parseInt(this.$route.query.process_id),
      editID:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑id
      leave_cancel_id: parseInt(this.$route.query.cancel_id), //编辑id
      draft_id: parseInt(this.$route.query.draft_id), //草稿箱id
      draft_content: {},
    };
  },
  async created() {
    let title = "";
    if (this.draft_id) {
      title = "编辑销假申请草稿箱";
    } else {
      title = this.leave_cancel_id ? "编辑销假申请" : "新增销假申请";
    }
    this.title = title;
    this.titleName = `${this.$store.getters.userName}_销假申请`;
    if (this.draft_id) {
      //编辑草稿
      this.QueryDraft();
    }
  },
  methods: {
    async QueryDraft() {
      let { result } = await api.QueryDraft({ draft_id: this.draft_id });
      this.draft_content = JSON.parse(result[0].draft_content);
      this.$refs["rulforms" + this.type].infoReFun(this.draft_content);
    },
    // 保存
    async saveFun() {
      let subData = {},
        draft_module = "OALeaveCancel";
      subData.draft_module = draft_module;
      await this.$refs.rulforms.submitFun(true);
      subData.draft_content = JSON.stringify(this.$refs.rulforms.ruleforms);
      console.log(this.$refs.rulforms.ruleforms);
      // return;

      subData.draft_id = this.draft_id ? this.draft_id : 0;
      await api[`${this.draft_id ? "UpdateDraft" : "UploadDraft"}`](subData);
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.$router.linkTo("enterprise_oa_workbench_draft", {
            name: draft_module,
          });
        },
      });
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
    // 确认提交
    async submitFun() {
      // 先判断是否填写必填信息
      this.$refs.rulforms.submitFun();
    },
    // 审批提交
    submitAllDataApproval(form) {
      this.$refs.rulforms.submitAllData(form);
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
