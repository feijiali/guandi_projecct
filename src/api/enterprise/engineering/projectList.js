import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 工程管理
export default {
  // 上传工程清单
  uploadProjectInfoMeteringList(data) {
    return postRequest(baseUrl + "UploadProjectInfoMeteringList", data);
  },
  // 修改工程清单
  updateProjectInfoMeteringList(data) {
    return postRequest(baseUrl + "UpdateProjectInfoMeteringList", data);
  },
  // 查询工程清单-筛选
  queryProjectInfoMeteringListSelect(data) {
    return postRequest(baseUrl + "QueryProjectInfoMeteringListSelect", data);
  },
  // 删除工程清单
  delProjectInfoMeteringList(data) {
    return postRequest(baseUrl + "DelProjectInfoMeteringList", data);
  },
  // 查询工程清单-列表
  queryProjectInfoMeteringListList(data) {
    return postRequest(baseUrl + "QueryProjectInfoMeteringListList", data);
  },
  // 查询工程清单-树形
  queryProjectInfoMeteringListTree(data) {
    return postRequest(baseUrl + "QueryProjectInfoMeteringListTree", data);
  },
};
