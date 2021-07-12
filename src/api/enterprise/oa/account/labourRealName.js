import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

export default {
  // 查询班组
  QueryStaffTeamName(data) {
    return postRequest(baseUrl + "QueryStaffTeamName", data);
  },
  // 查询劳务单位
  QueryStaffTeamLabour(data) {
    return postRequest(baseUrl + "QueryStaffTeamLabour", data);
  },
  // 查询班组
  QueryStaffTeam(data) {
    return postRequest(baseUrl + "QueryStaffTeam", data);
  },

  // 查询班组详细
  QueryStaffTeamDetail(data) {
    return postRequest(baseUrl + "QueryStaffTeamDetail", data);
  },
  // 导出班组
  ExportStaffTeam(data) {
    return postRequest(baseUrl + "ExportStaffTeam", data);
  },

  // 删除班组
  DelStaffTeam(data) {
    return postRequest(baseUrl + "DelStaffTeam", data);
  },
  //修改班组
  UpdateStaffTeam(data) {
    return postRequest(baseUrl + "UpdateStaffTeam", data);
  },
  //上传班组
  UploadStaffTeam(data) {
    return postRequest(baseUrl + "UploadStaffTeam", data);
  },
  //查询劳务工人
  QueryStaffWorker(data) {
    return postRequest(baseUrl + "QueryStaffWorker", data);
  },
  // 入场登记劳务工人统计
  QueryStaffWorkerStat(data) {
    return postRequest(baseUrl + "QueryStaffWorkerStat", data);
  },
  // 查询劳务工人的劳务公司
  QueryStaffWorkerLabour(data) {
    return postRequest(baseUrl + "QueryStaffWorkerLabour", data);
  },
  //删除劳务工人
  DelStaffWorker(data) {
    return postRequest(baseUrl + "DelStaffWorker", data);
  },
  //修改劳务工人
  UpdateStaffWorker(data) {
    return postRequest(baseUrl + "UpdateStaffWorker", data);
  },
  //上传劳务工人
  UploadStaffWorker(data) {
    return postRequest(baseUrl + "UploadStaffWorker", data);
  },
  //导出劳务工人
  ExportStaffWorker(data) {
    return postRequest(baseUrl + "ExportStaffWorker", data);
  },
  //查询特殊工种
  QueryWorkerAccount(data) {
    return postRequest(baseUrl + "QueryWorkerAccount", data);
  },
  // 查询过期证件数量
  QueryWorkerAccountOverdue(data) {
    return postRequest(baseUrl + "QueryWorkerAccountOverdue", data);
  },
  // 上传证件信息
  UploadWorkerAccount(data) {
    return postRequest(baseUrl + "UploadWorkerAccount", data);
  },
  // 修改证件信息
  UpdateWorkerAccount(data) {
    return postRequest(baseUrl + "UpdateWorkerAccount", data);
  },
  // 删除单个证件
  DelWorkerAccount(data) {
    return postRequest(baseUrl + "DelWorkerAccount", data);
  },
  // 导入特殊工种证件照
  ImportWorkerAccount(data) {
    return postRequest(baseUrl + "ImportWorkerAccount", data);
  },
  // 导出特殊证件人员
  ExportWorkerAccount(data) {
    return postRequest(baseUrl + "ExportWorkerAccount", data);
  },
};
