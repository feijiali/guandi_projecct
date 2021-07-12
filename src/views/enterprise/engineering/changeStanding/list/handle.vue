<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="'新增变更台账'" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll :native="false" class="h-100 form-box">
        <ChangeStanding
          ref="rulforms"
          :types="types"
          :organ_node="organ_node"
          :range="range"
          :main_id="main_id"
          @submitAllData="submitAllData"
        ></ChangeStanding>
        <v-approval-form
          @submitAllDataApproval="submitAllDataApproval"
          ref="approval_form"
          :modules_union="titleArr[0].key"
          :titleName="titleName"
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

import ChangeStanding from "./components/ChangeStanding";
import vSign from "@/components/common/Sign";
import vApprovalForm from "@/components/common/ApprovalForm";

export default {
  mixins: [confirm],
  components: {
    ChangeStanding,
    vSign,
    vApprovalForm,
  },

  data() {
    return {
      titleArr: [{ name: "变更台账", key: "ChangeParameterParameter" }],
      titleName: "", //单据名称
      type: Number(this.$route.query.t),
      types: Number(this.$route.query.type) || 0,
      range: this.$route.query.range || "",
      main_id: Number(this.$route.query.main_id) || 0,
      organ_node: Number(this.$route.query.organ_node) || 0,
      draft_id: parseInt(this.$route.query.draft_id), //草稿箱id
    };
  },
  mounted() {
    this.titleName = `${this.$store.getters.userName}_${this.titleArr[0].name}`;
    if (this.draft_id) {
      //编辑草稿
      this.QueryDraft();
    }
  },
  methods: {
    async QueryDraft() {
      let { result } = await api.QueryDraft({ draft_id: this.draft_id });
      this.draft_content = JSON.parse(result[0].draft_content);
      this.$refs.rulforms.infoReFun(this.draft_content);
    },
    // 保存
    async saveFun() {
      let subData = {};
      subData.draft_module = "ChangeParameterParameter";
      await this.$refs.rulforms.submitFun(true);
      subData.draft_content = JSON.stringify(this.$refs.rulforms.ruleforms);
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
      this.$refs.rulforms.submitFun();
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
