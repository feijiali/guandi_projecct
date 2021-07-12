import store from "@/store";
//浏览器类型及版本
function getBrowserInfo() {
  var agent = navigator.userAgent.toLowerCase();
  var regStr_ie = /msie [\d.]+;/gi;
  var regStr_ff = /firefox\/[\d.]+/gi;
  var regStr_chrome = /chrome\/[\d.]+/gi;
  var regStr_saf = /safari\/[\d.]+/gi;
  var regStr_edge = /edge\/[\d.]+/gi;
  var isIE = agent.indexOf("compatible") > -1 && agent.indexOf("msie" > -1); //判断是否IE<11浏览器
  var isEdge = agent.indexOf("edge") > -1 && !isIE; //判断是否IE的Edge浏览器
  var isIE11 = agent.indexOf("trident") > -1 && agent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("msie (\\d+\\.\\d+);");
    reIE.test(agent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return "IE/7";
    } else if (fIEVersion == 8) {
      return "IE/8";
    } else if (fIEVersion == 9) {
      return "IE/9";
    } else if (fIEVersion == 10) {
      return "IE/10";
    }
  } //isIE end
  if (isIE11) {
    return "IE/11";
  }
  if (agent.indexOf("edge") > 0) {
    return agent.match(regStr_edge);
  }
  //firefox
  if (agent.indexOf("firefox") > 0) {
    return agent.match(regStr_ff);
  }
  //Safari
  if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
    return agent.match(regStr_saf);
  }
  //Chrome
  if (agent.indexOf("chrome") > 0) {
    return agent.match(regStr_chrome);
  }
}
// 获取浏览器信息
var browser = getBrowserInfo(); //取到完整信息
var b_name = (browser + "").replace(/[0-9./]/gi, ""); //根据正则将所有数字、‘.’‘/’全部去掉，剩下浏览器名
var b_version = parseInt((browser + "").replace(/[^0-9.]/gi, "")); //根据正则将所有非数字全部去掉，剩下版本

const browserInfo = b_name + "_" + b_version;
const storageKey = "FAPZ_";

const APP_MODEL = {
  guandi: "https://build.cninct.com/GUANDI",
  guandi_dev: "https://dev.cninct.com/GUANDI_DEV",
  mixin_dev: "https://dev.cninct.com/STD2021_DEV",
  mixin: "https://build.cninct.com/STD2021_DEV",
  pmai_dev: "https://dev.cninct.com/PMAI_DEV",
  pmai: "https://build.cninct.com/PMAI",
};
const baseurl = APP_MODEL[process.env.VUE_APP_MODE];
// process.env.VUE_APP_MODE? global.baseurl_pro: GLOBAL.baseurl
// 劳务实名制的servicekey
const serviceKey = 94;
// 考勤状态图标
const attendStatusImg = [
  "",
  require("../assets/images/enterprise/icon_table_attendant.png"),
  require("../assets/images/enterprise/icon_table_absenteeism.png"),
];

// 考勤状态图标
const attendStatusImg2 = [
  require("../assets/images/enterprise/icon_table_absenteeism.png"),//未打卡
  require("../assets/images/enterprise/icon_table_attendant.png"),//已打卡
  require("../assets/images/enterprise/icon_table_leave.png"),//请假
  require("../assets/images/enterprise/icon_table_chidao.png"),//迟到
  require("../assets/images/enterprise/icon_table_zaotui.png"),//早退
  require("../assets/images/enterprise/icon_table_abnormal.png"),//异常
  require("../assets/images/enterprise/icon_table_notattendant.png"),//旷工
];
// 组织机构类型定义
let organTypeArrs = [
  {
    type: 10,
    name: "集团",
  },
  {
    type: 20,
    name: "公司",
  },
  {
    type: 30,
    name: "项目",
  },
  // {
  //   type: 40,
  //   name: "所属项目",
  // },
  {
    type: 50,
    name: "工区",
  },
  {
    type: 60,
    name: "部门",
  },
  // {
  //   type: 61,
  //   name: "管理部门",
  // },
  // {
  //   type: 70,
  //   name: "班组",
  // },
];
// 机构类型
let organTypeArr1 = [
  {
    type: 20,
    name: "公司",
  },
  {
    type: 30,
    name: "项目",
  },
  {
    type: 60,
    name: "部门",
  },
  // {
  //   type: 61,
  //   name: "管理部门",
  // },
],
  organTypeArr2 = [
    {
      type: 30,
      name: "项目",
    },
    // {
    //   type: 40,
    //   name: "所属项目",
    // },
    {
      type: 60,
      name: "部门",
    },
    // {
    //   type: 61,
    //   name: "管理部门",
    // },
  ],
  organTypeArr3 = [
    // {
    //   type: 40,
    //   name: "所属项目",
    // },
    {
      type: 50,
      name: "工区",
    },
    {
      type: 60,
      name: "部门",
    },
    // {
    //   type: 61,
    //   name: "管理部门",
    // },
  ],
  organTypeArr4 = [
    {
      type: 30,
      name: "项目",
    },
  ],
  organTypeArr5 = [
    {
      type: 50,
      name: "工区",
    },
    {
      type: 60,
      name: "部门",
    },
    // {
    //   type: 61,
    //   name: "管理部门",
    // },
  ],
  organTypeArr6 = [
    {
      type: 60,
      name: "部门",
    },
  ],
  organTypeArr7 = [];
