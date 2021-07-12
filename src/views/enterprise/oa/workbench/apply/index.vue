<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <div class="rounded-1 bg-white flex-fill p-2">
      <n-scroll :native="false" class="h-100 form-box">
        <!-- 请假申请 -->
        <leave-info
          ref="rulforms1"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 1"
        ></leave-info>
        <!-- 出差申请 -->
        <business-info
          ref="rulforms2"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 2"
        ></business-info>
        <!-- 加班申请 -->
        <overtime-info
          ref="rulforms3"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 3"
        >
        </overtime-info>
        <!-- 人员调动 -->
        <movement-info
          ref="rulforms4"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 4"
          @organNodeFun="organNodeFun"
        >
        </movement-info>
        <!-- 采购申请 -->
        <purchase-info
          ref="rulforms5"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 5"
          @organNodeFun="organNodeFun"
        ></purchase-info>
        <!-- 合同申请 -->
        <contract-info
          ref="rulforms6"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 6"
          @organNodeFun="organNodeFun"
        ></contract-info>
        <!-- 用章申请 -->
        <seal-info
          ref="rulforms7"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 7"
          @organNodeFun="organNodeFun"
        ></seal-info>
        <!-- 用款申请 -->
        <useMoney-info
          ref="rulforms8"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 8"
          @organNodeFun="organNodeFun"
        ></useMoney-info>
        <!-- 发票共享 -->
        <share-info
          ref="rulforms9"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 9"
          @organNodeFun="organNodeFun"
        ></share-info>
        <!-- 入党申请 -->
        <party-info
          ref="rulforms10"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 10"
          @organNodeFun="organNodeFun"
        >
        </party-info>
        <!-- 困难职工 -->
        <hardworkers-info
          ref="rulforms11"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 11"
          @organNodeFun="organNodeFun"
        >
        </hardworkers-info>
        <!-- 金秋助学 -->
        <helpStudy-info
          ref="rulforms12"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 12"
          @organNodeFun="organNodeFun"
        >
        </helpStudy-info>
        <!-- 生病慰问 -->
        <sickCondolence-info
          ref="rulforms13"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 13"
          @organNodeFun="organNodeFun"
        >
        </sickCondolence-info>
        <!-- 补偿申请 -->
        <compensate-info
          ref="rulforms14"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 14"
          @organNodeFun="organNodeFun"
        >
        </compensate-info>
        <!-- 方案审批 -->
        <schemeApproval-info
          ref="rulforms15"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 15"
          @organNodeFun="organNodeFun"
        >
        </schemeApproval-info>
        <!-- 内部文件 -->
        <documents-info
          ref="rulforms16"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 16"
          @organNodeFun="organNodeFun"
        >
        </documents-info>
        <!-- 投票比选 -->
        <!-- <vote-info
          ref="rulforms17"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 17"
        ></vote-info> -->
        <!-- 调拨申请 -->
        <!-- <transfers-Info
          ref="rulforms18"
          :editID="editID"
          @submitAllData="submitAllData"
          v-if="type == 18"
          @organNodeFun="organNodeFun"
        ></transfers-Info> -->
        <v-approval-form
          @submitAllDataApproval="submitAllDataApproval"
          @chooseProcess="chooseProcess"
          ref="approval_form"
          :modules_union="GLOBAL.titleArr[type > 1 ? type : type - 1].key"
          :titleName="titleName"
          :type="type"
          :organ_node="organ_node"
        ></v-approval-form>
      </n-scroll>
    </div>
    <div class="d-flex justify-content-end mb-08">
      <n-button
        v-if="$route.query.isAdd || (!draft_id && !$route.query.id) || draft_id"
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

import LeaveInfo from "./components/LeaveInfo";
import BusinessInfo from "./components/BusinessInfo";
import OvertimeInfo from "./components/OvertimeInfo";
import MovementInfo from "./components/MovementInfo";
import PurchaseInfo from "./components/PurchaseInfo";
import ContractInfo from "./components/ContractInfo";
import UseMoneyInfo from "./components/UseMoneyInfo";
import SealInfo from "./components/SealInfo";
import ShareInfo from "./components/ShareInfo";
import PartyInfo from "./components/PartyInfo";
import HardworkersInfo from "./components/HardworkersInfo";
import HelpStudyInfo from "./components/HelpStudyInfo";
import SickCondolenceInfo from "./components/SickCondolenceInfo";
import CompensateInfo from "./components/CompensateInfo";
import SchemeApprovalInfo from "./components/SchemeApprovalInfo";
import DocumentsInfo from "./components/DocumentsInfo";
// import VoteInfo from "./components/VoteInfo";
// import TransfersInfo from "./components/TransfersInfo";

import vSign from "@/components/common/Sign";
import vApprovalForm from "@/components/common/ApprovalForm";

export default {
  mixins: [confirm],
  components: {
    LeaveInfo,
    BusinessInfo,
    OvertimeInfo,
    MovementInfo,
    PurchaseInfo,
    ContractInfo,
    UseMoneyInfo,
    SealInfo,
    ShareInfo,
    PartyInfo,
    HardworkersInfo,
    HelpStudyInfo,
    SickCondolenceInfo,
    CompensateInfo,
    SchemeApprovalInfo,
    DocumentsInfo,
    // VoteInfo,
    // TransfersInfo,
    vSign,
    vApprovalForm,
  },
  data() {
    return {
      titleArr: this.GLOBAL.titleArr,
      title: "",
      organ_node: String(this.$organ_id_en_or_pro(this)),
      applyType2: [
        { type: "出差申请", id: 1 },
        { type: "加班申请", id: 2 },
        { type: "其他申请", id: 3 },
      ],
      applyType: [
        { type: "事假", id: 1 },
        { type: "婚假", id: 2 },
        { type: "病假", id: 3 },
        { type: "丧家", id: 4 },
        { type: "产假", id: 5 },
        { type: "调休", id: 6 },
        { type: "其他", id: 7 },
      ],
      titleName: "", //单据名称
      type: Number(this.$route.query.t),
      editID:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //编辑的主表id
      draft_id: parseInt(this.$route.query.draft_id), //草稿箱id
      draft_content: {},
    };
  },
  async mounted() {
    let title1 = "",
      title2 = this.titleArr[this.type > 1 ? this.type : this.type - 1].name;
    if (this.draft_id) {
      title1 = "编辑" + title2 + "草稿箱";
    } else {
      title1 = this.$route.query.id ? "编辑" + title2 : "新增" + title2;
    }
    this.title = title1;
    this.titleName = `${this.$store.getters.userName}_${
      this.titleArr[this.type > 1 ? this.type : this.type - 1].name
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
      this.$refs["rulforms" + this.type].infoReFun(this.draft_content);
    },
    // 改变组织机构
    organNodeFun(val) {
      this.organ_node = String(val);
    },
    // 保存
    async saveFun() {
      let subData = {},
        draft_module =
          this.titleArr[this.type > 1 ? this.type : this.type - 1].key;
      subData.draft_module = draft_module;

      await this.$refs["rulforms" + this.type].submitFun(true);

      subData.draft_content = JSON.stringify({
        ...this.$refs["rulforms" + this.type].ruleforms,
        account_job: this.$store.getters.account_job,
        organ: this.$store.getters.user_organ_name,
      });
      console.log(this.$refs["rulforms" + this.type].ruleforms);
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
    // 选择审批流程
    chooseProcess(list) {
      if (this.type == 16) {
        this.$bus.$emit("chooseProcessFun", list);
      }
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
