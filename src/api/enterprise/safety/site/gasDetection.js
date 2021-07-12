import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 考勤配置
export default {
  //查询检测点
  QueryGasDetectPosition(data) {
    return postRequest(baseUrl + "QueryGasDetectPosition", data);
  },
  // 查询月计划
  QueryGasDetectDuration(data) {
    return postRequest(baseUrl + "QueryGasDetectDuration", data);
  },
  //查询日进度
  QueryGasDetect(data) {
    return postRequest(baseUrl + "QueryGasDetect", data);
  }
};
