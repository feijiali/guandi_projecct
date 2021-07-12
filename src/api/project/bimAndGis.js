import { postRequest } from '@/api/axios';
import $C from '@/common/config';
let baseUrl = $C.baseUrl + '?op=';

const isMixin = process.env.VUE_APP_MODE == 'mixin' || process.env.VUE_APP_MODE == 'mixin_dev';
// bimgis
export default {
  // 查询所有单元工程
  queryUnitUnion(data) {
    return postRequest(baseUrl + 'QueryUnitUnion' + (isMixin ? '_G360WC' : ''), data);
  },
  // 按照桥梁子单位工程汇总
  bridgeProgressDetail(data) {
    return postRequest(baseUrl + 'BridgeProgressDetail', data);
  },
  // 按照隧道子单位工程汇总
  tunnelProgressDetail(data) {
    return postRequest(baseUrl + 'TunnelProgressDetail', data);
  },

  // 查询隧道总长度和剩余长度
  tunnelProgressLeft(data) {
    return postRequest(baseUrl + 'TunnelProgressLeft', data);
  },

  // 查询隧道最新的日志信息
  queryTunnelDailyRecordLast(data) {
    return postRequest(baseUrl + 'QueryTunnelDailyRecordLast', data);
  },
  // 查询桥梁最新的日志信息
  queryBridgeDailyRecordLast(data) {
    return postRequest(baseUrl + 'QueryBridgeDailyRecordLast', data);
  },

  // 查询项目下的进度(区分部位汇总)
  tunnelProgressProject(data) {
    return postRequest(baseUrl + 'TunnelProgressProject', data);
  },
  // 查询桥梁进度-根据项目汇总-区分部位类型(
  bridgeProgressProject(data) {
    return postRequest(baseUrl + 'BridgeProgressProject', data);
  },
  queryUnitUnionProcess(data) {
    return postRequest(baseUrl + 'QueryUnitUnionProcess', data);
  }
};
