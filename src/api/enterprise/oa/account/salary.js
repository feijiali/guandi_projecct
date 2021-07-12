import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 人员打卡
export default {
  // 查询考勤工资
  queryOAAttendanceWage(data) {
    return postRequest(baseUrl + "QueryOAAttendanceWage", data);
  },
  // 删除考勤工资()
  delOAAttendanceWage(data) {
    return postRequest(baseUrl + "DelOAAttendanceWage", data);
  },
  // 修改考勤工资
  updateOAAttendanceWage(data) {
    return postRequest(baseUrl + "UpdateOAAttendanceWage", data);
  },
  // 上传考勤工资
  uploadOAAttendanceWage(data) {
    return postRequest(baseUrl + "UploadOAAttendanceWage", data);
  },
  // 查询考勤工资编辑内容
  queryOAAttendanceWageInner(data) {
    return postRequest(baseUrl + "QueryOAAttendanceWageInner", data);
  },
  // 查询考勤工资统计
  queryOAAttendanceWageCount(data) {
    return postRequest(baseUrl + "QueryOAAttendanceWageCount", data);
  },

  importOAAttendanceWage(data) {
    return postRequest(baseUrl + "ImportOAAttendanceWage", data);
  },
};
