<template>
  <div class="w-100 h-100 table-list-wrap d-flex flex-column">
    <n-dialog ref="payDialog" :diaTit="'是否付款'" :diaWidth="'400px'">
      <template slot="diaSlot">
        <el-form ref="ruleform" class="el-form-box" :model="ruleform">
          <el-form-item class="form-item-long" label="是否付款：">
            <el-radio-group
              v-model="ruleform.ispay"
              class="el-radio-group-home vertical-top"
            >
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div class="d-flex justify-content-center">
          <n-button
            class="mt-1"
            :btnText="'确认提交'"
            :width="'150px'"
            :colorBtn="'blue'"
            @buttonClick="submitFun"
          ></n-button>
        </div>
      </template>
    </n-dialog>
    <!-- 打印 -->
    <div class="d-none">
      <div class="w-100" id="print">
        <h2 class="text-center font-24 py-2">
          {{ types == "OAContractApproval" ? "合同签订审批表" : title }}
        </h2>
        <!-- <leave-oa-print-info @changeTitle="changeTitle" v-if="types == 'OALeave'" :infoData="infoDataObj"/>
        <cancel-leave-info v-if="types == 'OALeaveCancel'" :infoData="infoDataObj"></cancel-leave-info> -->
        <purchase-print-info
          :isFilePrint="isFilePrint"
          v-if="types == 'OAPurchaseApproval'"
          :infoData="infoDataObj"
        />
        <contract-print-info
          :isFilePrint="isFilePrint"
          :reviseArr="process_list"
          v-if="types == 'OAContractApproval'"
          :infoData="infoDataObj"
        />
        <use-money-print-info
          :isFilePrint="isFilePrint"
          v-if="types == 'OAMoneyApproval'"
          :infoData="infoDataObj"
        />
        <seal-print-info
          :isFilePrint="isFilePrint"
          v-if="types == 'OAStampApproval'"
          :infoData="infoDataObj"
        />
        <transfers-print-info
          :isFilePrint="isFilePrint"
          v-if="types == 'OAAllocation'"
          :infoData="infoDataObj"
        />

        <approval-process
          v-if="types != 'OAContractApproval'"
          :reviseArr="process_list"
          :types="types"
        ></approval-process>
      </div>
    </div>
    <div class="rounded-1 bg-secondary d-flex justify-content-between">
      <nBackTop :title="title" :selfControl="true" @back="backFun" />
      <div class="d-flex">
        <!-- 打印按钮 -->
        <n-button
          class="position-relative"
          style="top: -8px"
          :btnText="'打印'"
          v-if="
            index > -1 &&
            (types == 'OAPurchaseApproval' ||
              types == 'OAContractApproval' ||
              types == 'OAMoneyApproval' ||
              types == 'OAStampApproval' ||
              types == 'OAAllocation' ||
              types == 'ProjectReportEngineeringMain' ||
              types == 'ProjectReportEngineeringPay' ||
              types == 'ChangeParameterParameter')
          "
          @buttonClick="printFuns()"
        ></n-button>
        <!-- 变更台账 -->
        <div v-if="types == 'ChangeParameterParameter'">
          <n-button
            v-if="infoDataObj.revise_info_state == 3"
            v-permission="['ChangeParameterParameter-query']"
            class="ml-2 position-relative"
            style="top: -8px"
            :btnText="'更新数据'"
            @buttonClick="
              $router.linkTo(
                'enterprise_engineering_changeStanding_list_update',
                { id: infoDataObj.revise_info_accessory_id }
              )
            "
          >
          </n-button>
        </div>
        <!----调拨申请------->
        <div v-if="types == 'OAAllocation'">
          <n-button
            class="ml-2 position-relative"
            style="top: -8px"
            v-if="infoDataObj.allocation_type == 2 && reviseState == 3"
            :btnText="'去调拨'"
            @buttonClick="linkTo('enterprise_material_device_late_allocating')"
          >
          </n-button>
        </div>
        <!-- 已通过的合同申请可以去发起用款申请 -->
        <div v-if="types == 'OAContractApproval'">
          <n-button
            class="ml-2 position-relative"
            style="top: -8px"
            v-if="
              infoDataObj.revise_info_state == 3 && infoDataObj.organ_type == 30
            "
            :btnText="'计量数据'"
            @buttonClick="
              $router.linkTo('enterprise_engineering_metering_team', {
                contract_id_un: infoDataObj.contract_approval_id,
                organ_id_union: infoDataObj.contract_approval_organ_id_union,
              })
            "
          >
          </n-button>
          <n-button
            class="ml-2 position-relative"
            style="top: -8px"
            v-if="
              infoDataObj.revise_info_state == 3 && infoDataObj.organ_type == 30
            "
            :btnText="'付款数据'"
            @buttonClick="
              $router.linkTo(
                'enterprise_engineering_metering_measurement_list',
                {
                  contract_id_un: infoDataObj.contract_approval_id,
                }
              )
            "
          >
          </n-button>
          <n-button
            class="ml-2 position-relative"
            style="top: -8px"
            v-if="isUseMoney > 0"
            :btnText="'用款申请记录'"
            :width="'160px'"
            @buttonClick="
              $router.linkTo('enterprise_oa_WithLoan', {
                contract_id: infoDataObj.contract_approval_id,
              })
            "
          ></n-button>
          <n-button
            v-if="infoDataObj.revise_info_state == 3"
            class="ml-2 position-relative"
            style="top: -8px"
            :btnText="'发起用款申请'"
            :width="'160px'"
            @buttonClick="
              $router.linkTo('enterprise_oa_workbench_apply', {
                contract_type: infoDataObj.contract_approval_type,
                contract_approval_id: infoDataObj.revise_info_accessory_id,
                t: 8,
              })
            "
          ></n-button>
          <n-button
            class="ml-2 position-relative"
            style="top: -8px"
            v-if="
              infoDataObj.oa_election_info &&
              infoDataObj.oa_election_info.election_title
            "
            :btnText="'比选结果查询'"
            :width="'160px'"
            :colorBtn="'blue'"
            @buttonClick="
              $router.linkTo('enterprise_oa_voted_info', {
                id: infoDataObj.contract_approval_election,
              })
            "
          ></n-button>
        </div>
        <!-- 用款申请详情如果是付款申请，且为物资或工程时要显示合同详情 -->
        <div
          v-if="types == 'OAMoneyApproval'"
          v-permission="['OAContractApproval-query']"
        >
          <n-button
            class="ml-2 position-relative"
            style="top: -8px"
            v-if="payIsShowBtn"
            :btnText="'付款'"
            :width="'160px'"
            :colorBtn="'blue'"
            @buttonClick="payFun"
          ></n-button>
          <n-button
            class="ml-2 position-relative"
            style="top: -8px"
            v-if="
              infoDataObj.money_approval_union_id &&
              infoDataObj.money_approval_type == 1 &&
              (infoDataObj.money_approval_belong == 2 ||
                infoDataObj.money_approval_belong == 3)
            "
            :btnText="'合同详情'"
            :width="'160px'"
            :colorBtn="'blue'"
            @buttonClick="contractInfoFun"
          ></n-button>
        </div>
      </div>
    </div>
    <n-dialog
      v-if="types == 'Loss'"
      ref="dialog"
      :diaTit="'审批信息详情'"
      :diaWidth="'33%'"
      class="stretch-dialog"
    >
      <template slot="diaSlot">
        <n-scroll>
          <nApprovalProcess
            style="width: 40%; min-width: 520px"
            class="ml-1"
            :reviseArr="process_list"
            :types="types"
          />
        </n-scroll>
      </template>
    </n-dialog>
    <div class="p-2 rounded-1 bg-white flex-fill">
      <n-scroll :native="false" class="h-100 form-box">
        <div class="rounded-1 h-100 mb-2">
          <div class="w-100 d-flex align-content-between h-100">
            <div class="info-box px-2 flex-fill">
              <leave-oa-info
                @changeTitle="changeTitle"
                ref="infos0"
                v-if="types == 'OALeave'"
              />
              <cancel-leave-info
                ref="infos1"
                v-if="types == 'OALeaveCancel'"
              ></cancel-leave-info>
              <!-- 出差申请 -->
              <business-info
                ref="infos2"
                v-if="types == 'OAEvection'"
              ></business-info>
              <!-- 加班申请 -->
              <overtime-info ref="infos3" v-if="types == 'OAOvertime'">
              </overtime-info>
              <!-- 人员调动 -->
              <movement-info ref="infos4" v-if="types == 'StaffMobilize'">
              </movement-info>
              <purchase-info
                ref="infos5"
                v-if="types == 'OAPurchaseApproval'"
              />
              <contract-info
                ref="infos6"
                v-if="types == 'OAContractApproval'"
              />
              <seal-info ref="infos7" v-if="types == 'OAStampApproval'" />
              <use-moneyInfo ref="infos8" v-if="types == 'OAMoneyApproval'" />
              <share-info ref="infos9" v-if="types == 'OAInvoiceShare'" />
              <!-- 入党申请 -->
              <party-info
                ref="infos10"
                v-if="types == 'UnionPartyPersonnelDevelop'"
              >
              </party-info>
              <!-- 困难职工 -->
              <hardworkers-info
                ref="infos11"
                v-if="types == 'UnionPartyHardWorker'"
              >
              </hardworkers-info>
              <!-- 金秋助学 -->
              <helpStudy-info
                ref="infos12"
                v-if="types == 'UnionPartySubsidyStudy'"
              >
              </helpStudy-info>
              <!-- 生病慰问 -->
              <sickCondolence-info
                ref="infos13"
                v-if="types == 'UnionPartySubsidySick'"
              >
              </sickCondolence-info>
              <!-- 补偿申请 -->
              <compensate-info
                ref="infos14"
                v-if="types == 'UnionPartySubsidyCompensate'"
              >
              </compensate-info>
              <!-- 方案审批 -->
              <schemeApproval-info ref="infos15" v-if="types == 'OAScheme'">
              </schemeApproval-info>
              <!-- 内部文件 -->
              <documents-info
                ref="infos16"
                v-if="types == 'OAInternalDocument'"
              >
              </documents-info>
              <application-info ref="infos17" v-if="types == 'Applyment'" />
              <transfers-Info ref="infos18" v-if="types == 'OAAllocation'" />

              <loss-info ref="infos19" v-if="types == 'Loss'" @show="show" />
              <apply-info ref="infos20" v-if="types == 'Apply'" />
              <lease-info ref="infos21" v-if="types == 'Lease'" />
              <!-- 合同计量 -->
              <contract-pay
                ref="infos23"
                v-if="types == 'ProjectReportEngineeringPay'"
              />
              <!-- 合同付款 -->
              <metering-team-info
                ref="infos24"
                v-if="types == 'ProjectReportEngineeringMain'"
                :infoData="infoDataObj"
              />
              <!-- 变更台账 -->
              <change-standing-info
                ref="infos25"
                v-if="types == 'ChangeParameterParameter'"
                :infoData="infoDataObj"
              />
            </div>
            <nApprovalProcess
              :title="
                types == 'OALeaveCancel' || types == 'OALeave' ? '请假' : ''
              "
              v-if="
                !isDraft &&
                types != 'Loss' &&
                types != 'ProjectReportEngineeringMain' &&
                types != 'ProjectReportEngineeringPay' &&
                types != 'ChangeParameterParameter'
              "
              style="width: 40%; min-width: 520px"
              class="ml-1"
              :reviseArr="process_list"
              :types="types"
            />
          </div>
        </div>
      </n-scroll>
    </div>
    <div
      class="d-flex justify-content-end mb-08"
      v-if="
        infoDataObj.revise_account_review_account_ids &&
        infoDataObj.revise_account_review_account_ids
          .split(',')
          .indexOf(String($store.getters.account_id)) != -1 &&
        infoDataObj.revise_info_state == 2
      "
    >
      <n-button
        class="mt-1"
        :btnText="'抄送'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="linkTo('enterprise_oa_workbench_copy')"
      ></n-button>
      <n-button
        class="mt-1 ml-2"
        :btnText="'审批'"
        :width="'150px'"
        :colorBtn="'blue'"
        @buttonClick="linkTo('enterprise_oa_workbench_approval')"
      ></n-button>
    </div>
  </div>
