import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

// 困难职工
export default {
    // 查询签领管理
    queryUnionPartySubsidy(data) {
        return postRequest(baseUrl + "QueryUnionPartySubsidy", data);
    },
    // 查询签领管理-列表
    queryUnionPartySubsidyList(data) {
        return postRequest(baseUrl + "QueryUnionPartySubsidyList", data);
    },
    // 删除签领管理
    delUnionPartySubsidy(data) {
        return postRequest(baseUrl + "DelUnionPartySubsidy", data);
    },
    // 修改签领管理
    updateUnionPartySubsidy(data) {
        return postRequest(baseUrl + "UpdateUnionPartySubsidy", data);
    },
    // 上传签领管理
    uploadUnionPartySubsidy(data) {
        return postRequest(baseUrl + "UploadUnionPartySubsidy", data);
    },
};
