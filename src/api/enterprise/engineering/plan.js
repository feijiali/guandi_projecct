import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";


// 工程管理
export default {
  // ----------计划隧道进度--------
  // 查询隧道计划进度
  queryTunnelPlanProgress(data) {
    return postRequest(baseUrl + "QueryTunnelPlanProgress", data);
  },
  // 上传隧道计划进度
  updateTunnelPlanProgress(data) {
    return postRequest(baseUrl + "UpdateTunnelPlanProgress", data);
  },
  //--------
  // ----------计划产值--------
  // 上传章节-计划产值
  uploadQuantitiesChapterPlanValue(data) {
    return postRequest(baseUrl + "UploadQuantitiesChapterPlanValue", data);
  },
  // 查询章节-计划产值-列表
  queryQuantitiesChapterPlanValueList(data) {
    return postRequest(baseUrl + "QueryQuantitiesChapterPlanValueList", data);
  },
  // 查询章节-计划产值-项目统计
  queryQuantitiesChapterPlanValueSummary(data) {
    return postRequest(baseUrl + "QueryQuantitiesChapterPlanValueSummary", data);
  },
  // 查询章节-计划产值-项目-年统计
  queryQuantitiesChapterPlanValueYearSummary(data) {
    return postRequest(baseUrl + "QueryQuantitiesChapterPlanValueYearSummary", data);
  },
  // 查询章节-计划产值-工区统计
  queryQuantitiesChapterPlanValueOrganAreaSummary(data) {
    return postRequest(baseUrl + "QueryQuantitiesChapterPlanValueOrganAreaSummary", data);
  },
  // 上传章节-产值确认
  uploadQuantitiesChapterValueConfirm(data) {
    return postRequest(baseUrl + "UploadQuantitiesChapterValueConfirm", data);
  },
  //--------
};
