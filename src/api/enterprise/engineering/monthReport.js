import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 联动月报表
export default {
  //******************项目联动 */
  // 导出项目联动
  exportProjectInfoProjectLinkage(data) {
    return postRequest(baseUrl + "ExportProjectInfoProjectLinkage", data);
  },
  // 上传项目联动
  uploadProjectInfoProjectLinkage(data) {
    return postRequest(baseUrl + "UploadProjectInfoProjectLinkage", data);
  },
  // 修改项目联动
  updateProjectInfoProjectLinkage(data) {
    return postRequest(baseUrl + "UpdateProjectInfoProjectLinkage", data);
  },
  // 项目联动发布
  updateProjectInfoProjectLinkageState(data) {
    return postRequest(baseUrl + "UpdateProjectInfoProjectLinkageState", data);
  },
  // 删除项目联动
  delProjectInfoProjectLinkage(data) {
    return postRequest(baseUrl + "DelProjectInfoProjectLinkage", data);
  },
  // 查询项目联动-列表
  queryProjectInfoProjectLinkageList(data) {
    return postRequest(baseUrl + "QueryProjectInfoProjectLinkageList", data);
  },
  // 查询项目联动
  queryProjectInfoProjectLinkage(data) {
    return postRequest(baseUrl + "QueryProjectInfoProjectLinkage", data);
  },
  // 导入项目联动
  importProjectInfoProjectLinkage(data) {
    return postRequest(baseUrl + "ImportProjectInfoProjectLinkage", data);
  },
  // 查询项目名称
  queryProjectInfoProjectName(data) {
    return postRequest(baseUrl + "QueryProjectInfoProjectName", data);
  },
  //******************项目风控 */
  // 导出项目风控
  exportProjectInfoProjectRisk(data) {
    return postRequest(baseUrl + "ExportProjectInfoProjectRisk", data);
  },
  // 上传项目风控
  uploadProjectInfoProjectRisk(data) {
    return postRequest(baseUrl + "UploadProjectInfoProjectRisk", data);
  },
  // 修改项目风控
  updateProjectInfoProjectRisk(data) {
    return postRequest(baseUrl + "UpdateProjectInfoProjectRisk", data);
  },
  // 删除项目风控
  delProjectInfoProjectRisk(data) {
    return postRequest(baseUrl + "DelProjectInfoProjectRisk", data);
  },
  // 查询项目风控-列表
  queryProjectInfoProjectRiskList(data) {
    return postRequest(baseUrl + "QueryProjectInfoProjectRiskList", data);
  },
  // 查询项目风控
  queryProjectInfoProjectRisk(data) {
    return postRequest(baseUrl + "QueryProjectInfoProjectRisk", data);
  },
  // 导入项目风控
  importProjectInfoProjectRisk(data) {
    return postRequest(baseUrl + "ImportProjectInfoProjectRisk", data);
  },

  uploadProjectLinkageRuleColumn(data) {
    return postRequest(baseUrl + "UploadProjectLinkageRuleColumn", data);
  },
  queryProjectLinkageRuleColumn(data) {
    return postRequest(baseUrl + "QueryProjectLinkageRuleColumn", data);
  },
  queryProjectLinkageRuleLine(data) {
    return postRequest(baseUrl + "QueryProjectLinkageRuleLine", data);
  },

  queryProjectLinkageRuleLineInfo(data) {
    return postRequest(baseUrl + "QueryProjectLinkageRuleLineInfo", data);
  },
  uploadProjectLinkageRuleLine(data) {
    return postRequest(baseUrl + "UploadProjectLinkageRuleLine", data);
  },
  //项目月报表审批
  UpdateProjectInfoProjectLinkageApprove(data) {
    return postRequest(baseUrl + "UpdateProjectInfoProjectLinkageApprove", data);
  },
};
