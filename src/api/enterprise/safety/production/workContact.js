import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 审批流程
export default {
    // 上传工作联系单
    UploadSafeWorkContact(data) {
        return postRequest(baseUrl + "UploadSafeWorkContact", data);
    },
    // 回复工作联系单
    ReplySafeWorkContact(data) {
        return postRequest(baseUrl + "ReplySafeWorkContact", data);
    },
    // 删除工作联系单
    DelSafeWorkContact(data) {
        return postRequest(baseUrl + "DelSafeWorkContact", data);
    },
    // 查询工作联系单-列表
    QuerySafeWorkContactList(data) {
        return postRequest(baseUrl + "QuerySafeWorkContactList", data);
    },
    //查询工作联系单
    QuerySafeWorkContact(data) {
        return postRequest(baseUrl + "QuerySafeWorkContact", data);
    }
};
