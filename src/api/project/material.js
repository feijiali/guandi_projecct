import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";
// 消息配置
export default {
  // 查询进场统计
  queryMaterialManagementApproachCount(data) {
    return postRequest(baseUrl + "QueryMaterialManagementApproachCount_TJSTC", data);
  },
  // 上传进场统计
  uploadMaterialManagementApproachCount(data) {
    return postRequest(baseUrl + "UploadMaterialManagementApproachCount_TJSTC", data);
  },
  // 修改进场统计
  updateMaterialManagementApproachCount(data) {
    return postRequest(baseUrl + "UpdateMaterialManagementApproachCount_TJSTC", data);
  },
  // 删除进场统计
  delMaterialManagementApproachCount(data) {
    return postRequest(baseUrl + "DelMaterialManagementApproachCount_TJSTC", data);
  },

  // 上传用量预警
  uploadMaterialManagementDosageWarning(data) {
    return postRequest(baseUrl + "UploadMaterialManagementDosageWarning_TJSTC", data);
  },
  // 删除用量预警
  delMaterialManagementDosageWarning(data) {
    return postRequest(baseUrl + "DelMaterialManagementDosageWarning_TJSTC", data);
  },
  // 查询用量预警
  queryMaterialManagementDosageWarning(data) {
    return postRequest(baseUrl + "QueryMaterialManagementDosageWarning_TJSTC", data);
  },
  // 上传用量预警
  updateMaterialManagementDosageWarning(data) {
    return postRequest(baseUrl + "UpdateMaterialManagementDosageWarning_TJSTC", data);
  },

  // 查询库存盘点详情
  queryMaterialManagementInventoryCheckInfo(data) {
    return postRequest(baseUrl + "QueryMaterialManagementInventoryCheckInfo_TJSTC", data);
  },
  // 查询库存盘点
  queryMaterialManagementInventoryCheck(data) {
    return postRequest(baseUrl + "QueryMaterialManagementInventoryCheck_TJSTC", data);
  },
  // 删除库存盘点
  delMaterialManagementInventoryCheck(data) {
    return postRequest(baseUrl + "DelMaterialManagementInventoryCheck_TJSTC", data);
  },
  // 修改库存盘点
  updateMaterialManagementInventoryCheck(data) {
    return postRequest(baseUrl + "UpdateMaterialManagementInventoryCheck_TJSTC", data);
  },
  // 上传库存盘点
  uploadMaterialManagementInventoryCheck(data) {
    return postRequest(baseUrl + "UploadMaterialManagementInventoryCheck_TJSTC", data);
  },

  // 上传原材料信息
  uploadMaterialManagementMaterialInformation(data) {
    return postRequest(baseUrl + "UploadMaterialManagementMaterialInformation_TJSTC", data);
  },
  // 修改原材料信息
  updateMaterialManagementMaterialInformation(data) {
    return postRequest(baseUrl + "UpdateMaterialManagementMaterialInformation_TJSTC", data);
  },
  // 删除原材料信息
  delMaterialManagementMaterialInformation(data) {
    return postRequest(baseUrl + "DelMaterialManagementMaterialInformation_TJSTC", data);
  },
  // 查询原材料信息
  queryMaterialManagementMaterialInformation(data) {
    return postRequest(baseUrl + "QueryMaterialManagementMaterialInformation_TJSTC", data);
  },
  // 查询材料名称筛选
  queryMaterialManagementMaterialInformationNameSelect(data) {
    return postRequest(baseUrl + "QueryMaterialManagementMaterialInformationNameSelect_TJSTC", data);
  },
  // 查询材料规格筛选
  queryMaterialManagementMaterialInformationSpecSelect(data) {
    return postRequest(baseUrl + "QueryMaterialManagementMaterialInformationSpecSelect_TJSTC", data);
  },

  // 上传供应商信息
  UploadMaterialManagementSupplyUnit_TJSTC(data) {
    return postRequest(baseUrl + "UploadMaterialManagementSupplyUnit_TJSTC", data);
  },
  // 修改供应商信息
  UpdateMaterialManagementSupplyUnit_TJSTC(data) {
    return postRequest(baseUrl + "UpdateMaterialManagementSupplyUnit_TJSTC", data);
  },
  // 删除供应商信息
  DelMaterialManagementSupplyUnit_TJSTC(data) {
    return postRequest(baseUrl + "DelMaterialManagementSupplyUnit_TJSTC", data);
  },
  // 查询供应商信息
  QueryMaterialManagementSupplyUnit_TJSTC(data) {
    return postRequest(baseUrl + "QueryMaterialManagementSupplyUnit_TJSTC", data);
  },

  // 上传用量统计
  uploadMaterialManagementUsageStatistics(data) {
    return postRequest(baseUrl + "UploadMaterialManagementUsageStatistics_TJSTC", data);
  },
  // 修改用量统计
  updateMaterialManagementUsageStatistics(data) {
    return postRequest(baseUrl + "UpdateMaterialManagementUsageStatistics_TJSTC", data);
  },
  // 删除用量统计
  delMaterialManagementUsageStatistics(data) {
    return postRequest(baseUrl + "DelMaterialManagementUsageStatistics_TJSTC", data);
  },
  // 查询用量统计
  queryMaterialManagementUsageStatistics(data) {
    return postRequest(baseUrl + "QueryMaterialManagementUsageStatistics_TJSTC", data);
  },

  // 导出材料管理-信息维护-材料信息
  exportMaterialManagementMaterialInformation(data) {
    return postRequest(baseUrl + "ExportMaterialManagementMaterialInformation_TJSTC", data);
  },
  // 导出材料管理-信息维护-供应商信息
  exportMaterialManagementSupplyUnit(data) {
    return postRequest(baseUrl + "ExportMaterialManagementSupplyUnit_TJSTC", data);
  },
  // 导出材料管理-信息维护-进场统计导出
  exportMaterialManagementApproachCount(data) {
    return postRequest(baseUrl + "ExportMaterialManagementApproachCount_TJSTC", data);
  },
  // 导出材料管理-信息维护-用量预警导出
  exportMaterialManagementUsageStatistics(data) {
    return postRequest(baseUrl + "ExportMaterialManagementUsageStatistics_TJSTC", data);
  },
  exportMaterialManagementInventoryCheck(data) {
    return postRequest(baseUrl + "ExportMaterialManagementInventoryCheck_TJSTC", data);
  },
  importMaterialManagementInventoryCheck(data) {
    return postRequest(baseUrl + "ImportMaterialManagementInventoryCheck_TJSTC", data);
  },
};
