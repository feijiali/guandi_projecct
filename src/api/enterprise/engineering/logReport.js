import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

export default {
  ///////////////////////////////////////隧道
  // 上传天气
  uploadTunnelWeather(data) {
    return postRequest(baseUrl + "UploadTunnelWeather", data);
  },
  // 查询天气
  queryTunnelWeather(data) {
    return postRequest(baseUrl + "QueryTunnelWeather", data);
  },
  // 查询围岩等级类型
  queryTunnelRockType(data) {
    return postRequest(baseUrl + "QueryTunnelRockType", data);
  },
  queryTunnelRockAndLining(data) {
    return postRequest(baseUrl + "QueryTunnelRockAndLining", data);
  },
  // 查询施工部位
  queryTunnelBuildPart(data) {
    return postRequest(baseUrl + "QueryTunnelBuildPart", data);
  },
  // 查询隧道子单位工程
  queryTunnelSubUnit(data) {
    return postRequest(baseUrl + "QueryTunnelSubUnit", data);
  },
  //**********日进度************//
  // 上传日进度
  uploadTunnelDailyRecord(data) {
    return postRequest(baseUrl + "UploadTunnelDailyRecord", data);
  },
  // 修改日进度
  updateTunnelDailyRecord(data) {
    return postRequest(baseUrl + "UpdateTunnelDailyRecord", data);
  },
  // 删除日进度
  delTunnelDailyRecord(data) {
    return postRequest(baseUrl + "DelTunnelDailyRecord", data);
  },
  // 查询日进度
  queryTunnelDailyRecord(data) {
    return postRequest(baseUrl + "QueryTunnelDailyRecord", data);
  },
  // 查询日进度-需要上报的部位
  queryTunnelDailyRecordNewestPart(data) {
    return postRequest(baseUrl + "QueryTunnelDailyRecordNewestPart", data);
  },
  // 查询日进度-通过桩号查询对应的围岩等级和衬砌
  queryTunnelDailyRecordRockAndLining(data) {
    return postRequest(baseUrl + "QueryTunnelDailyRecordRockAndLining", data);
  },

  //**********月计划************//
  // 上传月计划
  uploadTunnelMonthPlan(data) {
    return postRequest(baseUrl + "UploadTunnelMonthPlan", data);
  },
  // 修改月计划
  updateTunnelMonthPlan(data) {
    return postRequest(baseUrl + "UpdateTunnelMonthPlan", data);
  },
  // 删除月计划
  delTunnelMonthPlan(data) {
    return postRequest(baseUrl + "DelTunnelMonthPlan", data);
  },
  // 查询月计划
  queryTunnelMonthPlan(data) {
    return postRequest(baseUrl + "QueryTunnelMonthPlan", data);
  },
  // 查询月计划-需要上报的部位
  queryTunnelMonthPlanNewestPart(data) {
    return postRequest(baseUrl + "QueryTunnelMonthPlanNewestPart", data);
  },
  ///////////////////////////////////////路基
  // 上传天气
  uploadRoadWeather(data) {
    return postRequest(baseUrl + "UploadRoadWeather", data);
  },
  // 查询天气
  queryBridgeWeather(data) {
    return postRequest(baseUrl + "QueryBridgeWeather", data);
  },
  // 查询单位工程-列表
  queryRoadUnitProjectList(data) {
    return postRequest(baseUrl + "QueryRoadUnitProjectList", data);
  },
  //**********日进度************//
  // 上传日进度
  uploadRoadDailyRecord(data) {
    return postRequest(baseUrl + "UploadRoadDailyRecord", data);
  },
  // 修改日进度
  updateRoadDailyRecord(data) {
    return postRequest(baseUrl + "UpdateRoadDailyRecord", data);
  },
  // 删除日进度
  delRoadDailyRecord(data) {
    return postRequest(baseUrl + "DelRoadDailyRecord", data);
  },
  // 查询日进度-列表
  queryRoadDailyRecordList(data) {
    return postRequest(baseUrl + "QueryRoadDailyRecordList", data);
  },
  //**********月计划************//
  // 上传月计划
  uploadRoadMonthPlan(data) {
    return postRequest(baseUrl + "UploadRoadMonthPlan", data);
  },
  // 修改月计划
  updateRoadMonthPlan(data) {
    return postRequest(baseUrl + "UpdateRoadMonthPlan", data);
  },
  // 删除月计划
  delRoadMonthPlan(data) {
    return postRequest(baseUrl + "DelRoadMonthPlan", data);
  },
  // 查询月计划-列表
  queryRoadMonthPlanList(data) {
    return postRequest(baseUrl + "QueryRoadMonthPlanList", data);
  },
  ///////////////////////////////////////桥梁
  // 上传天气
  uploadBridgeWeather(data) {
    return postRequest(baseUrl + "UploadBridgeWeather", data);
  },
  // 查询天气
  queryRoadWeather(data) {
    return postRequest(baseUrl + "QueryRoadWeather", data);
  },
  // 查询子单位工程
  queryBridgeSubUnit(data) {
    return postRequest(baseUrl + "QueryBridgeSubUnit", data);
  },
  // 查询桥梁构件信息
  queryBridgeBuild(data) {
    return postRequest(baseUrl + "QueryBridgeBuild", data);
  },
  //**********日进度************//
  // 上传日进度
  uploadBridgeDailyRecord(data) {
    return postRequest(baseUrl + "UploadBridgeDailyRecord", data);
  },
  // 修改日进度
  updateBridgeDailyRecord(data) {
    return postRequest(baseUrl + "UpdateBridgeDailyRecord", data);
  },
  // 删除日进度
  delBridgeDailyRecord(data) {
    return postRequest(baseUrl + "DelBridgeDailyRecord", data);
  },
  // 查询日进度
  queryBridgeDailyRecord(data) {
    return postRequest(baseUrl + "QueryBridgeDailyRecord", data);
  },
  // 查询日进度明细-最近
  queryBridgeDailyRecordDetailNewest(data) {
    return postRequest(baseUrl + "QueryBridgeDailyRecordDetailNewest", data);
  },
  //**********月计划************//
  // 上传月计划
  uploadBridgeMonthPlan(data) {
    return postRequest(baseUrl + "UploadBridgeMonthPlan", data);
  },
  // 修改月计划
  updateBridgeMonthPlan(data) {
    return postRequest(baseUrl + "UpdateBridgeMonthPlan", data);
  },
  // 删除月计划
  delBridgeMonthPlan(data) {
    return postRequest(baseUrl + "DelBridgeMonthPlan", data);
  },
  // 查询月计划
  queryBridgeMonthPlan(data) {
    return postRequest(baseUrl + "QueryBridgeMonthPlan", data);
  },
};
