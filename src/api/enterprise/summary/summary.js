import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 企业级首页统计
export default {
  // 查询人员流动-列表
  queryStaffAccountFlowList(data) {
    return postRequest(baseUrl + "QueryStaffAccountFlowList", data);
  },
  // 查询项目-统计
  queryProjectInfoProjectSummary(data) {
    return postRequest(baseUrl + "QueryProjectInfoProjectSummary", data);
  },
};