</template>

<script>
import api from "@/api/index";
import table from "@/mixins/table";
import confirm from "@/mixins/confirm";

import LeaveOaInfo from "./components/LeaveOaInfo";
import CancelLeaveInfo from "./components/CancelLeaveInfo";
import BusinessInfo from "./components/BusinessInfo";
import OvertimeInfo from "./components/OvertimeInfo";
import MovementInfo from "./components/MovementInfo";
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
import ApplicationInfo from "./components/ApplicationInfo";
import PurchaseInfo from "./components/PurchaseInfo";
import LossInfo from "./components/LossInfo";
import TransfersInfo from "./components/TransfersInfo";
import MeteringTeamInfo from "./components/MeteringTeamInfo";
import ChangeStandingInfo from "./components/ChangeStandingInfo";

import ApplyInfo from "./components/Apply";
import LeaseInfo from "./components/Lease";
import ContractPay from "./components/ContractPay";

// 打印详情
import ContractPrintInfo from "./components/printComponents/ContractInfo";
import UseMoneyPrintInfo from "./components/printComponents/UseMoneyInfo";
import SealPrintInfo from "./components/printComponents/SealInfo";
import SharePrintInfo from "./components/printComponents/ShareInfo";
import PurchasePrintInfo from "./components/printComponents/PurchaseInfo";
import TransfersPrintInfo from "./components/printComponents/TransfersInfo";
// 审批详情
import ApprovalProcess from "./components/printComponents/components/ApprovalProcess";
import print from "@/plugins/print/printarea";

