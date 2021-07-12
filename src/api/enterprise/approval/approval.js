import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 审批流程
export default {
  // 查询审批流程-列表
  queryApproveProcessList(data) {
    return postRequest(baseUrl + "QueryApproveProcessList", data);
  },
  // 查询审批流程
  queryApproveProcess(data) {
    return postRequest(baseUrl + "QueryApproveProcess", data);
  },
  // 修改审批流程的状态
  updateApproveProcessState(data) {
    return postRequest(baseUrl + "UpdateApproveProcessState", data);
  },
  // 修改审批流程
  updateApproveProcess(data) {
    return postRequest(baseUrl + "UpdateApproveProcess", data);
  },
  // 删除审批流程
  delApproveProcess(data) {
    return postRequest(baseUrl + "DelApproveProcess", data);
  },
  // 上传审批流程
  uploadApproveProcess(data) {
    return postRequest(baseUrl + "UploadApproveProcess", data);
  },


  // 查询审批信息
  queryApproveReviseInfo(data) {
    return postRequest(baseUrl + "QueryApproveReviseInfo", data);
  },
  // 删除审批信息中间表
  delApproveReviseInfo(data) {
    return postRequest(baseUrl + "DelApproveReviseInfo", data);
  },
  // 修改审批信息中间表
  updateApproveReviseInfo(data) {
    return postRequest(baseUrl + "UpdateApproveReviseInfo", data);
  },
  // 撤销审批信息中间表
  undoApproveReviseInfo(data) {
    return postRequest(baseUrl + "UndoApproveReviseInfo", data);
  },
  // 提醒审批
  noticeReviewerToReview(data) {
    return postRequest(baseUrl + "NoticeReviewerToReview", data);
  },
  // 审批
  uploadApproveReviseInfo(data) {
    return postRequest(baseUrl + "UploadApproveReviseInfo", data);
  },
  // 委托
  consignApproveReviseInfo(data) {
    return postRequest(baseUrl + "ConsignApproveReviseInfo", data);
  },
  // 抄送
  copyApproveReviseInfo(data) {
    return postRequest(baseUrl + "CopyApproveReviseInfo", data);
  },
  // 查询审批信息
  queryApproveReviseInfo(data) {
    return postRequest(baseUrl + "QueryApproveReviseInfo", data);
  },
  // 删除审批信息中间表
  DelApproveReviseInfo(data) {
    return postRequest(baseUrl + "DelApproveReviseInfo", data);
  },
  // 修改审批信息中间表
  UpdateApproveReviseInfo(data) {
    return postRequest(baseUrl + "UpdateApproveReviseInfo", data);
  },
  // 抄送
  CopyApproveReviseInfo(data) {
    return postRequest(baseUrl + "CopyApproveReviseInfo", data);
  },
  // 委托
  ConsignApproveReviseInfo(data) {
    return postRequest(baseUrl + "ConsignApproveReviseInfo", data);
  },
  // 撤销审批
  UndoApproveReviseInfo(data) {
    return postRequest(baseUrl + "UndoApproveReviseInfo", data);
  },
  // 查询审批记录表
  queryApproveReviseRecord(data) {
    return postRequest(baseUrl + "QueryApproveReviseRecord", data);
  },
  // --------------------------------审批记录表--------------------------------
  // 查询审批记录表
  queryApproveReviseRecord(data) {
    return postRequest(baseUrl + "QueryApproveReviseRecord", data);
  },
  // 查询审批流程，结合审批记录
  queryApproveReviseRecordWithProcess(data) {
    return postRequest(baseUrl + "QueryApproveReviseRecordWithProcess", data);
  },
};
