import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";
// 质量管理
export default {
  // 查询文件资料()
  queryQualityCtrlDocument(data) {
    return postRequest(baseUrl + "QueryQualityCtrlDocument", data);
  },
  // 查询文件资料-列表()
  queryQualityCtrlDocumentList(data) {
    return postRequest(baseUrl + "QueryQualityCtrlDocumentList", data);
  },
  // 删除文件资料()
  delQualityCtrlDocument(data) {
    return postRequest(baseUrl + "DelQualityCtrlDocument", data);
  },
  // 修改文件资料()
  updateQualityCtrlDocument(data) {
    return postRequest(baseUrl + "UpdateQualityCtrlDocument", data);
  },
  // 上传文件资料()
  uploadQualityCtrlDocument(data) {
    return postRequest(baseUrl + "UploadQualityCtrlDocument", data);
  },
  //------------------------------- 质量整改通知单------------------------------//
  //   查询安全整改单()
  queryQualityCtrlRectifyNoticeContact(data) {
    return postRequest(baseUrl + "QueryQualityCtrlRectifyNoticeContact", data);
  },
  // 查询安全整改单-列表()
  queryQualityCtrlRectifyNoticeContactList(data) { 
    return postRequest(baseUrl + "QueryQualityCtrlRectifyNoticeContactList", data);
  },
  // 删除安全整改单()
  delQualityCtrlRectifyNoticeContact(data) {
    return postRequest(baseUrl + "DelQualityCtrlRectifyNoticeContact", data);
  },
  // 复检安全整改单()
  reviewQualityCtrlRectifyNoticeContact(data) {
    return postRequest(baseUrl + "ReviewQualityCtrlRectifyNoticeContact", data);
  },
  // 回复安全整改单()
  replyQualityCtrlRectifyNoticeContact(data) {
    return postRequest(baseUrl + "ReplyQualityCtrlRectifyNoticeContact", data);
  },
  //   上传安全整改单()
  uploadQualityCtrlRectifyNoticeContact(data) {
    return postRequest(baseUrl + "UploadQualityCtrlRectifyNoticeContact", data);
  },

  //------------------------------- 工作联系单----------------------------------//
  //   查询工作联系单()
  queryQualityCtrlWorkContact(data) {
    return postRequest(baseUrl + "QueryQualityCtrlWorkContact", data);
  },
  // 查询工作联系单-列表()
  queryQualityCtrlWorkContactList(data) {
    return postRequest(baseUrl + "QueryQualityCtrlWorkContactList", data);
  },
  // 删除工作联系单()
  delQualityCtrlWorkContact(data) {
    return postRequest(baseUrl + "DelQualityCtrlWorkContact", data);
  },
  // 回复工作联系单()
  replyQualityCtrlWorkContact(data) {
    return postRequest(baseUrl + "ReplyQualityCtrlWorkContact", data);
  },
  // 上传工作联系单()
  uploadQualityCtrlWorkContact(data) {
    return postRequest(baseUrl + "UploadQualityCtrlWorkContact", data);
  },
};