let organTypeArr = {
  "10": organTypeArr1,
  "20": organTypeArr2,
  "30": organTypeArr3,
  "61": organTypeArr4,
  "40": organTypeArr5,
  "50": organTypeArr6,
  "60": organTypeArr7,
};
let titleArr = [
  // { name: "", key: "" },
  { name: "请假申请", key: "OALeave" },
  { name: "销假申请", key: "OALeaveCancel" },

  { name: "出差申请", key: "OAEvection" },
  { name: "加班申请", key: "OAOvertime" },
  { name: "人员调动", key: "StaffMobilize" },

  { name: "采购申请", key: "OAPurchaseApproval" },
  { name: "合同申请", key: "OAContractApproval" },
  { name: "用章申请", key: "OAStampApproval" },
  { name: "用款申请", key: "OAMoneyApproval" },
  { name: "发票共享", key: "OAInvoiceShare" },

  { name: "入党申请", key: "UnionPartyPersonnelDevelop" },
  { name: "困难职工", key: "UnionPartyHardWorker" },
  { name: "金秋助学", key: "UnionPartySubsidyStudy" },
  { name: "生病慰问", key: "UnionPartySubsidySick" },
  { name: "补偿申请", key: "UnionPartySubsidyCompensate" },
  { name: "方案审批", key: "OAScheme" },
  { name: "内部文件", key: "OAInternalDocument" },
  // { name: "投票比选", key: "OaElectionElection" },
  { name: "申购单", key: "Applyment" },
  // { name: "采购合同", key: "PurchaseContract" },
  { name: "调拨申请", key: "OAAllocation" },
  { name: "报损单", key: "Loss" },
  { name: "购置单", key: "Apply" },
  { name: "租赁单", key: "Lease" },
  { name: "发文", key: "ReceiveReceiveFile" },
  { name: "合同付款", key: "ProjectReportEngineeringPay" },
  { name: "合同计量", key: "ProjectReportEngineeringMain" },
  { name: "变更台账", key: "ChangeParameterParameter" },
  { name: "变更台账", key: "ChangeParameterParameter" },
  { name: "材料损耗", key: "MaterialResourcesMaterialLoss" },
  { name: "材料用量", key: "MaterialResourcesMaterialUse" },
  { name: "施工材料", key: "MaterialResourcesConstruction" },
  { name: "材料动态", key: "MaterialResourcesMaterialLoss" },
  { name: "材料收发存", key: "MaterialStandingBook" },
  // { name: "小型机具", key: "MaterialResourcesMaterialLoss" },
  // { name: "设备费用", key: "MaterialResourcesMaterialLoss" },
  // { name: "费用汇总", key: "MaterialMoneyStandingBook" },
];

// oa模块所有的审批类型
let applyArrChoose = [
  { name: "人员请假", key: "OALeave" },
  { name: "人员销假", key: "OALeaveCancel" },
  { name: "出差申请", key: "OAEvection" },
  { name: "加班申请", key: "OAOvertime" },
  { name: "人员调动", key: "StaffMobilize" },
  { name: "采购申请", key: "OAPurchaseApproval" },
  // { name: "申购单", key: "Applyment" },
  { name: "合同申请", key: "OAContractApproval" },
  { name: "用章申请", key: "OAStampApproval" },
  { name: "用款申请", key: "OAMoneyApproval" },
  // { name: "投票比选", key: "OaElectionElection" },
  { name: "共享发票", key: "OAInvoiceShare" },
  { name: "入党申请", key: "UnionPartyPersonnelDevelop" },
  { name: "困难职工", key: "UnionPartyHardWorker" },
  { name: "金秋助学", key: "UnionPartySubsidyStudy" },
  { name: "生病慰问", key: "UnionPartySubsidySick" },
  { name: "补偿申请", key: "UnionPartySubsidyCompensate" },
  { name: "方案审批", key: "OAScheme" },
  { name: "内部文件", key: "OAInternalDocument" },
  // { name: "调拨申请", key: "OAAllocation" },
  // { name: "报损单", key: "Loss" },
  // { name: "购置单", key: "Apply" },
  // { name: "租赁单", key: "Lease" },
  { name: "发文", key: "ReceiveReceiveFile" },
  { name: "合同付款", key: "ProjectReportEngineeringPay" },
  { name: "合同计量", key: "ProjectReportEngineeringMain" },
  { name: "变更台账", key: "ChangeParameterParameter" },
  { name: "材料损耗", key: "MaterialResourcesMaterialLoss" },
  { name: "材料用量", key: "MaterialResourcesMaterialUse" },
  { name: "施工材料", key: "MaterialResourcesConstruction" },
  { name: "材料动态", key: "MaterialResourcesMaterialLoss" },
  { name: "材料收发存", key: "MaterialStandingBook" },
  // { name: "小型机具", key: "MaterialResourcesMaterialLoss" },
  // { name: "设备费用", key: "MaterialResourcesMaterialLoss" },
  // { name: "费用汇总", key: "MaterialMoneyStandingBook" },
];

