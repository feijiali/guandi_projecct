import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl_design = $C.baseUrl_design + "?op=";

// 方案配置
export default {
  // 查询类型
  QueryConstructionTypeTreeTree(data) {
    return postRequest(baseUrl_design + "QueryConstructionTypeTreeTree", data);
  },
  //查询方案
  QueryPlanList(data) {
    return postRequest(baseUrl_design + "QueryPlanList", data);
  },
  //查询应用条件
  QueryTagTree(data) {
    return postRequest(baseUrl_design + "QueryTagTree", data);
  },
  //查询方案类型
  QueryPlanCategoryTree(data) {
    return postRequest(baseUrl_design + "QueryPlanCategoryTree", data);
  },
  QueryPlan(data) {
    return postRequest(baseUrl_design + "QueryPlan", data);
  },
};
