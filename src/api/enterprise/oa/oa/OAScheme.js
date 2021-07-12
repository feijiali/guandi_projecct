//----------------------- 方案申请 -------------------------------
import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

export default {
    // 查询方案申请
    QueryOAScheme(data) {
        return postRequest(baseUrl + "QueryOAScheme", data);
    },
    //   查询方案申请-列表
    QueryOASchemeList(data) {
        return postRequest(baseUrl + "QueryOASchemeList", data);
    },
    // 删除方案申请
    DelOAScheme(data) {
        return postRequest(baseUrl + "DelOAScheme", data);
    },
    // 修改方案申请
    UpdateOAScheme(data) {
        return postRequest(baseUrl + "UpdateOAScheme", data);
    },
    // 上传方案申请
    UploadOAScheme(data) {
        return postRequest(baseUrl + "UploadOAScheme", data);
    },
    // 导出方案申请
    ExportOAScheme(data) {
        return postRequest(baseUrl + "ExportOAScheme", data);
    },
    // 查询方案项目类型
    QueryOASchemeProjectType(data) {
        return postRequest(baseUrl + "QueryOASchemeProjectType", data);
    },
};
