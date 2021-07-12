/*
 * @Autor: 邓易
 * @Date: 2020-12-18 09:37:19
 * @LastEditors: 邓易
 * @LastEditTime: 2021-02-06 09:36:56
 */
import { postRequest } from "@/api/axios";
import $C from "@/common/config";
import { map } from "highcharts";
let baseUrl = $C.baseUrl + "?op=";

// 材料管理
export default {
  // 上传购置单
  UploadApply(data) {
    return postRequest(baseUrl + "UploadApply", data);
  },
  // 修改购置单
  UpdateApply(data) {
    return postRequest(baseUrl + "UpdateApply", data);
  },
  // 删除购置单
  DelApply(data) {
    return postRequest(baseUrl + "DelApply", data);
  },
  // 查询购置单-列表
  QueryApplyList(data) {
    return postRequest(baseUrl + "QueryApplyList", data);
  },
  // 上传购置单
  QueryApply(data) {
    return postRequest(baseUrl + "QueryApply", data);
  },
  // 查询未关联购置单
  QueryApplyDeficiency(data) {
    return postRequest(baseUrl + "QueryApplyDeficiency", data);
  },
  // 查询购置单设备历史输入
  QueryApplyHistoryName(data) {
    return postRequest(baseUrl + "QueryApplyHistoryName", data);
  },

  // 上传购置合同
  UploadApplyContract(data) {
    return postRequest(baseUrl + "UploadApplyContract", data);
  },
  // 修改购置合同
  UpdateApplyContract(data) {
    return postRequest(baseUrl + "UpdateApplyContract", data);
  },
  // 删除购置合同
  DelApplyContract(data) {
    return postRequest(baseUrl + "DelApplyContract", data);
  },
  // 查询购置合同-列表
  QueryApplyContractList(data) {
    return postRequest(baseUrl + "QueryApplyContractList", data);
  },
  // 上传购置合同
  QueryApplyContract(data) {
    return postRequest(baseUrl + "QueryApplyContract", data);
  },
  // 查询历史使用部位记录
  QueryApplyHistoryUseDepart(data) {
    return postRequest(baseUrl + "QueryApplyHistoryUseDepart", data);
  },
  // 查询历史我方单位
  QueryApplyHistorySupplyDepartment(data) {
    return postRequest(baseUrl + "QueryApplyHistorySupplyDepartment", data);
  },

  // 查询合同付款
  QueryApplyPayment(data) {
    return postRequest(baseUrl + "QueryApplyPayment", data);
  },
  // 批量上传合同分期付款
  BulkUploadApplyPaymentPlan(data) {
    return postRequest(baseUrl + "BulkUploadApplyPaymentPlan", data);
  },
  // 批量上传合同分期付款明细
  BulkUploadApplyPayment(data) {
    return postRequest(baseUrl + "BulkUploadApplyPayment", data);
  },
  // 查询购置合同预警
  QueryApplyPaymentWarning(data) {
    return postRequest(baseUrl + "QueryApplyPaymentWarning", data);
  },
  // 查询购置合同预警总金额
  QueryApplyPaymentWarningMoney(data) {
    return postRequest(baseUrl + "QueryApplyPaymentWarningMoney", data);
  },

  // 上传租赁单
  UploadLease(data) {
    return postRequest(baseUrl + "UploadLease", data);
  },
  // 修改租赁单
  UpdateLease(data) {
    return postRequest(baseUrl + "UpdateLease", data);
  },
  // 删除租赁单
  DelLease(data) {
    return postRequest(baseUrl + "DelLease", data);
  },
  // 查询租赁单-列表
  QueryLeaseList(data) {
    return postRequest(baseUrl + "QueryLeaseList", data);
  },
  // 查询租赁单
  QueryLease(data) {
    return postRequest(baseUrl + "QueryLease", data);
  },
  // 查询租赁单设备历史输入
  QueryLeaseHistoryName(data) {
    return postRequest(baseUrl + "QueryLeaseHistoryName", data);
  },

  // 查询租赁合同付款
  QueryLeasePayment(data) {
    return postRequest(baseUrl + "QueryLeasePayment", data);
  },
  // 批量上传租赁合同分期付款
  BulkUploadLeasePaymentPlan(data) {
    return postRequest(baseUrl + "BulkUploadLeasePaymentPlan", data);
  },
  // 批量上传租赁合同分期付款明细
  BulkUploadLeasePayment(data) {
    return postRequest(baseUrl + "BulkUploadLeasePayment", data);
  },
  // 查询租赁合同预警
  QueryLeasePaymentWarning(data) {
    return postRequest(baseUrl + "QueryLeasePaymentWarning", data);
  },
  // 查询租赁合同预警总金额
  QueryLeasePaymentWarningMoney(data) {
    return postRequest(baseUrl + "QueryLeasePaymentWarningMoney", data);
  },
  // 查询历史我方单位
  QueryLeaseHistorySupplyDepartment(data) {
    return postRequest(baseUrl + "QueryLeaseHistorySupplyDepartment", data);
  },
  // 查询历史使用部位记录
  QueryLeaseHistoryUseDepart(data) {
    return postRequest(baseUrl + "QueryLeaseHistoryUseDepart", data);
  },

  // 上传租赁合同
  UploadLeaseContract(data) {
    return postRequest(baseUrl + "UploadLeaseContract", data);
  },
  // 修改租赁合同
  UpdateLeaseContract(data) {
    return postRequest(baseUrl + "UpdateLeaseContract", data);
  },
  // 删除租赁合同
  DelLeaseContract(data) {
    return postRequest(baseUrl + "DelLeaseContract", data);
  },
  // 查询租赁合同-列表
  QueryLeaseContractList(data) {
    return postRequest(baseUrl + "QueryLeaseContractList", data);
  },
  // 查询租赁合同
  QueryLeaseContract(data) {
    return postRequest(baseUrl + "QueryLeaseContract", data);
  },
  // 查询未关联租赁单/未关联完成租赁单
  QueryLeaseDeficiency(data) {
    return postRequest(baseUrl + "QueryLeaseDeficiency", data);
  },

  // 上传自制单
  UploadSelfMade(data) {
    return postRequest(baseUrl + "UploadSelfMade", data);
  },
  // 修改自制单
  UpdateSelfMade(data) {
    return postRequest(baseUrl + "UpdateSelfMade", data);
  },
  // 删除自制单
  DelSelfMade(data) {
    return postRequest(baseUrl + "DelSelfMade", data);
  },
  // 查询自制单-列表
  QuerySelfMadeList(data) {
    return postRequest(baseUrl + "QuerySelfMadeList", data);
  },
  // 查询自制单
  QuerySelfMade(data) {
    return postRequest(baseUrl + "QuerySelfMade", data);
  },
  // 查询自制设备名称
  QuerySelfMadeName(data) {
    return postRequest(baseUrl + "QuerySelfMadeName", data);
  },

  // 上传设备进场
  UploadApproach(data) {
    return postRequest(baseUrl + "UploadApproach", data);
  },
  // 修改设备进场
  UpdateApproach(data) {
    return postRequest(baseUrl + "UpdateApproach", data);
  },
  // 删除设备进场
  DelApproach(data) {
    return postRequest(baseUrl + "DelApproach", data);
  },
  // 查询设备进场-列表
  QueryApproachList(data) {
    return postRequest(baseUrl + "QueryApproachList", data);
  },
  // 查询设备进场
  QueryApproach(data) {
    return postRequest(baseUrl + "QueryApproach", data);
  },
  // 调拨确认进场
  ConfirmApproach(data) {
    return postRequest(baseUrl + "ConfirmApproach", data);
  },
  // 查询设备进场-列表
  UpdateApproachState(data) {
    return postRequest(baseUrl + "UpdateApproachState", data);
  },
  // 更新设备状态（闲置/待报废/待退场）
  QueryApproachChargeAccount(data) {
    return postRequest(baseUrl + "QueryApproachChargeAccount", data);
  },
  // 查询设备名称
  QueryApproachName(data) {
    return postRequest(baseUrl + "QueryApproachName", data);
  },
  // 查询设备历史输入名称、品牌、厂家
  QueryApproachHistoryInfo(data) {
    return postRequest(baseUrl + "QueryApproachHistoryInfo", data);
  },
  //导入自有设备进场
  ImportEquipApproachSelf(data) {
    return postRequest(baseUrl + "ImportEquipApproachSelf", data);
  },
  //导入租赁设备进场
  ImportEquipApproachLease(data) {
    return postRequest(baseUrl + "ImportEquipApproachLease", data);
  },

  // 上传设备维养
  UploadApproachMaintenance(data) {
    return postRequest(baseUrl + "UploadApproachMaintenance", data);
  },
  // 修改设备维养
  UpdateApproachMaintenance(data) {
    return postRequest(baseUrl + "UpdateApproachMaintenance", data);
  },
  // 删除设备维养
  DelApproachMaintenance(data) {
    return postRequest(baseUrl + "DelApproachMaintenance", data);
  },
  // 查询设备维养-列表
  QueryApproachMaintenanceList(data) {
    return postRequest(baseUrl + "QueryApproachMaintenanceList", data);
  },
  // 查询设备维养
  QueryApproachMaintenance(data) {
    return postRequest(baseUrl + "QueryApproachMaintenance", data);
  },
  // 统计设备维养总金额
  QueryApproachMaintenanceMoney(data) {
    return postRequest(baseUrl + "QueryApproachMaintenanceMoney", data);
  },
  // 查询设备维养预警
  QueryApproachMaintenanceWarning(data) {
    return postRequest(baseUrl + "QueryApproachMaintenanceWarning", data);
  },
  // 查询设备维养详情
  QueryApproachMaintenanceDesc(data) {
    return postRequest(baseUrl + "QueryApproachMaintenanceDesc", data);
  },
  // 查询设备维养人
  QueryApproachMaintenanceAccountName(data) {
    return postRequest(baseUrl + "QueryApproachMaintenanceAccountName", data);
  },

  // 查询设备报废-列表
  QueryApproachScrapList(data) {
    return postRequest(baseUrl + "QueryApproachScrapList", data);
  },
  // 上传设备报废
  UploadApproachScrap(data) {
    return postRequest(baseUrl + "UploadApproachScrap", data);
  },
  // 统计报废总金额
  QueryApproachScrapMoney(data) {
    return postRequest(baseUrl + "QueryApproachScrapMoney", data);
  },
  // 查询设备报废详情
  QueryApproachScrap(data) {
    return postRequest(baseUrl + "QueryApproachScrap", data);
  },

  // 查询设备退场列表
  QueryApproachExeuntList(data) {
    return postRequest(baseUrl + "QueryApproachExeuntList", data);
  },
  // 查询设备退场
  QueryApproachExeunt(data) {
    return postRequest(baseUrl + "QueryApproachExeunt", data);
  },
  // 上传设备退场
  UploadApproachExeunt(data) {
    return postRequest(baseUrl + "UploadApproachExeunt", data);
  },
  // 修改设备退场
  UpdateApproachExeunt(data) {
    return postRequest(baseUrl + "UpdateApproachExeunt", data);
  },
  // 统计退场总金额
  QueryApproachExeuntMoney(data) {
    return postRequest(baseUrl + "QueryApproachExeuntMoney", data);
  },

  // 查询设备调拨记录
  QueryApproachAllocationRecord(data) {
    return postRequest(baseUrl + "QueryApproachAllocationRecord", data);
  },
  // 设备调拨列表查询
  QueryApproachAllocation(data) {
    return postRequest(baseUrl + "QueryApproachAllocation", data);
  },
  // 查询已调拨设备总金额
  QueryApproachAllocationMoney(data) {
    return postRequest(baseUrl + "QueryApproachAllocationMoney", data);
  },
  // 查询调拨设备的调拨详情
  QueryAllocationApproach(data) {
    return postRequest(baseUrl + "QueryAllocationApproach", data);
  },

  // 设备总量按类型统计(普通、特种)
  QueryCommonApproachStatistics(data) {
    return postRequest(baseUrl + "QueryCommonApproachStatistics", data);
  },
  // 设备总量按分类统计(自有、租赁)
  QueryCommonApproachStatisticsType(data) {
    return postRequest(baseUrl + "QueryCommonApproachStatisticsType", data);
  },
  // 设备维养金额汇总
  QueryCommonApproachStatisticsMaintenance(data) {
    return postRequest(baseUrl + "QueryCommonApproachStatisticsMaintenance", data);
  },
  // 首页BI设备汇总
  QueryCommonApproachStatisticsBi(data) {
    return postRequest(baseUrl + "QueryCommonApproachStatisticsBi", data);
  },
  // 设备详情汇总列表
  QueryCommonApproachStatisticsList(data) {
    return postRequest(baseUrl + "QueryCommonApproachStatisticsList", data);
  },
  // 查询设备生命周期列表
  QueryApproachLifeList(data) {
    return postRequest(baseUrl + "QueryApproachLifeList", data);
  },
  // 设备汇总总金额查询
  QueryCommonApproachStatisticsTotalMoney(data) {
    return postRequest(baseUrl + "QueryCommonApproachStatisticsTotalMoney", data);
  },
  // 查询设备预警次数统计
  QueryCommonApproachStatisticsWarningCount(data) {
    return postRequest(baseUrl + "QueryCommonApproachStatisticsWarningCount", data);
  },
  // 查询维养设备名称
  QueryApproachMaintenanceApproachName(data) {
    return postRequest(baseUrl + "QueryApproachMaintenanceApproachName", data);
  },

  // 导出购置合同付款预警
  ExportApplyPaymentWarning(data) {
    return postRequest(baseUrl + "ExportApplyPaymentWarning", data);
  },
  // 导出租赁合同付款预警
  ExportLeasePaymentWarning(data) {
    return postRequest(baseUrl + "ExportLeasePaymentWarning", data);
  },
  // 导出购置合同
  ExportApplyContract(data) {
    return postRequest(baseUrl + "ExportApplyContract", data);
  },
  // 导出购置单
  ExportApply(data) {
    return postRequest(baseUrl + "ExportApply", data);
  },
  // 导出设备退场
  ExportApproachExeunt(data) {
    return postRequest(baseUrl + "ExportApproachExeunt", data);
  },
  // 导出设备调拨列表
  ExportApproachAllocation(data) {
    return postRequest(baseUrl + "ExportApproachAllocation", data);
  },
  // 导出设备维养
  ExportApproachMaintenance(data) {
    return postRequest(baseUrl + "ExportApproachMaintenance", data);
  },
  // 导出设备维养预警
  ExportApproachMaintenanceWarn(data) {
    return postRequest(baseUrl + "ExportApproachMaintenanceWarn", data);
  },
  // 导出设备报废
  ExportApproachScrap(data) {
    return postRequest(baseUrl + "ExportApproachScrap", data);
  },
  // 导出设备汇总
  ExportCommonApproachStatistics(data) {
    return postRequest(baseUrl + "ExportCommonApproachStatistics", data);
  },
  // 导出租赁合同
  ExportLeaseContract(data) {
    return postRequest(baseUrl + "ExportLeaseContract", data);
  },
  // 导出租赁单
  ExportLease(data) {
    return postRequest(baseUrl + "ExportLease", data);
  },
  // 导出自制单
  ExportSelfMade(data) {
    return postRequest(baseUrl + "ExportSelfMade", data);
  },
  // 导出设备进场
  ExportApproach(data) {
    return postRequest(baseUrl + "ExportApproach", data);
  },
  // 导出设备进场闲置
  ExportApproachLet(data) {
    return postRequest(baseUrl + "ExportApproachLet", data);
  },
};
