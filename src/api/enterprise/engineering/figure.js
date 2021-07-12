import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 进度管理
export default {
  // 查询进度计划展示
  queryPlanSchedule(data) {
    return postRequest(baseUrl + "QueryPlanSchedule", data);
  },
  // 查询进度计划展示()
  queryProgressForm(data) {
    return postRequest(baseUrl + "QueryProgressForm", data);
  },
  // 查询计划进度/隧道形象进度()
  queryContrastProgress(data) {
    return postRequest(baseUrl + "QueryContrastProgress", data);
  },
  //   查询形象进度()
  queryProgressSummary(data) {
    return postRequest(baseUrl + "QueryProgressSummary", data);
  },
  ///////////////////////计划进度
  // 查询计划进度
  queryProjectInfoPlanSchedule(data) {
    return postRequest(baseUrl + "QueryProjectInfoPlanSchedule", data);
  },
  // 查询计划进度-列表
  queryProjectInfoPlanScheduleList(data) {
    return postRequest(baseUrl + "QueryProjectInfoPlanScheduleList", data);
  },
  // 删除计划进度
  delProjectInfoPlanSchedule(data) {
    return postRequest(baseUrl + "DelProjectInfoPlanSchedule", data);
  },
  // 修改计划进度
  updateProjectInfoPlanSchedule(data) {
    return postRequest(baseUrl + "UpdateProjectInfoPlanSchedule", data);
  },
  // 上传计划进度
  uploadProjectInfoPlanSchedule(data) {
    return postRequest(baseUrl + "UploadProjectInfoPlanSchedule", data);
  },
///////////////////////////隧道
  //   查询单位工程下的类型完成进度(单位工程汇总)()
  tunnelProgressUnit(data) {
    return postRequest(baseUrl + "TunnelProgressUnit", data);
  },
///////////////////////////桥梁
  //   查询桥梁进度-子单位工程为统计目标-区分部位类型
  bridgeProgressDetail(data) {
    return postRequest(baseUrl + "BridgeProgressDetail", data);
  },
///////////////////////////路基
  //   查询单位工程完成进度列表
  roadProgressUnit(data) {
    return postRequest(baseUrl + "RoadProgressUnit", data);
  },
};
