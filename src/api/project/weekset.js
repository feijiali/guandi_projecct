import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 组织架构模块
export default {
  // 查询个人消息(列表+分页)
  queryWeekManageSetUpList(data) {
    return postRequest(baseUrl + "QueryWeekManageSetUpList", data);
  },
  // 删除周设置
  delWeekManageSetUp(data) {
    return postRequest(baseUrl + "DelWeekManageSetUp", data);
  },
  // 修改周设置
  updateWeekManageSetUp(data) {
    return postRequest(baseUrl + "UpdateWeekManageSetUp", data);
  },
  // 上传周设置
  uploadWeekManageSetUp(data) {
    return postRequest(baseUrl + "UploadWeekManageSetUp", data);
  },
};
