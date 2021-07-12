import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 人员考勤
export default {
  // 汇总人员出勤情况(按月统计,包含出勤与未出勤)
  queryOAAttendMonth(data) {
    return postRequest(baseUrl + "QueryOAAttendMonth", data);
  },
  // 汇总人员出勤情况(按月统计,包含出勤与未出勤)
  queryOAStaffAttend(data) {
    return postRequest(baseUrl + "QueryOAStaffAttend", data);
  },
  // 导出出勤统计
  exportOAAttend(data) {
    return postRequest(baseUrl + "ExportOAAttend", data);
  },
  // 查询请假-列表
  queryStaffPunchLeave(data) {
    return postRequest(baseUrl + "QueryStaffPunchLeave", data);
  },
  // 修改查询请假
  updateStaffPunchLeave(data) {
    return postRequest(baseUrl + "UpdateStaffPunchLeave", data);
  },
  // 上传查询请假
  uploadStaffPunchLeave(data) {
    return postRequest(baseUrl + "UploadStaffPunchLeave", data);
  },
  // 上传销假
  uploadStaffPunchCancelLeave(data) {
    return postRequest(baseUrl + "UploadStaffPunchCancelLeave", data);
  },
  // 删除销假
  delStaffPunchCancelLeave(data) {
    return postRequest(baseUrl + "DelStaffPunchCancelLeave", data);
  }, 
  // 查询销假-列表
  queryStaffPunchCancelLeaveList(data) {
    return postRequest(baseUrl + "QueryStaffPunchCancelLeaveList", data);
  },
};