let applyArr = [
  {
    name: "请假申请",
    linkName: "enterprise_oa_account_attendance_leave",
    type: 1,
    permission: "OALeave",
    src: require("@/assets/images/guandi/btn_menu_apply.png"),
  },
  {
    name: "出差申请",
    linkName: "enterprise_oa_business",
    type: 2,
    permission: "OAEvection",
    src: require("@/assets/images/guandi/btn_menu_business.png"),
  },
  {
    name: "加班申请",
    linkName: "enterprise_oa_overtime",
    type: 3,
    permission: "OAOvertime",
    src: require("@/assets/images/guandi/btn_menu_evaluation.png"),
  },
  {
    name: "人员调动",
    linkName: "enterprise_oa_movement",
    type: 4,
    permission: "StaffMobilize",
    src: require("@/assets/images/guandi/btn_menu_transfer.png"),
  },
  {
    name: "采购申请",
    linkName: "enterprise_oa_purchasing",
    permission: "OAPurchaseApproval",
    type: 5,
    src: require("@/assets/images/guandi/btn_menu_purchase.png"),
  },
  {
    name: "合同申请",
    linkName: "enterprise_oa_contract",
    permission: "OAContractApproval",
    type: 6,
    src: require("@/assets/images/guandi/btn_menu_agreement.png"),
  },

  {
    name: "用章申请",
    linkName: "enterprise_oa_Seal",
    permission: "OAStampApproval",
    type: 7,
    src: require("@/assets/images/guandi/btn_menu_seal.png"),
  },
  {
    name: "用款申请",
    linkName: "enterprise_oa_WithLoan",
    permission: "OAMoneyApproval",
    type: 8,
    src: require("@/assets/images/guandi/btn_menu_compensation.png"),
  },
  {
    name: "发票共享",
    linkName: "enterprise_oa_invoice",
    permission: "OAInvoiceShare",
    type: 9,
    src: require("@/assets/images/guandi/btn_menu_invoice.png"),
  },
  {
    name: "入党申请",
    linkName: "enterprise_oa_party",
    permission: "UnionPartyPersonnelDevelop",
    type: 10,
    src: require("@/assets/images/guandi/btn_menu_party.png"),
  },
  {
    name: "困难职工",
    linkName: "enterprise_oa_hardworkers",
    permission: "UnionPartyHardWorker",
    type: 11,
    src: require("@/assets/images/guandi/btn_menu_poor.png"),
  },
  {
    name: "金秋助学",
    linkName: "enterprise_oa_helpStudy",
    permission: "UnionPartySubsidyStudy",
    type: 12,
    src: require("@/assets/images/guandi/btn_menu_study.png"),
  },
  {
    name: "生病慰问",
    linkName: "enterprise_oa_sickCondolence",
    permission: "UnionPartySubsidySick",
    type: 13,
    src: require("@/assets/images/guandi/btn_menu_hospital.png"),
  },
  {
    name: "补偿申请",
    linkName: "enterprise_oa_compensate",
    permission: "UnionPartySubsidyCompensate",
    type: 14,
    src: require("@/assets/images/guandi/btn_menu_compensate.png"),
  },
  {
    name: "方案审批",
    linkName: "enterprise_oa_schemeApproval",
    type: 15,
    permission: "OAScheme",
    src: require("@/assets/images/guandi/btn_menu_solved.png"),
  },
  {
    name: "内部文件",
    linkName: "enterprise_oa_documents",
    type: 16,
    permission: "OAInternalDocument",
    src: require("@/assets/images/guandi/btn_menu_folder.png"),
  },
  {
    name: "发起计量",
    linkName: "enterprise_engineering_contract_list",
    permission: "ProjectInfoContract",
    type: 17,
    src: require("@/assets/images/guandi/btn_menu_tabulation.png"),
  },
  {
    name: "合同付款",
    linkName: "enterprise_engineering_metering_dynamic",
    permission: "ProjectReportEngineeringPay",
    type: 18,
    src: require("@/assets/images/guandi/btn_menu_compensation.png"),
  },
  {
    name: "变更申请",
    linkName: "enterprise_engineering_changeStanding_list",
    permission: "ChangeParameterParameter",
    type: 19,
    src: require("@/assets/images/guandi/btn_menu_change.png"),
  },

  {
    name: "材料损耗",
    linkName: "enterprise_material2_material_wastage",
    permission: "ChangeParameterParameter",
    type: 20,
    src: require("@/assets/images/guandi/btn_menu_change.png"),
  },
  {
    name: "材料用量",
    linkName: "enterprise_material2_material_consumption",
    permission: "ChangeParameterParameter",
    type: 21,
    src: require("@/assets/images/guandi/btn_menu_change.png"),
  },
  {
    name: "施工材料",
    linkName: "enterprise_material2_material_dailyConstruction",
    permission: "ChangeParameterParameter",
    type: 22,
    src: require("@/assets/images/guandi/btn_menu_change.png"),
  },
  {
    name: "材料动态",
    linkName: "enterprise_material2_material_trendsOfRevolving",
    permission: "ChangeParameterParameter",
    type: 23,
    src: require("@/assets/images/guandi/btn_menu_change.png"),
  },
  {
    name: "材料收发存",
    linkName: "enterprise_material2_material_receivingStorage",
    permission: "ChangeParameterParameter",
    type: 24,
    src: require("@/assets/images/guandi/btn_menu_change.png"),
  },
  {
    name: "小型机具",
    linkName: "enterprise_engineering_changeStanding_list",
    permission: "ChangeParameterParameter",
    type: 25,
    src: require("@/assets/images/guandi/btn_menu_change.png"),
  },
  {
    name: "设备费用",
    linkName: "enterprise_engineering_changeStanding_list",
    permission: "ChangeParameterParameter",
    type: 26,
    src: require("@/assets/images/guandi/btn_menu_change.png"),
  },
  {
    name: "费用汇总",
    linkName: "enterprise_engineering_changeStanding_list",
    permission: "ChangeParameterParameter",
    type: 27,
    src: require("@/assets/images/guandi/btn_menu_change.png"),
  },
];
// 审批状态
const colorArr = ["", "#FF8F2A", "#FF8F2A", "#3377FF", "#FD5672", "#8e95a7"];
const backgroundColorArr = ["", "#FFF4DE", "#FFF4DE", "#DEE9FF", "#FFE4E4", "#E9E8EF"];
const reviseStateArr = ["", "待审批", "正在审批", "已通过", "未通过", "已撤销", "审批禁用"];
// 审批结果(revise_record_state):
const colorArr2 = [
  "",
  "#FF8F2A",
  "#FF8F2A",
  "#8e95a7",
  "#3377FF",
  "#3377FF",
  "#FD5672",
  "#FF8F2A",
  "#3FDE34",
  "#FD5672",
  "#8e95a7",
  "#FF8F2A",
  "#fd5571",
  "#fd5571",
];
const backgroundColorArr2 = [
  "",
  "#FFF4DE",
  "#FFF4DE",
  "#E9E8EF",
  "#DEE9FF",
  "#DEE9FF",
  "#FFE4E4",
  "#FFF4DE",
  "#E4FBD8",
  "#FFE4E4",
  "#DEE9FF",
  "#E4FBD8",
  "#E4FBD8",
  "#E4FBD8",
];
const revise_record_state_arr = [
  "",
  "发起流程",
  "编辑申请",
  "已撤销",
  "通过", //（流程未结束）
  "通过", //（流程结束）
  "未通过",
  "抄送",
  "委托",
  "公示",
  "公示",
  "部分同意", //（流程未结束）
  "部分同意", //（流程结束）
  "部分拒绝", //（流程未结束）
  "部分拒绝", //（流程结束）
];
export default {
  browserInfo,
  storageKey,
  baseurl,
  organTypeArrs,
  organTypeArr,
  titleArr,
  applyArrChoose,
  applyArr,
  // loadFinish,
  // isChooselocation,
  // gameInstance,
  // teamsArr,
  // organTypeArr,
  // titleArr,
  colorArr,
  backgroundColorArr,
  reviseStateArr,
  colorArr2,
  backgroundColorArr2,
  revise_record_state_arr,
  // eleWithoutbg-white: eleWithoutbg-white,
  // amapUrl,
  serviceKey,
  attendStatusImg,
  attendStatusImg2,
  // mapEquipIcon,
};
