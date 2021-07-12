import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";


// 工程管理
export default {
  // 上传技术管理
  uploadProjectInfoTechnology(data) {
    return postRequest(baseUrl + "UploadProjectInfoTechnology", data);
  },
  // 修改技术管理
  updateProjectInfoTechnology(data) {
    return postRequest(baseUrl + "UpdateProjectInfoTechnology", data);
  },
  // 删除技术管理
  delProjectInfoTechnology(data) {
    return postRequest(baseUrl + "DelProjectInfoTechnology", data);
  },
  // 查询技术管理-列表
  queryProjectInfoTechnologyList(data) {
    return postRequest(baseUrl + "QueryProjectInfoTechnologyList", data);
  },
  // 查询技术管理
  queryProjectInfoTechnology(data) {
    return postRequest(baseUrl + "QueryProjectInfoTechnology", data);
  },
};
