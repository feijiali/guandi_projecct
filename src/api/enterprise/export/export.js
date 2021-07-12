import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 所有的导出
export default {
  // 导出人员请假
  exportOALeave(data) {
    return postRequest(baseUrl + "ExportOALeave", data);
  },
  // 导出部门考核表
  exportFilesStaffPunchAttendance(data) {
    return postRequest(baseUrl + "ExportFilesStaffPunchAttendance", data);
  },
  // 导出人员
  exportAccount(data) {
    return postRequest(baseUrl + "ExportAccount", data);
  },
  // 导出人员异动
  exportFilesStaffPunchChanges(data) {
    return postRequest(baseUrl + "ExportFilesStaffPunchChanges", data);
  },
  // 导出人员调动
  exportFilesStaffMobilize(data) {
    return postRequest(baseUrl + "ExportFilesStaffMobilize", data);
  },
  // 导出部门考核表
  exportFilesPerformanceBasic(data) {
    return postRequest(baseUrl + "ExportFilesPerformanceBasic", data);
  },
  
  // 导出个人考核表
  exportFilesPerformanceAssessor(data) {
    return postRequest(baseUrl + "ExportFilesPerformanceAssessor", data);
  },
  // 导出党建管理
  exportUnionPartyFactionManage(data) {
    return postRequest(baseUrl + "ExportUnionPartyFactionManage", data);
  },
  // 导出入党审批
  exportUnionPartyPersonnelDevelop(data) {
    return postRequest(baseUrl + "ExportUnionPartyPersonnelDevelop", data);
  },
  // 导出困难职工
  exportUnionPartyHardWorker(data) {
    return postRequest(baseUrl + "ExportUnionPartyHardWorker", data);
  },
  // 导出困难职工
  exportUnionPartySubsidy(data) {
    return postRequest(baseUrl + "ExportUnionPartySubsidy", data);
  },

  // 组织架构
  exportOrganizationOrgan(data) {
    return postRequest(baseUrl + "ExportOrganizationOrgan", data);
  },
  // 导出监控量测
  exportSafeMonitorMeasure(data) {
    return postRequest(baseUrl + "ExportSafeMonitorMeasure", data);
  },
  // 导出工程管理-计划进度
  exportProjectInfoPlanSchedule(data) {
    return postRequest(baseUrl + "ExportProjectInfoPlanSchedule", data);
  },
  // 导出工程管理-计划进度
  exportOAManageOA(data) {
    return postRequest(baseUrl + "ExportOAManageOA", data);
  },
  // 安全模块导出
  // 导出班前教育
  exportSafeEducation(data) {
    return postRequest(baseUrl + "ExportSafeEducation", data);
  },
  // 导出日常巡检
  exportSafeDailyInspection(data) {
    return postRequest(baseUrl + "ExportSafeDailyInspection", data);
  },

  // 导出岗前培训
  exportSafePreTrain(data) {
    return postRequest(baseUrl + "ExportSafePreTrain", data);
  },
  // 导出安全整改()
  exportSafeRectify(data) {
    return postRequest(baseUrl + "ExportSafeRectify", data);
  },
  // 导出全演练
  exportSafeDrill(data) {
    return postRequest(baseUrl + "ExportSafeDrill", data);
  },

  // 导出安全年度计划()
  exportSafeAnnualPlan(data) {
    return postRequest(baseUrl + "ExportSafeAnnualPlan", data);
  },
  // 导出安全工作联系单()
  exportSafeWorkContact(data) {
    return postRequest(baseUrl + "ExportSafeWorkContact", data);
  },
  // 导出安全整改通知单()
  exportSafeRectifyNotice(data) {
    return postRequest(baseUrl + "ExportSafeRectifyNotice", data);
  },
  // 导出安全监控量测()
  exportSafeMonitorMeasure(data) {
    return postRequest(baseUrl + "ExportSafeMonitorMeasure", data);
  },


  // 导出OA
  exportOAManageOA(data) {
    return postRequest(baseUrl + 'ExportOAManageOA', data);
  },
  // 导出质量管理
  exportProjectInfoQuality(data) {
    return postRequest(baseUrl + 'ExportProjectInfoQuality', data);
  },
  // 导出合同管理
  exportProjectInfoContract(data) {
    return postRequest(baseUrl + 'ExportProjectInfoContract', data);
  },
  // 导出合同管理-统计
  exportProjectInfoContractGroup(data) {
    return postRequest(baseUrl + 'ExportProjectInfoContractGroup', data);
  },
  // 导出技术管理
  exportProjectInfoTechnology(data) {
    return postRequest(baseUrl + 'ExportProjectInfoTechnology', data);
  },


  //--------------------------------材料模块----------------------------------------
  // 导出材料管理-材料进场()
  exportMaterialManagementApproach(data) {
    return postRequest(baseUrl + 'ExportMaterialManagementApproach', data);
  },
  // 导出材料管理-库存统计()
  exportMaterialManagementInventoryStatistics(data) {
    return postRequest(baseUrl + 'ExportMaterialManagementInventoryStatistics', data);
  },
  // 导出材料管理-出库台账()
  exportMaterialManagementOutbound(data) {
    return postRequest(baseUrl + 'ExportMaterialManagementOutbound', data);
  },
  // 衬砌材料导出()
  exportMaterialManagementLining(data) {
    return postRequest(baseUrl + 'ExportMaterialManagementLining', data);
  },
  // 导入衬砌材料()
  importMaterialManagementLining(data) {
    return postRequest(baseUrl + 'ImportMaterialManagementLining', data);
  },
  // 导入衬砌材料每榀()
  importMaterialManagementSubLiningTrusses(data) {
    return postRequest(baseUrl + 'ImportMaterialManagementSubLiningTrusses', data);
  },
  // 导入衬砌材料每延米()
  importMaterialManagementSubLiningMater(data) {
    return postRequest(baseUrl + 'ImportMaterialManagementSubLiningMater', data);
  },


  // ---------------------------技术交底------------------------------
  exportProjectInfoTechConfess(data) {
    return postRequest(baseUrl + 'ExportProjectInfoTechConfess', data);
  },

  // 导出项目信息()
  exportProjectInfoProject(data) {
    return postRequest(baseUrl + 'ExportProjectInfoProject', data);
  },

  // 导入衬砌
  importTunnelLining(data) {
    return postRequest(baseUrl + 'ImportTunnelLining', data);
  },
  // 导入围岩
  importTunnelRock(data) {
    return postRequest(baseUrl + 'ImportTunnelRock', data);
  },
  // 导入预埋件
  importTunnelEmbedded(data) {
    return postRequest(baseUrl + 'ImportTunnelEmbedded', data);
  },
  // 物资系统-导出地磅数据
  exportLoadometerWeight(data) {
    return postRequest(baseUrl + 'ExportLoadometerWeight', data);
  },


  // 导出人员工资表
  exportOAAttendanceWage(data) {
    return postRequest(baseUrl + 'ExportOAAttendanceWage', data);
  },
  // 导出劳务人员
  exportStaffWorker(data) {
    return postRequest(baseUrl + 'ExportStaffWorker', data);
  },
  // 导入劳务人员
  importStaffWorker(data) {
    return postRequest(baseUrl + 'ImportStaffWorker', data);
  },
  // 查询劳务工人工种
  queryStaffWorkerJob(data) {
    return postRequest(baseUrl + 'QueryStaffWorkerJob', data);
  },
  
};