export default {
  components: {
    LeaveOaInfo,
    CancelLeaveInfo,
    BusinessInfo,
    OvertimeInfo,
    MovementInfo,
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
    ApplicationInfo,
    PurchaseInfo,
    LossInfo,
    TransfersInfo,
    MeteringTeamInfo,
    ApplyInfo,
    LeaseInfo,
    ContractPay,
    ChangeStandingInfo,

    // 打印详情
    ContractPrintInfo,
    UseMoneyPrintInfo,
    SealPrintInfo,
    SharePrintInfo,
    PurchasePrintInfo,
    TransfersPrintInfo,
    ApprovalProcess,
  },
  mixins: [confirm],
  data() {
    return {
      // postURL: "queryApproveReviseRecord",
      titleArr: this.GLOBAL.titleArr,
      title: "",
      type: Number(this.$route.query.t), //1:待办;2:已办;3:待阅;4:申请
      types: this.$route.query.types, //9大类型
      index: -1, //当前类型的索引
      id:
        this.$route.query.id &&
        parseInt(this.Base64.decode(this.$route.query.id)), //主表id
      process_list: [], //审批流程数组
      //调拨相关//
      isUseMoney: 0, //合同申请是否关联了用款申请
      reviseState: this.$route.query.reviseState, //调拨申请的审批状态
      listLength: "", //列表项数量
      isUseMoneyLink: false, //是否是从用款申请详情进入合同详情的
      infoDataObj: {}, //数据详情
      isFilePrint: false, //是否打印附件
      ruleform: {}, //是否付款表单
      payIsShowBtn: false, //是否显示付款
      isDraft: this.$route.query.isDraft, //是否是草稿箱点击进入详情
    };
  },
  async mounted() {
    this.index = this.titleArr.findIndex((item) => item.key == this.types);
    this.title =
      this.titleArr[this.index].name + (this.isDraft ? "草稿箱" : "") + "详情";
    // 查询详情
    await this.queryInfo();
    if (
      !this.isDraft &&
      this.types != "Loss" &&
      this.types != "ProjectReportEngineeringMain" &&
      this.types != "ProjectReportEngineeringPay"
    ) {
      // 查询审批流程
      this.queryApproveReviseRecordWithProcess();
    }
  },
  methods: {
    async payIsShow() {
      // 查询当前登录人是否是设置的付款人
      let { result } = await api.QueryOAMoneyApprovalCanPay({});
      return (this.payIsShowBtn = result[0].can_pay >= 1 ? true : false);
    },
    // 点击顶部返回按钮
    backFun() {
      if (this.isUseMoneyLink) {
        //表示是从用款申请进入的合同详情，返回的时候需要又回到合同详情
        this.types = "OAMoneyApproval";
        this.index = 8;
        this.id = this.moneyCopyMoneyId;
        this.title = "用款申请详情";
        this.isUseMoneyLink = false;
        this.$nextTick(async () => {
          // 查询详情
          await this.queryInfo();
          // 查询审批流程
          this.queryApproveReviseRecordWithProcess();
        });
      } else {
        this.$router.go(-1);
      }
    },
    // 审批通过未付款点击付款
    payFun() {
      this.$refs.payDialog.show();
    },
    // 是否付款表单提交
    submitFun() {
      if (!this.ruleform.ispay) {
        this.$tip({
          isTip: true,
          message: "请选择是否付款!",
        });
        return;
      }
      if (this.ruleform.ispay == 1) {
        //已付款
        this.submitAllData();
      } else {
        this.$refs.payDialog.cancel();
      }
    },
    async submitAllData() {
      await api.UpdateOAMoneyApprovalPayState({
        money_approval_id: this.infoDataObj.money_approval_id,
      });
      this.$tip({
        isTip: false,
        closeTime: 1000,
        func: () => {
          this.payIsShowBtn = false;
          this.$refs.payDialog.cancel();
        },
      });
    },
    // 点击查看合同详情
    async contractInfoFun() {
      this.types = "OAContractApproval";
      this.index = 6;
      this.id = this.infoDataObj.money_approval_union_id;
      this.title = "合同申请详情";
      this.isUseMoneyLink = true;
      this.moneyCopyMoneyId = this.infoDataObj.money_approval_id;
      this.$nextTick(async () => {
        // 查询详情
        await this.queryInfo();
        // 查询审批流程
        this.queryApproveReviseRecordWithProcess();
      });
    },
    // 调拨申请点击去审批/抄送跳转
    linkTos(name) {
      this.$router.linkTo(name, {
        t: 1,
        types: "OAAllocation",
        id: this.infoDataObj.allocation_revise_info_id_un,
      });
    },
    show() {
      this.$refs.dialog.show();
    },
    changeTitle(name) {
      this.title = name;
    },
    async queryApproveReviseRecordWithProcess() {
      let vnode = this.$refs["infos" + this.index];
      let revise_info_id = vnode.infoData.revise_info_id;
      let res = await api.queryApproveReviseRecordWithProcess({
        revise_info_id: revise_info_id,
      });
      this.process_list = res.result;
    },
    //   查询详情
    async queryInfo() {
      let vnode = this.$refs["infos" + this.index];
      if (this.isDraft) {
        //草稿箱进入的
        await this.QueryDraft();
      } else {
        await vnode.infoFun(this.id);
      }
      this.infoDataObj = vnode.infoData;
      if (this.index == 18) {
        this.listLength = this.infoDataObj.details_list.length;
      } else if (this.index == 6) {
        //合同详情
        this.isUseMoney = vnode.isUseMoney; //合同申请是否关联了用款申请
      } else if (this.index == 8) {
        //用款申请,若通过审批,且还未付款,则去查询登录者是否为付款人
        if (
          this.infoDataObj.revise_info_state == 3 &&
          this.infoDataObj.money_approval_state == 2
        ) {
          this.payIsShow();
        }
      }
    },
    async QueryDraft() {
      let { result } = await api.QueryDraft({ draft_id: this.id });
      let draft_content = JSON.parse(result[0].draft_content);
      this.$refs["infos" + this.index].infoDraftFun(draft_content);
    },
    linkTo(name) {
      let vnode = this.$refs["infos" + this.index];
      let revise_info_id = vnode.infoData.revise_info_id;
      this.$router.linkTo(name, {
        types: this.types,
        id: revise_info_id,
        t: this.type,
      });
    },
    // 打印功能
    printFuns() {
      // 合同付款和合同计量的打印单独在组件里面操作
      if (
        this.types == "ProjectReportEngineeringMain" ||
        this.types == "ProjectReportEngineeringPay" ||
        this.types == "ChangeParameterParameter"
      ) {
        this.$refs["infos" + this.index].printFuns();
      } else {
        if (
          !(
            (this.infoDataObj.pics_list &&
              this.infoDataObj.pics_list.length > 0) ||
            (this.infoDataObj.pic_list &&
              this.infoDataObj.pic_list.length > 0) ||
            (this.infoDataObj.files_list &&
              this.infoDataObj.files_list.length > 0) ||
            (this.infoDataObj.file_list &&
              this.infoDataObj.file_list.length > 0)
          ) ||
          this.types == "OAContractApproval"
        ) {
          new print({
            ids: "print", // * 局部打印必传入id
            standard: "", // 文档类型，默认是html5，可选 html5，loose，strict
            extraHead: "", // 附加在head标签上的额外标签,使用逗号分隔
            extraCss: "", // 额外的css连接，多个逗号分开
            popTitle: "", // title的标题
            endCallback() {},
          });
          return;
        }
        this.confirm("", "", "是否打印附件？")
          .then(() => {
            this.isFilePrint = true;
            this.$nextTick(() => {
              new print({
                ids: "print", // * 局部打印必传入id
                standard: "", // 文档类型，默认是html5，可选 html5，loose，strict
                extraHead: "", // 附加在head标签上的额外标签,使用逗号分隔
                extraCss: "", // 额外的css连接，多个逗号分开
                popTitle: "", // title的标题
                endCallback() {},
              });
            });
          })
          .catch((error) => {
            this.isFilePrint = false;
            this.$nextTick(() => {
              new print({
                ids: "print", // * 局部打印必传入id
                standard: "", // 文档类型，默认是html5，可选 html5，loose，strict
                extraHead: "", // 附加在head标签上的额外标签,使用逗号分隔
                extraCss: "", // 额外的css连接，多个逗号分开
                popTitle: "", // title的标题
                endCallback() {},
              });
            });
          });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.progress-div {
  display: inline-block;
  padding: 8px 35px;
  background-color: white;
  box-shadow: 0 1px 8px $color-2;
  border-radius: 25px;
  img {
    width: 25px;
    margin-right: 10px;
  }
}
.start {
  color: #01c970;
}
.middle {
  color: $color-1;
}
.end {
  color: $pink2;
}
.progress-arrow {
  width: 15px;
}
</style>
