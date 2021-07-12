//----------------------- 内部文件 -------------------------------
import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

export default {
    // 查询出差申请
    QueryOAEvection(data) {
        return postRequest(baseUrl + "QueryOAEvection", data);
    },
    //   查询出差申请-列表
    QueryOAEvectionList(data) {
        return postRequest(baseUrl + "QueryOAEvectionList", data);
    },
    // 删除出差申请
    DelOAEvection(data) {
        return postRequest(baseUrl + "DelOAEvection", data);
    },
    // 上传出差申请
    UploadOAEvection(data) {
        return postRequest(baseUrl + "UploadOAEvection", data);
    },

    // 编辑出差申请
    UpdateOAEvection(data) {
        return postRequest(baseUrl + "UpdateOAEvection", data);
    },
    // 导出出差申请
    ExportOAEvection(data) {
        return postRequest(baseUrl + "ExportOAEvection", data);
    },
};
