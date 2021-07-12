import { postRequest } from '@/api/axios';
import $C from '@/common/config';
let baseUrl = $C.baseUrl + '?op=';

// 安全模块
export default {
  /*********************班前教育***********************/
  // 查询班前教育
  querySafePreClassEducation(data) {
    return postRequest(baseUrl + 'QuerySafePreClassEducation', data);
  },
  // 查询班前教育列表
  querySafePreClassEducationList(data) {
    return postRequest(baseUrl + 'QuerySafePreClassEducationList', data);
  },
  // 删除班前教育
  delSafePreClassEducation(data) {
    return postRequest(baseUrl + 'DelSafePreClassEducation', data);
  },
  // 修改班前教育
  updateSafePreClassEducation(data) {
    return postRequest(baseUrl + 'UpdateSafePreClassEducation', data);
  },
  // 上传班前教育
  uploadSafePreClassEducation(data) {
    return postRequest(baseUrl + 'UploadSafePreClassEducation', data);
  },
  //查询班前教育地点()
  querySafePreClassEducationPosition(data) {
    return postRequest(baseUrl + 'QuerySafePreClassEducationPosition', data);
  },

  // 查询班前教育内容
  querySafePreClassEducationContent(data) {
    return postRequest(baseUrl + 'QuerySafePreClassEducationContent', data);
  },
  // 修改班前教育内容
  updateSafePreClassEducationContent(data) {
    return postRequest(baseUrl + 'UpdateSafePreClassEducationContent', data);
  },
  // 上传班前教育内容
  uploadSafePreClassEducationContent(data) {
    return postRequest(baseUrl + 'UploadSafePreClassEducationContent', data);
  },
  //删除班前教育内容
  delSafePreClassEducationContent(data) {
    return postRequest(baseUrl + 'DelSafePreClassEducationContent', data);
  },
  /********************安全巡检************************/
  // 查询安全巡检
  querySafeDailyInspection(data) {
    return postRequest(baseUrl + 'QuerySafeDailyInspection', data);
  },
  // 查询安全巡检列表
  querySafeDailyInspectionList(data) {
    return postRequest(baseUrl + 'QuerySafeDailyInspectionList', data);
  },
  // 删除安全巡检
  delSafeDailyInspection(data) {
    return postRequest(baseUrl + 'DelSafeDailyInspection', data);
  },
  // 修改安全巡检
  updateSafeDailyInspection(data) {
    return postRequest(baseUrl + 'UpdateSafeDailyInspection', data);
  },
  // 上传安全巡检
  uploadSafeDailyInspection(data) {
    return postRequest(baseUrl + 'UploadSafeDailyInspection', data);
  },

  // 查询日常巡检地点
  querySafeDailyInspectionPosition(data) {
    return postRequest(baseUrl + 'QuerySafeDailyInspectionPosition', data);
  },
  // 查询安全-日常巡检-内容
  querySafeDailyInspectionContent(data) {
    return postRequest(baseUrl + 'QuerySafeDailyInspectionContent', data);
  },
  // 修改-日常巡检-内容
  UpdateSafeDailyInspectionContent(data) {
    return postRequest(baseUrl + 'UpdateSafeDailyInspectionContent', data);
  },
  // 上传-日常巡检-内容
  uploadSafeDailyInspectionContent(data) {
    return postRequest(baseUrl + 'UploadSafeDailyInspectionContent', data);
  },
  //删除-日常巡检-内容
  delSafeDailyInspectionContent(data) {
    return postRequest(baseUrl + 'DelSafeDailyInspectionContent', data);
  },
  /********************安全整改***********************/
  //查询安全整改
  querySafeRectify(data) {
    return postRequest(baseUrl + 'QuerySafeRectify', data);
  },
  //查询安全整改列表
  querySafeRectifyList(data) {
    return postRequest(baseUrl + 'QuerySafeRectifyList', data);
  },
  // 删除安全整改
  delSafeRectify(data) {
    return postRequest(baseUrl + 'DelSafeRectify', data);
  },
  // 修改安全整改
  updateSafeRectify(data) {
    return postRequest(baseUrl + 'UpdateSafeRectify', data);
  },
  // 上传安全整改
  uploadSafeRectify(data) {
    return postRequest(baseUrl + 'UploadSafeRectify', data);
  },
  // 查询安全整改地点
  querySafeRectifyPosition(data) {
    return postRequest(baseUrl + 'QuerySafeRectifyPosition', data);
  },
  // 查询分部分项
  querySafeRectifyPartialItems(data) {
    return postRequest(baseUrl + 'QuerySafeRectifyPartialItems', data);
  },

  /********************整改回复***********************/
  //查询整改回复
  querySafeRectifyReply(data) {
    return postRequest(baseUrl + 'QuerySafeRectifyReply', data);
  },
  // 上传整改回复
  uploadSafeRectifyReply(data) {
    return postRequest(baseUrl + 'UploadSafeRectifyReply', data);
  },
  // 驳回整改回复
  denySafeRectifyReply(data) {
    return postRequest(baseUrl + 'DenySafeRectifyReply', data);
  },
  /********************视频监控***********************/
  //查询机构+视频摄像头统计(树形结构)
  queryOrganVideoCountTree(data) {
    return postRequest(baseUrl + 'QueryOrganVideoCountTree', data);
  },
  // 查询授权码
  queryYsyToken(data) {
    return postRequest(baseUrl + 'QueryYsyToken', data);
  },
  // 查询视频
  queryYsyVideo(data) {
    return postRequest(baseUrl + 'QueryYsyVideo', data);
  },
  // 查询视频列表
  queryYsyVideoList(data) {
    return postRequest(baseUrl + 'QueryYsyVideoList', data);
  },
  /********************智能抓拍***********************/
  //查询智能抓拍
  querySafeSmartCapture(data) {
    return postRequest(baseUrl + 'QuerySafeSmartCapture', data);
  },
  //删除智能抓拍
  delSafeSmartCapture(data) {
    return postRequest(baseUrl + 'DelSafeSmartCapture', data);
  },
  //智能抓拍罚款
  fineSafeSmartCapture(data) {
    return postRequest(baseUrl + 'FineSafeSmartCapture', data);
  },
  //修改智能抓拍
  updateSafeSmartCapture(data) {
    return postRequest(baseUrl + 'UpdateSafeSmartCapture', data);
  },
  // 删除视频
  delYsyVideo(data) {
    return postRequest(baseUrl + 'DelYsyVideo', data);
  },
  //查询视频所属位置
  queryYsyVideoOrgan(data) {
    return postRequest(baseUrl + 'QueryYsyVideoOrgan', data);
  },
  //上传视频
  uploadYsyVideo(data) {
    return postRequest(baseUrl + 'UploadYsyVideo', data);
  },
  //修改视频
  updateYsyVideo(data) {
    return postRequest(baseUrl + 'UpdateYsyVideo', data);
  },

  /*******************风险区域管控********************/
  // 查询风险源及责任人
  querySafeDangerAreaPerson(data) {
    return postRequest(baseUrl + 'QuerySafeDangerAreaPerson', data);
  },
  queryWorkerAccountSalary(data) {
    return postRequest(baseUrl + 'QueryWorkerAccountSalary', data);
  },
  // 修改风险源及责任人
  updateSafeDangerAreaPerson(data) {
    return postRequest(baseUrl + 'UpdateSafeDangerAreaPerson', data);
  },
  // 上传风险源及责任人
  uploadSafeDangerAreaPerson(data) {
    return postRequest(baseUrl + 'UploadSafeDangerAreaPerson', data);
  },
  // 删除风险源及责任人
  delSafeDangerAreaPerson(data) {
    return postRequest(baseUrl + 'DelSafeDangerAreaPerson', data);
  },
  // 查询风险源及责任人历史
  querySafeDangerAreaPersonHistory(data) {
    return postRequest(baseUrl + 'QuerySafeDangerAreaPersonHistory', data);
  },
  // 删除风险源及责任人历史
  delSafeDangerAreaPersonHistory(data) {
    return postRequest(baseUrl + 'DelSafeDangerAreaPersonHistory', data);
  },

  /*******************首页统计********************/
  // 班前教育统计
  querySafePreClassEducationYearStat(data) {
    return postRequest(baseUrl + 'QuerySafePreClassEducationYearStat', data);
  },
  //日常巡检统计
  querySafeDailyInspectionStat(data) {
    return postRequest(baseUrl + 'QuerySafeDailyInspectionStat', data);
  },
  // 违章抓拍预警次数统计
  querySafeSmartCaptureStat(data) {
    return postRequest(baseUrl + 'QuerySafeSmartCaptureStat', data);
  },
  // 安全整改与整改中统计
  querySafeRectifyStat(data) {
    return postRequest(baseUrl + 'QuerySafeRectifyStat', data);
  },
  /*******************安全模块所有的有关导入导出********************/
  //导出班前教育
  exportSafePreClassEducation(data) {
    return postRequest(baseUrl + 'ExportSafePreClassEducation', data);
  },
  //导出日常巡检
  exportSafeDailyInspection(data) {
    return postRequest(baseUrl + 'ExportSafeDailyInspection', data);
  },
  //导出安全整改
  exportSafeRectify(data) {
    return postRequest(baseUrl + 'ExportSafeRectify', data);
  },

  //查询班前教育与巡检未上报的罚款情况
  querySafeEducationAndInspection(data) {
    return postRequest(baseUrl + 'QuerySafeEducationAndInspection', data);
  },
  //班前教育与巡检未上报罚款
  fineSafeEducationAndInspection(data) {
    return postRequest(baseUrl + 'FineSafeEducationAndInspection', data);
  },
  /*******************罚款记录********************/

  //查询罚款记录
  queryViolationFine(data) {
    return postRequest(baseUrl + 'QueryViolationFine', data);
  },
  // 删除罚款记录
  delViolationFine(data) {
    return postRequest(baseUrl + 'DelViolationFine', data);
  },
  // 修改罚款记录
  updateViolationFine(data) {
    return postRequest(baseUrl + 'UpdateViolationFine', data);
  },
  // 上传罚款记录
  uploadViolationFine(data) {
    return postRequest(baseUrl + 'UploadViolationFine', data);
  },

  /*****************漏电保护器**********************/
  // 查询漏电保护器
  queryIoTLeakageProtect(data) {
    return postRequest(baseUrl + 'QueryIoTLeakageProtect', data);
  },
  // 删除漏电保护器
  delIoTLeakageProtect(data) {
    return postRequest(baseUrl + 'DelIoTLeakageProtect', data);
  },
  // 修改漏电保护器
  updateIoTLeakageProtect(data) {
    return postRequest(baseUrl + 'UpdateIoTLeakageProtect', data);
  },
  // 上传漏电保护器
  uploadIoTLeakageProtect(data) {
    return postRequest(baseUrl + 'UploadIoTLeakageProtect', data);
  },
  // 同步漏电保护器
  SyncIoTLeakageProtect(data) {
    return postRequest(baseUrl + 'SyncIoTLeakageProtect', data);
  },
  // 查询漏电保护器历史具体位置
  queryIoTLeakageProtectLocation(data) {
    return postRequest(baseUrl + 'QueryIoTLeakageProtectLocation', data);
  },
  // 查询漏电保护器历史基本参数
  queryIoTLeakageProtectBase(data) {
    return postRequest(baseUrl + 'QueryIoTLeakageProtectBase', data);
  },
  // 上传漏电保护器(维护)
  uploadIoTLeakageProtectMaintain(data) {
    return postRequest(baseUrl + 'UploadIoTLeakageProtectMaintain', data);
  },
  // 删除漏电保护器
  updateIoTLeakageProtectMaintain(data) {
    return postRequest(baseUrl + 'UpdateIoTLeakageProtectMaintain', data);
  },
  // 删除漏电保护器(维护)
  delIoTLeakageProtectMaintain(data) {
    return postRequest(baseUrl + 'DelIoTLeakageProtectMaintain', data);
  },
  // 查询漏电保护器(维护)
  queryIoTLeakageProtectMaintain(data) {
    return postRequest(baseUrl + 'QueryIoTLeakageProtectMaintain', data);
  },
  // 查询漏电保护器(维护)-年统计
  queryIoTLeakageProtectMaintainSummarry(data) {
    return postRequest(baseUrl + 'QueryIoTLeakageProtectMaintainSummarry', data);
  },
  // 查询漏电保护器（实时）
  queryIoTLeakageProtectRealtime(data) {
    return postRequest(baseUrl + 'QueryIoTLeakageProtectRealtime', data);
  },

  // 查询漏电保护器（预/告 警）
  queryIoTLeakageProtectCaveat(data) {
    return postRequest(baseUrl + 'QueryIoTLeakageProtectCaveat', data);
  },
  // 查询漏电保护器（预/告 警）-统计
  queryIoTLeakageProtectCaveatSummary(data) {
    return postRequest(baseUrl + 'QueryIoTLeakageProtectCaveatSummary', data);
  },
  // 改漏电保护器运行期状态
  setIoTLeakageProtect(data) {
    return postRequest(baseUrl + 'SetIoTLeakageProtect', data);
  },

  // 删除漏电保护器（实时）
  delIoTLeakageProtectRealtime(data) {
    return postRequest(baseUrl + 'DelIoTLeakageProtectRealtime', data);
  },

  // 首页BI系统安全汇总
  querySafeOrganStatBi(data) {
    return postRequest(baseUrl + 'QuerySafeOrganStatBi', data);
  }
};
