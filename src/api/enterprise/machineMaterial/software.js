import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 材料管理
export default {
  // 查询地磅设备
  QueryLoadometerDevice(data) {
    return postRequest(baseUrl + "QueryLoadometerDevice", data);
  },
  // 修改地磅设备
  UpdateLoadometerDevice(data) {
    return postRequest(baseUrl + "UpdateLoadometerDevice", data);
  },
  // 删除地磅设备
  DelLoadometerDevice(data) {
    return postRequest(baseUrl + "DelLoadometerDevice", data);
  },
  // 上传地磅设备
  UploadLoadometerDevice(data) {
    return postRequest(baseUrl + "UploadLoadometerDevice", data);
  },

  // 查询拌合站信息
  QueryMixingStationMixStation(data) {
    return postRequest(baseUrl + "QueryMixingStationMixStation", data);
  },
  // 上传拌合站信息
  UploadMixingStationMixStation(data) {
    return postRequest(baseUrl + "UploadMixingStationMixStation", data);
  },
  // 修改拌合站信息
  UpdateMixingStationMixStation(data) {
    return postRequest(baseUrl + "UpdateMixingStationMixStation", data);
  },
  // 删除拌合站信息
  DelMixingStationMixStation(data) {
    return postRequest(baseUrl + "DelMixingStationMixStation", data);
  },

  // 查询地磅数据
  QueryLoadometerWeight(data) {
    return postRequest(baseUrl + "QueryLoadometerWeight", data);
  },
  // 查询地磅数据数据汇总
  QueryLoadometerWeightMaterialStat(data) {
    return postRequest(baseUrl + "QueryLoadometerWeightMaterialStat", data);
  },
  // 修改地磅数据
  UpdateLoadometerWeight(data) {
    return postRequest(baseUrl + "UpdateLoadometerWeight", data);
  },
  // 删除地磅数据
  DelLoadometerWeight(data) {
    return postRequest(baseUrl + "DelLoadometerWeight", data);
  },
  UploadLoadometerWeight(data) {
    return postRequest(baseUrl + "UploadLoadometerWeight", data);
  },
};
