import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";
// 人员打卡
export default {
  // 查询考勤配置表
  queryStaffPunchBasic(data) {
    return postRequest(baseUrl + "QueryStaffPunchBasic", data);
  },
  // 查询考勤配置表-列表
  queryStaffPunchBasicList(data) {
    return postRequest(baseUrl + "QueryStaffPunchBasicList", data);
  },
  // 删除考勤配置表
  delStaffPunchBasic(data) {
    return postRequest(baseUrl + "DelStaffPunchBasic", data);
  },
  // 修改考勤配置表
  updateStaffPunchBasic(data) {
    return postRequest(baseUrl + "UpdateStaffPunchBasic", data);
  },
  // 上传考勤配置表
  uploadStaffPunchBasic(data) {
    return postRequest(baseUrl + "UploadStaffPunchBasic", data);
  },
  // 查询考勤表
  queryStaffPunchAttendance(data) {
    return postRequest(baseUrl + "QueryStaffPunchAttendance", data);
  },
  // 上传查询考勤表
  uploadStaffPunchAttendance(data) {
    return postRequest(baseUrl + "UploadStaffPunchAttendance", data);
  },
  // 查询考勤表-人员数量统计
  queryStaffPunchAttendanceStates(data) {
    return postRequest(baseUrl + "QueryStaffPunchAttendanceStates", data);
  },

  // 查询考勤表-某月
  queryStaffPunchAttendanceMonth(data) {
    return postRequest(baseUrl + "QueryStaffPunchAttendanceMonth", data);
  },
  // 查询考勤表-人员异动
  queryStaffPunchAttendanceChanges(data) {
    return postRequest(baseUrl + "QueryStaffPunchAttendanceChanges", data);
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
