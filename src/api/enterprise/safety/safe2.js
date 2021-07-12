import { postRequest } from '@/api/axios';
import $C from '@/common/config';
let baseUrl = $C.baseUrl + '?op=',
  end = '_SCSD';

// 安全模块
export default {
  /*******************首页统计********************/
  // 违章抓拍预警次数统计
  querySafeSmartCaptureStatSCSD(data) {
    return postRequest(baseUrl + 'QuerySafeSmartCaptureStat' + end, data);
  },
  /********************安全管理***********************/
  querySafeEducation(data) {
    return postRequest(baseUrl + 'QuerySafeEducation', data);
  },
  updateSafeEducation(data) {
    return postRequest(baseUrl + 'UpdateSafeEducation', data);
  },
  uploadSafeEducation(data) {
    return postRequest(baseUrl + 'UploadSafeEducation', data);
  },
  querySafeEducationSCSD(data) {
    return postRequest(baseUrl + 'QuerySafeEducation' + end, data);
  },
  updateSafeEducationSCSD(data) {
    return postRequest(baseUrl + 'UpdateSafeEducation'+ end, data);
  },
  uploadSafeEducationSCSD(data) {
    return postRequest(baseUrl + 'UploadSafeEducation'+ end, data);
  },
  delSafeEducationSCSD(data) {
    return postRequest(baseUrl + 'DelSafeEducation'+ end, data);
  },
  //删除班前教育
  delSafeEducation(data) {
    return postRequest(baseUrl + 'DelSafeEducation', data);
  },
  /********************视频监控***********************/
  // 周界预警
  querySafeSnapshotList(data) {
    return postRequest(baseUrl + 'QuerySafeSnapshotList', data);
  },
  /********************安全巡检************************/
  // 查询安全巡检
  querySafeDailyInspectionSCSD(data) {
    return postRequest(baseUrl + 'QuerySafeDailyInspection' + end, data);
  },
  // 查询人员信息-人员列表
  querySafeBoxPersonSCSD(data) {
    return postRequest(baseUrl + 'QuerySafeBoxPerson' + end, data);
  },
  querySafeBoxDepartGroup(data) {
    return postRequest(baseUrl + 'QuerySafeBoxDepartGroup' + end, data);
  },
  querySafeBoxDepartTree(data) {
    return postRequest(baseUrl + 'QuerySafeBoxDepartTree' + end, data);
  },
  querySafeBoxPersonDetail(data) {
    return postRequest(baseUrl + 'QuerySafeBoxPersonDetail' + end, data);
  },
  exportSafeBoxPerson(data) {
    return postRequest(baseUrl + 'ExportSafeBoxPerson' + end, data);
  },
  querySafeBoxTrain(data) {
    return postRequest(baseUrl + 'QuerySafeBoxTrain' + end, data);
  },
  querySafeBoxRecordGrade(data) {
    return postRequest(baseUrl + 'QuerySafeBoxRecordGrade' + end, data);
  },
  querySafeBoxTrainExport(data) {
    return postRequest(baseUrl + 'QuerySafeBoxTrainExport' + end, data);
  },
  uploadSafeInspectionReport(data) {
    return postRequest(baseUrl + 'UploadSafeInspectionReport' + end, data);
  },
  querySafeInspectionReport(data) {
    return postRequest(baseUrl + 'QuerySafeInspectionReport' + end, data);
  },
  querySafeInspectionSection(data) {
    return postRequest(baseUrl + 'QuerySafeInspectionSection' + end, data);
  },

  safeInspectionStatSection(data) {
    return postRequest(baseUrl + 'SafeInspectionStatSection' + end, data);
  },
  safeInspectionStatSectionC(data) {
    return postRequest(baseUrl + 'SafeInspectionStatSectionC' + end, data);
  },
  querySafeEducationYearStat(data) {
    return postRequest(baseUrl + 'QuerySafeEducationYearStat' + end, data);
  },
  safeInspectionStatSubScore(data) {
    return postRequest(baseUrl + 'SafeInspectionStatSubScore' + end, data);
  },

  querySafeDailySectionList(data) {
    return postRequest(baseUrl + 'QuerySafeDailySectionList' + end, data);
  },
  querySafeDailyDutyList(data) {
    return postRequest(baseUrl + 'QuerySafeDailyDutyList' + end, data);
  }
};
