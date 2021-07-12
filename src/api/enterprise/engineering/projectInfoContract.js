import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";


// 工程管理
export default {
  // 上传合同管理
  uploadProjectInfoContract(data) {
    return postRequest(baseUrl + "UploadProjectInfoContract", data);
  },
  // 修改合同管理
  updateProjectInfoContract(data) {
    return postRequest(baseUrl + "UpdateProjectInfoContract", data);
  },
  // 删除合同管理
  delProjectInfoContract(data) {
    return postRequest(baseUrl + "DelProjectInfoContract", data);
  },
  // 查询合同管理-列表
  queryProjectInfoContractList(data) {
    return postRequest(baseUrl + "QueryProjectInfoContractList", data);
  },
  // 查询合同管理
  queryProjectInfoContract(data) {
    return postRequest(baseUrl + "QueryProjectInfoContract", data);
  },
  // 查询-项目统计
  queryProjectInfoContractGroup(data) {
    return postRequest(baseUrl + "QueryProjectInfoContractGroup", data);
  },
};
