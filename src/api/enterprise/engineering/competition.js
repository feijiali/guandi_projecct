import { postRequest } from '@/api/axios';
import $C from '@/common/config';
let baseUrl = $C.baseUrl + '?op=';

// 擂台赛
export default {
  // 查询混喷排名
  queryTunnelSprayMixingRank(data) {
    return postRequest(baseUrl + 'QueryTunnelSprayMixingRank', data);
  },
  // 上传混喷规则
  queryRingMatchSprayMixingRule(data) {
    return postRequest(baseUrl + 'QueryRingMatchSprayMixingRule', data);
  },
  // 查询混喷规则
  uploadRingMatchSprayMixingRule(data) {
    return postRequest(baseUrl + 'UploadRingMatchSprayMixingRule', data);
  },
  // 导出混喷
  exportRingMatchSprayMixingRank(data) {
    return postRequest(baseUrl + 'ExportRingMatchSprayMixingRank', data);
  },
  // 导出擂台赛产值
  exportRingMatchValueStatistics(data) {
    return postRequest(baseUrl + 'ExportRingMatchValueStatistics', data);
  },
  // BI擂台赛统计
  queryTunnelSprayMixingStat(data) {
    return postRequest(baseUrl + 'QueryTunnelSprayMixingStat', data);
  },
  // 查询隧道进度擂台赛(不区分部位汇总)
  tunnelProgressRule(data) {
    return postRequest(baseUrl + 'TunnelProgressRule', data);
  },
  // 导出擂台赛隧道进度()
  exportTunnelProgressRule(data) {
    return postRequest(baseUrl + 'ExportTunnelProgressRule', data);
  },
  // 查询单位工程下的类型完成进度(单位工程汇总)
  tunnelProgressUnit(data) {
    return postRequest(baseUrl + 'TunnelProgressUnit', data);
  },
  // 查询隧道擂台赛规则
  queryRingMatchTunnelRule(data) {
    return postRequest(baseUrl + 'QueryRingMatchTunnelRule', data);
  },
  // 上传隧道擂台赛规则
  uploadRingMatchTunnelRule(data) {
    return postRequest(baseUrl + 'UploadRingMatchTunnelRule', data);
  },
  // 按照子单位工程汇总
  tunnelProgressDetail(data) {
    return postRequest(baseUrl + 'TunnelProgressDetail', data);
  },

  // 上传产值排名规则
  uploadRingMatchValueRule(data) {
    return postRequest(baseUrl + 'UploadRingMatchValueRule', data);
  },
  // 删除产值排名规则
  delRingMatchValueRule(data) {
    return postRequest(baseUrl + 'DelRingMatchValueRule', data);
  },
  // 查询产值排名规则
  queryRingMatchValueRule(data) {
    return postRequest(baseUrl + 'QueryRingMatchValueRule', data);
  },
  // 查询产值
  queryValueStatistics(data) {
    return postRequest(baseUrl + 'QueryValueStatistics', data);
  },
  // 查询产值---周
  queryWeekValueStatistics(data) {
    return postRequest(baseUrl + 'QueryWeekValueStatistics', data);
  },
  // 查询产值统计
  queryWeekValueStatisticsSummary(data) {
    return postRequest(baseUrl + 'QueryWeekValueStatisticsSummary', data);
  }
};
