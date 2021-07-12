//----------------------- 加班申请 -------------------------------
import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

export default {
    // 查询加班申请
    QueryOAOvertime(data) {
        return postRequest(baseUrl + "QueryOAOvertime", data);
    },
    //   查询加班申请-列表
    QueryOAOvertimeList(data) {
        return postRequest(baseUrl + "QueryOAOvertimeList", data);
    },
    // 删除加班申请
    DelOAOvertime(data) {
        return postRequest(baseUrl + "DelOAOvertime", data);
    },
    // 修改加班申请
    UpdateOAOvertime(data) {
        return postRequest(baseUrl + "UpdateOAOvertime", data);
    },
    // 上传加班申请
    UploadOAOvertime(data) {
        return postRequest(baseUrl + "UploadOAOvertime", data);
    },
    // 导出加班申请
    ExportOAOvertime(data) {
        return postRequest(baseUrl + "ExportOAOvertime", data);
    },
};
