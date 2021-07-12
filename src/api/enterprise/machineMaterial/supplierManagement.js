import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 机料料管理
export default {
  // 上传供应商管理
  uploadMaterialManagementSupplyUnit(data) {
    return postRequest(baseUrl + "UploadMaterialManagementSupplyUnit", data);
  },
  // 修改供应商管理
  updateMaterialManagementSupplyUnit(data) {
    return postRequest(baseUrl + "UpdateMaterialManagementSupplyUnit", data);
  },
  // 修改供应商管理-评价
  updateMaterialManagementSupplyUnitAssess(data) {
    return postRequest(baseUrl + "UpdateMaterialManagementSupplyUnitAssess", data);
  },
  // 删除供应商管理
  delMaterialManagementSupplyUnit(data) {
    return postRequest(baseUrl + "DelMaterialManagementSupplyUnit", data);
  },
  // 查询供应商管理-类型
  queryMaterialManagementSupplyUnitType(data) {
    return postRequest(baseUrl + "QueryMaterialManagementSupplyUnitType", data);
  },
  // 查询供应商管理-列表
  queryMaterialManagementSupplyUnitList(data) {
    return postRequest(baseUrl + "QueryMaterialManagementSupplyUnitList", data);
  },
  // 查询供应商管理
  queryMaterialManagementSupplyUnit(data) {
    return postRequest(baseUrl + "QueryMaterialManagementSupplyUnit", data);
  },

  
  // 查询供应商单位网点-列表
  queryInfoMaintainSupplyUnitLocationList(data) {
    return postRequest(baseUrl + "QueryInfoMaintainSupplyUnitLocationList", data);
  },
  // 查询供应商单位经营内容-材料列表
  queryInfoMaintainSupplyUnitBusinessMaterialList(data) {
    return postRequest(baseUrl + "QueryInfoMaintainSupplyUnitBusinessMaterialList", data);
  }
};
