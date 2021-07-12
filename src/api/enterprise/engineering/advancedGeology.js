import { postRequest } from '@/api/axios';
import $C from '@/common/config';
let baseUrl = $C.baseUrl + '?op=';

// 超前地质
export default {
  // 上传地质预报表
  uploadTunnelGeologyPredict(data) {
    return postRequest(baseUrl + 'UploadTunnelGeologyPredict', data);
  },
  // 修改合同管理
  updateTunnelGeologyPredict(data) {
    return postRequest(baseUrl + 'UpdateTunnelGeologyPredict', data);
  },
  // 删除合同管理
  delTunnelGeologyPredict(data) {
    return postRequest(baseUrl + 'DelTunnelGeologyPredict', data);
  },
  // 查询地质预报表-列表
  queryTunnelGeologyPredictList(data) {
    return postRequest(baseUrl + 'QueryTunnelGeologyPredictList', data);
  },
  // 查询地质预报表
  queryTunnelGeologyPredict(data) {
    return postRequest(baseUrl + 'QueryTunnelGeologyPredict', data);
  },

  // 上传预报情况表
  uploadTunnelGeologyPredictSituation(data) {
    return postRequest(baseUrl + 'UploadTunnelGeologyPredictSituation', data);
  },
  // 修改预报情况表
  updateTunnelGeologyPredictSituation(data) {
    return postRequest(baseUrl + 'UpdateTunnelGeologyPredictSituation', data);
  },
  // 删除预报情况表
  delTunnelGeologyPredictSituation(data) {
    return postRequest(baseUrl + 'DelTunnelGeologyPredictSituation', data);
  },
  // 查询预报情况表-列表
  queryTunnelGeologyPredictSituationList(data) {
    return postRequest(
      baseUrl + 'QueryTunnelGeologyPredictSituationList',
      data
    );
  },
  // 查询预报情况表
  queryTunnelGeologyPredictSituation(data) {
    return postRequest(baseUrl + 'QueryTunnelGeologyPredictSituation', data);
  },

  // 查询地址灾害
  queryTunnelGeologyPredictDisaster(data) {
    return postRequest(baseUrl + 'QueryTunnelGeologyPredictDisaster', data);
  },
  // 查询地址灾害-列表
  queryTunnelGeologyPredictDisasterList(data) {
    return postRequest(baseUrl + 'QueryTunnelGeologyPredictDisasterList', data);
  },
  // 删除地址灾害
  delTunnelGeologyPredictDisaster(data) {
    return postRequest(baseUrl + 'DelTunnelGeologyPredictDisaster', data);
  },
  // 修改地址灾害
  updateTunnelGeologyPredictDisaster(data) {
    return postRequest(baseUrl + 'UpdateTunnelGeologyPredictDisaster', data);
  },
  // 修改地址灾害
  uploadTunnelGeologyPredictDisaster(data) {
    return postRequest(baseUrl + 'UploadTunnelGeologyPredictDisaster', data);
  }
};
