import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";


// 工程管理
export default {
  // 上传质量管理
  uploadProjectInfoQuality(data) {
    return postRequest(baseUrl + "UploadProjectInfoQuality", data);
  },
  // 修改质量管理
  updateProjectInfoQuality(data) {
    return postRequest(baseUrl + "UpdateProjectInfoQuality", data);
  },
  // 删除质量管理
  delProjectInfoQuality(data) {
    return postRequest(baseUrl + "DelProjectInfoQuality", data);
  },
  // 查询质量管理-列表
  queryProjectInfoQualityList(data) {
    return postRequest(baseUrl + "QueryProjectInfoQualityList", data);
  },
  // 查询质量管理
  queryProjectInfoQuality(data) {
    return postRequest(baseUrl + "QueryProjectInfoQuality", data);
  },
};
