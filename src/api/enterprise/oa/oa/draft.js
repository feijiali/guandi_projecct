//----------------------- 草稿箱 -------------------------------
import { postRequest } from "@/api/axios";
import $C from "@/common/config";
let baseUrl = $C.baseUrl + "?op=";

export default {
    // 导出我的草稿
    ExportDraft(data) {
        return postRequest(baseUrl + "ExportDraft", data);
    },
    // 上传我的草稿
    UploadDraft(data) {
        return postRequest(baseUrl + "UploadDraft", data);
    },
    // 修改我的草稿
    UpdateDraft(data) {
        return postRequest(baseUrl + "UpdateDraft", data);
    },
    // 删除我的草稿
    DelDraft(data) {
        return postRequest(baseUrl + "DelDraft", data);
    },
    // 查询我的草稿-列表
    QueryDraftList(data) {
        return postRequest(baseUrl + "QueryDraftList", data);
    },
    // 查询我的草稿
    QueryDraft(data) {
        return postRequest(baseUrl + "QueryDraft", data);
    },
};
