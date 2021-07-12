import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

export default {
  // 请假申请
  // 上传请假
  uploadOALeave(data) {
    return postRequest(baseUrl + "UploadOALeave", data);
  },
  // 编辑请假
  updateOALeave(data) {
    return postRequest(baseUrl + "UpdateOALeave", data);
  },
  //   删除请假
  delOALeave(data) {
    return postRequest(baseUrl + "DelOALeave", data);
  },
  // 查询请假
  queryOALeave(data) {
    return postRequest(baseUrl + "QueryOALeave", data);
  },
  // 查询销假申请
  queryOALeaveCancel(data) {
    return postRequest(baseUrl + "QueryOALeaveCancel", data);
  },
  // 上传销假
  uploadOALeaveCancel(data) {
    return postRequest(baseUrl + "UploadOALeaveCancel", data);
  },
  // 编辑销假
  updateOALeaveCancel(data) {
    return postRequest(baseUrl + "UpdateOALeaveCancel", data);
  },
  // 采购申请
  // 上传采购申请
  uploadOAPurchaseApproval(data) {
    return postRequest(baseUrl + "UploadOAPurchaseApproval", data);
  },
  //   修改采购申请
  updateOAPurchaseApproval(data) {
    return postRequest(baseUrl + "UpdateOAPurchaseApproval", data);
  },
  //   删除采购申请
  delOAPurchaseApproval(data) {
    return postRequest(baseUrl + "DelOAPurchaseApproval", data);
  },
  //   查询采购申请-列表
  queryOAPurchaseApprovalList(data) {
    return postRequest(baseUrl + "QueryOAPurchaseApprovalList", data);
  },
  //   查询采购申请
  queryOAPurchaseApproval(data) {
    return postRequest(baseUrl + "QueryOAPurchaseApproval", data);
  },
  //   导出采购申请
  exportOAPurchaseApproval(data) {
    return postRequest(baseUrl + "ExportOAPurchaseApproval", data);
  },

  //查询周计划
  QueryOAPlanWeek(data) {
    return postRequest(baseUrl + "QueryOAPlanWeek", data);
  },
  //上报周计划
  UploadOAPlanWeek(data) {
    return postRequest(baseUrl + "UploadOAPlanWeek", data);
  },
  //查询上报状态
  QueryOAPlanWeekState(data) {
    return postRequest(baseUrl + "QueryOAPlanWeekState", data);
  },
  //编辑周计划
  UpdateOAPlanWeek(data) {
    return postRequest(baseUrl + "UpdateOAPlanWeek", data);
  },
  // 合同申请
  // 上传合同申请
  uploadOAContractApproval(data) {
    return postRequest(baseUrl + "UploadOAContractApproval", data);
  },

  //   修改合同申请
  updateOAContractApproval(data) {
    return postRequest(baseUrl + "UpdateOAContractApproval", data);
  },
  //   删除合同申请
  delOAContractApproval(data) {
    return postRequest(baseUrl + "DelOAContractApproval", data);
  },
  //   查询合同申请-列表
  queryOAContractApprovalList(data) {
    return postRequest(baseUrl + "QueryOAContractApprovalList", data);
  },
  //   查询合同申请
  queryOAContractApproval(data) {
    return postRequest(baseUrl + "QueryOAContractApproval", data);
  },
  // 查询合同类型历史输入
  QueryOAContractApprovalHistory(data) {
    return postRequest(baseUrl + "QueryOAContractApprovalHistory", data);
  },
  //   导出合同申请
  exportOAContractApproval(data) {
    return postRequest(baseUrl + "ExportOAContractApproval", data);
  },

  // 上传合同计量
  uploadOAContractApproval(data) {
    return postRequest(baseUrl + "UploadOAContractApproval", data);
  },
  // 用款申请
  // 上传用款申请
  uploadOAMoneyApproval(data) {
    return postRequest(baseUrl + "UploadOAMoneyApproval", data);
  },
  //   修改用款申请
  updateOAMoneyApproval(data) {
    return postRequest(baseUrl + "UpdateOAMoneyApproval", data);
  },
  //   删除用款申请
  delOAMoneyApproval(data) {
    return postRequest(baseUrl + "DelOAMoneyApproval", data);
  },
  //   查询用款申请-列表
  queryOAMoneyApprovalList(data) {
    return postRequest(baseUrl + "QueryOAMoneyApprovalList", data);
  },
  // 查询用款申请付款明细（最近）
  queryOAMoneyApprovalPayRecent(data) {
    return postRequest(baseUrl + "QueryOAMoneyApprovalPayRecent", data);
  },
  //   查询用款申请
  queryOAMoneyApproval(data) {
    return postRequest(baseUrl + "QueryOAMoneyApproval", data);
  },
  // 导出用款申请
  exportOAMoneyApprovalWithPay(data) {
    return postRequest(baseUrl + "ExportOAMoneyApprovalWithPay ", data);
  },
  // 查询当前登录人是否是设置的付款人
  QueryOAMoneyApprovalCanPay(data) {
    return postRequest(baseUrl + "QueryOAMoneyApprovalCanPay ", data);
  },
  // 用款申请付款
  UpdateOAMoneyApprovalPayState(data) {
    return postRequest(baseUrl + "UpdateOAMoneyApprovalPayState ", data);
  },
  // 用章申请
  // 上传用章申请
  uploadOAStampApproval(data) {
    return postRequest(baseUrl + "UploadOAStampApproval", data);
  },
  //   修改用章申请
  updateOAStampApproval(data) {
    return postRequest(baseUrl + "UpdateOAStampApproval", data);
  },
  //   删除用章申请
  delOAStampApproval(data) {
    return postRequest(baseUrl + "DelOAStampApproval", data);
  },
  //   查询用章申请-列表
  queryOAStampApprovalList(data) {
    return postRequest(baseUrl + "QueryOAStampApprovalList", data);
  },
  //   查询用章申请
  queryOAStampApproval(data) {
    return postRequest(baseUrl + "QueryOAStampApproval", data);
  },
  //   导出用章申请
  exportOAStampApproval(data) {
    return postRequest(baseUrl + "ExportOAStampApproval", data);
  },
  // 查询OA用章申请上传公司历史纪录
  queryOAOACompany(data) {
    return postRequest(baseUrl + "QueryOAOACompanyList", data);
  },
  // 共享发票
  // 上传发票共享
  uploadOAInvoiceShare(data) {
    return postRequest(baseUrl + "UploadOAInvoiceShare", data);
  },
  //   修改发票共享
  updateOAInvoiceShare(data) {
    return postRequest(baseUrl + "UpdateOAInvoiceShare", data);
  },
  //   删除发票共享
  delOAInvoiceShare(data) {
    return postRequest(baseUrl + "DelOAInvoiceShare", data);
  },
  //   查询发票共享-列表
  queryOAInvoiceShareList(data) {
    return postRequest(baseUrl + "QueryOAInvoiceShareList", data);
  },
  //   查询发票共享
  queryOAInvoiceShare(data) {
    return postRequest(baseUrl + "QueryOAInvoiceShare", data);
  },
  //   查询发票共享-统计
  queryOAInvoiceShareSummary(data) {
    return postRequest(baseUrl + "QueryOAInvoiceShareSummary", data);
  },
  // 导出发票共享-统计
  exportOAInvoiceShareSummary(data) {
    return postRequest(baseUrl + "ExportOAInvoiceShareSummary", data);
  },
  // 导出发票共享-明细
  exportOAInvoiceShareDetail(data) {
    return postRequest(baseUrl + "ExportOAInvoiceShareDetail", data);
  },
  // 制度发布
  //   上传制度发布
  uploadOASystemRelease(data) {
    return postRequest(baseUrl + "UploadOASystemRelease", data);
  },
  //   修改制度发布
  updateOASystemRelease(data) {
    return postRequest(baseUrl + "UpdateOASystemRelease", data);
  },
  //   删除制度发布
  delOASystemRelease(data) {
    return postRequest(baseUrl + "DelOASystemRelease", data);
  },
  //   查询制度发布详情
  queryOASystemRelease(data) {
    return postRequest(baseUrl + "QueryOASystemRelease", data);
  },
  // 查询制度发布统计
  queryOASystemReleaseCount(data) {
    return postRequest(baseUrl + "QueryOASystemReleaseCount", data);
  },
  // 记录制度发布下载统计
  updateOASystemReleaseDownLoadCount(data) {
    return postRequest(baseUrl + "UpdateOASystemReleaseDownLoadCount", data);
  },
  // 查询制度发布评论
  queryOASystemReleaseComment(data) {
    return postRequest(baseUrl + "QueryOASystemReleaseComment", data);
  },

  // 上传比选
  uploadOaElectionElection(data) {
    return postRequest(baseUrl + "UploadOaElectionElection", data);
  },
  // 删除比选
  delOaElectionElection(data) {
    return postRequest(baseUrl + "DelOaElectionElection", data);
  },
  // 查询比选列表
  queryOaElectionElectionList(data) {
    return postRequest(baseUrl + "QueryOaElectionElectionList", data);
  },
  // 查询比选详情
  queryOaElectionElection(data) {
    return postRequest(baseUrl + "QueryOaElectionElection", data);
  },
  // 投票
  evtoOaElectionElection(data) {
    return postRequest(baseUrl + "EvtoOaElectionElection", data);
  },
  // 查询历史班组
  QueryElectionElectionTeam(data) {
    return postRequest(baseUrl + "QueryElectionElectionTeam", data);
  },
  // 查询历史选项-工班选举
  QueryElectionElectionOptionTeam(data) {
    return postRequest(baseUrl + "QueryElectionElectionOptionTeam", data);
  },
  // 查询历史选项-供应商选举
  QueryElectionElectionOptionApply(data) {
    return postRequest(baseUrl + "QueryElectionElectionOptionApply", data);
  },

  // 导出投票比选
  ExportOaElectionElection(data) {
    return postRequest(baseUrl + "ExportOaElectionElection", data);
  },

  // 调拨申请
  // 导出调拨申请
  exportOAAllocation(data) {
    return postRequest(baseUrl + "ExportOAAllocation", data);
  },
  // 上传调拨申请
  uploadOAAllocation(data) {
    return postRequest(baseUrl + "UploadOAAllocation", data);
  },
  //   修改调拨申请
  updateOAAllocation(data) {
    return postRequest(baseUrl + "UpdateOAAllocation", data);
  },
  //   删除调拨申请
  delOAAllocation(data) {
    return postRequest(baseUrl + "DelOAAllocation", data);
  },
  //   查询调拨申请-列表
  queryOAAllocationList(data) {
    return postRequest(baseUrl + "QueryOAAllocationList", data);
  },
  //   查询调拨申请
  queryOAAllocation(data) {
    return postRequest(baseUrl + "QueryOAAllocation", data);
  },
  //   导出调拨申请
  exportOAAllocation(data) {
    return postRequest(baseUrl + "ExportOAAllocation", data);
  },
  //   查询历史发料人
  queryOAAllocationAccount(data) {
    return postRequest(baseUrl + "QueryOAAllocationAccount", data);
  },
  //   查询历史收料人
  queryOAAllocationReceiveAccount(data) {
    return postRequest(baseUrl + "QueryOAAllocationReceiveAccount", data);
  },
  // 通知公告
  //   上传通知公告主表
  uploadOaOaPublic(data) {
    return postRequest(baseUrl + "UploadOaOaPublic", data);
  },
  //   修改通知公告主表=详情查看
  updateOaOaPublic(data) {
    return postRequest(baseUrl + "UpdateOaOaPublic", data);
  },
  //   删除通知公告主表
  delOaOaPublic(data) {
    return postRequest(baseUrl + "DelOaOaPublic", data);
  },
  //   查询通知公告主表-列表
  queryOaOaPublicList(data) {
    return postRequest(baseUrl + "QueryOaOaPublicList", data);
  },
  //   查询通知公告主表-详情
  queryOaOaPublic(data) {
    return postRequest(baseUrl + "QueryOaOaPublic", data);
  },
  //   查询通知公告类型
  queryOaOaPublicType(data) {
    return postRequest(baseUrl + "QueryOaOaPublicType", data);
  },
  //   根据通知公告详情查询已经阅读人员信息
  queryOaOaPublicRead(data) {
    return postRequest(baseUrl + "QueryOaOaPublicRead", data);
  },

  // 邮箱
  //   上传邮箱
  UploadOaEmail(data) {
    return postRequest(baseUrl + "UploadOaEmail", data);
  },
  //  修改邮箱
  UpdateOaEmail(data) {
    return postRequest(baseUrl + "UpdateOaEmail", data);
  },
  //   删除邮箱
  DelOaEmail(data) {
    return postRequest(baseUrl + "DelOaEmail", data);
  },
  //   查询邮箱-列表
  QueryOaEmailList(data) {
    return postRequest(baseUrl + "QueryOaEmailList", data);
  },
  //   查询邮箱-详情
  QueryOaEmail(data) {
    return postRequest(baseUrl + "QueryOaEmail", data);
  },
  //   查询人员的各类邮箱数量
  QueryOaEmailStat(data) {
    return postRequest(baseUrl + "QueryOaEmailStat", data);
  },
  //查询已读未读数据
  QueryOaEmailReadStat(data) {
    return postRequest(baseUrl + "QueryOaEmailReadStat", data);
  },
  // 邮箱详情查询已经阅读的人员信息
  QueryOaEmailAccount(data) {
    return postRequest(baseUrl + "QueryOaEmailAccount", data);
  },
  // 公文管理
  //   上传公文
  UploadReceiveReceiveFile(data) {
    return postRequest(baseUrl + "UploadReceiveReceiveFile", data);
  },
  //  修改公文
  UpdateReceiveReceiveFile(data) {
    return postRequest(baseUrl + "UpdateReceiveReceiveFile", data);
  },
  //   删除公文
  DelReceiveReceiveFile(data) {
    return postRequest(baseUrl + "DelReceiveReceiveFile", data);
  },
  //   查询公文-列表
  QueryReceiveReceiveFileList(data) {
    return postRequest(baseUrl + "QueryReceiveReceiveFileList", data);
  },
  //   查询公文-详情
  QueryReceiveReceiveFile(data) {
    return postRequest(baseUrl + "QueryReceiveReceiveFile", data);
  },
  //   查询公文数量
  QueryReceiveReceiveFileStat(data) {
    return postRequest(baseUrl + "QueryReceiveReceiveFileStat", data);
  },
  //   上传回复表
  UploadReceiveFileReceiveReply(data) {
    return postRequest(baseUrl + "UploadReceiveFileReceiveReply", data);
  },
  //   查询回复表
  QueryReceiveFileReceiveReply(data) {
    return postRequest(baseUrl + "QueryReceiveFileReceiveReply", data);
  },
  //   导出文件
  ExportReceiveReceiveFile(data) {
    return postRequest(baseUrl + "ExportReceiveReceiveFile", data);
  },
  //回复查询
  QueryReceiveFileReceiveReply(data) {
    return postRequest(baseUrl + "QueryReceiveFileReceiveReply", data);
  },
  // 信息资源
  //   导出信息资源管理
  exportInformationResources(data) {
    return postRequest(baseUrl + "ExportInformationResources", data);
  },
  //   上传信息资源管理
  uploadInformationResources(data) {
    return postRequest(baseUrl + "UploadInformationResources", data);
  },
  //   修改信息资源管理
  updateInformationResources(data) {
    return postRequest(baseUrl + "UpdateInformationResources", data);
  },
  //   更新信息资源管理状态(删除)
  updateInformationResourcesState(data) {
    return postRequest(baseUrl + "UpdateInformationResourcesState", data);
  },
  //   查询信息资源管理-列表
  queryInformationResourcesList(data) {
    return postRequest(baseUrl + "QueryInformationResourcesList", data);
  },
  //   查询信息资源管理
  queryInformationResources(data) {
    return postRequest(baseUrl + "QueryInformationResources", data);
  },
  //   查询信息资源(树形结构文件夹)
  queryInformationResourcesTree(data) {
    return postRequest(baseUrl + "QueryInformationResourcesTree", data);
  },
  //   查询信息资源日志-列表
  queryInformationResourcesLogList(data) {
    return postRequest(baseUrl + "QueryInformationResourcesLogList", data);
  },
};
