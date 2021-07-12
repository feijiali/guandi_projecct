import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";


// 登录模块
export default {
  // 查询人员+项目
  queryAccountProject(data) {
    return postRequest(baseUrl + "QueryAccountProject", data);
  },
  // DES加解密登录
  getEnDesKey(data) {
    return postRequest(baseUrl + "GetEnDesKey", data);
  },
  // 修改个人密码
  updatePassword(data) {
    return postRequest(baseUrl + "UpdatePassword", data);
  },
  // 上传文件
  uploadFile(data) {
    return postRequest(baseUrl + "UploadFile", data);
  },
  // 登录
  userLogin(data) {
    return postRequest(baseUrl + "Login", data);
  },
  // 获取验证码
  getLoginSmsCode(data) {
    return postRequest(baseUrl + "GetLoginSmsCode", data);
  },
  //获取人员列表
  queryAccount(data) {
    return postRequest(baseUrl + "QueryAccount", data);
  },
  queryOrganAccount(data) {
    return postRequest(baseUrl + "QueryOrganAccount", data);
  },
  // 删除人员列表
  delAccount(data) {
    return postRequest(baseUrl + "DelAccount", data);
  },
  // 查询机构+人数统计(树形结构)
  queryOrganAccountCountTree(data) {
    return postRequest(baseUrl + "QueryOrganAccountCountTree", data);
  },
  // 查询人员状态统计
  queryAccountStatusCounts(data) {
    return postRequest(baseUrl + "QueryAccountStatusCounts", data);
  },
  // 企业级BI系统人员变动
  queryAccountStat(data) {
    return postRequest(baseUrl + "QueryAccountStat", data);
  },
  // 新增人员
  uploadAccount(data) {
    return postRequest(baseUrl + "UploadAccount", data);
  },
  // 编辑人员
  updateAccount(data) {
    return postRequest(baseUrl + "UpdateAccount", data);
  },

  /* 特殊工种*/
  //查询工种
  queryAccountJob(data) {
    return postRequest(baseUrl + "QueryAccountJob", data);
  },
  // 查询特殊工种列表
  querySpecialWork(data) {
    return postRequest(baseUrl + "QueryAccountWorkerCredentials", data);
  },
  // // 获取已过期证件数量
  // queryCardOutOfDate(data) {
  //   return postRequest(baseUrl + "QueryWorkerCredentialsOverdueCount", data);
  // },
  // 上传证件信息
  uploadCardInfo(data) {
    return postRequest(baseUrl + "UploadWorkerCredentials", data);
  },
  // 修改证件信息
  updateCardInfo(data) {
    return postRequest(baseUrl + "UpdateWorkerCredentials", data);
  },
  // 删除单个证件
  deleteSingleCardInfo(data) {
    return postRequest(baseUrl + "DelWorkerCredentials", data);
  },
  // 查询证件信息
  getCardInfo(data) {
    return postRequest(baseUrl + "QueryAccountWorkerCredentials", data);
  },

  /*人员考勤*/

  //获取考勤列表
  queryAccountDayAttend(data) {
    return postRequest(baseUrl + "QueryAccountDayAttend", data);
  },
  // 获取打卡统计
  getCheckStatistics(data) {
    return postRequest(baseUrl + "QueryAccountDayAttendStat", data);
  },
  // 获取出勤(按月)
  queryAccountMonthAttend(data) {
    return postRequest(baseUrl + "QueryAccountMonthAttend", data);
  },

  /******农民工工资*****/
  // 上传工资发放扫描件
  uploadWorkerPayment(data) {
    return postRequest(baseUrl + "UploadWorkerPayment", data);
  },
  // 修改工资发放扫描件
  updateWorkerPayment(data) {
    return postRequest(baseUrl + "UpdateWorkerPayment", data);
  },
  // 删除工资发放扫描件
  delWorkerPayment(data) {
    return postRequest(baseUrl + "DelWorkerPayment", data);
  },
  // 查询工资发放扫描件
  queryWorkerPayment(data) {
    return postRequest(baseUrl + "QueryWorkerPayment", data);
  },
  // 上传民工工资
  uploadWorkerSalary(data) {
    return postRequest(baseUrl + "UploadWorkerSalary", data);
  },
  // 修改民工工资
  updateWorkerSalary(data) {
    return postRequest(baseUrl + "UpdateWorkerSalary", data);
  },
  // 删除民工工资
  delWorkerSalary(data) {
    return postRequest(baseUrl + "DelWorkerSalary", data);
  },
  // 查询民工工资
  queryWorkerSalary(data) {
    return postRequest(baseUrl + "QueryWorkerSalary", data);
  },
};
