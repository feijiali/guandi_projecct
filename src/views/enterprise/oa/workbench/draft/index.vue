<template>
  <div class="w-100 h-100 table-list-wrap">
    <div class="rounded-1 bg-secondary">
      <nBackTop :title="title" />
    </div>
    <!-- 请假申请 -->
    <leave-oa-table v-if="name == 'OALeave'" />
    <!-- 出差申请 -->
    <business-table v-if="name == 'OAEvection'"></business-table>
    <!-- 加班申请 -->
    <overtime-table v-if="name == 'OAOvertime'"> </overtime-table>
    <!-- 销假申请 -->
    <cancel-leave-table v-if="name == 'OALeaveCancel'"> </cancel-leave-table>
    <!-- 人员调动 -->
    <movement-table v-if="name == 'StaffMobilize'"> </movement-table>
    <purchase-table v-if="name == 'OAPurchaseApproval'" />
    <contract-table v-if="name == 'OAContractApproval'" />
    <seal-table v-if="name == 'OAStampApproval'" />
    <use-money-table v-if="name == 'OAMoneyApproval'" />
    <share-table v-if="name == 'OAInvoiceShare'" />
    <!-- 入党申请 -->
    <party-table v-if="name == 'UnionPartyPersonnelDevelop'"> </party-table>
    <!-- 困难职工 -->
    <hardworkers-table v-if="name == 'UnionPartyHardWorker'">
    </hardworkers-table>
    <!-- 金秋助学 -->
    <helpStudy-table v-if="name == 'UnionPartySubsidyStudy'"> </helpStudy-table>
    <!-- 生病慰问 -->
    <sickCondolence-table v-if="name == 'UnionPartySubsidySick'">
    </sickCondolence-table>
    <!-- 补偿申请 -->
    <compensate-table v-if="name == 'UnionPartySubsidyCompensate'">
    </compensate-table>
    <!-- 方案审批 -->
    <schemeApproval-table v-if="name == 'OAScheme'"> </schemeApproval-table>
    <!-- 内部文件 -->
    <documents-table v-if="name == 'OAInternalDocument'"> </documents-table>
    <!-- <application-table v-if="name == 'Applyment'" />
    <transfers-table v-if="name == 'OAAllocation'" /> -->

    <!-- <loss-table v-if="name == 'Loss'" @show="show" />
    <apply-table v-if="name == 'Apply'" />
    <lease-table v-if="name == 'Lease'" /> -->
    <!-- 合同计量 -->
    <contract-pay-table v-if="name == 'ProjectReportEngineeringPay'" />
    <!-- 合同付款 -->
    <!-- <metering-team-table
      v-if="name == 'ProjectReportEngineeringMain'"
      :infoData="infoDataObj"
    /> -->
    <!-- 变更台账 -->
    <change-standing-table v-if="name == 'ChangeParameterParameter'" />
  </div>
</template>

<script>
import api from "@/api/index";
import confirm from "@/mixins/confirm";

import LeaveOaTable from "./components/LeaveOaInfo";
import CancelLeaveTable from "./components/CancelLeaveInfo";
import BusinessTable from "./components/BusinessInfo";
import OvertimeTable from "./components/OvertimeInfo";
import MovementTable from "./components/MovementInfo";
import ContractTable from "./components/ContractInfo";
import UseMoneyTable from "./components/UseMoneyInfo";
import SealTable from "./components/SealInfo";

import ShareTable from "./components/ShareInfo";
import PartyTable from "./components/PartyInfo";
import HardworkersTable from "./components/HardworkersInfo";
import HelpStudyTable from "./components/HelpStudyInfo";
import SickCondolenceTable from "./components/SickCondolenceInfo";
import CompensateTable from "./components/CompensateInfo";
import SchemeApprovalTable from "./components/SchemeApprovalInfo";
import DocumentsTable from "./components/DocumentsInfo";
// import ApplicationTable from "./components/ApplicationInfo";
import PurchaseTable from "./components/PurchaseInfo";
// import LossTable from "./components/LossInfo";
// import TransfersTable from "./components/TransfersInfo";
// import MeteringTeamTable from "./components/MeteringTeamInfo";
import ChangeStandingTable from "./components/ChangeStandingInfo";

// import ApplyTable from "./components/Apply";
// import LeaseTable from "./components/Lease";
import ContractPayTable from "./components/ContractPay";
export default {
  mixins: [confirm],
  components: {
    LeaveOaTable,
    CancelLeaveTable,
    BusinessTable,
    OvertimeTable,
    MovementTable,
    ContractTable,
    UseMoneyTable,
    SealTable,
    ShareTable,
    PartyTable,
    HardworkersTable,
    HelpStudyTable,
    SickCondolenceTable,
    CompensateTable,
    SchemeApprovalTable,
    DocumentsTable,
    // ApplicationTable,
    PurchaseTable,
    // LossTable,
    // TransfersTable,
    // MeteringTeamTable,
    // ApplyTable,
    // LeaseTable,
    ContractPayTable,
    ChangeStandingTable,
  },
  data() {
    return {
      titleArr: this.GLOBAL.titleArr,
      title: "",
      name: this.$route.query.name,
    };
  },
  async mounted() {
    this.name = this.$route.query.name;
    let ind = this.indexFun(this.name);
    this.title = this.titleArr[ind].name + "草稿箱";
  },
  methods: {
    indexFun(name) {
      let ind = this.titleArr.findIndex((item) => item.key == name);
      return ind;
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
